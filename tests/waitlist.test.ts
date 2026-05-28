import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../app/api/waitlist/route';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('@/lib/supabase/server', () => ({
  createServerClient: () => ({
    from: () => ({
      insert: vi.fn().mockResolvedValue({ error: null })
    })
  })
}));

// Mock rate-limit to avoid state leaking between tests
vi.mock('@/lib/rate-limit', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/rate-limit')>();
  return {
    ...actual,
    rateLimit: vi.fn().mockResolvedValue({ success: true, count: 1, limit: 5, resetTime: Date.now() + 60000 }),
    getClientIp: vi.fn().mockReturnValue('127.0.0.1')
  };
});

describe('POST /api/waitlist', () => {
  const validPayload = {
    name: 'Test User',
    email: 'test@example.com',
    country: 'Testland',
  };

  const createRequest = (body: any, headers: Record<string, string> = {}, cookies: Record<string, string> = {}) => {
    const req = new NextRequest('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers(headers),
    });
    
    // Mock cookies
    Object.entries(cookies).forEach(([key, value]) => {
      req.cookies.set(key, value);
    });
    
    return req;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fails if CSRF token is missing', async () => {
    const req = createRequest(validPayload);
    const res = await POST(req);
    expect(res.status).toBe(403);
    const json = await res.json();
    expect(json.error).toBe('Security validation failed');
  });

  it('fails if CSRF tokens do not match', async () => {
    const req = createRequest(validPayload, { 'x-csrf-token': 'wrong-token' }, { 'csrf_token': 'correct-token' });
    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it('fails if Origin does not match Host', async () => {
    const req = createRequest(
      validPayload, 
      { 
        'x-csrf-token': 'valid-token',
        'host': 'climateoshack.dev',
        'origin': 'https://evil.com'
      }, 
      { 'csrf_token': 'valid-token' }
    );
    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it('fails if name contains CRLF', async () => {
    const req = createRequest(
      { ...validPayload, name: 'Hacker\r\nBcc: evil@evil.com' }, 
      { 'x-csrf-token': 'valid-token', 'host': 'climateoshack.dev', 'origin': 'https://climateoshack.dev' }, 
      { 'csrf_token': 'valid-token' }
    );
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe('Invalid data');
  });

  it('fails if optional fields exceed length bounds', async () => {
    const req = createRequest(
      { ...validPayload, country: 'A'.repeat(101) }, 
      { 'x-csrf-token': 'valid-token' }, 
      { 'csrf_token': 'valid-token' }
    );
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('succeeds with valid payload and matching CSRF', async () => {
    const req = createRequest(
      validPayload, 
      { 'x-csrf-token': 'valid-token' }, 
      { 'csrf_token': 'valid-token' }
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
