import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

function jsonResponse(body: unknown, status = 200) {
  const response = NextResponse.json(body, { status });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return jsonResponse({ error: 'Unable to load participant count' }, 500);
    }

    return jsonResponse({ count: count ?? 0 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load participant count';
    console.error(message);
    return jsonResponse({ error: 'Unable to load participant count' }, 503);
  }
}
