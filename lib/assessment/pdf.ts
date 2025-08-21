import PDFDocument from "pdfkit"
import { PDFReportData } from "./types"

export async function buildReportPDF({ 
  firm, 
  scores, 
  recommendations, 
  chartBase64 
}: PDFReportData): Promise<{ bufferBase64: string; buffer: Buffer }> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        size: "LETTER", 
        margins: { 
          top: 54, 
          left: 54, 
          right: 54, 
          bottom: 54 
        }
      })

      const chunks: Buffer[] = []
      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => {
        const buffer = Buffer.concat(chunks)
        resolve({ 
          bufferBase64: buffer.toString("base64"),
          buffer: buffer
        })
      })

      // Helper function to add page footer
      const addPageFooter = (pageNumber: number) => {
        const footerText = `Sapphire Legal AI • Confidential • www.sapphirelegal.ai — Page ${pageNumber}`
        doc.fontSize(8)
          .fillColor("#64748b")
          .text(footerText, 54, doc.page.height - 80, {
            width: doc.page.width - 108,
            align: "center"
          })
      }

      // Cover Page
      doc.fontSize(24)
        .fillColor("#1e293b")
        .text("AI Readiness Assessment Report", { align: "center" })
      
      doc.moveDown(2)
      
      doc.fontSize(16)
        .fillColor("#64748b")
        .text("Prepared for:", { align: "center" })
      
      doc.moveDown(0.5)
      doc.fontSize(18)
        .fillColor("#1e293b")
        .text(firm?.name || "—", { align: "center" })
      
      doc.moveDown(1)
      doc.fontSize(12)
        .fillColor("#64748b")
        .text(`Assessment Date: ${new Date().toLocaleDateString()}`, { align: "center" })
      
      doc.moveDown(3)
      doc.fontSize(10)
        .fillColor("#64748b")
        .text("Confidential — For Internal Use Only", { align: "center" })

      addPageFooter(1)
      doc.addPage()

      // Executive Summary
      doc.fontSize(16)
        .fillColor("#1e293b")
        .text("Executive Summary")
      
      doc.moveDown(0.5)
      doc.fontSize(11)
        .fillColor("#374151")
        .text(recommendations?.overall?.summary || "Based on your assessment, your firm shows potential for AI implementation with areas needing attention.")
      
      doc.moveDown(1)
      doc.fontSize(12)
        .fillColor("#1e293b")
        .text(`Overall Level: ${recommendations?.overall?.level || "Emerging"}`)
      
      doc.moveDown(0.5)
      doc.fontSize(12)
        .fillColor("#1e293b")
        .text(`Overall Score: ${recommendations?.overall?.score || 0}%`)

      addPageFooter(2)
      doc.addPage()

      // Radar Chart
      if (chartBase64) {
        try {
          doc.fontSize(16)
            .fillColor("#1e293b")
            .text("Readiness Radar")
          
          doc.moveDown(0.5)
          
          const chartBuffer = Buffer.from(chartBase64, "base64")
          doc.image(chartBuffer, {
            fit: [500, 350],
            align: "center"
          })
          
          doc.moveDown(1)
          doc.fontSize(10)
            .fillColor("#64748b")
            .text("This radar chart shows your performance across all assessment categories. Areas closer to the center need attention, while areas extending outward show strengths.", {
              align: "center",
              width: 500
            })
        } catch (error) {
          console.error("Error adding chart to PDF:", error)
          doc.fontSize(12)
            .fillColor("#64748b")
            .text("Chart visualization could not be generated.", { align: "center" })
        }
      }

      addPageFooter(3)
      doc.addPage()

      // Category Sections
      const categories = recommendations?.categories || []
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i]
        
        doc.fontSize(14)
          .fillColor("#1e293b")
          .text(category.key.toUpperCase())
        
        doc.moveDown(0.5)
        doc.fontSize(11)
          .fillColor("#374151")
          .text(`Score: ${category.score?.toFixed?.(1) ?? category.score} • Level: ${category.level}`)
        
        doc.moveDown(0.5)
        doc.text(category.what_this_means || "")
        
        // Quick Wins
        if (Array.isArray(category.quick_wins) && category.quick_wins.length > 0) {
          doc.moveDown(0.7)
          doc.fontSize(12)
            .fillColor("#1e293b")
            .text("Quick Wins")
          
          doc.fontSize(11)
            .fillColor("#374151")
          
          category.quick_wins.forEach((win, index) => {
            doc.text(`• ${win}`)
            if (index < category.quick_wins.length - 1) doc.moveDown(0.2)
          })
        }
        
        // Recommendations
        if (Array.isArray(category.recommendations) && category.recommendations.length > 0) {
          doc.moveDown(0.7)
          doc.fontSize(12)
            .fillColor("#1e293b")
            .text("Recommendations")
          
          category.recommendations.forEach((rec, index) => {
            doc.moveDown(0.3)
            doc.fontSize(11.5)
              .fillColor("#1e293b")
              .text(`${index + 1}. ${rec.title}`)
            
            doc.fontSize(11)
              .fillColor("#374151")
              .text(`Why it matters: ${rec.why_it_matters}`)
            
            if (Array.isArray(rec.how_to_execute)) {
              doc.text("How to execute:")
              rec.how_to_execute.forEach((step) => {
                doc.text(` • ${step}`)
              })
            }
            
            doc.text(`Owner: ${rec.owner} • Timeline: ${rec.timeline} • KPI: ${rec.success_metric}`)
          })
        }
        
        addPageFooter(4 + i)
        if (i < categories.length - 1) {
          doc.addPage()
        }
      }

      // 30/60/90 Plan
      doc.addPage()
      doc.fontSize(16)
        .fillColor("#1e293b")
        .text("30/60/90 Plan")
      
      const plan = recommendations?.plan_30_60_90
      if (plan) {
        const periods = [
          { key: "day_30", label: "30 DAYS" },
          { key: "day_60", label: "60 DAYS" },
          { key: "day_90", label: "90 DAYS" }
        ]
        
        periods.forEach((period) => {
          const items = plan[period.key as keyof typeof plan] as string[]
          if (Array.isArray(items) && items.length > 0) {
            doc.moveDown(0.7)
            doc.fontSize(12)
              .fillColor("#1e293b")
              .text(period.label)
            
            doc.fontSize(11)
              .fillColor("#374151")
            
            items.forEach((item) => {
              doc.text(`• ${item}`)
            })
          }
        })
      }

      addPageFooter(4 + categories.length + 1)
      doc.addPage()

      // CTA Footer
      doc.fontSize(14)
        .fillColor("#1e293b")
        .text("Next Steps", { align: "center" })
      
      doc.moveDown(1)
      doc.fontSize(11)
        .fillColor("#374151")
        .text(recommendations?.cta?.primary || "Schedule a private demo to see how Sapphire Legal AI can accelerate your implementation", {
          align: "center",
          width: 400
        })
      
      doc.moveDown(1)
      doc.fontSize(11)
        .fillColor("#2563eb")
        .text("https://www.sapphirelegal.ai/demo", {
          align: "center",
          link: "https://www.sapphirelegal.ai/demo"
        })
      
      doc.moveDown(1)
      doc.fontSize(10)
        .fillColor("#64748b")
        .text("Contact us: info@sapphirefive.com | +1 (216) 577-9018", {
          align: "center"
        })

      addPageFooter(4 + categories.length + 2)

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
} 