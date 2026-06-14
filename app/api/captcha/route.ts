import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

const TTL_MS = 5 * 60 * 1000;
const RATE_LIMIT_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;
const attempts = new Map<string, { count: number; resetAt: number }>();

type CaptchaPayload = {
  nonce: string;
  num1: number;
  num2: number;
  expiresAt: number;
  signature: string;
};

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function encodeToken(payload: CaptchaPayload) {
  return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
}

function decodeToken(token: string): CaptchaPayload | null {
  try {
    return JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as CaptchaPayload;
  } catch {
    return null;
  }
}

function sign(payload: Omit<CaptchaPayload, 'signature'>) {
  return createHmac('sha256', process.env.ADMIN_SECRET || 'development-captcha-secret')
    .update(`${payload.nonce}.${payload.num1}.${payload.num2}.${payload.expiresAt}`)
    .digest('base64url');
}

function createChallenge() {
  const now = Date.now();
  const payload = {
    nonce: crypto.randomUUID(),
    num1: Math.floor(Math.random() * 8) + 2,
    num2: Math.floor(Math.random() * 8) + 2,
    expiresAt: now + TTL_MS,
  };

  return {
    ...payload,
    signature: sign(payload),
  };
}

function isRateLimited(request: NextRequest) {
  const ip = getClientIp(request);
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function GET() {
  return NextResponse.json({ token: encodeToken(createChallenge()) });
}

export async function POST(request: NextRequest) {
  if (isRateLimited(request)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const token = typeof body?.token === 'string' ? body.token : '';
  const answer = typeof body?.answer === 'string' ? body.answer : '';
  const decoded = decodeToken(token);

  if (!decoded || decoded.expiresAt < Date.now()) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const expectedSignature = sign({
    nonce: decoded.nonce,
    num1: decoded.num1,
    num2: decoded.num2,
    expiresAt: decoded.expiresAt,
  });
  const expected = Buffer.from(expectedSignature, 'utf8');
  const actual = Buffer.from(decoded.signature, 'utf8');
  const validSignature = expected.length === actual.length && timingSafeEqual(expected, actual);

  if (!validSignature || Number.parseInt(answer, 10) !== decoded.num1 + decoded.num2) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
