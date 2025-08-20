import { NextRequest, NextResponse } from 'next/server'
import { mauticAPI, MAUTIC_FORMS } from '@/lib/mautic'

interface SecurityWhitepaperRequest {
  name: string
  email: string
  company: string
  region: string
  optIn: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: SecurityWhitepaperRequest = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Prepare contact data for Mautic
    const contactData = {
      firstname: body.name.split(' ')[0] || body.name,
      lastname: body.name.split(' ').slice(1).join(' ') || '',
      email: body.email,
      company: body.company,
      region: body.region || '',
      // Custom fields for tracking
      lead_source: 'security_whitepaper',
      lead_type: 'security_whitepaper_download',
      opt_in: body.optIn ? 'yes' : 'no'
    }

    // Submit to Mautic
    try {
      await mauticAPI.submitForm({
        formId: MAUTIC_FORMS.SECURITY_WHITEPAPER,
        contact: contactData,
        tags: ['security-whitepaper', 'lead']
      })
      console.log('Security whitepaper lead submitted to Mautic:', body.email)
    } catch (mauticError) {
      console.error('Mautic submission failed:', mauticError)
      // Continue even if Mautic fails - we still want to provide the download
    }

    // TODO: Send confirmation email via SES (commented example)
    /*
    try {
      const emailService = new EmailService()
      await emailService.sendWhitepaperConfirmation({
        to: body.email,
        name: body.name,
        company: body.company,
        downloadUrl: '/docs/security_whitepaper.pdf'
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
    }
    */

    // Return download URL
    return NextResponse.json({
      success: true,
      downloadUrl: '/docs/security_whitepaper.pdf',
      message: 'Whitepaper download ready'
    })

  } catch (error) {
    console.error('Security whitepaper API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 