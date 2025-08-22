import { NextRequest, NextResponse } from 'next/server'
import { getSlots, toISODate } from '@/lib/cal/api'

export async function GET(req: NextRequest) {
  try {
    const u = new URL(req.url)
    const tz = u.searchParams.get('tz') || 'America/New_York'
    const start = toISODate(u.searchParams.get('start') || new Date())
    const end = toISODate(u.searchParams.get('end') || new Date(Date.now() + 14*24*3600*1000))

    const slots = await getSlots({ start, end, timeZone: tz })
    return NextResponse.json({ slots })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Slots error' }, { status: 500 })
  }
}
