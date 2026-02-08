-- Create table for delivery blackout dates
CREATE TABLE public.delivery_blackout_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blackout_date date NOT NULL UNIQUE,
  reason text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.delivery_blackout_dates ENABLE ROW LEVEL SECURITY;

-- Restrictive policy requiring authentication
CREATE POLICY "Deny access when not authenticated"
ON public.delivery_blackout_dates
AS RESTRICTIVE
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Admins can view all blackout dates
CREATE POLICY "Admins can view blackout dates"
ON public.delivery_blackout_dates
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Admins can insert blackout dates
CREATE POLICY "Admins can insert blackout dates"
ON public.delivery_blackout_dates
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Admins can delete blackout dates
CREATE POLICY "Admins can delete blackout dates"
ON public.delivery_blackout_dates
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Allow authenticated users to read blackout dates (for calendar display)
CREATE POLICY "Authenticated users can view blackout dates"
ON public.delivery_blackout_dates
FOR SELECT
USING (auth.uid() IS NOT NULL);