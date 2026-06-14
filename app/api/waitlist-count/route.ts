import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-static';
export const revalidate = 60;

export async function GET() {
  try {
    const supabase = createAdminClient(process.env.ADMIN_SECRET!);
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json({ error: 'Unable to load participant count' }, { status: 500 });
    }

    return NextResponse.json({ count: count ?? 0 });
  } catch {
    return NextResponse.json({ error: 'Unable to load participant count' }, { status: 500 });
  }
}
