-- Add catch-all restrictive authentication policy for delivery_schedules
-- This provides defense-in-depth by ensuring authentication is always required
CREATE POLICY "Deny access when not authenticated"
ON public.delivery_schedules
AS RESTRICTIVE
FOR ALL
USING (auth.uid() IS NOT NULL);