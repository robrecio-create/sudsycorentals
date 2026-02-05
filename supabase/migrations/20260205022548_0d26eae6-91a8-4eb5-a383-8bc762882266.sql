-- Add notification_sent column to prevent duplicate email notifications
ALTER TABLE public.contact_submissions
ADD COLUMN notification_sent boolean NOT NULL DEFAULT false;

-- Add index for efficient lookup of un-notified submissions
CREATE INDEX idx_contact_submissions_notification_sent 
ON public.contact_submissions (notification_sent) 
WHERE notification_sent = false;