-- =========================================================================
-- SUPABASE SCHEMA & ROW LEVEL SECURITY FOR PERSONAL PORTFOLIO
-- Liquid Glass Earth Tone Portfolio System
-- =========================================================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Web Development',
  tags TEXT[] DEFAULT '{}',
  cover_image_url TEXT NOT NULL DEFAULT '',
  gallery_images JSONB DEFAULT '[]'::jsonb,
  technologies TEXT[] DEFAULT '{}',
  project_url TEXT,
  source_code_url TEXT,
  video_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  start_date DATE,
  completion_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  published_at TIMESTAMPTZ
);

-- Index for public queries
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(is_featured);

-- 2. Create Admin Users Table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'owner')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_admin_user UNIQUE (user_id)
);

-- Helper function to check if current session user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for admin messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON public.contact_messages(created_at DESC);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- PROJECTS POLICIES:
-- 1. Public can ONLY read published projects
CREATE POLICY "Public can view published projects"
  ON public.projects
  FOR SELECT
  USING (status = 'published');

-- 2. Admins can view ALL projects (drafts & published)
CREATE POLICY "Admins can view all projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- 3. Admins can insert projects
CREATE POLICY "Admins can insert projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- 4. Admins can update projects
CREATE POLICY "Admins can update projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 5. Admins can delete projects
CREATE POLICY "Admins can delete projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (public.is_admin());


-- CONTACT MESSAGES POLICIES:
-- 1. Public can insert new contact messages
CREATE POLICY "Public can submit contact messages"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (
    char_length(name) > 0 AND
    char_length(email) > 4 AND
    char_length(message) > 0
  );

-- 2. Only Admins can view contact messages
CREATE POLICY "Only admins can view contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- 3. Only Admins can update contact messages (mark as read/archived)
CREATE POLICY "Only admins can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4. Only Admins can delete contact messages
CREATE POLICY "Only admins can delete contact messages"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (public.is_admin());


-- ADMIN USERS POLICIES:
-- Only authenticated admins can read admin table
CREATE POLICY "Admins can read admin_users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_admin());


-- =========================================================================
-- OPTION: PIN AUTHENTICATION MODE (สำหรับผู้ใช้ที่ต้องการใช้ PIN 4 หลัก)
-- รันโค้ดด้านล่างนี้ใน Supabase SQL Editor หากต้องการให้หน้า Admin ที่ใช้ PIN
-- สามารถบันทึกโปรเจกต์และอัปโหลดรูปภาพเข้า Supabase ได้โดยไม่ต้องสมัครบัญชีอีเมล
-- =========================================================================
/*
DROP POLICY IF EXISTS "Admins can view all projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;

CREATE POLICY "Allow all projects operations" ON public.projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Only admins can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Only admins can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Only admins can delete contact messages" ON public.contact_messages;
CREATE POLICY "Allow all contact messages operations" ON public.contact_messages FOR ALL USING (true) WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-media', 'portfolio-media', true) ON CONFLICT (id) DO NOTHING;
DROP POLICY IF EXISTS "Allow portfolio media operations" ON storage.objects;
CREATE POLICY "Allow portfolio media operations" ON storage.objects FOR ALL USING (bucket_id = 'portfolio-media') WITH CHECK (bucket_id = 'portfolio-media');
*/

