import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { escapeHtml } from '@/lib/utils';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import DOMPurify from 'isomorphic-dompurify';
import isDisposableEmail from 'is-disposable-email';

interface SecurityLogEvent {
  event: string;
  ip: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

function logSecurityEvent({ event, ip, userAgent, metadata }: SecurityLogEvent) {
  const logMessage = {
    level: 'WARN',
    timestamp: new Date().toISOString(),
    event,
    ip,
    userAgent: userAgent || 'unknown',
    metadata: metadata || {},
  };
  console.warn(JSON.stringify(logMessage));
}

const waitlistSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be at most 80 characters')
    .refine(val => !/[\r\n]/.test(val), 'Name cannot contain line breaks'),
  email: z.string().email('Invalid email address').max(100, 'Email must be at most 100 characters')
    .refine((email) => !isDisposableEmail(email), 'Disposable emails not allowed'),
  country: z.string().max(100, 'Country must be at most 100 characters').optional(),
  role: z.string().max(100, 'Role must be at most 100 characters').optional(),
  trackInterests: z.array(z.string().max(50)).max(10).optional(),
  climateProblem: z.string().max(240, 'Max 240 characters').optional(),
  referralSource: z.string().max(200, 'Referral source must be at most 200 characters').optional(),
});

async function sendWelcomeEmail(email: string, name: string, ip: string, userAgent: string) {
  if (!process.env.BREVO_API_KEY) {
    console.warn('Brevo API key not configured, skipping email');
    return;
  }
  
  const escapedName = escapeHtml(name);
  
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: [{ email, name: escapedName }],
      from: {
        email: process.env.BREVO_FROM_EMAIL!,
        name: process.env.BREVO_FROM_NAME!,
      },
      subject: 'Welcome to ClimateOS 2026!',
      htmlContent: `
        <h1 style="color: #0E8970;">Welcome to ClimateOS 2026!</h1>
        <p>Hey ${escapedName},</p>
        <p>You're on the waitlist! Here's what happens next:</p>
        <ul>
          <li>Applications open July 21, 2026</li>
          <li>We'll announce track reveals bi-weekly</li>
          <li>Official contact: climateos26@gmail.com</li>
        </ul>
        <p>Stay tuned for updates!</p>
        <p>- ClimateOS Team</p>
      `,
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Brevo email error (logged internally):', {
      status: response.status,
      message: errorText.substring(0, 100),
    });
    
    logSecurityEvent({
      event: 'EMAIL_SEND_FAILED',
      ip,
      userAgent,
      metadata: { status: response.status },
    });
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get('user-agent') || 'unknown';

  try {
    // 1. Double Submit Cookie CSRF Validation
    const csrfHeader = req.headers.get('x-csrf-token');
    const csrfCookie = req.cookies.get('csrf_token')?.value;

    if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
      logSecurityEvent({
        event: 'CSRF_FAILED',
        ip,
        userAgent,
        metadata: {
          csrfHeader: csrfHeader ? 'present' : 'missing',
          csrfCookie: csrfCookie ? 'present' : 'missing'
        },
      });
      return NextResponse.json(
        { error: 'Security validation failed' },
        { status: 403 }
      );
    }

    // 2. Origin Check to verify same-origin request
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    if (origin) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host !== host) {
          logSecurityEvent({
            event: 'CSRF_ORIGIN_MISMATCH',
            ip,
            userAgent,
            metadata: { origin: originUrl.host, host },
          });
          return NextResponse.json(
            { error: 'Security validation failed' },
            { status: 403 }
          );
        }
      } catch (err) {
        logSecurityEvent({
          event: 'CSRF_ORIGIN_INVALID',
          ip,
          userAgent,
          metadata: { origin },
        });
        return NextResponse.json(
          { error: 'Security validation failed' },
          { status: 403 }
        );
      }
    }

    // 3. Apply Multi-Window Rate Limiting (5 req/min, 30 req/hour)
    const limiter = await rateLimit(req, 5, 30);
    if (!limiter.success) {
      logSecurityEvent({
        event: 'RATE_LIMIT_EXCEEDED',
        ip,
        userAgent,
        metadata: { limitTriggered: limiter.limitTriggered, resetTime: limiter.resetTime },
      });
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      logSecurityEvent({
        event: 'VALIDATION_FAILED',
        ip,
        userAgent,
        metadata: { issues: parsed.error.issues },
      });
      return NextResponse.json(
        { error: 'Invalid data', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Perform direct insertion to obey insert-only RLS policies.
    const { error } = await supabase.from('waitlist').insert({
      name: DOMPurify.sanitize(parsed.data.name, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }),
      email: parsed.data.email,
      country: parsed.data.country ? DOMPurify.sanitize(parsed.data.country, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : undefined,
      role: parsed.data.role ? DOMPurify.sanitize(parsed.data.role, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : undefined,
      track_interests: parsed.data.trackInterests ?? [],
      climate_problem: parsed.data.climateProblem ? DOMPurify.sanitize(parsed.data.climateProblem, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : undefined,
      referral_source: parsed.data.referralSource ? DOMPurify.sanitize(parsed.data.referralSource, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : undefined,
    });

    if (error) {
      // 23505 is PostgreSQL unique_violation code
      if (error.code === '23505' || error.message?.includes('unique') || error.message?.includes('already exists')) {
        logSecurityEvent({
          event: 'DUPLICATE_SUBMISSION_ATTEMPT',
          ip,
          userAgent,
        });
        return NextResponse.json({ success: true });
      }
      
      logSecurityEvent({
        event: 'DATABASE_ERROR',
        ip,
        userAgent,
        metadata: { code: error.code },
      });
      return NextResponse.json(
        { error: 'Form submission error' },
        { status: 400 }
      );
    }

    await sendWelcomeEmail(parsed.data.email, parsed.data.name, ip, userAgent).catch((err) => {
      console.error('Unhandled email sender exception:', err);
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}