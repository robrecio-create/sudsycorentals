-- Add sale_price and sold_date columns to machines table
ALTER TABLE public.machines
ADD COLUMN sale_price numeric NULL,
ADD COLUMN sold_date date NULL;