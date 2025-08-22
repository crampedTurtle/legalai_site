# Cal.com Integration Setup

This document outlines the setup required for the Cal.com API integration in the demo scheduling flow.

## Environment Variables

Add these environment variables to your Vercel project:

### Required Variables
- `CAL_API_KEY` - Your Cal.com API key
- `CAL_USERNAME` - Your Cal.com username
- `CAL_EVENT_TYPE` - The event type slug for demo bookings

### Supabase Variables (if not already set)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for server-side operations)

## Database Migration

Run the following SQL migration in your Supabase dashboard to add the required columns:

```sql
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
```

## Cal.com Setup

1. Create a Cal.com account if you don't have one
2. Create an event type for "Demo" with appropriate duration (e.g., 30 minutes)
3. Note the event type slug (e.g., "demo")
4. Generate an API key in your Cal.com settings
5. Set your availability for demo bookings

## Features

The integration provides:

1. **Inline Scheduling**: After form submission, users can immediately pick from available time slots
2. **One-Click Booking**: Users can book their demo with a single click
3. **Automatic Lead Updates**: The lead record is automatically updated with booking details
4. **Calendar Integration**: Users receive calendar invites and can access their booking details

## API Endpoints

- `GET /api/cal/slots` - Get available time slots
- `POST /api/cal/book` - Book a specific time slot

## Security

- All Cal.com API calls are server-side only
- API keys are never exposed to the client
- Supabase remains the source of truth for lead data
- RLS policies ensure data security

## Troubleshooting

1. **No slots available**: Check your Cal.com availability settings
2. **API errors**: Verify your Cal.com API key and event type slug
3. **Database errors**: Ensure the migration has been run
4. **Booking failures**: Check that the lead ID exists and is valid
