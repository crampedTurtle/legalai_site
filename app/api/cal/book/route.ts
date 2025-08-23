import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import { createBooking } from '@/lib/cal/api'

export async function POST(req: NextRequest) {
  try {
    const { leadId, start, eventType, notes, tz, leadData } = await req.json()
    if (!leadId || !start) return NextResponse.json({ error: 'Missing leadId/start' }, { status: 400 })
    const eventTypeSlug = eventType || process.env.CAL_EVENT_TYPE
    if (!eventTypeSlug) return NextResponse.json({ error: 'Missing eventType' }, { status: 400 })

    const s = supabaseServer()
    const { data: lead, error } = await s
      .from('leads')
      .select('id,email,first_name,last_name,firm_name,notes,title,phone')
      .eq('id', leadId)
      .maybeSingle()
    if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

    // Update lead information if provided (for existing leads requesting demo again)
    if (leadData) {
      await s.from('leads').update({
        wants_demo: true,
        notes: leadData.notes || lead.notes,
        firm_name: leadData.firm_name || lead.firm_name,
        title: leadData.title || lead.title,
        phone: leadData.phone || lead.phone,
        updated_at: new Date().toISOString()
      }).eq('id', lead.id)
    }

    const name = [lead.first_name, lead.last_name].filter(Boolean).join(' ') || 'Guest'
    const timezone = tz || 'America/New_York'

    const booking = await createBooking({
      start,
      timeZone: timezone,
      name,
      email: lead.email,
      // previously we concatenated notes; now we pass it as metadata only
      notes, // optional: will be mapped to metadata.clientNote by createBooking
      metadata: { leadId: lead.id, firm: lead.firm_name || null },
    })

    const startIso = booking?.startTime || start
    const calId = booking?.id || booking?.uid || null
    const link = booking?.htmlLink || booking?.iCalUrl || booking?.rescheduleUrl || null

    await s.from('leads').update({
      status: 'scheduled',
      demo_datetime: startIso,
      cal_booking_id: calId,
      cal_event_url: link
    }).eq('id', lead.id)

    await s.from('lead_events').insert({
      lead_id: lead.id,
      event_type: 'demo_booked',
      source: 'cal_api',
      payload: {
        start: startIso,
        booking_id: calId,
        event_url: link,
        tz: timezone,
      },
    })

    return NextResponse.json({ ok: true, booking })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Book error' }, { status: 500 })
  }
}
