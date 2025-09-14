import { NextRequest, NextResponse } from 'next/server'
import { mauticAPI, MAUTIC_FORMS } from '@/lib/mautic'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      firm: String(formData.get('firm') || ''),
      persona: String(formData.get('persona') || ''),
      pain: String(formData.get('pain') || ''),
      source: 'website_modal',
    }

    // Validate required fields
    if (!payload.name || !payload.email) {
      return NextResponse.json(
        { error: 'Missing required fields: name and email are required' },
        { status: 400 }
      )
    }

    // Prepare contact data for Mautic
    const contactData = {
      firstname: payload.name.split(' ')[0] || payload.name,
      lastname: payload.name.split(' ').slice(1).join(' ') || '',
      email: payload.email,
      company: payload.firm,
      // Custom fields for tracking
      lead_source: 'demo_request',
      lead_type: 'demo_modal',
      persona: payload.persona,
      primary_pain: payload.pain,
      opt_in: 'yes'
    }

    // Submit to Mautic
    try {
      await mauticAPI.submitForm({
        formId: MAUTIC_FORMS.DEMO,
        contact: contactData,
        tags: ['demo-request', 'sapphire-legal-ai', payload.persona ? `persona-${payload.persona}` : 'no-persona']
      })
      console.log('Demo request submitted to Mautic:', payload.email, 'Persona:', payload.persona)
    } catch (mauticError) {
      console.error('Mautic submission failed:', mauticError)
      // Continue even if Mautic fails - we still want to redirect to thank you
    }

    // Redirect to thank you page
    return NextResponse.redirect(new URL('/thank-you', request.url), { status: 303 })

  } catch (error) {
    console.error('Demo request API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
