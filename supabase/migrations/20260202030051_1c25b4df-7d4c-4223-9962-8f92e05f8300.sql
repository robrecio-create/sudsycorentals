-- Fix rental_history RLS: Convert the unauthenticated denial policy to RESTRICTIVE
-- Currently ALL policies are PERMISSIVE which means any authenticated user can access the table
-- The "Deny access when not authenticated" policy needs to be RESTRICTIVE so it's AND'd with other policies

-- Drop the existing permissive policy
DROP POLICY IF EXISTS "Deny access when not authenticated" ON public.rental_history;

-- Recreate as RESTRICTIVE policy (must pass this AND at least one permissive policy)
CREATE POLICY "Deny access when not authenticated"
ON public.rental_history
AS RESTRICTIVE
FOR ALL
USING (auth.uid() IS NOT NULL);