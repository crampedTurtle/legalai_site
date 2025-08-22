const CAL_API_BASE = 'https://api.cal.com/v2'
const CAL_API_KEY = process.env.CAL_API_KEY!

function auth() {
  if (!CAL_API_KEY) throw new Error('CAL_API_KEY missing')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CAL_API_KEY}`,
  }
}

function slotsAuth() {
  if (!CAL_API_KEY) throw new Error('CAL_API_KEY missing')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CAL_API_KEY}`,
    'cal-api-version': '2024-09-04',
  }
}

function bookingAuth() {
  if (!CAL_API_KEY) throw new Error('CAL_API_KEY missing')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CAL_API_KEY}`,
    'cal-api-version': '2024-08-13',
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
  const username = process.env.CAL_USERNAME
  if (!username) throw new Error('CAL_USERNAME missing')
  
  const url = new URL(`${CAL_API_BASE}/slots`)
  url.searchParams.set('eventTypeSlug', params.eventType)
  url.searchParams.set('username', username)
  url.searchParams.set('start', params.start)
  url.searchParams.set('end', params.end)
  url.searchParams.set('timeZone', params.timezone)
  
  const res = await fetch(url, { headers: slotsAuth(), cache: 'no-store' })
  if (!res.ok) {
    const t = await res.text().catch(() => '')
    throw new Error(`getSlots ${res.status}: ${t}`)
  }
  const data = await res.json()
  
  // Cal.com v2 returns slots directly
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
  const username = process.env.CAL_USERNAME
  if (!username) throw new Error('CAL_USERNAME missing')
  
  const body = {
    eventTypeSlug: payload.eventType,
    username: username,
    start: payload.start,
    timeZone: payload.timezone,
    attendees: [{ name: payload.name, email: payload.email }],
    notes: payload.notes || '',
    metadata: payload.metadata || {},
  }
  const res = await fetch(`${CAL_API_BASE}/bookings`, {
    method: 'POST',
    headers: bookingAuth(),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const t = await res.text().catch(() => '')
    throw new Error(`createBooking ${res.status}: ${t}`)
  }
  return res.json()
}
