import { NextRequest, NextResponse } from 'next/server'
import { mauticAPI, MAUTIC_FORMS, formatContactData } from '@/lib/mautic'

interface ResourceDownloadRequest {
  name: string
  email: string
  company: string
  region: string
  optIn: boolean
  resourceTitle: string
  resourceType: string
  downloadUrl: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ResourceDownloadRequest = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.company || !body.resourceTitle || !body.downloadUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format contact data for Mautic
    const contactData = formatContactData({
      name: body.name,
      email: body.email,
      company: body.company,
      region: body.region || '',
    })

    // Add custom fields for resource tracking
    contactData.resource_title = body.resourceTitle
    contactData.resource_type = body.resourceType
    contactData.download_url = body.downloadUrl
    contactData.lead_source = 'resource_download'
    contactData.lead_type = `${body.resourceType.toLowerCase()}_download`
    contactData.opt_in = body.optIn ? 'yes' : 'no'

    // Submit to Mautic (using NEWSLETTER form as fallback for generic resources)
    try {
      await mauticAPI.submitForm({
        formId: MAUTIC_FORMS.NEWSLETTER,
        contact: contactData,
        tags: ['resource-download', body.resourceType.toLowerCase(), 'sapphire-legal-ai']
      })
      console.log('Resource download lead submitted to Mautic:', body.email, body.resourceTitle)
    } catch (mauticError) {
      console.error('Mautic submission failed:', mauticError)
      // Continue even if Mautic fails - we still want to provide the download
    }

    // Return download URL
    return NextResponse.json({
      success: true,
      downloadUrl: body.downloadUrl,
      message: 'Resource download ready'
    })

  } catch (error) {
    console.error('Resource download API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 