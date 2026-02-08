-- Create a function to validate delivery scheduling limits
CREATE OR REPLACE FUNCTION public.validate_delivery_schedule_limits()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  daily_count INTEGER;
  slot_count INTEGER;
BEGIN
  -- Count existing deliveries for the same date (excluding cancelled)
  SELECT COUNT(*) INTO daily_count
  FROM public.delivery_schedules
  WHERE scheduled_date = NEW.scheduled_date
    AND status != 'cancelled'
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid);

  -- Check daily limit (max 2 per day)
  IF daily_count >= 2 THEN
    RAISE EXCEPTION 'Maximum of 2 deliveries allowed per day. This date is fully booked.';
  END IF;

  -- Count existing deliveries for the same date and time slot (excluding cancelled)
  SELECT COUNT(*) INTO slot_count
  FROM public.delivery_schedules
  WHERE scheduled_date = NEW.scheduled_date
    AND time_window = NEW.time_window
    AND status != 'cancelled'
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid);

  -- Check time slot limit (max 1 per slot)
  IF slot_count >= 1 THEN
    RAISE EXCEPTION 'This time slot is already booked. Please select a different time.';
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger to enforce limits on insert and update
CREATE TRIGGER enforce_delivery_schedule_limits
  BEFORE INSERT OR UPDATE ON public.delivery_schedules
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_delivery_schedule_limits();