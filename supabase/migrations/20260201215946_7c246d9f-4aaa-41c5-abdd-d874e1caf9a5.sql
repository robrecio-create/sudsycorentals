-- Add customer_name column to delivery_schedules
ALTER TABLE public.delivery_schedules 
ADD COLUMN customer_name text;

-- Add customer_email column for reference
ALTER TABLE public.delivery_schedules 
ADD COLUMN customer_email text;