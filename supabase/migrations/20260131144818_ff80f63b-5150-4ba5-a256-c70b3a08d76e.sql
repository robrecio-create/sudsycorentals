-- Create machines table for inventory tracking
CREATE TABLE public.machines (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL,
    brand TEXT NOT NULL,
    model_number TEXT,
    serial_number TEXT,
    status TEXT NOT NULL DEFAULT 'available',
    customer TEXT,
    purchase_cost DECIMAL(10,2),
    purchase_from TEXT,
    date_purchased DATE,
    tested BOOLEAN DEFAULT false,
    notes TEXT,
    photos_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add check constraint for status
ALTER TABLE public.machines ADD CONSTRAINT machines_status_check 
    CHECK (status IN ('available', 'rented', 'maintenance', 'retired'));

-- Add check constraint for type
ALTER TABLE public.machines ADD CONSTRAINT machines_type_check 
    CHECK (type IN ('washer', 'dryer', 'combo'));

-- Enable RLS
ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;

-- Only admins can view machines
CREATE POLICY "Admins can view all machines"
ON public.machines
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Only admins can insert machines
CREATE POLICY "Admins can insert machines"
ON public.machines
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can update machines
CREATE POLICY "Admins can update machines"
ON public.machines
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Only admins can delete machines
CREATE POLICY "Admins can delete machines"
ON public.machines
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_machines_updated_at
BEFORE UPDATE ON public.machines
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();