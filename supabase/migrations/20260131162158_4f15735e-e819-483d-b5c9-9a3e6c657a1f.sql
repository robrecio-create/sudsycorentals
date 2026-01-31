-- Add DELETE policy for admins on delivery_schedules
CREATE POLICY "Admins can delete delivery schedules"
ON public.delivery_schedules
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));