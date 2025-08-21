import { NextRequest, NextResponse } from 'next/server'
import { 
  ASSESSMENT_QUESTIONS, 
  ASSESSMENT_CATEGORIES, 
  AssessmentResult, 
  AssessmentSubmission 
} from '@/lib/assessment-data'
import { mauticAPI, MAUTIC_FORMS, formatContactData } from '@/lib/mautic'
import { generateSimpleAssessmentPDF } from '@/lib/simple-pdf-generator'
import { generateSpiderChartSVG } from '@/lib/spider-chart-generator'
import { emailService } from '@/lib/email-service'

// Mock OpenAI recommendations - in production, this would call OpenAI API
const getRecommendations = async (category: string, score: number): Promise<string[]> => {
  const recommendations: Record<string, Record<string, string[]>> = {
    strategy: {
      high: [
        "Develop a detailed AI implementation roadmap with specific milestones",
        "Establish AI governance committee with cross-functional representation",
        "Create success metrics and KPIs for AI initiatives",
        "Invest in AI education and training programs for leadership"
      ],
      medium: [
        "Define clear AI vision aligned with firm's strategic objectives",
        "Identify high-impact use cases for initial AI implementation",
        "Allocate dedicated budget for AI projects and initiatives",
        "Build stakeholder buy-in through pilot programs"
      ],
      low: [
        "Start with AI awareness and education sessions for leadership",
        "Conduct AI readiness assessment across all practice areas",
        "Research AI use cases relevant to your practice areas",
        "Develop preliminary AI strategy document"
      ]
    },
    data: {
      high: [
        "Implement advanced data governance and quality controls",
        "Establish data lineage and audit trails",
        "Deploy automated data validation and monitoring",
        "Create data catalog and metadata management system"
      ],
      medium: [
        "Standardize data formats and naming conventions",
        "Implement data backup and recovery procedures",
        "Establish data access controls and permissions",
        "Create data quality assessment framework"
      ],
      low: [
        "Audit and organize existing data repositories",
        "Implement basic document management system",
        "Establish data backup procedures",
        "Create data inventory and classification system"
      ]
    },
    technology: {
      high: [
        "Implement advanced cybersecurity and compliance measures",
        "Deploy scalable cloud infrastructure for AI workloads",
        "Establish API management and integration framework",
        "Implement monitoring and alerting systems"
      ],
      medium: [
        "Upgrade to cloud-based technology stack",
        "Implement robust cybersecurity measures",
        "Establish system integration capabilities",
        "Deploy modern development and deployment practices"
      ],
      low: [
        "Assess current technology infrastructure gaps",
        "Plan migration to cloud-based solutions",
        "Implement basic cybersecurity measures",
        "Establish IT support and maintenance procedures"
      ]
    },
    team: {
      high: [
        "Develop advanced AI training and certification programs",
        "Establish AI center of excellence",
        "Implement continuous learning and development programs",
        "Create AI innovation labs and experimentation spaces"
      ],
      medium: [
        "Provide AI fundamentals training for all staff",
        "Establish process improvement and optimization teams",
        "Implement change management and communication strategies",
        "Create learning and development programs"
      ],
      low: [
        "Conduct AI awareness and education sessions",
        "Identify and develop internal change champions",
        "Establish basic training and development programs",
        "Create culture of continuous learning"
      ]
    },
    implementation: {
      high: [
        "Implement advanced project management and governance",
        "Establish comprehensive change management framework",
        "Deploy automated monitoring and reporting systems",
        "Create continuous improvement and optimization processes"
      ],
      medium: [
        "Establish project management and governance procedures",
        "Implement structured change management processes",
        "Create measurement and tracking frameworks",
        "Develop communication and training strategies"
      ],
      low: [
        "Establish basic project management procedures",
        "Create change management communication plan",
        "Implement simple tracking and measurement systems",
        "Develop training and support procedures"
      ]
    }
  }

  const categoryRecs = recommendations[category]
  if (!categoryRecs) return ["Focus on improving this area through targeted initiatives"]

  let level: string
  if (score >= 80) level = 'high'
  else if (score >= 60) level = 'medium'
  else level = 'low'

  return categoryRecs[level] || categoryRecs.low
}

