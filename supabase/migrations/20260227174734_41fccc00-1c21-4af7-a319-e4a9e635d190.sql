
-- Create an RPC function with advisory locks to prevent race conditions
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
  slot_count integer;
  new_id uuid;
BEGIN
  -- Serialize access to this date+slot combo
  slot_key := p_scheduled_date::text || '_' || p_time_window;
  PERFORM pg_advisory_xact_lock(hashtext(slot_key));

  -- Check daily limit
  SELECT COUNT(*) INTO daily_count
  FROM public.delivery_schedules
  WHERE scheduled_date = p_scheduled_date
    AND status != 'cancelled';

  IF daily_count >= 2 THEN
    RAISE EXCEPTION 'Maximum of 2 deliveries allowed per day. This date is fully booked.';
  END IF;

  -- Check slot limit
  SELECT COUNT(*) INTO slot_count
  FROM public.delivery_schedules
  WHERE scheduled_date = p_scheduled_date
    AND time_window = p_time_window
    AND status != 'cancelled';

  IF slot_count >= 1 THEN
    RAISE EXCEPTION 'This time slot is already booked. Please select a different time.';
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
