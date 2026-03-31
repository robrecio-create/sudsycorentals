-- Migration: Create leads table for SudsyCo Check Availability widget
-- Run this in Supabase SQL Editor

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  zip_code TEXT,
  move_in_date DATE,
  property_type TEXT CHECK (property_type IN ('apartment', 'home', 'other')),
  message TEXT,
  source TEXT DEFAULT 'check_availability_widget',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  quo_message_sent BOOLEAN DEFAULT FALSE,
  quo_message_sent_at TIMESTAMPTZ,
  notion_synced BOOLEAN DEFAULT FALSE,
  notion_page_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for common queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_zip_code ON public.leads(zip_code);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Service role can do everything (for backend/edge functions)
CREATE POLICY "Service role full access"
  ON public.leads
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- RLS Policy: Anon users can insert (for the public widget)
CREATE POLICY "Anon users can insert leads"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- RLS Policy: Authenticated admins can read all leads
CREATE POLICY "Authenticated users can read leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policy: Authenticated admins can update leads
CREATE POLICY "Authenticated users can update leads"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS set_leads_updated_at ON public.leads;
CREATE TRIGGER set_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Grant permissions
GRANT SELECT, INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

COMMENT ON TABLE public.leads IS 'Lead submissions from SudsyCo Check Availability widget';
COMMENT ON COLUMN public.leads.quo_message_sent IS 'Whether the Quo/OpenPhone welcome text was sent';
COMMENT ON COLUMN public.leads.notion_synced IS 'Whether this lead was synced to Notion';
