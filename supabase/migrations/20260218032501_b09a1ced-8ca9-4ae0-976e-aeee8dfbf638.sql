
-- Make user_id nullable so unauthenticated users can schedule
ALTER TABLE public.delivery_schedules ALTER COLUMN user_id DROP NOT NULL;

-- Drop the restrictive ALL policy that blocks unauthenticated access
DROP POLICY IF EXISTS "Deny access when not authenticated" ON public.delivery_schedules;

-- Re-add restrictive auth check for SELECT, UPDATE, DELETE only
CREATE POLICY "Deny unauthenticated SELECT" ON public.delivery_schedules
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Deny unauthenticated UPDATE" ON public.delivery_schedules
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Deny unauthenticated DELETE" ON public.delivery_schedules
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Allow anyone (including unauthenticated) to insert delivery schedules
CREATE POLICY "Anyone can schedule a delivery" ON public.delivery_schedules
  FOR INSERT WITH CHECK (true);
