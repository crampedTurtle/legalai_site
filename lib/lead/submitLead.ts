'use client'

import { supabase } from '@/lib/supabase/browser'
import { splitName, getUTMFromUrl, deriveSource, sanitizePhone } from './helpers'

export type LeadPayload = {
  email: string
  name?: string
  first_name?: string
  last_name?: string
  phone?: string
  firm_name?: string
  title?: string
  role?: string
  pain?: string
  notes?: string
  wants_demo?: boolean
  source?: string
}

export async function submitLead(raw: LeadPayload, eventType?: string) {
  let supabaseClient
  try {
    supabaseClient = supabase()
  } catch (initError) {
    console.error('Failed to initialize Supabase client:', initError)
    throw new Error(`Supabase initialization failed: ${initError instanceof Error ? initError.message : 'Unknown error'}`)
  }

  const { first_name, last_name } =
    (raw.first_name || raw.last_name)
      ? { first_name: raw.first_name || null, last_name: raw.last_name || null }
      : splitName(raw.name)

  const utm = getUTMFromUrl()
  const source = raw.source || deriveSource()

  const insert = {
    email: raw.email?.trim().toLowerCase(),
    first_name,
    last_name,
    phone: sanitizePhone(raw.phone),
    firm_name: raw.firm_name?.trim() || null,
    title: raw.title?.trim() || null,
    role: raw.role?.trim() || null,
    // Note: 'pain' field is not in the leads table schema, but is stored in lead_events.payload
    notes: raw.notes?.trim() || null,
    wants_demo: !!raw.wants_demo,
    source,
    ...utm,
  }
  
  // Full payload including pain for lead_events
  const eventPayload = {
    ...insert,
    pain: raw.pain?.trim() || null,
  }

  const { data, error } = await supabaseClient.from('leads').insert(insert).select('id').single()

  let leadId: string | undefined
  if (error && (error as any).code === '23505') {
    // duplicate email, look up existing lead
    const { data: existing } = await supabaseClient.from('leads')
      .select('id')
      .eq('email', insert.email)
      .maybeSingle()
    leadId = existing?.id
  } else if (error) {
    console.error('Lead insert failed', error)
    console.error('Error details:', {
      message: error.message,
      code: (error as any).code,
      details: (error as any).details,
      hint: (error as any).hint,
    })
    throw error
  } else {
    leadId = data?.id
  }

  // Always insert an event
  if (leadId) {
    await supabaseClient.from('lead_events').insert({
      lead_id: leadId,
      event_type: eventType || (raw.wants_demo ? 'demo_request' : 'download'),
      payload: eventPayload,
    })
  }

  return leadId
} 