-- Allow users to delete their own delivery schedules
CREATE POLICY "Users can delete their own delivery schedules"
ON public.delivery_schedules
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);