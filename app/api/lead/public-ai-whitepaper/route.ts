import { NextRequest, NextResponse } from 'next/server'
import { mauticAPI, MAUTIC_FORMS } from '@/lib/mautic'

interface PublicAIWhitepaperRequest {
  name: string
  email: string
  company: string
  region: string
  optIn: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: PublicAIWhitepaperRequest = await request.json()
    
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
      lead_source: 'public_ai_whitepaper',
      lead_type: 'public_ai_whitepaper_download',
      opt_in: body.optIn ? 'yes' : 'no'
    }

    // Submit to Mautic
    try {
      await mauticAPI.submitForm({
        formId: MAUTIC_FORMS.PUBLIC_AI_WHITEPAPER,
        contact: contactData,
        tags: ['public-ai-whitepaper', 'lead']
      })
      console.log('Public AI Whitepaper lead submitted to Mautic:', body.email)
    } catch (mauticError) {
      console.error('Mautic submission failed:', mauticError)
      // Continue even if Mautic fails - we still want to provide the download
    }

    // Return download URL
    return NextResponse.json({
      success: true,
      downloadUrl: '/docs/sapphire_why_public_ai_put_firms_at_risk.pdf',
      message: 'Public AI Whitepaper download ready'
    })

  } catch (error) {
    console.error('Public AI Whitepaper API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 