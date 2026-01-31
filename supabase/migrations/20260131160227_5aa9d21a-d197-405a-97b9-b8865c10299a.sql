-- Add in_house_id and location columns to machines table
ALTER TABLE public.machines 
ADD COLUMN in_house_id text,
ADD COLUMN location text DEFAULT 'Warehouse';

-- Add check constraint for location values
ALTER TABLE public.machines 
ADD CONSTRAINT machines_location_check CHECK (location IN ('Warehouse', 'Storage', 'Out'));