import { NextRequest, NextResponse } from 'next/server'
import { generateRecommendations } from '@/lib/assessment/openai'
import { renderRadarBase64, computeCategoryAverages } from '@/lib/assessment/chart'
import { buildReportPDF } from '@/lib/assessment/pdf'
import { AssessmentPayload } from '@/lib/assessment/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { firm, scores, questions, thresholds, requirements, brand, name, email } = body
    
    if (!firm?.name || !scores || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: firm.name, scores, name, and email are required' },
        { status: 400 }
      )
    }

    // Validate scores structure
    const requiredCategories = ['strategy', 'data', 'technology', 'team', 'change']
    for (const category of requiredCategories) {
      if (typeof scores[category] !== 'number' || scores[category] < 0 || scores[category] > 5) {
        return NextResponse.json(
          { error: `Invalid score for ${category}. Must be a number between 0 and 5.` },
          { status: 400 }
        )
      }
    }

    // Build the payload for OpenAI
    const payload: AssessmentPayload = {
      firm,
      scores,
      questions: questions || [],
      thresholds: thresholds || {
        emerging: 1.5,
        developing: 3.5,
        mature: 5.0
      },
      requirements: requirements || {
        compliance: [],
        security: [],
        integration: []
      },
      brand: brand || {
        name: "Sapphire Legal AI",
        values: ["Privacy-first", "Security", "Compliance"]
      },
      name,
      email
    }

    // Step 1: Generate recommendations with OpenAI
    console.log('Generating recommendations with OpenAI...')
    const recommendations = await generateRecommendations(payload)
    
    // Step 2: Generate radar chart
    console.log('Generating radar chart...')
    const chartData = computeCategoryAverages(scores)
    const chartBase64 = await renderRadarBase64(chartData)
    
    // Step 3: Build PDF report
    console.log('Building PDF report...')
    const { bufferBase64: pdfBase64 } = await buildReportPDF({
      firm,
      scores,
      recommendations,
      chartBase64
    })

    // Step 4: Optional - Upsert to Mautic (if configured)
    if (process.env.MAUTIC_BASE_URL && process.env.MAUTIC_API_USERNAME && process.env.MAUTIC_API_PASSWORD) {
      try {
        // Import Mautic functions dynamically to avoid issues if not configured
        const { mauticAPI, formatContactData } = await import('@/lib/mautic')
        
        const contactData = formatContactData({
          name,
          email,
          firm: firm.name,
          assessment_score: Math.round(recommendations.overall.score),
          assessment_completed: true,
          assessment_level: recommendations.overall.level.toLowerCase()
        })

        const submission = {
          formId: 8, // Assessment form ID
          contact: contactData,
          tags: ['assessment-completed', 'ai-readiness', 'sapphire-legal-ai', 'asset:assessment_report'],
        }

        await mauticAPI.submitForm(submission)
        console.log('Assessment data submitted to Mautic successfully')
      } catch (mauticError) {
        console.error('Mautic submission failed:', mauticError)
        // Continue with assessment processing even if Mautic fails
      }
    } else {
      console.log('Mautic not configured - skipping lead capture')
    }

    // Return the PDF and recommendations
    return NextResponse.json({
      pdfBase64,
      recommendations,
      success: true
    })

  } catch (error) {
    console.error('Error generating assessment report:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate assessment report',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 