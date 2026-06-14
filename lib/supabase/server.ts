import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getSupabaseAnonKey, getSupabaseServiceRoleKey, getSupabaseUrl } from '@/lib/env';

export function createServerClient() {
  return createSupabaseClient(getSupabaseUrl(), getSupabaseAnonKey());
}

export function createAdminClient() {
  return createSupabaseClient(getSupabaseUrl(), getSupabaseServiceRoleKey());
}
