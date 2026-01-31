-- Add write protection policies to user_roles table
-- Only admins can manage role assignments (prevents privilege escalation)

-- Policy: Admins can insert new role assignments
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy: Admins can update role assignments
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Admins can delete role assignments
CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add CHECK constraints for delivery_schedules input validation
-- These provide server-side validation that cannot be bypassed

-- Validate phone format (digits, spaces, dashes, parentheses, plus sign)
ALTER TABLE public.delivery_schedules
ADD CONSTRAINT valid_phone_format
CHECK (phone ~ '^[\d\s\-\(\)\+]+$' AND char_length(phone) >= 7 AND char_length(phone) <= 20);

-- Validate zip code format (5 digits or 5+4 format)
ALTER TABLE public.delivery_schedules
ADD CONSTRAINT valid_zip_code_format
CHECK (zip_code ~ '^\d{5}(-\d{4})?$');

-- Validate reasonable text field lengths
ALTER TABLE public.delivery_schedules
ADD CONSTRAINT valid_street_address_length
CHECK (char_length(street_address) >= 5 AND char_length(street_address) <= 200);

ALTER TABLE public.delivery_schedules
ADD CONSTRAINT valid_city_length
CHECK (char_length(city) >= 2 AND char_length(city) <= 100);

ALTER TABLE public.delivery_schedules
ADD CONSTRAINT valid_notes_length
CHECK (notes IS NULL OR char_length(notes) <= 500);

-- Validate time_window is one of the expected values
ALTER TABLE public.delivery_schedules
ADD CONSTRAINT valid_time_window
CHECK (time_window IN ('Morning (8AM-12PM)', 'Afternoon (12PM-4PM)', 'Evening (4PM-7PM)'));

-- Validate status is one of the expected values
ALTER TABLE public.delivery_schedules
ADD CONSTRAINT valid_status
CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'));