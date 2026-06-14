import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/env';

let client: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!client) {
    client = createSupabaseClient(getSupabaseUrl(), getSupabaseAnonKey());
  }

  return client;
}
