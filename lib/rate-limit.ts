import { NextRequest } from 'next/server';

interface RateLimitTracker {
  count: number;
  resetTime: number;
}

// In-memory rate limiting map
const rateLimitMap = new Map<string, RateLimitTracker>();

// Periodic memory cleanup to prevent bloating in long-running node processes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000); // Clean up every 5 minutes
}

/**
 * Extracts client IP securely using NextRequest IP and secure proxy headers.
 */
export function getClientIp(req: NextRequest): string {
  // Use Next.js connection IP which is populated securely from trusted proxy headers (e.g. Vercel)
  const connectionIp = req.ip;
  if (connectionIp) return connectionIp;

  // Fallback to headers if not in a serverless platform with direct IP detection
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const parts = forwarded.split(',');
    return parts[0].trim();
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return '127.0.0.1';
}

/**
 * Perform multi-window rate limiting using combined IP and User-Agent fingerprint.
 * Returns true if allowed, false if blocked.
 */
export async function rateLimit(
  req: NextRequest,
  minuteLimit: number = 5,
  hourLimit: number = 30
): Promise<{ success: boolean; limitTriggered?: 'minute' | 'hour'; resetTime?: number }> {
  const ip = getClientIp(req);
  const userAgent = req.headers.get('user-agent') || 'unknown';
  
  const fingerprint = `${ip}:${userAgent}`;
  const minuteKey = `min:${fingerprint}`;
  const hourKey = `hr:${fingerprint}`;

  const now = Date.now();

  // 1. Validate Minute Window (e.g. 5 requests / min)
  const minTracker = rateLimitMap.get(minuteKey);
  const minReset = now + 60000;

  if (!minTracker) {
    rateLimitMap.set(minuteKey, { count: 1, resetTime: minReset });
  } else if (now > minTracker.resetTime) {
    minTracker.count = 1;
    minTracker.resetTime = minReset;
  } else {
    if (minTracker.count >= minuteLimit) {
      return { success: false, limitTriggered: 'minute', resetTime: minTracker.resetTime };
    }
    minTracker.count++;
  }

  // 2. Validate Hour Window (e.g. 30 requests / hr)
  const hrTracker = rateLimitMap.get(hourKey);
  const hrReset = now + 3600000;

  if (!hrTracker) {
    rateLimitMap.set(hourKey, { count: 1, resetTime: hrReset });
  } else if (now > hrTracker.resetTime) {
    hrTracker.count = 1;
    hrTracker.resetTime = hrReset;
  } else {
    if (hrTracker.count >= hourLimit) {
      // Rollback the minute count increment since the request is blocked by the hour limit
      if (minTracker) minTracker.count = Math.max(0, minTracker.count - 1);
      return { success: false, limitTriggered: 'hour', resetTime: hrTracker.resetTime };
    }
    hrTracker.count++;
  }

  return { success: true };
}
