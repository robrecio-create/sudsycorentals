-- Add apartment_name and apartment_number columns to customers table
ALTER TABLE public.customers ADD COLUMN apartment_name text;
ALTER TABLE public.customers ADD COLUMN apartment_number text;