import { NextRequest, NextResponse } from 'next/server'
import { getSlots } from '@/lib/cal/api'

export async function GET(req: NextRequest) {
  try {
    const u = new URL(req.url)
    const eventType = u.searchParams.get('eventType') || process.env.CAL_EVENT_TYPE
    if (!eventType) return NextResponse.json({ error: 'Missing eventType' }, { status: 400 })
    const tz = u.searchParams.get('tz') || Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'
    const start = u.searchParams.get('start') || new Date().toISOString()
    const end = u.searchParams.get('end') || new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString()

    console.log('Cal.com slots request:', { 
      eventType, 
      tz, 
      start, 
      end,
      CAL_EVENT_TYPE: process.env.CAL_EVENT_TYPE,
      CAL_USERNAME: process.env.CAL_USERNAME ? 'SET' : 'MISSING'
    })
    
    const slots = await getSlots({ eventType, start, end, timezone: tz })
    console.log('Cal.com slots response:', { slotsCount: slots.length, slots })
    
    return NextResponse.json({ slots })
  } catch (e: any) {
    console.error('Cal.com slots error:', e)
    return NextResponse.json({ error: e.message || 'Slots error' }, { status: 500 })
  }
}
