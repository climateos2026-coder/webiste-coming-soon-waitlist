import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // 1. CSRF Double-Submit Cookie Pattern
  // Check if csrf_token cookie exists
  const csrfCookie = request.cookies.get('csrf_token');
  let csrfToken = csrfCookie?.value;
  
  if (!csrfToken) {
    // Generate a secure random token
    csrfToken = crypto.getRandomValues(new Uint8Array(32)).reduce((acc, val) => acc + val.toString(16).padStart(2, '0'), '');
    // Set the cookie (non-httpOnly so client-side JS can read it and send it in the header)
    response.cookies.set('csrf_token', csrfToken, {
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
    });
  }

  // 2. Dynamic HTTP Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  return response;
}

// Apply proxy to pages and api routes, excluding asset files
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|theme-init.js).*)'],
};
