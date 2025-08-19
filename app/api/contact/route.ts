import { NextRequest, NextResponse } from 'next/server'
import { mauticAPI, MAUTIC_FORMS, formatContactData } from '@/lib/mautic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, firm, message, utm_source, utm_medium, utm_campaign } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      )
    }

    // Format contact data for Mautic
    const contactData = formatContactData({
      name,
      email,
      firm,
      message,
    })

    // Submit to Mautic
    const submission = {
      formId: MAUTIC_FORMS.CONTACT,
      contact: contactData,
      tags: ['contact-form', 'sapphire-legal-ai'],
      utm_source,
      utm_medium,
      utm_campaign,
    }

    const result = await mauticAPI.submitForm(submission)

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: result,
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to submit contact form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 