const calculateScores = (answers: Record<string, number>) => {
  const categoryScores: Record<string, { total: number; count: number }> = {}
  
  // Initialize category scores
  ASSESSMENT_CATEGORIES.forEach(category => {
    categoryScores[category.id] = { total: 0, count: 0 }
  })

  // Calculate scores for each category
  ASSESSMENT_QUESTIONS.forEach(question => {
    const answer = answers[question.id]
    if (answer !== undefined) {
      categoryScores[question.category].total += answer * question.weight
      categoryScores[question.category].count += question.weight
    }
  })

  // Convert to percentages and create results
  const results: AssessmentResult[] = []
  let totalScore = 0
  let maxTotalScore = 0

  ASSESSMENT_CATEGORIES.forEach(category => {
    const score = categoryScores[category.id]
    const maxScore = score.count * 5 // 5 is max Likert scale value
    const percentage = maxScore > 0 ? (score.total / maxScore) * 100 : 0
    
    totalScore += score.total
    maxTotalScore += maxScore

    results.push({
      category: category.name,
      score: score.total,
      maxScore,
      percentage,
      recommendations: [] // Will be populated by OpenAI
    })
  })

  return {
    results,
    totalScore,
    maxTotalScore,
    overallPercentage: maxTotalScore > 0 ? (totalScore / maxTotalScore) * 100 : 0
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, firm, answers } = body

    // Validate required fields
    if (!name || !email || !firm || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, firm, and answers are required' },
        { status: 400 }
      )
    }

    // Calculate scores
    const { results, totalScore, maxTotalScore, overallPercentage } = calculateScores(answers)

    // Generate recommendations for each category
    const resultsWithRecommendations = await Promise.all(
      results.map(async (result) => {
        const categoryId = ASSESSMENT_CATEGORIES.find(cat => cat.name === result.category)?.id || 'strategy'
        const recommendations = await getRecommendations(categoryId, result.percentage)
        return {
          ...result,
          recommendations
        }
      })
    )

    // Create assessment submission
    const assessmentSubmission: AssessmentSubmission = {
      name,
      email,
      firm,
      answers,
      results: resultsWithRecommendations,
      totalScore,
      maxTotalScore,
      overallPercentage
    }

    // Submit to Mautic (only if configured)
    if (process.env.MAUTIC_BASE_URL && process.env.MAUTIC_USERNAME && process.env.MAUTIC_PASSWORD) {
      try {
        const contactData = formatContactData({
          name,
          email,
          firm,
          assessment_score: Math.round(overallPercentage),
          assessment_completed: true
        })

        const submission = {
          formId: MAUTIC_FORMS.NEWSLETTER, // Using newsletter form for now
          contact: contactData,
          tags: ['assessment-completed', 'ai-readiness', 'sapphire-legal-ai'],
        }

        await mauticAPI.submitForm(submission)
        console.log('Assessment submitted to Mautic successfully')
      } catch (mauticError) {
        console.error('Mautic submission failed:', mauticError)
        // Continue with assessment processing even if Mautic fails
      }
    } else {
      console.log('Mautic not configured - skipping lead capture')
    }

    // Generate PDF report and send email
    try {
      const pdfBuffer = await generateSimpleAssessmentPDF(assessmentSubmission)
      
      // Send email with PDF attachment
      await emailService.sendAssessmentReport(assessmentSubmission, pdfBuffer)
      
      console.log('Assessment report sent successfully to:', email)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Continue even if email fails - user can still see results on screen
    }

    return NextResponse.json(assessmentSubmission)
  } catch (error) {
    console.error('Error processing assessment:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process assessment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 