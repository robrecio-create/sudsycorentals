-- Add CHECK constraints for input validation on contact_submissions table

-- Email format validation (standard email pattern, max 255 chars)
ALTER TABLE public.contact_submissions
ADD CONSTRAINT valid_email_format
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND char_length(email) <= 255);

-- Phone format validation (digits, spaces, dashes, parentheses, plus sign allowed; 7-20 chars)
ALTER TABLE public.contact_submissions
ADD CONSTRAINT valid_phone_format
CHECK (phone ~ '^[\d\s\-\(\)\+]+$' AND char_length(phone) >= 7 AND char_length(phone) <= 20);

-- Name length validation (1-100 chars, required)
ALTER TABLE public.contact_submissions
ADD CONSTRAINT valid_name_length
CHECK (char_length(name) >= 1 AND char_length(name) <= 100);

-- Message length validation (optional, max 2000 chars)
ALTER TABLE public.contact_submissions
ADD CONSTRAINT valid_message_length
CHECK (message IS NULL OR char_length(message) <= 2000);

-- Problem description length validation (optional, max 2000 chars)
ALTER TABLE public.contact_submissions
ADD CONSTRAINT valid_problem_length
CHECK (problem_description IS NULL OR char_length(problem_description) <= 2000);

-- Inquiry type validation (must be one of the valid types)
ALTER TABLE public.contact_submissions
ADD CONSTRAINT valid_inquiry_type
CHECK (inquiry_type IN ('general', 'repair', 'pickup'));

-- Appliance validation (optional, must be valid if provided)
ALTER TABLE public.contact_submissions
ADD CONSTRAINT valid_appliance
CHECK (appliance IS NULL OR appliance IN ('washer', 'dryer'));