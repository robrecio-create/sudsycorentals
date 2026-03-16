-- Reduce daily delivery limit from 2 to 1

-- Update the trigger validation function
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

  -- Check daily limit (max 1 per day)
  IF daily_count >= 1 THEN
    RAISE EXCEPTION 'Maximum of 1 delivery allowed per day. This date is fully booked.';
  END IF;

  RETURN NEW;
END;
$$;

-- Update the RPC booking function
CREATE OR REPLACE FUNCTION public.book_delivery_slot(
  p_user_id uuid,
  p_scheduled_date date,
  p_time_window text,
  p_street_address text,
  p_city text,
  p_zip_code text,
  p_phone text,
  p_notes text DEFAULT NULL,
  p_customer_name text DEFAULT NULL,
  p_customer_email text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  slot_key text;
  daily_count integer;
  new_id uuid;
BEGIN
  -- Serialize access to this date
  slot_key := p_scheduled_date::text || '_delivery';
  PERFORM pg_advisory_xact_lock(hashtext(slot_key));

  -- Check daily limit (max 1 per day)
  SELECT COUNT(*) INTO daily_count
  FROM public.delivery_schedules
  WHERE scheduled_date = p_scheduled_date
    AND status != 'cancelled';

  IF daily_count >= 1 THEN
    RAISE EXCEPTION 'Maximum of 1 delivery allowed per day. This date is fully booked.';
  END IF;

  -- Insert
  INSERT INTO public.delivery_schedules (
    user_id, scheduled_date, time_window, street_address, city, zip_code, phone, notes, customer_name, customer_email
  ) VALUES (
    p_user_id, p_scheduled_date, p_time_window, p_street_address, p_city, p_zip_code, p_phone, p_notes, p_customer_name, p_customer_email
  ) RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;
