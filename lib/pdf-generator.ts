import PDFDocument from 'pdfkit'
import { AssessmentSubmission, ASSESSMENT_CATEGORIES } from './assessment-data'
import { generateSpiderChartSVG } from './spider-chart-generator'

// Helper function to create spider chart as base64 image
const createSpiderChartImage = (results: AssessmentSubmission['results']): string => {
  // This would generate a canvas-based spider chart and return as base64
  // For now, we'll create a placeholder - in production, use Chart.js or similar
  const canvas = document.createElement('canvas')
  canvas.width = 400
  canvas.height = 400
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    // Draw spider chart
    const centerX = 200
    const centerY = 200
    const radius = 150
    const numCategories = results.length

    // Background circles
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 1
    for (let i = 1; i <= 5; i++) {
      const circleRadius = (radius * i) / 5
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Category lines
    ctx.strokeStyle = '#4B5563'
    ctx.lineWidth = 1
    for (let i = 0; i < numCategories; i++) {
      const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    // Data points and fill
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
    ctx.strokeStyle = '#3B82F6'
    ctx.lineWidth = 2

    ctx.beginPath()
    for (let i = 0; i < numCategories; i++) {
      const result = results[i]
      const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
      const scoreRadius = (radius * result.percentage) / 100
      const x = centerX + scoreRadius * Math.cos(angle)
      const y = centerY + scoreRadius * Math.sin(angle)
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Data points
    ctx.fillStyle = '#3B82F6'
    for (let i = 0; i < numCategories; i++) {
      const result = results[i]
      const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
      const scoreRadius = (radius * result.percentage) / 100
      const x = centerX + scoreRadius * Math.cos(angle)
      const y = centerY + scoreRadius * Math.sin(angle)
      
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    }

    // Category labels
    ctx.fillStyle = '#1F2937'
    ctx.font = '12px Inter, sans-serif'
    ctx.textAlign = 'center'
    for (let i = 0; i < numCategories; i++) {
      const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
      const labelRadius = radius + 20
      const x = centerX + labelRadius * Math.cos(angle)
      const y = centerY + labelRadius * Math.sin(angle)
      
      ctx.fillText(results[i].category, x, y + 4)
    }
  }

  return canvas.toDataURL('image/png')
}

export async function generateAssessmentPDF(assessment: AssessmentSubmission): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 50,
          bottom: 80,
          left: 50,
          right: 50
        }
      })

      const chunks: Buffer[] = []
      doc.on('data', (chunk) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))

      // Helper function to add footer
      const addFooter = (pageNumber?: number) => {
        const currentY = doc.page.margins.bottom - 30
        doc.fontSize(10)
          .font('Helvetica')
          .fillColor('#6B7280')
          .text('Sapphire Legal AI | Private AI for Law Firms', 50, currentY, { align: 'center' })
        doc.text('www.sapphirelegal.ai', 50, currentY + 15, { align: 'center' })
        doc.text('Confidential — For Internal Use Only', 50, currentY + 30, { align: 'center' })
        
        if (pageNumber) {
          doc.text(`Page ${pageNumber}`, 50, currentY + 30, { align: 'right' })
        }
      }

      // Helper function to add gradient background
      const addGradientBackground = () => {
        // Create gradient effect with rectangles
        for (let i = 0; i < 10; i++) {
          const alpha = 0.02 - (i * 0.002)
          doc.rect(0, 0, doc.page.width, doc.page.height)
            .fillColor(`rgba(59, 130, 246, ${alpha})`)
            .fill()
        }
      }

      // Page 1: Cover Page
      addGradientBackground()
      
      // Logo placeholder (in production, embed actual logo)
      doc.fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('#3B82F6')
        .text('SAPPHIRE LEGAL AI', { align: 'center' })
      
      doc.moveDown(3)
      
      doc.fontSize(32)
        .font('Helvetica-Bold')
        .fillColor('#1F2937')
        .text('AI Readiness Assessment Report', { align: 'center' })
      
      doc.moveDown(1)
      doc.fontSize(16)
        .font('Helvetica')
        .fillColor('#6B7280')
        .text('Confidential Findings & Recommendations', { align: 'center' })
      
      doc.moveDown(4)
      
      // Firm information
      doc.fontSize(14)
        .font('Helvetica-Bold')
        .fillColor('#374151')
        .text('Prepared for:', { align: 'center' })
      
      doc.moveDown(0.5)
      doc.fontSize(18)
        .font('Helvetica-Bold')
        .fillColor('#1F2937')
        .text(assessment.firm, { align: 'center' })
      
      doc.moveDown(0.5)
      doc.fontSize(14)
        .font('Helvetica')
        .fillColor('#6B7280')
        .text(assessment.name, { align: 'center' })
      
      doc.moveDown(2)
      doc.fontSize(12)
        .font('Helvetica')
        .fillColor('#6B7280')
        .text(`Assessment Date: ${new Date().toLocaleDateString()}`, { align: 'center' })
      
      addFooter()

      // Page 2: Executive Summary
      doc.addPage()
      
      doc.fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('#1F2937')
        .text('Executive Summary')
      
      doc.moveDown(1)
      doc.fontSize(12)
        .font('Helvetica')
        .fillColor('#374151')
        .text('Based on your responses, this report highlights your organization\'s current AI readiness across 5 key areas: Strategy, Data, Technology, Team, and Change Management. Each section includes a score, visual benchmarking, and tailored recommendations.')
      
      doc.moveDown(2)
      
      // Overall Score Box
      const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return '#10B981' // green
        if (percentage >= 60) return '#F59E0B' // yellow
        return '#EF4444' // red
      }
      
      const getScoreLabel = (percentage: number) => {
        if (percentage >= 80) return 'Strong'
        if (percentage >= 60) return 'Developing'
        return 'Needs Attention'
      }
      
      const overallColor = getScoreColor(assessment.overallPercentage)
      const overallLabel = getScoreLabel(assessment.overallPercentage)
      
      // Overall score box
      doc.rect(50, doc.y, 200, 60)
        .fillColor(overallColor)
        .fill()
        .strokeColor(overallColor)
        .lineWidth(2)
        .stroke()
      
      doc.fontSize(16)
        .font('Helvetica-Bold')
        .fillColor('white')
        .text('Overall Score', 60, doc.y + 10)
      
      doc.fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('white')
        .text(`${Math.round(assessment.overallPercentage)}%`, 60, doc.y + 30)
      
      doc.fontSize(12)
        .font('Helvetica')
        .fillColor('white')
        .text(overallLabel, 60, doc.y + 50)
      
      doc.moveDown(4)
      
      // Category score boxes
      const categoryBoxes = assessment.results.map((result, index) => {
        const color = getScoreColor(result.percentage)
        const label = getScoreLabel(result.percentage)
        const x = 50 + (index % 2) * 250
        const y = doc.y + (Math.floor(index / 2) * 80)
        
        doc.rect(x, y, 200, 60)
          .fillColor(color)
          .fill()
          .strokeColor(color)
          .lineWidth(2)
          .stroke()
        
        doc.fontSize(12)
          .font('Helvetica-Bold')
          .fillColor('white')
          .text(result.category, x + 10, y + 10)
        
        doc.fontSize(18)
          .font('Helvetica-Bold')
          .fillColor('white')
          .text(`${Math.round(result.percentage)}%`, x + 10, y + 30)
        
        doc.fontSize(10)
          .font('Helvetica')
          .fillColor('white')
          .text(label, x + 10, y + 50)
        
        return { x, y, width: 200, height: 60 }
      })
      
      doc.moveDown(6)
      
      addFooter(2)

      // Page 3: Spider Chart
      doc.addPage()
      
      doc.fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('#1F2937')
        .text('Assessment Results Overview')
      
      doc.moveDown(1)
      doc.fontSize(12)
        .font('Helvetica')
        .fillColor('#374151')
        .text('The spider chart below visualizes your performance across all five assessment categories. Areas closer to the center indicate areas needing attention, while areas extending outward show strengths.')
      
      doc.moveDown(2)
      
      // Generate and embed spider chart
      try {
        const svg = generateSpiderChartSVG(assessment.results)
        
        // For now, we'll create a placeholder since PDFKit doesn't directly support SVG
        // In production, you'd convert SVG to PNG/JPEG and embed the image
        doc.rect(100, doc.y, 300, 300)
          .fillColor('#F3F4F6')
          .fill()
          .strokeColor('#D1D5DB')
          .lineWidth(1)
          .stroke()
        
        doc.fontSize(14)
          .font('Helvetica-Bold')
          .fillColor('#6B7280')
          .text('Spider Chart Visualization', 250, doc.y + 140, { align: 'center' })
        
        doc.fontSize(12)
          .font('Helvetica')
          .fillColor('#6B7280')
          .text('(Chart showing category performance)', 250, doc.y + 160, { align: 'center' })
        
        // TODO: In production, convert SVG to image and embed:
        // const imageBuffer = await convertSVGToImage(svg)
        // doc.image(imageBuffer, 100, doc.y, { width: 300, height: 300 })
      } catch (error) {
        console.error('Failed to generate spider chart:', error)
        // Fallback to placeholder
        doc.rect(100, doc.y, 300, 300)
          .fillColor('#F3F4F6')
          .fill()
          .strokeColor('#D1D5DB')
          .lineWidth(1)
          .stroke()
        
        doc.fontSize(14)
          .font('Helvetica-Bold')
          .fillColor('#6B7280')
          .text('Spider Chart Visualization', 250, doc.y + 140, { align: 'center' })
      }
      
      doc.moveDown(8)
      
      // Overall readiness rating
      const readinessLevel = assessment.overallPercentage >= 80 ? 'Mature' : 
                           assessment.overallPercentage >= 60 ? 'Developing' : 'Emerging'
      
      doc.fontSize(16)
        .font('Helvetica-Bold')
        .fillColor('#1F2937')
        .text(`Overall Readiness Rating: ${readinessLevel}`)
      
      addFooter(3)

      // Page 4+: Detailed Findings
      assessment.results.forEach((result, index) => {
        doc.addPage()
        
        doc.fontSize(20)
          .font('Helvetica-Bold')
          .fillColor('#1F2937')
          .text(`${index + 1}. ${result.category}`)
        
        doc.moveDown(1)
        
        // Score visualization
        const scoreBarWidth = 200
        const scoreBarHeight = 20
        const scorePercentage = result.percentage / 100
        
        // Background bar
        doc.rect(50, doc.y, scoreBarWidth, scoreBarHeight)
          .fillColor('#E5E7EB')
          .fill()
          .strokeColor('#D1D5DB')
          .lineWidth(1)
          .stroke()
        
        // Score bar
        doc.rect(50, doc.y, scoreBarWidth * scorePercentage, scoreBarHeight)
          .fillColor(getScoreColor(result.percentage))
          .fill()
        
        doc.fontSize(14)
          .font('Helvetica-Bold')
          .fillColor('#374151')
          .text(`Score: ${Math.round(result.percentage)}%`, 260, doc.y + 2)
        
        doc.moveDown(2)
        
        // What This Means
        doc.fontSize(14)
          .font('Helvetica-Bold')
          .fillColor('#1F2937')
          .text('What This Means:')
        
        doc.moveDown(0.5)
        doc.fontSize(12)
          .font('Helvetica')
          .fillColor('#374151')
          .text(getCategoryExplanation(result.category, result.percentage))
        
        doc.moveDown(1.5)
        
        // Top Recommendations
        doc.fontSize(14)
          .font('Helvetica-Bold')
          .fillColor('#1F2937')
          .text('Top Recommendations:')
        
        doc.moveDown(0.5)
        result.recommendations.slice(0, 3).forEach((rec, recIndex) => {
          doc.fontSize(12)
            .font('Helvetica')
            .fillColor('#374151')
            .text(`• ${rec}`)
          doc.moveDown(0.3)
        })
        
        addFooter(4 + index)
      })

      // Final Page: Next Steps
      doc.addPage()
      
      doc.fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('#1F2937')
        .text('Next Steps')
      
      doc.moveDown(1)
      doc.fontSize(12)
        .font('Helvetica')
        .fillColor('#374151')
        .text('Based on your assessment results, here are the recommended next steps to accelerate your AI adoption journey:')
      
      doc.moveDown(2)
      
      const nextSteps = [
        'Review and prioritize recommendations from each category',
        'Develop a 90-day action plan focusing on your lowest-scoring areas',
        'Schedule a consultation with our AI implementation team',
        'Begin with pilot programs in high-impact, low-risk areas',
        'Establish regular progress reviews and milestone tracking'
      ]
      
      nextSteps.forEach((step, index) => {
        doc.fontSize(12)
          .font('Helvetica-Bold')
          .fillColor('#1F2937')
          .text(`${index + 1}. ${step}`)
        doc.moveDown(0.5)
      })
      
      doc.moveDown(3)
      
      // Call to Action
      doc.rect(50, doc.y, 500, 100)
        .fillColor('#F3F4F6')
        .fill()
        .strokeColor('#D1D5DB')
        .lineWidth(1)
        .stroke()
      
      doc.fontSize(16)
        .font('Helvetica-Bold')
        .fillColor('#1F2937')
        .text('Ready to Get Started?', 70, doc.y + 20)
      
      doc.fontSize(12)
        .font('Helvetica')
        .fillColor('#374151')
        .text('Schedule a 30-minute consultation with Sapphire Legal AI to review your results and discuss implementation strategies.', 70, doc.y + 45)
      
      doc.fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#3B82F6')
        .text('Request a Demo: sapphirelegal.ai/demo', 70, doc.y + 70)
      
      doc.fontSize(12)
        .font('Helvetica')
        .fillColor('#374151')
        .text('Contact: info@sapphirelegal.ai', 70, doc.y + 85)
      
      addFooter(4 + assessment.results.length)

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

