-- ============================================================
-- NOTES BY FSIR - SUPABASE DATABASE SETUP SCHEMA (SECURED)
-- ============================================================
-- Execute this SQL script in your Supabase SQL Editor
-- (Supabase Dashboard -> SQL Editor -> New Query -> Run)
-- ============================================================

-- 1. Create Profiles Table for User Roles & Management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'student')),
  is_blocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure columns exist if table was created previously
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();


-- 2. Non-Recursive SECURITY DEFINER Helper Function for Admin Check
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_role TEXT;
  user_blocked BOOLEAN;
BEGIN
  IF user_id IS NULL THEN
    RETURN FALSE;
  END IF;

  SELECT role, is_blocked INTO user_role, user_blocked
  FROM public.profiles
  WHERE id = user_id;

  RETURN (user_role = 'admin' AND COALESCE(user_blocked, FALSE) = FALSE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Explicit permissions for is_admin helper
REVOKE EXECUTE ON FUNCTION public.is_admin(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated, service_role;


-- 3. Enable Row Level Security (RLS) on Profiles Table & Restrict Direct Insert/Delete
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Restrict direct INSERT and DELETE operations from clients (Only trigger & service_role can create/delete)
REVOKE INSERT, DELETE ON public.profiles FROM anon, authenticated;

-- Profiles RLS Policies (Non-Recursive via is_admin helper):
-- Policy A: Users view their own profile, Admins view all profiles
DROP POLICY IF EXISTS "Profiles select policy" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Profiles select policy"
  ON public.profiles FOR SELECT
  USING (
    auth.uid() = id OR public.is_admin(auth.uid())
  );

-- Policy B: Users update their own profile, Admins update any profile
DROP POLICY IF EXISTS "Profiles update policy" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;

CREATE POLICY "Profiles update policy"
  ON public.profiles FOR UPDATE
  USING (
    auth.uid() = id OR public.is_admin(auth.uid())
  );


-- 4. Security Trigger to Prevent Privilege Escalation & Client Tampering
CREATE OR REPLACE FUNCTION public.prevent_profile_tampering()
RETURNS TRIGGER AS $$
BEGIN
  -- If the user executing the UPDATE is NOT an active Admin:
  IF NOT public.is_admin(auth.uid()) THEN
    -- Block role escalation
    IF NEW.role IS DISTINCT FROM OLD.role THEN
      RAISE EXCEPTION 'Security Violation: Non-admin users cannot alter their role.';
    END IF;
    -- Block unblocking self
    IF NEW.is_blocked IS DISTINCT FROM OLD.is_blocked THEN
      RAISE EXCEPTION 'Security Violation: Non-admin users cannot alter block status.';
    END IF;
    -- Block email modification via profile table
    IF NEW.email IS DISTINCT FROM OLD.email THEN
      RAISE EXCEPTION 'Security Violation: Email address cannot be modified via profile update.';
    END IF;
    -- Block ID modification
    IF NEW.id IS DISTINCT FROM OLD.id THEN
      RAISE EXCEPTION 'Security Violation: Profile ID cannot be modified.';
    END IF;
  END IF;

  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS tr_prevent_profile_tampering ON public.profiles;
CREATE TRIGGER tr_prevent_profile_tampering
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_tampering();


-- 5. Automatic Profile Creation Trigger on Sign-Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, is_blocked)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Student'),
    'student',
    FALSE
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 6. Create Suggestions Table for Student Note Feedback
CREATE TABLE IF NOT EXISTS public.suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  note_id TEXT NOT NULL,
  suggestion TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on Suggestions Table
ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

-- Suggestions RLS Policies:
DROP POLICY IF EXISTS "Anyone can submit a suggestion" ON public.suggestions;
CREATE POLICY "Anyone can submit a suggestion"
  ON public.suggestions FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own suggestions" ON public.suggestions;
DROP POLICY IF EXISTS "Admins can view all suggestions" ON public.suggestions;
CREATE POLICY "Suggestions select policy"
  ON public.suggestions FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update suggestions" ON public.suggestions;
CREATE POLICY "Admins can update suggestions"
  ON public.suggestions FOR UPDATE
  USING (public.is_admin(auth.uid()));


-- ============================================================
-- HOW TO CREATE THE FIRST FAHAD SIR ADMIN ACCOUNT:
-- ============================================================
-- Step 1: Sign up a user using the /login page or Supabase Auth UI with email (e.g. fahad@fsir.com)
-- Step 2: Run the following SQL query in Supabase SQL Editor to promote the user to 'admin':
--
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE email = 'fahad@fsir.com';
-- ============================================================
