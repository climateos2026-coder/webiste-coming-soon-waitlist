function isPlaceholderValue(value: string) {
  return value.startsWith('your-') || value === 'changeme' || value === 'change-me' || value === 'replace-me';
}

export function getRequiredEnv(name: string, description: string) {
  const value = process.env[name];

  if (!value || isPlaceholderValue(value)) {
    throw new Error(`Missing or invalid environment variable ${name}. ${description}`);
  }

  return value;
}

export function getSupabaseUrl() {
  const value = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL', 'Set NEXT_PUBLIC_SUPABASE_URL to your Supabase project URL.');

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL must use https.');
    }
    return value;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid Supabase URL.';
    throw new Error(`Invalid environment variable NEXT_PUBLIC_SUPABASE_URL. ${message}`);
  }
}

export function getSupabaseAnonKey() {
  return getRequiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Set NEXT_PUBLIC_SUPABASE_ANON_KEY from Supabase Settings > API.');
}

export function getSupabaseServiceRoleKey() {
  return getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY', 'Set SUPABASE_SERVICE_ROLE_KEY from Supabase Settings > API. Never expose this key in the browser.');
}
