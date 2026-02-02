-- Fix customers and machines RLS: Convert the unauthenticated denial policies to RESTRICTIVE
-- Currently these policies are PERMISSIVE which means any authenticated user can access these tables

-- Fix customers table
DROP POLICY IF EXISTS "Deny access when not authenticated" ON public.customers;
CREATE POLICY "Deny access when not authenticated"
ON public.customers
AS RESTRICTIVE
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Fix machines table
DROP POLICY IF EXISTS "Deny access when not authenticated" ON public.machines;
CREATE POLICY "Deny access when not authenticated"
ON public.machines
AS RESTRICTIVE
FOR ALL
USING (auth.uid() IS NOT NULL);