// Helper function to generate category explanations
function getCategoryExplanation(category: string, percentage: number): string {
  const explanations: Record<string, Record<string, string>> = {
    'AI Strategy & Vision': {
      high: 'Your firm demonstrates strong strategic alignment and clear vision for AI adoption with leadership commitment and defined objectives.',
      medium: 'Your firm has initial alignment on AI but lacks formal strategy and comprehensive leadership sponsorship.',
      low: 'Your firm needs to establish clear AI strategy and vision with leadership buy-in and defined objectives.'
    },
    'Data Readiness & Quality': {
      high: 'Your firm has excellent data infrastructure with robust governance, quality controls, and organized data management.',
      medium: 'Your firm has basic data infrastructure but needs improved governance and quality control procedures.',
      low: 'Your firm needs to establish data governance policies and improve data organization and quality.'
    },
    'Technology Infrastructure': {
      high: 'Your firm has modern, scalable technology infrastructure with strong cybersecurity and integration capabilities.',
      medium: 'Your firm has adequate technology infrastructure but needs upgrades for AI workloads and security.',
      low: 'Your firm needs to modernize technology infrastructure and implement robust cybersecurity measures.'
    },
    'Team Capabilities & Skills': {
      high: 'Your team demonstrates strong AI knowledge and adaptability with a culture of continuous learning.',
      medium: 'Your team has basic AI awareness but needs additional training and development programs.',
      low: 'Your team needs AI education and training programs to build capabilities and change management skills.'
    },
    'Implementation & Change Management': {
      high: 'Your firm has excellent change management processes and experience implementing new technologies successfully.',
      medium: 'Your firm has basic implementation experience but needs structured change management processes.',
      low: 'Your firm needs to establish project management and change management procedures for successful AI adoption.'
    }
  }

  const categoryExplanations = explanations[category]
  if (!categoryExplanations) return 'This area requires attention and strategic planning.'

  let level: string
  if (percentage >= 80) level = 'high'
  else if (percentage >= 60) level = 'medium'
  else level = 'low'

  return categoryExplanations[level] || categoryExplanations.low
} 