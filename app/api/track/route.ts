import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, videoId } = body

    // Log the tracking event to server console
    console.log(`[TRACKING] Event: ${event}, Video ID: ${videoId}, Timestamp: ${new Date().toISOString()}`)

    // TODO: Wire this to Mautic/n8n later
    // For now, just log to console

    return NextResponse.json({ 
      success: true, 
      message: 'Event tracked successfully',
      event,
      videoId,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error tracking event:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}
