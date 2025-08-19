import { NextRequest, NextResponse } from 'next/server'
import { mauticAPI, MAUTIC_FORMS, formatContactData } from '@/lib/mautic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      firm, 
      practiceArea, 
      message, 
      utm_source, 
      utm_medium, 
      utm_campaign 
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !firm) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email, and firm are required' },
        { status: 400 }
      )
    }

    // Format contact data for Mautic
    const contactData = formatContactData({
      firstName,
      lastName,
      email,
      firm,
      practiceArea,
      message,
    })

    // Submit to Mautic
    const submission = {
      formId: MAUTIC_FORMS.DEMO,
      contact: contactData,
      tags: ['demo-request', 'sapphire-legal-ai'],
      utm_source,
      utm_medium,
      utm_campaign,
    }

    const result = await mauticAPI.submitForm(submission)

    return NextResponse.json({
      success: true,
      message: 'Demo request submitted successfully',
      data: result,
    })
  } catch (error) {
    console.error('Error submitting demo request:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to submit demo request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 