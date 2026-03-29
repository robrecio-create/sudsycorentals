-- Quo Phone System Integration Tables
-- Phase 1: Webhook foundation + auto-text tracking

-- Raw webhook event logs for debugging/audit
CREATE TABLE IF NOT EXISTS quo_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT NOT NULL,           -- Quo's event ID (e.g., EV0ea54...)
  event_type TEXT NOT NULL,         -- e.g., call.completed, message.received
  payload JSONB NOT NULL,           -- Full webhook payload
  processed BOOLEAN DEFAULT FALSE,  -- Whether we've handled this event
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups by event type and processing status
CREATE INDEX idx_quo_events_type ON quo_events(event_type);
CREATE INDEX idx_quo_events_processed ON quo_events(processed) WHERE NOT processed;
CREATE INDEX idx_quo_events_created ON quo_events(created_at DESC);

-- Prevent duplicate event processing (Quo may retry webhooks)
CREATE UNIQUE INDEX idx_quo_events_event_id ON quo_events(event_id);

-- Track auto-texts we've sent to prevent spam
CREATE TABLE IF NOT EXISTS quo_auto_texts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,       -- Recipient phone number (E.164 format)
  auto_text_type TEXT NOT NULL,     -- e.g., 'missed_call', 'after_hours', 'welcome'
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  quo_message_id TEXT,              -- Response from Quo API after sending
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for checking recent auto-texts to a number
CREATE INDEX idx_quo_auto_texts_phone ON quo_auto_texts(phone_number, sent_at DESC);
CREATE INDEX idx_quo_auto_texts_type ON quo_auto_texts(auto_text_type);

-- Enable RLS
ALTER TABLE quo_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE quo_auto_texts ENABLE ROW LEVEL SECURITY;

-- Service role only (backend) - no anon access
CREATE POLICY "Service role access for quo_events"
  ON quo_events
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role access for quo_auto_texts"
  ON quo_auto_texts
  FOR ALL
  USING (auth.role() = 'service_role');

COMMENT ON TABLE quo_events IS 'Raw webhook events from Quo phone system for audit/debugging';
COMMENT ON TABLE quo_auto_texts IS 'Tracks auto-texts sent to prevent spamming the same number';
