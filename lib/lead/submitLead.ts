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
    pain: raw.pain?.trim() || null,
    notes: raw.notes?.trim() || null,
    wants_demo: !!raw.wants_demo,
    source,
    ...utm,
  }

  const { data, error } = await supabase().from('leads').insert(insert).select('id').single()

  let leadId: string | undefined
  if (error && (error as any).code === '23505') {
    // duplicate email, look up existing lead
    const { data: existing } = await supabase().from('leads')
      .select('id')
      .eq('email', insert.email)
      .maybeSingle()
    leadId = existing?.id
  } else if (error) {
    console.error('Lead insert failed', error)
    throw error
  } else {
    leadId = data?.id
  }

  // Always insert an event
  if (leadId) {
    await supabase().from('lead_events').insert({
      lead_id: leadId,
      event_type: eventType || (raw.wants_demo ? 'demo_request' : 'download'),
      payload: insert,
    })
  }

  return leadId
} 