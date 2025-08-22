const CAL_API_BASE = 'https://api.cal.com/v2'
const CAL_API_KEY = process.env.CAL_API_KEY!
const CAL_USERNAME = process.env.CAL_USERNAME!
const CAL_EVENT_TYPE = process.env.CAL_EVENT_TYPE!
const CAL_EVENT_TYPE_ID = process.env.CAL_EVENT_TYPE_ID // optional numeric/string id

function hdrSlots() {
  if (!CAL_API_KEY) throw new Error('CAL_API_KEY missing')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CAL_API_KEY}`,
    'cal-api-version': '2024-09-04', // required for /v2/slots
  }
}
function hdrBookings() {
  if (!CAL_API_KEY) throw new Error('CAL_API_KEY missing')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CAL_API_KEY}`,
    'cal-api-version': '2024-08-13', // required for /v2/bookings
  }
}

// date → 'YYYY-MM-DD' (Cal prefers date boundaries for slots)
export function toISODate(d: Date | string) {
  const dt = typeof d === 'string' ? new Date(d) : d
  const y = dt.getUTCFullYear()
  const m = String(dt.getUTCMonth() + 1).padStart(2,'0')
  const day = String(dt.getUTCDate()).padStart(2,'0')
  return `${y}-${m}-${day}`
}

// Flatten Cal's date-keyed slots object to array
function flattenSlots(payload: any) {
  const data = payload?.data ?? payload
  const days = Array.isArray(data) ? data : Object.values(data || {})
  return days.flat().map((s: any) => ({
    start: s.start ?? s.startTime,
    end: s.end ?? s.endTime,
  }))
}

export async function getSlots(params?: {
  start?: string
  end?: string
  timeZone?: string
  username?: string
  eventTypeSlug?: string
  eventTypeId?: string | number
}) {
  const username = params?.username || CAL_USERNAME
  const timeZone = params?.timeZone || 'America/New_York'
  const start = toISODate(params?.start || new Date())
  const end = toISODate(params?.end || new Date(Date.now() + 14*24*3600*1000))
  const eventTypeSlug = params?.eventTypeSlug || CAL_EVENT_TYPE
  const eventTypeId = params?.eventTypeId || CAL_EVENT_TYPE_ID

  const url = new URL(`${CAL_API_BASE}/slots`)
  url.searchParams.set('username', username)
  url.searchParams.set('start', start)       // date-only
  url.searchParams.set('end', end)           // date-only
  url.searchParams.set('timeZone', timeZone)

  // Prefer id if provided; else slug
  if (eventTypeId) url.searchParams.set('eventTypeId', String(eventTypeId))
  else url.searchParams.set('eventTypeSlug', eventTypeSlug)

  const res = await fetch(url, { headers: hdrSlots(), cache: 'no-store' })
  if (!res.ok) throw new Error(`getSlots ${res.status}: ${await res.text()}`)
  return flattenSlots(await res.json())
}

export async function createBooking(payload: {
  start: string            // ISO (UTC)
  timeZone: string
  name: string
  email: string
  // notes?: string   // <-- keep in type if you want, but we won't send it to Cal
  notes?: string
  metadata?: Record<string, any>
  username?: string
  eventTypeSlug?: string
  eventTypeId?: string | number
}) {
  const body: any = {
    start: payload.start,
    attendee: { name: payload.name, email: payload.email, timeZone: payload.timeZone },
    // ❌ DO NOT include `notes` at top-level for Cal v2
    // notes: payload.notes || '',
    metadata: { ...(payload.metadata || {}), ...(payload.notes ? { clientNote: payload.notes } : {}) },
    username: payload.username || CAL_USERNAME,
  }
  if (payload.eventTypeId || CAL_EVENT_TYPE_ID) {
    body.eventTypeId = String(payload.eventTypeId || CAL_EVENT_TYPE_ID)
  } else {
    body.eventTypeSlug = payload.eventTypeSlug || CAL_EVENT_TYPE
  }

  const res = await fetch(`${CAL_API_BASE}/bookings`, {
    method: 'POST',
    headers: hdrBookings(),
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`createBooking ${res.status}: ${await res.text()}`)
  return res.json()
}
