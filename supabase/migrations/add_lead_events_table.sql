-- Create lead_events table for tracking lead interactions
CREATE TABLE IF NOT EXISTS public.lead_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for lead_id for better query performance
CREATE INDEX IF NOT EXISTS idx_lead_events_lead_id ON public.lead_events(lead_id);

-- Add index for event_type for filtering
CREATE INDEX IF NOT EXISTS idx_lead_events_event_type ON public.lead_events(event_type);

-- Add index for created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_lead_events_created_at ON public.lead_events(created_at);

-- Enable RLS
ALTER TABLE public.lead_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous INSERT for lead_events
CREATE POLICY IF NOT EXISTS anon_insert_lead_events ON public.lead_events
  FOR INSERT TO anon
  WITH CHECK (true);
