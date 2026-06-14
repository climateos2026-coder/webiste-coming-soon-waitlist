import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getOriginFromUrl(value: string | undefined) {
  if (!value) return '';

  try {
    return new URL(value).origin;
  } catch {
    return '';
  }
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

const isDev = process.env.NODE_ENV !== 'production';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? getOriginFromUrl(supabaseUrl) : '';
const plausibleScriptUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_URL || 'https://plausible.io/js/script.js';
const plausibleScriptOrigin = getOriginFromUrl(plausibleScriptUrl) || 'https://plausible.io';
const plausibleConnectOrigin = getOriginFromUrl(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? `https://${process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}` : undefined);
const analyticsOrigins = unique([plausibleScriptOrigin, plausibleConnectOrigin]).join(' ');
const externalOrigins = unique([
  'https://*.supabase.co',
  supabaseHostname,
  analyticsOrigins,
]).join(' ');

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' ${analyticsOrigins} ${isDev ? "'unsafe-eval'" : ''};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: blob: https:;
    font-src 'self' data: https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://forms.gle https://docs.google.com;
    connect-src 'self' ${externalOrigins};
    frame-src 'self' https://docs.google.com https://forms.gle https://*.google.com;
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set(
    'Permissions-Policy',
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
  );

  const csrfCookie = request.cookies.get('csrf_token');
  if (!csrfCookie) {
    response.cookies.set('csrf_token', crypto.randomUUID().replace(/-/g, ''), {
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
    });
  }

  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
