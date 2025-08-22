import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import { createBooking } from '@/lib/cal/api'

export async function POST(req: NextRequest) {
  try {
    const { leadId, start, eventType, notes, tz } = await req.json()
    if (!leadId || !start) return NextResponse.json({ error: 'Missing leadId/start' }, { status: 400 })
    const eventTypeSlug = eventType || process.env.CAL_EVENT_TYPE
    if (!eventTypeSlug) return NextResponse.json({ error: 'Missing eventType' }, { status: 400 })

    const s = supabaseServer()
    const { data: lead, error } = await s
      .from('leads')
      .select('id,email,first_name,last_name,firm_name,notes')
      .eq('id', leadId)
      .maybeSingle()
    if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

    const name = [lead.first_name, lead.last_name].filter(Boolean).join(' ') || 'Guest'
    const timezone = tz || 'America/New_York'

    const booking = await createBooking({
      eventType: eventTypeSlug,
      start,
      timezone,
      name,
      email: lead.email,
      notes: (lead.notes || '') + (notes ? `\n\nClient note: ${notes}` : ''),
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

    return NextResponse.json({ ok: true, booking })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Book error' }, { status: 500 })
  }
}
