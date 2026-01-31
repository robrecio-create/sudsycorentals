-- Add state column to customers table
ALTER TABLE public.customers
ADD COLUMN state text;