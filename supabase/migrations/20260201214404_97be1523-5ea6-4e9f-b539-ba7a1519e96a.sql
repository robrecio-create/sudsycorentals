-- Add fallback RLS policy to rental_history that explicitly denies access when not authenticated
-- This ensures that even if has_role function fails, unauthenticated users cannot access data

CREATE POLICY "Deny access when not authenticated"
ON public.rental_history
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Also add the same protection to other sensitive admin tables for consistency
CREATE POLICY "Deny access when not authenticated"
ON public.machines
FOR ALL
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Deny access when not authenticated"
ON public.customers
FOR ALL
USING (auth.uid() IS NOT NULL);