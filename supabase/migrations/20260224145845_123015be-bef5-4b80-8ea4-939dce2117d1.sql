
-- Drop all existing SELECT policies on delivery_schedules
DROP POLICY IF EXISTS "Admins can view all delivery schedules" ON public.delivery_schedules;
DROP POLICY IF EXISTS "Users can view their own delivery schedules" ON public.delivery_schedules;
DROP POLICY IF EXISTS "Deny unauthenticated SELECT" ON public.delivery_schedules;

-- Recreate as PERMISSIVE policies so they OR together correctly
CREATE POLICY "Admins can view all delivery schedules"
ON public.delivery_schedules
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view their own delivery schedules"
ON public.delivery_schedules
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
