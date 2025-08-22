const CAL_API_BASE = 'https://api.cal.com/v2'
const CAL_API_KEY = process.env.CAL_API_KEY!

function auth() {
  if (!CAL_API_KEY) throw new Error('CAL_API_KEY missing')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CAL_API_KEY}`,
  }
}

/**
 * Get slots for an event type slug in a time window.
 * Returns [{ start: ISO, end: ISO }]
 */
export async function getSlots(params: {
  eventType: string
  start: string
  end: string
  timezone: string
}) {
  const url = new URL(`${CAL_API_BASE}/availability/slots`)
  url.searchParams.set('eventTypeSlug', params.eventType)
  url.searchParams.set('startTime', params.start)
  url.searchParams.set('endTime', params.end)
  url.searchParams.set('timeZone', params.timezone)
  const res = await fetch(url, { headers: auth(), cache: 'no-store' })
  if (!res.ok) {
    const t = await res.text().catch(() => '')
    throw new Error(`getSlots ${res.status}: ${t}`)
  }
  const data = await res.json()
  // Normalize: API may return { slots: [...] } or direct array depending on version
  const slots = Array.isArray(data) ? data : data?.slots || []
  return slots.map((s: any) => ({ start: s.start ?? s.startTime, end: s.end ?? s.endTime }))
}

/**
 * Book a slot by event type slug and start time.
 */
export async function createBooking(payload: {
  eventType: string
  start: string
  timezone: string
  name: string
  email: string
  notes?: string
  metadata?: Record<string, any>
}) {
  const body = {
    eventTypeSlug: payload.eventType,
    start: payload.start,
    timeZone: payload.timezone,
    attendees: [{ name: payload.name, email: payload.email }],
    notes: payload.notes || '',
    metadata: payload.metadata || {},
  }
  const res = await fetch(`${CAL_API_BASE}/bookings`, {
    method: 'POST',
    headers: auth(),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const t = await res.text().catch(() => '')
    throw new Error(`createBooking ${res.status}: ${t}`)
  }
  return res.json()
}
