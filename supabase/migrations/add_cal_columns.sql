-- Add Cal.com integration columns to leads table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS demo_datetime TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS cal_booking_id TEXT,
ADD COLUMN IF NOT EXISTS cal_event_url TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- Add index for demo_datetime for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_demo_datetime ON public.leads(demo_datetime);

-- Add index for status for filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
