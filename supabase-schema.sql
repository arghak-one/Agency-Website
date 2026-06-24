-- NEXORA LEADS SCHEMA BOOTSTRAP SCRIPT
-- Copy and paste this script into your Supabase SQL Editor to set up the leads table.

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_required TEXT NOT NULL,
  project_budget TEXT NOT NULL,
  project_requirements TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New Lead',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Enable Policies

-- 1. Allow Anyone to Submit/Insert leads (required for landing page forms)
CREATE POLICY "Allow public inserts" ON public.leads
  FOR INSERT WITH CHECK (true);

-- 2. Restrict Read/Write access (the server API routes connect via service_role to bypass RLS securely, keeping it fully protected)
-- This ensures that standard client-side anonymous keys cannot query lead data!
CREATE POLICY "Restrict public select" ON public.leads
  FOR SELECT USING (false);

CREATE POLICY "Restrict public update" ON public.leads
  FOR UPDATE USING (false);

CREATE POLICY "Restrict public delete" ON public.leads
  FOR DELETE USING (false);

-- Add Index for fast queries
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
