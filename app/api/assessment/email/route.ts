import { NextRequest, NextResponse } from 'next/server'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

const sesClient = new SESv2Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { toEmail, firmName, pdfBase64 } = body

    // Validate required fields
    if (!toEmail || !firmName || !pdfBase64) {
      return NextResponse.json(
        { error: 'Missing required fields: toEmail, firmName, and pdfBase64 are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(toEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const fromEmail = process.env.FROM_EMAIL || 'info@sapphirefive.com'

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Readiness Assessment Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #1E293B 0%, #334155 100%); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; }
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
      <h2>Hello ${firmName},</h2>
      
      <p>Thank you for completing the AI Readiness Assessment. Your comprehensive report has been generated and is ready for download.</p>
      
      <p>This report includes:</p>
      <ul>
        <li>Detailed analysis of your AI readiness across 5 key areas</li>
        <li>Visual radar chart showing your performance</li>
        <li>Category-specific recommendations and quick wins</li>
        <li>30/60/90 day implementation plan</li>
        <li>Next steps to accelerate your AI journey</li>
      </ul>
      
      <p>Your report is available for download on the assessment results page. You can also access it anytime by returning to the assessment.</p>
      
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
</html>`

    // Create MIME message with PDF attachment
    const boundary = `----=_NextPart_${Date.now()}`
    const pdfBuffer = Buffer.from(pdfBase64, 'base64')
    
    const mimeMessage = [
      `MIME-Version: 1.0`,
      `From: ${fromEmail}`,
      `To: ${toEmail}`,
      `Bcc: brett@sapphirefive.com`,
      `Subject: Your AI Readiness Assessment Report - ${firmName}`,
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      ``,
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      ``,
      htmlBody,
      ``,
      `--${boundary}`,
      `Content-Type: application/pdf; name="AI_Readiness_Assessment_Report.pdf"`,
      `Content-Disposition: attachment; filename="AI_Readiness_Assessment_Report.pdf"`,
      `Content-Transfer-Encoding: base64`,
      ``,
      pdfBase64,
      ``,
      `--${boundary}--`
    ].join('\r\n')

    const command = new SendEmailCommand({
      FromEmailAddress: fromEmail,
      Destination: {
        ToAddresses: [toEmail],
        BccAddresses: ['brett@sapphirefive.com']
      },
      Content: {
        Raw: {
          Data: Buffer.from(mimeMessage)
        }
      }
    })

    await sesClient.send(command)
    
    console.log('Assessment email sent successfully to:', toEmail)
    
    return NextResponse.json({ 
      ok: true,
      message: 'Email sent successfully'
    })

  } catch (error) {
    console.error('SES email sending failed:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 