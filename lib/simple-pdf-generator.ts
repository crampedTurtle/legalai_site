import PDFDocument from 'pdfkit'
import { AssessmentSubmission } from './assessment-data'

export async function generateSimpleAssessmentPDF(assessment: AssessmentSubmission): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50
        }
      })

      const chunks: Buffer[] = []
      doc.on('data', (chunk) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))

      // Page 1: Cover
      doc.fontSize(24)
        .text('SAPPHIRE LEGAL AI', { align: 'center' })
      
      doc.moveDown(2)
      
      doc.fontSize(32)
        .text('AI Readiness Assessment Report', { align: 'center' })
      
      doc.moveDown(1)
      doc.fontSize(16)
        .text('Confidential Findings & Recommendations', { align: 'center' })
      
      doc.moveDown(4)
      
      doc.fontSize(14)
        .text('Prepared for:', { align: 'center' })
      
      doc.moveDown(0.5)
      doc.fontSize(18)
        .text(assessment.firm, { align: 'center' })
      
      doc.moveDown(0.5)
      doc.fontSize(14)
        .text(assessment.name, { align: 'center' })
      
      doc.moveDown(2)
      doc.fontSize(12)
        .text(`Assessment Date: ${new Date().toLocaleDateString()}`, { align: 'center' })

      // Page 2: Executive Summary
      doc.addPage()
      
      doc.fontSize(24)
        .text('Executive Summary')
      
      doc.moveDown(1)
      doc.fontSize(12)
        .text('Based on your responses, this report highlights your organization\'s current AI readiness across 5 key areas: Strategy, Data, Technology, Team, and Change Management.')
      
      doc.moveDown(2)
      
      doc.fontSize(16)
        .text('Overall Score:')
      
      doc.fontSize(24)
        .text(`${Math.round(assessment.overallPercentage)}%`)
      
      doc.moveDown(2)
      
      // Category scores
      doc.fontSize(16)
        .text('Category Scores:')
      
      doc.moveDown(1)
      
      assessment.results.forEach((result, index) => {
        doc.fontSize(12)
          .text(`${index + 1}. ${result.category}: ${Math.round(result.percentage)}%`)
        doc.moveDown(0.5)
      })

      // Page 3: Detailed Results
      doc.addPage()
      
      doc.fontSize(24)
        .text('Detailed Findings')
      
      doc.moveDown(2)
      
      assessment.results.forEach((result, index) => {
        doc.fontSize(16)
          .text(`${index + 1}. ${result.category}`)
        
        doc.moveDown(0.5)
        doc.fontSize(12)
          .text(`Score: ${Math.round(result.percentage)}%`)
        
        doc.moveDown(0.5)
        doc.fontSize(12)
          .text('Recommendations:')
        
        result.recommendations.slice(0, 3).forEach((rec, recIndex) => {
          doc.fontSize(10)
            .text(`• ${rec}`)
          doc.moveDown(0.3)
        })
        
        doc.moveDown(1)
      })

      // Page 4: Next Steps
      doc.addPage()
      
      doc.fontSize(24)
        .text('Next Steps')
      
      doc.moveDown(1)
      doc.fontSize(12)
        .text('Based on your assessment results, here are the recommended next steps:')
      
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
          .text(`${index + 1}. ${step}`)
        doc.moveDown(0.5)
      })
      
      doc.moveDown(2)
      
      doc.fontSize(14)
        .text('Ready to Get Started?')
      
      doc.moveDown(1)
      doc.fontSize(12)
        .text('Contact us to discuss your results and implementation strategy:')
      
      doc.moveDown(0.5)
      doc.fontSize(12)
        .text('Email: info@sapphirefive.com')
      
      doc.moveDown(0.5)
      doc.fontSize(12)
        .text('Phone: +1 (216) 577-9018')
      
      doc.moveDown(0.5)
      doc.fontSize(12)
        .text('Schedule a demo: cal.com/s5-brett')

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
} 