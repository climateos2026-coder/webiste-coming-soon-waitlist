import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Standard server client using the anonymous key (enforces RLS)
export function createServerClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Administrative server client using the service role key (bypasses RLS)
export function createAdminClient(adminSecret?: string) {
  if (process.env.NODE_ENV === 'production' && (!process.env.ADMIN_SECRET || adminSecret !== process.env.ADMIN_SECRET)) {
    throw new Error('Admin context required in production');
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables');
  }
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}