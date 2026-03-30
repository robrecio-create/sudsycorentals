-- Migration: Create webhook trigger for leads table
-- This calls the send-lead-welcome-text edge function on INSERT
-- Run AFTER the leads table migration

-- Note: Supabase Database Webhooks are configured in the dashboard, not via SQL
-- This file documents the required webhook configuration

/*
WEBHOOK CONFIGURATION (set up in Supabase Dashboard → Database → Webhooks):

1. Create a new webhook:
   - Name: send-lead-welcome-text
   - Table: leads
   - Events: INSERT
   - Type: Supabase Edge Function
   - Function: send-lead-welcome-text
   
2. Or use the pg_net extension for direct HTTP calls:
*/

-- Alternative: Use pg_net to call the edge function directly
-- This requires the pg_net extension to be enabled

-- Enable pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create function to call the edge function
CREATE OR REPLACE FUNCTION public.notify_lead_welcome_text()
RETURNS TRIGGER AS $$
DECLARE
  supabase_url TEXT;
  service_role_key TEXT;
BEGIN
  -- Get the Supabase URL from environment (set as a database secret)
  supabase_url := current_setting('app.settings.supabase_url', true);
  service_role_key := current_setting('app.settings.service_role_key', true);
  
  -- If secrets aren't set, skip (function will need to be triggered via dashboard webhook instead)
  IF supabase_url IS NULL OR service_role_key IS NULL THEN
    RAISE NOTICE 'Supabase URL or service role key not configured. Use dashboard webhook instead.';
    RETURN NEW;
  END IF;

  -- Call the edge function via pg_net
  PERFORM net.http_post(
    url := supabase_url || '/functions/v1/send-lead-welcome-text',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'leads',
      'schema', 'public',
      'record', row_to_json(NEW),
      'old_record', NULL
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_lead_insert_send_welcome ON public.leads;
CREATE TRIGGER on_lead_insert_send_welcome
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_lead_welcome_text();

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.notify_lead_welcome_text() TO service_role;

COMMENT ON FUNCTION public.notify_lead_welcome_text() IS 'Calls send-lead-welcome-text edge function when a new lead is inserted';
