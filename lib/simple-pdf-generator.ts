import { AssessmentSubmission } from './assessment-data'
import { generateSpiderChartSVG } from './spider-chart-generator'

// Create a professional HTML report that can be easily converted to PDF
export async function generateSimpleAssessmentPDF(assessment: AssessmentSubmission): Promise<Buffer> {
  const spiderChartSVG = generateSpiderChartSVG(assessment.results)
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>AI Readiness Assessment Report - ${assessment.firm}</title>
  <style>
    @page {
      size: A4;
      margin: 1in;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      color: #333;
      line-height: 1.6;
      font-size: 12px;
      background: white;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 3px solid #2563eb;
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
      border: 1px solid #e2e8f0;
    }
    .score-section {
      margin: 30px 0;
      padding: 20px;
      background-color: #f1f5f9;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
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
      page-break-inside: avoid;
      border: 1px solid #e2e8f0;
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
      border: 1px solid #bae6fd;
    }
    .contact-info {
      text-align: center;
      margin: 30px 0;
      padding: 20px;
      background-color: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .spider-chart {
      text-align: center;
      margin: 30px 0;
      page-break-inside: avoid;
    }
    .page-break {
      page-break-before: always;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: white;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    th {
      background-color: #f8fafc;
      font-weight: bold;
      color: #1e293b;
    }
    .status-strong { color: #10B981; font-weight: bold; }
    .status-developing { color: #F59E0B; font-weight: bold; }
    .status-needs-attention { color: #EF4444; font-weight: bold; }
    .pdf-instructions {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
      font-size: 11px;
    }
  </style>
</head>
<body>
  <div class="pdf-instructions">
    <strong>📄 To save as PDF:</strong> Press Ctrl+P (or Cmd+P on Mac) and select "Save as PDF" in your browser's print dialog.
  </div>

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

  <div class="spider-chart">
    <h3 style="margin-bottom: 20px; color: #1F2937;">Assessment Visualization</h3>
    <div style="display: inline-block; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
      ${spiderChartSVG}
    </div>
    <p style="margin-top: 15px; font-size: 14px; color: #6B7280;">
      This spider chart shows your performance across all assessment categories. Areas closer to the center need attention, while areas extending outward show strengths.
    </p>
  </div>

  <div class="page-break"></div>

  <div style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">Detailed Findings</div>

  <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>Score</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${assessment.results.map((result, index) => {
        const status = result.percentage >= 80 ? 'Strong' : result.percentage >= 60 ? 'Developing' : 'Needs Attention'
        const statusClass = result.percentage >= 80 ? 'status-strong' : result.percentage >= 60 ? 'status-developing' : 'status-needs-attention'
        return `
          <tr>
            <td><strong>${index + 1}. ${result.category}</strong></td>
            <td>${Math.round(result.percentage)}%</td>
            <td class="${statusClass}">${status}</td>
          </tr>
        `
      }).join('')}
    </tbody>
  </table>

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

  return Buffer.from(html, 'utf-8')
} 