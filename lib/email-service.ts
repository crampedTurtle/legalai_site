import { AssessmentSubmission } from './assessment-data'

interface EmailConfig {
  fromEmail: string
  fromName: string
  replyTo?: string
}

interface EmailData {
  to: string
  subject: string
  htmlBody: string
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType: string
  }>
}

class EmailService {
  private config: EmailConfig

  constructor(config: EmailConfig) {
    this.config = config
  }

  async sendAssessmentReport(assessment: AssessmentSubmission, pdfBuffer: Buffer): Promise<void> {
    const emailData: EmailData = {
      to: assessment.email,
      subject: `Your AI Readiness Assessment Report - ${assessment.firm}`,
      htmlBody: this.generateAssessmentEmailHTML(assessment),
      attachments: [
        {
          filename: `AI-Readiness-Assessment-${assessment.firm.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    }

    await this.sendEmail(emailData)
  }

  private generateAssessmentEmailHTML(assessment: AssessmentSubmission): string {
    const overallScore = Math.round(assessment.overallPercentage)
    const scoreLevel = overallScore >= 80 ? 'Strong' : overallScore >= 60 ? 'Developing' : 'Needs Attention'
    const scoreColor = overallScore >= 80 ? '#10B981' : overallScore >= 60 ? '#F59E0B' : '#EF4444'

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your AI Readiness Assessment Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1E293B 0%, #334155 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; }
          .score-box { background: ${scoreColor}; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
          .category { margin: 20px 0; padding: 15px; border-left: 4px solid #3B82F6; background: #F8FAFC; }
          .cta-button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { background: #F1F5F9; padding: 20px; text-align: center; font-size: 14px; color: #64748B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Sapphire Legal AI</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your AI Readiness Assessment Report</p>
          </div>
          
          <div class="content">
            <h2>Hello ${assessment.name},</h2>
            
            <p>Thank you for completing the AI Readiness Assessment for <strong>${assessment.firm}</strong>. Your comprehensive report is attached to this email.</p>
            
            <div class="score-box">
              <h3 style="margin: 0 0 10px 0; font-size: 24px;">Overall Score: ${overallScore}%</h3>
              <p style="margin: 0; font-size: 18px;">${scoreLevel}</p>
            </div>
            
            <h3>Key Findings:</h3>
            <p>Your assessment covered five critical areas of AI readiness:</p>
            
            ${assessment.results.map(result => `
              <div class="category">
                <h4 style="margin: 0 0 8px 0; color: #1F2937;">${result.category}</h4>
                <p style="margin: 0; color: #6B7280;">Score: ${Math.round(result.percentage)}%</p>
              </div>
            `).join('')}
            
            <h3>What's Next?</h3>
            <p>Your detailed report includes:</p>
            <ul>
              <li>Category-by-category analysis</li>
              <li>Tailored recommendations for improvement</li>
              <li>Implementation roadmap</li>
              <li>Next steps for your AI journey</li>
            </ul>
            
            <p>Ready to discuss your results and implementation strategy?</p>
            
            <a href="https://cal.com/s5-brett" class="cta-button">Schedule a Consultation</a>
            
            <p style="margin-top: 30px; font-size: 14px; color: #6B7280;">
              Questions? Contact us at <a href="mailto:info@sapphirefive.com" style="color: #3B82F6;">info@sapphirefive.com</a> or call <a href="tel:+1-216-577-9018" style="color: #3B82F6;">+1 (216) 577-9018</a>
            </p>
          </div>
          
          <div class="footer">
            <p>Sapphire Legal AI | Private AI for Law Firms</p>
            <p><a href="https://sapphirelegal.ai" style="color: #3B82F6;">sapphirelegal.ai</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private async sendEmail(emailData: EmailData): Promise<void> {
    // Check if we're using AWS SES or SendGrid
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      await this.sendViaSES(emailData)
    } else if (process.env.SENDGRID_API_KEY) {
      await this.sendViaSendGrid(emailData)
    } else {
      console.warn('No email service configured. Email not sent.')
      console.log('Email would have been sent to:', emailData.to)
      console.log('Subject:', emailData.subject)
    }
  }

  private async sendViaSES(emailData: EmailData): Promise<void> {
    try {
      const AWS = require('aws-sdk')
      
      const ses = new AWS.SES({
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      })

      const params = {
        Source: this.config.fromEmail,
        Destination: {
          ToAddresses: [emailData.to]
        },
        Message: {
          Subject: {
            Data: emailData.subject,
            Charset: 'UTF-8'
          },
          Body: {
            Html: {
              Data: emailData.htmlBody,
              Charset: 'UTF-8'
            }
          }
        },
        Attachments: emailData.attachments?.map(attachment => ({
          Filename: attachment.filename,
          Content: attachment.content.toString('base64'),
          ContentType: attachment.contentType
        }))
      }

      await ses.sendEmail(params).promise()
      console.log('Assessment email sent via SES to:', emailData.to)
    } catch (error) {
      console.error('SES email sending failed:', error)
      throw error
    }
  }

  private async sendViaSendGrid(emailData: EmailData): Promise<void> {
    try {
      const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

      const msg = {
        to: emailData.to,
        from: this.config.fromEmail,
        subject: emailData.subject,
        html: emailData.htmlBody,
        attachments: emailData.attachments?.map(attachment => ({
          content: attachment.content.toString('base64'),
          filename: attachment.filename,
          type: attachment.contentType,
          disposition: 'attachment'
        }))
      }

      await sgMail.send(msg)
      console.log('Assessment email sent via SendGrid to:', emailData.to)
    } catch (error) {
      console.error('SendGrid email sending failed:', error)
      throw error
    }
  }
}

// Initialize email service with environment variables
const emailConfig: EmailConfig = {
  fromEmail: process.env.FROM_EMAIL || 'info@sapphirefive.com',
  fromName: process.env.FROM_NAME || 'Sapphire Legal AI',
  replyTo: process.env.REPLY_TO_EMAIL || 'info@sapphirefive.com'
}

export const emailService = new EmailService(emailConfig) 