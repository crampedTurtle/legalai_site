import PDFDocument from 'pdfkit'
import { AssessmentSubmission, ASSESSMENT_CATEGORIES } from './assessment-data'

export async function generateAssessmentPDF(assessment: AssessmentSubmission): Promise<Buffer> {
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

      // Header
      doc.fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('#1E293B')
        .text('AI Readiness Assessment Report', { align: 'center' })

      doc.moveDown(0.5)
      doc.fontSize(14)
        .font('Helvetica')
        .fillColor('#64748B')
        .text(`Generated for ${assessment.name}`, { align: 'center' })
      doc.text(`${assessment.firm}`, { align: 'center' })
      doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' })

      doc.moveDown(2)

      // Executive Summary
      doc.fontSize(18)
        .font('Helvetica-Bold')
        .fillColor('#1E293B')
        .text('Executive Summary')

      doc.moveDown(0.5)
      doc.fontSize(12)
        .font('Helvetica')
        .fillColor('#374151')
        .text(`Overall AI Readiness Score: ${Math.round(assessment.overallPercentage)}%`)

      const getScoreLevel = (percentage: number) => {
        if (percentage >= 80) return 'Excellent'
        if (percentage >= 60) return 'Good'
        if (percentage >= 40) return 'Fair'
        return 'Needs Improvement'
      }

      doc.text(`Assessment Level: ${getScoreLevel(assessment.overallPercentage)}`)

      doc.moveDown(1)
      doc.fontSize(12)
        .text('This assessment evaluates your firm\'s readiness across five key areas of AI adoption. Each category provides specific insights and actionable recommendations to accelerate your AI journey.')

      doc.moveDown(2)

      // Category Results
      doc.fontSize(18)
        .font('Helvetica-Bold')
        .fillColor('#1E293B')
        .text('Category Analysis')

      doc.moveDown(1)

      assessment.results.forEach((result, index) => {
        const category = ASSESSMENT_CATEGORIES.find(cat => cat.name === result.category)
        
        doc.fontSize(14)
          .font('Helvetica-Bold')
          .fillColor('#1E293B')
          .text(`${index + 1}. ${result.category}`)

        doc.moveDown(0.3)
        doc.fontSize(10)
          .font('Helvetica')
          .fillColor('#64748B')
          .text(category?.description || '')

        doc.moveDown(0.5)
        doc.fontSize(12)
          .font('Helvetica-Bold')
          .fillColor('#059669')
          .text(`Score: ${Math.round(result.percentage)}%`)

        doc.moveDown(0.5)
        doc.fontSize(11)
          .font('Helvetica-Bold')
          .fillColor('#374151')
          .text('Key Recommendations:')

        result.recommendations.forEach((rec, recIndex) => {
          doc.fontSize(10)
            .font('Helvetica')
            .fillColor('#374151')
            .text(`• ${rec}`)
        })

        doc.moveDown(1)
      })

      // Next Steps
      doc.addPage()
      doc.fontSize(18)
        .font('Helvetica-Bold')
        .fillColor('#1E293B')
        .text('Next Steps & Implementation Roadmap')

      doc.moveDown(1)
      doc.fontSize(12)
        .font('Helvetica')
        .fillColor('#374151')
        .text('Based on your assessment results, here are the recommended next steps:')

      doc.moveDown(1)

      const nextSteps = [
        'Review and prioritize recommendations from each category',
        'Develop a 90-day action plan focusing on your lowest-scoring areas',
        'Schedule a consultation with our AI implementation team',
        'Begin with pilot programs in high-impact, low-risk areas',
        'Establish regular progress reviews and milestone tracking'
      ]

      nextSteps.forEach((step, index) => {
        doc.fontSize(11)
          .font('Helvetica-Bold')
          .fillColor('#1E293B')
          .text(`${index + 1}. ${step}`)
        doc.moveDown(0.3)
      })

      doc.moveDown(2)

      // Contact Information
      doc.fontSize(14)
        .font('Helvetica-Bold')
        .fillColor('#1E293B')
        .text('Ready to Get Started?')

      doc.moveDown(0.5)
      doc.fontSize(11)
        .font('Helvetica')
        .fillColor('#374151')
        .text('Contact our team to discuss your AI implementation strategy:')
        .text('Email: info@sapphirefive.com')
        .text('Phone: +1 (216) 577-9018')
        .text('Schedule a consultation: cal.com/s5-brett')

      doc.moveDown(2)

      // Footer
      doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#64748B')
        .text('Sapphire Legal AI - AI Readiness Assessment Report', { align: 'center' })
        .text('Confidential - For internal use only', { align: 'center' })

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
} 