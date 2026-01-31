-- Create customers table
CREATE TABLE public.customers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    street_address TEXT,
    city TEXT,
    zip_code TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add constraints
ALTER TABLE public.customers ADD CONSTRAINT customers_phone_format 
    CHECK (phone ~ '^\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$');

ALTER TABLE public.customers ADD CONSTRAINT customers_email_format 
    CHECK (email IS NULL OR email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Enable RLS on customers
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Only admins can manage customers
CREATE POLICY "Admins can view all customers"
ON public.customers FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert customers"
ON public.customers FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update customers"
ON public.customers FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete customers"
ON public.customers FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create rental_history table
CREATE TABLE public.rental_history (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    machine_id UUID NOT NULL REFERENCES public.machines(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    rental_start_date DATE NOT NULL,
    rental_end_date DATE,
    monthly_rate DECIMAL(10,2),
    status TEXT NOT NULL DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add constraint for status
ALTER TABLE public.rental_history ADD CONSTRAINT rental_history_status_check 
    CHECK (status IN ('active', 'completed', 'cancelled'));

-- Add constraint to ensure end date is after start date
ALTER TABLE public.rental_history ADD CONSTRAINT rental_dates_valid 
    CHECK (rental_end_date IS NULL OR rental_end_date >= rental_start_date);

-- Enable RLS on rental_history
ALTER TABLE public.rental_history ENABLE ROW LEVEL SECURITY;

-- Only admins can manage rental history
CREATE POLICY "Admins can view all rental history"
ON public.rental_history FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert rental history"
ON public.rental_history FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update rental history"
ON public.rental_history FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete rental history"
ON public.rental_history FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Add customer_id foreign key to machines table
ALTER TABLE public.machines ADD COLUMN customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX idx_rental_history_machine ON public.rental_history(machine_id);
CREATE INDEX idx_rental_history_customer ON public.rental_history(customer_id);
CREATE INDEX idx_machines_customer ON public.machines(customer_id);

-- Create triggers for updated_at
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rental_history_updated_at
BEFORE UPDATE ON public.rental_history
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();