-- Add customer_id column to quo_auto_texts for tracking review requests
ALTER TABLE quo_auto_texts ADD COLUMN IF NOT EXISTS customer_id TEXT;

-- Add index for faster lookups by customer
CREATE INDEX IF NOT EXISTS idx_quo_auto_texts_customer_id ON quo_auto_texts(customer_id);
