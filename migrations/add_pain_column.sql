-- Add 'pain' column to leads table
-- Run this migration in your Supabase SQL Editor

ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS pain TEXT;

-- Add an index if you plan to query by pain points frequently
-- CREATE INDEX IF NOT EXISTS idx_leads_pain ON public.leads(pain);

-- Optional: Add a comment to document the column
COMMENT ON COLUMN public.leads.pain IS 'Primary pain point or challenge the lead is trying to solve';

