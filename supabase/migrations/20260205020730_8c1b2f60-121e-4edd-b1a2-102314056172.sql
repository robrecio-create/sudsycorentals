-- Add defense-in-depth: Require authentication for SELECT on contact_submissions
-- This ensures unauthenticated users are explicitly blocked, even if admin policy has issues
CREATE POLICY "Deny unauthenticated SELECT on contact submissions"
ON public.contact_submissions
AS RESTRICTIVE
FOR SELECT
USING (auth.uid() IS NOT NULL);