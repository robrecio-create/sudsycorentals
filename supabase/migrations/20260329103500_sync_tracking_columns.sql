-- Add sync tracking columns for Notion + Calendar integration

-- Customers table: track Notion sync
ALTER TABLE public.customers 
ADD COLUMN IF NOT EXISTS synced_to_notion BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS notion_page_id TEXT;

CREATE INDEX IF NOT EXISTS idx_customers_notion_sync 
ON public.customers(synced_to_notion) 
WHERE NOT synced_to_notion;

-- Delivery schedules: track Notion + Calendar sync
ALTER TABLE public.delivery_schedules 
ADD COLUMN IF NOT EXISTS synced_to_notion BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS notion_page_id TEXT,
ADD COLUMN IF NOT EXISTS synced_to_calendar BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS gcal_event_id TEXT;

CREATE INDEX IF NOT EXISTS idx_deliveries_notion_sync 
ON public.delivery_schedules(synced_to_notion) 
WHERE NOT synced_to_notion;

CREATE INDEX IF NOT EXISTS idx_deliveries_calendar_sync 
ON public.delivery_schedules(synced_to_calendar) 
WHERE NOT synced_to_calendar;

COMMENT ON COLUMN public.customers.synced_to_notion IS 'Whether this customer has been synced to Notion';
COMMENT ON COLUMN public.customers.notion_page_id IS 'Notion page ID for this customer';
COMMENT ON COLUMN public.delivery_schedules.synced_to_notion IS 'Whether this delivery has been synced to Notion';
COMMENT ON COLUMN public.delivery_schedules.synced_to_calendar IS 'Whether this delivery has been synced to Google Calendar';
