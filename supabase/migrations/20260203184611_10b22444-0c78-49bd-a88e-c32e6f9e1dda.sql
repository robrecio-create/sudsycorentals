-- Update the machines_status_check constraint to include 'sold'
ALTER TABLE public.machines DROP CONSTRAINT machines_status_check;

ALTER TABLE public.machines ADD CONSTRAINT machines_status_check 
CHECK (status = ANY (ARRAY['available'::text, 'rented'::text, 'maintenance'::text, 'retired'::text, 'sold'::text]));