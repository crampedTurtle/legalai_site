import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from 'pdf-lib'
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
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()
    
    // Embed standard fonts
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    
    // Helper function to draw text with word wrapping
    const drawWrappedText = (
      page: PDFPage, 
      text: string, 
      x: number, 
      y: number, 
      maxWidth: number, 
      fontSize: number, 
      font: PDFFont,
      color = rgb(0.2, 0.2, 0.2)
    ): number => {
      const words = text.split(' ')
      let currentLine = ''
      let currentY = y
      const lineHeight = fontSize * 1.2

      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word
        const testWidth = font.widthOfTextAtSize(testLine, fontSize)
        
        if (testWidth > maxWidth && currentLine) {
          page.drawText(currentLine, {
            x,
            y: currentY,
            size: fontSize,
            font,
            color
          })
          currentLine = word
          currentY -= lineHeight
        } else {
          currentLine = testLine
        }
      }
      
      if (currentLine) {
        page.drawText(currentLine, {
          x,
          y: currentY,
          size: fontSize,
          font,
          color
        })
        currentY -= lineHeight
      }
      
      return currentY
    }

    // Create the first page
    const page = pdfDoc.addPage([612, 792]) // Letter size
    const { width, height } = page.getSize()
    let currentY = height - 80

    // Title
    page.drawText("AI Readiness Assessment Report", {
      x: 50,
      y: currentY,
      size: 24,
      font: helveticaBold,
      color: rgb(0.12, 0.16, 0.23)
    })

    currentY -= 60

    // Company Information
    page.drawText("Company Information", {
      x: 50,
      y: currentY,
      size: 16,
      font: helveticaBold,
      color: rgb(0.12, 0.16, 0.23)
    })

    currentY -= 30
    page.drawText(`Company Name: ${assessment.firm}`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helvetica,
      color: rgb(0.22, 0.26, 0.32)
    })

    currentY -= 20
    page.drawText(`Contact: ${assessment.name}`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helvetica,
      color: rgb(0.22, 0.26, 0.32)
    })

    currentY -= 20
    page.drawText(`Email: ${assessment.email}`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helvetica,
      color: rgb(0.22, 0.26, 0.32)
    })

    currentY -= 40

    // Assessment Results
    page.drawText("Assessment Results", {
      x: 50,
      y: currentY,
      size: 16,
      font: helveticaBold,
      color: rgb(0.12, 0.16, 0.23)
    })

    currentY -= 30

    // For now, we'll create a placeholder since PDFKit doesn't directly support SVG
    // In a real implementation, you'd convert the SVG to a PNG or use a different approach
    page.drawText("Spider Chart Visualization", {
      x: 50,
      y: currentY,
      size: 14,
      font: helveticaBold,
      color: rgb(0.12, 0.16, 0.23)
    })

    currentY -= 30

    // Display results in a table format
    assessment.results.forEach((result, index) => {
      const category = ASSESSMENT_CATEGORIES.find(cat => cat.id === result.category)
      const categoryName = category ? category.name : result.category

      page.drawText(`${categoryName}:`, {
        x: 50,
        y: currentY,
        size: 12,
        font: helveticaBold,
        color: rgb(0.12, 0.16, 0.23)
      })

      currentY -= 20
      page.drawText(`Score: ${result.score}/5 (${result.percentage}%)`, {
        x: 70,
        y: currentY,
        size: 11,
        font: helvetica,
        color: rgb(0.22, 0.26, 0.32)
      })

      currentY -= 15
      currentY = drawWrappedText(
        page,
        `Recommendations: ${result.recommendations.join(', ')}`,
        70,
        currentY,
        width - 120,
        10,
        helvetica,
        rgb(0.4, 0.45, 0.55)
      )

      currentY -= 20
    })

    // Overall Score
    currentY -= 20
    page.drawText("Overall Assessment", {
      x: 50,
      y: currentY,
      size: 16,
      font: helveticaBold,
      color: rgb(0.12, 0.16, 0.23)
    })

    currentY -= 30
    page.drawText(`Total Score: ${assessment.totalScore}/${assessment.maxTotalScore}`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaBold,
      color: rgb(0.12, 0.16, 0.23)
    })

    currentY -= 20
    page.drawText(`Overall Percentage: ${assessment.overallPercentage}%`, {
      x: 50,
      y: currentY,
      size: 12,
      font: helveticaBold,
      color: rgb(0.12, 0.16, 0.23)
    })

    // Footer
    currentY -= 40
    page.drawText("Generated by Sapphire Legal AI", {
      x: 50,
      y: currentY,
      size: 10,
      font: helvetica,
      color: rgb(0.4, 0.45, 0.55)
    })

    currentY -= 15
    page.drawText(`Report generated on: ${new Date().toLocaleDateString()}`, {
      x: 50,
      y: currentY,
      size: 10,
      font: helvetica,
      color: rgb(0.4, 0.45, 0.55)
    })

    // Save the PDF
    const pdfBytes = await pdfDoc.save()
    return Buffer.from(pdfBytes)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
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