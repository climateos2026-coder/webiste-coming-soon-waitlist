-- Migration: Create waitlist table and configure strict Row-Level Security (RLS)
-- Created on May 28, 2026

-- 1. Create the waitlist table if it doesn't already exist
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    country TEXT NULL,
    role TEXT NULL,
    track_interests TEXT[] NULL DEFAULT '{}',
    climate_problem TEXT NULL,
    referral_source TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row-Level Security on the waitlist table
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- 3. Clear any existing policies to prevent conflicts
DROP POLICY IF EXISTS "Allow anonymous insert only" ON public.waitlist;
DROP POLICY IF EXISTS "Restrict SELECT for anon" ON public.waitlist;
DROP POLICY IF EXISTS "Restrict UPDATE for anon" ON public.waitlist;
DROP POLICY IF EXISTS "Restrict DELETE for anon" ON public.waitlist;
DROP POLICY IF EXISTS "Allow authenticated service role full access" ON public.waitlist;

-- 4. Create explicit RLS policies
-- Allow anonymous users to INSERT into the waitlist
CREATE POLICY "Allow anonymous insert only" ON public.waitlist
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Explicitly ensure that SELECT, UPDATE, and DELETE are strictly disabled for anonymous roles
-- In Postgres, when RLS is enabled, any operation without a matching policy defaults to DENY.
-- These policies act as explicit documentation and security enforcement layers.
CREATE POLICY "Restrict SELECT for anon" ON public.waitlist
    FOR SELECT
    TO anon
    USING (false);

CREATE POLICY "Restrict UPDATE for anon" ON public.waitlist
    FOR UPDATE
    TO anon
    USING (false);

CREATE POLICY "Restrict DELETE for anon" ON public.waitlist
    FOR DELETE
    TO anon
    USING (false);

-- Allow full administrative access to service role accounts (e.g. backend operations using service role)
CREATE POLICY "Allow authenticated service role full access" ON public.waitlist
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
