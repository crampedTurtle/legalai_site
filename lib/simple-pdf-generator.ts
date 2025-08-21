import { AssessmentSubmission } from './assessment-data'

// Simple HTML-based PDF generation that works in serverless environments
export async function generateSimpleAssessmentPDF(assessment: AssessmentSubmission): Promise<Buffer> {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>AI Readiness Assessment Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 20px;
    }
    .title {
      font-size: 28px;
      font-weight: bold;
      color: #2563eb;
      margin-bottom: 10px;
    }
    .subtitle {
      font-size: 18px;
      color: #666;
      margin-bottom: 5px;
    }
    .client-info {
      text-align: center;
      margin: 30px 0;
      padding: 20px;
      background-color: #f8fafc;
      border-radius: 8px;
    }
    .score-section {
      margin: 30px 0;
      padding: 20px;
      background-color: #f1f5f9;
      border-radius: 8px;
    }
    .overall-score {
      font-size: 24px;
      font-weight: bold;
      color: #2563eb;
      text-align: center;
      margin: 20px 0;
    }
    .category {
      margin: 20px 0;
      padding: 15px;
      background-color: white;
      border-left: 4px solid #2563eb;
      border-radius: 4px;
    }
    .category-title {
      font-size: 18px;
      font-weight: bold;
      color: #1e293b;
      margin-bottom: 10px;
    }
    .category-score {
      font-size: 16px;
      color: #64748b;
      margin-bottom: 10px;
    }
    .recommendations {
      margin-top: 15px;
    }
    .recommendation {
      margin: 8px 0;
      padding-left: 20px;
      position: relative;
    }
    .recommendation:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #2563eb;
      font-weight: bold;
    }
    .next-steps {
      margin: 30px 0;
      padding: 20px;
      background-color: #f0f9ff;
      border-radius: 8px;
    }
    .contact-info {
      text-align: center;
      margin: 30px 0;
      padding: 20px;
      background-color: #f8fafc;
      border-radius: 8px;
    }
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">SAPPHIRE LEGAL AI</div>
    <div class="subtitle">AI Readiness Assessment Report</div>
    <div style="font-size: 14px; color: #666;">Confidential Findings & Recommendations</div>
  </div>

  <div class="client-info">
    <div style="font-size: 16px; margin-bottom: 10px;">Prepared for:</div>
    <div style="font-size: 20px; font-weight: bold; margin-bottom: 5px;">${assessment.firm}</div>
    <div style="font-size: 16px;">${assessment.name}</div>
    <div style="font-size: 14px; color: #666; margin-top: 10px;">Assessment Date: ${new Date().toLocaleDateString()}</div>
  </div>

  <div class="score-section">
    <div style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">Executive Summary</div>
    <p>Based on your responses, this report highlights your organization's current AI readiness across 5 key areas: Strategy, Data, Technology, Team, and Change Management.</p>
    
    <div class="overall-score">
      Overall Score: ${Math.round(assessment.overallPercentage)}%
    </div>
  </div>

  <div class="page-break"></div>

  <div style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">Detailed Findings</div>

  ${assessment.results.map((result, index) => `
    <div class="category">
      <div class="category-title">${index + 1}. ${result.category}</div>
      <div class="category-score">Score: ${Math.round(result.percentage)}%</div>
      <div class="recommendations">
        <div style="font-weight: bold; margin-bottom: 10px;">Key Recommendations:</div>
        ${result.recommendations.slice(0, 3).map(rec => `
          <div class="recommendation">${rec}</div>
        `).join('')}
      </div>
    </div>
  `).join('')}

  <div class="page-break"></div>

  <div class="next-steps">
    <div style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">Next Steps</div>
    <p>Based on your assessment results, here are the recommended next steps:</p>
    
    <div style="margin-top: 20px;">
      <div class="recommendation">Review and prioritize recommendations from each category</div>
      <div class="recommendation">Develop a 90-day action plan focusing on your lowest-scoring areas</div>
      <div class="recommendation">Schedule a consultation with our AI implementation team</div>
      <div class="recommendation">Begin with pilot programs in high-impact, low-risk areas</div>
      <div class="recommendation">Establish regular progress reviews and milestone tracking</div>
    </div>
  </div>

  <div class="contact-info">
    <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">Ready to Get Started?</div>
    <p>Contact us to discuss your results and implementation strategy:</p>
    
    <div style="margin-top: 15px;">
      <div>Email: info@sapphirefive.com</div>
      <div>Phone: +1 (216) 577-9018</div>
      <div>Schedule a demo: cal.com/s5-brett</div>
    </div>
  </div>
</body>
</html>
  `

  // For now, return a simple text representation since we can't easily generate PDFs in serverless
  // In production, you might want to use a service like Puppeteer or a PDF generation service
  const textContent = `
SAPPHIRE LEGAL AI - AI Readiness Assessment Report
==================================================

Prepared for: ${assessment.firm}
Contact: ${assessment.name}
Assessment Date: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
================
Overall Score: ${Math.round(assessment.overallPercentage)}%

Based on your responses, this report highlights your organization's current AI readiness across 5 key areas: Strategy, Data, Technology, Team, and Change Management.

DETAILED FINDINGS
================

${assessment.results.map((result, index) => `
${index + 1}. ${result.category}
   Score: ${Math.round(result.percentage)}%
   
   Key Recommendations:
${result.recommendations.slice(0, 3).map(rec => `   • ${rec}`).join('\n')}
`).join('\n')}

NEXT STEPS
==========
Based on your assessment results, here are the recommended next steps:

1. Review and prioritize recommendations from each category
2. Develop a 90-day action plan focusing on your lowest-scoring areas
3. Schedule a consultation with our AI implementation team
4. Begin with pilot programs in high-impact, low-risk areas
5. Establish regular progress reviews and milestone tracking

CONTACT INFORMATION
==================
Ready to Get Started?

Contact us to discuss your results and implementation strategy:

Email: info@sapphirefive.com
Phone: +1 (216) 577-9018
Schedule a demo: cal.com/s5-brett
  `

  // Return a Buffer with the text content
  // In a real implementation, you'd convert this to PDF using a service
  return Buffer.from(textContent, 'utf-8')
} 