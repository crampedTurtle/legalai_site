import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from 'pdf-lib'
import fs from "node:fs"
import path from "node:path"
import { PDFReportData } from "./types"

function fontPath(rel: string) {
  return path.join(process.cwd(), "public", "fonts", rel)
}

export async function buildReportPDF({ 
  firm, 
  scores, 
  recommendations, 
  chartBase64 
}: PDFReportData): Promise<{ bufferBase64: string; buffer: Buffer }> {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create()
    
    // Embed fonts
    let interRegular: PDFFont | undefined
    let interBold: PDFFont | undefined
    
    try {
      const interRegularBytes = fs.readFileSync(fontPath("Inter-Regular.ttf"))
      const interBoldBytes = fs.readFileSync(fontPath("Inter-Bold.ttf"))
      interRegular = await pdfDoc.embedFont(interRegularBytes)
      interBold = await pdfDoc.embedFont(interBoldBytes)
    } catch (error) {
      console.warn("Could not load custom fonts, using defaults:", error)
      // Fallback to standard fonts
      interRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)
      interBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    }

    // Helper function to add page footer
    const addPageFooter = (page: PDFPage, pageNumber: number) => {
      const footerText = `Sapphire Legal AI • Confidential • www.sapphirelegal.ai — Page ${pageNumber}`
      const { width, height } = page.getSize()
      const fontSize = 8
      const textWidth = interRegular!.widthOfTextAtSize(footerText, fontSize)
      
      page.drawText(footerText, {
        x: (width - textWidth) / 2,
        y: 30,
        size: fontSize,
        font: interRegular!,
        color: rgb(0.4, 0.45, 0.55)
      })
    }

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

    // Cover Page
    const coverPage = pdfDoc.addPage([612, 792]) // Letter size
    const { width, height } = coverPage.getSize()
    
    // Title
    coverPage.drawText("AI Readiness Assessment Report", {
      x: 50,
      y: height - 100,
      size: 24,
      font: interBold!,
      color: rgb(0.12, 0.16, 0.23)
    })
    
    // Subtitle
    coverPage.drawText("Prepared for:", {
      x: 50,
      y: height - 180,
      size: 16,
      font: interRegular!,
      color: rgb(0.4, 0.45, 0.55)
    })
    
    // Firm name
    coverPage.drawText(firm?.name || "—", {
      x: 50,
      y: height - 220,
      size: 18,
      font: interBold!,
      color: rgb(0.12, 0.16, 0.23)
    })
    
    // Date
    coverPage.drawText(`Assessment Date: ${new Date().toLocaleDateString()}`, {
      x: 50,
      y: height - 280,
      size: 12,
      font: interRegular!,
      color: rgb(0.4, 0.45, 0.55)
    })
    
    // Confidential notice
    coverPage.drawText("Confidential — For Internal Use Only", {
      x: 50,
      y: height - 400,
      size: 10,
      font: interRegular!,
      color: rgb(0.4, 0.45, 0.55)
    })

    addPageFooter(coverPage, 1)

    // Executive Summary Page
    const summaryPage = pdfDoc.addPage([612, 792])
    let currentY = height - 80
    
    summaryPage.drawText("Executive Summary", {
      x: 50,
      y: currentY,
      size: 16,
      font: interBold!,
      color: rgb(0.12, 0.16, 0.23)
    })
    
    currentY -= 40
    currentY = drawWrappedText(
      summaryPage,
      recommendations?.overall?.summary || "Based on your assessment, your firm shows potential for AI implementation with areas needing attention.",
      50,
      currentY,
      width - 100,
      11,
      interRegular!,
      rgb(0.22, 0.26, 0.32)
    )
    
    currentY -= 20
    summaryPage.drawText(`Overall Level: ${recommendations?.overall?.level || "Emerging"}`, {
      x: 50,
      y: currentY,
      size: 12,
      font: interBold!,
      color: rgb(0.12, 0.16, 0.23)
    })
    
    currentY -= 25
    summaryPage.drawText(`Overall Score: ${recommendations?.overall?.score || 0}%`, {
      x: 50,
      y: currentY,
      size: 12,
      font: interBold!,
      color: rgb(0.12, 0.16, 0.23)
    })

    addPageFooter(summaryPage, 2)

    // Radar Chart Page
    const chartPage = pdfDoc.addPage([612, 792])
    currentY = height - 80
    
    chartPage.drawText("Readiness Radar", {
      x: 50,
      y: currentY,
      size: 16,
      font: interBold!,
      color: rgb(0.12, 0.16, 0.23)
    })
    
    if (chartBase64 && chartBase64.length > 0) {
      try {
        const chartBuffer = Buffer.from(chartBase64, "base64")
        const chartImage = await pdfDoc.embedPng(chartBuffer)
        const chartDims = chartImage.scale(0.8) // Scale down to fit
        
        chartPage.drawImage(chartImage, {
          x: (width - chartDims.width) / 2,
          y: currentY - 400,
          width: chartDims.width,
          height: chartDims.height
        })
        
        currentY -= 450
        currentY = drawWrappedText(
          chartPage,
          "This radar chart shows your performance across all assessment categories. Areas closer to the center need attention, while areas extending outward show strengths.",
          50,
          currentY,
          width - 100,
          10,
          interRegular!,
          rgb(0.4, 0.45, 0.55)
        )
      } catch (error) {
        console.error("Error adding chart to PDF:", error)
        chartPage.drawText("Chart visualization could not be generated.", {
          x: 50,
          y: currentY - 100,
          size: 12,
          font: interRegular!,
          color: rgb(0.4, 0.45, 0.55)
        })
      }
    } else {
      // Text-based chart representation
      currentY -= 40
      chartPage.drawText("Assessment Scores", {
        x: 50,
        y: currentY,
        size: 16,
        font: interBold!,
        color: rgb(0.12, 0.16, 0.23)
      })
      
      currentY -= 40
      const categories = ["Strategy", "Data", "Technology", "Team", "Change"]
      const scoreValues = [scores.strategy, scores.data, scores.technology, scores.team, scores.change]
      
      categories.forEach((category, index) => {
        const score = scoreValues[index]
        const percentage = Math.round((score / 5) * 100)
        const bars = "█".repeat(Math.round(percentage / 10))
        
        chartPage.drawText(`${category}: ${score.toFixed(1)}/5 (${percentage}%)`, {
          x: 50,
          y: currentY,
          size: 11,
          font: interRegular!,
          color: rgb(0.22, 0.26, 0.32)
        })
        
        chartPage.drawText(`${bars}${"░".repeat(10 - Math.round(percentage / 10))}`, {
          x: 50,
          y: currentY - 15,
          size: 10,
          font: interRegular!,
          color: rgb(0.15, 0.39, 0.92)
        })
        
        currentY -= 35
      })
      
      currentY -= 20
      chartPage.drawText("Score breakdown: █ = 10% | Higher scores indicate stronger readiness in each category.", {
        x: 50,
        y: currentY,
        size: 10,
        font: interRegular!,
        color: rgb(0.4, 0.45, 0.55)
      })
    }

    addPageFooter(chartPage, 3)

    // Category Sections
    const categories = recommendations?.categories || []
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      const categoryPage = pdfDoc.addPage([612, 792])
      currentY = height - 80
      
      categoryPage.drawText(category.key.toUpperCase(), {
        x: 50,
        y: currentY,
        size: 14,
        font: interBold!,
        color: rgb(0.12, 0.16, 0.23)
      })
      
      currentY -= 30
      categoryPage.drawText(`Score: ${category.score?.toFixed?.(1) ?? category.score} • Level: ${category.level}`, {
        x: 50,
        y: currentY,
        size: 11,
        font: interRegular!,
        color: rgb(0.22, 0.26, 0.32)
      })
      
      currentY -= 25
      currentY = drawWrappedText(
        categoryPage,
        category.what_this_means || "",
        50,
        currentY,
        width - 100,
        11,
        interRegular!,
        rgb(0.22, 0.26, 0.32)
      )
      
      // Quick Wins
      if (Array.isArray(category.quick_wins) && category.quick_wins.length > 0) {
        currentY -= 30
        categoryPage.drawText("Quick Wins", {
          x: 50,
          y: currentY,
          size: 12,
          font: interBold!,
          color: rgb(0.12, 0.16, 0.23)
        })
        
        currentY -= 20
        category.quick_wins.forEach((win) => {
          categoryPage.drawText(`• ${win}`, {
            x: 50,
            y: currentY,
            size: 11,
            font: interRegular!,
            color: rgb(0.22, 0.26, 0.32)
          })
          currentY -= 20
        })
      }
      
      // Recommendations
      if (Array.isArray(category.recommendations) && category.recommendations.length > 0) {
        currentY -= 20
        categoryPage.drawText("Recommendations", {
          x: 50,
          y: currentY,
          size: 12,
          font: interBold!,
          color: rgb(0.12, 0.16, 0.23)
        })
        
        category.recommendations.forEach((rec, index) => {
          currentY -= 25
          categoryPage.drawText(`${index + 1}. ${rec.title}`, {
            x: 50,
            y: currentY,
            size: 11.5,
            font: interBold!,
            color: rgb(0.12, 0.16, 0.23)
          })
          
          currentY -= 20
          currentY = drawWrappedText(
            categoryPage,
            `Why it matters: ${rec.why_it_matters}`,
            50,
            currentY,
            width - 100,
            11,
            interRegular!,
            rgb(0.22, 0.26, 0.32)
          )
          
          if (Array.isArray(rec.how_to_execute)) {
            currentY -= 15
            categoryPage.drawText("How to execute:", {
              x: 50,
              y: currentY,
              size: 11,
              font: interRegular!,
              color: rgb(0.22, 0.26, 0.32)
            })
            
            rec.how_to_execute.forEach((step) => {
              currentY -= 15
              categoryPage.drawText(` • ${step}`, {
                x: 50,
                y: currentY,
                size: 11,
                font: interRegular!,
                color: rgb(0.22, 0.26, 0.32)
              })
            })
          }
          
          currentY -= 15
          categoryPage.drawText(`Owner: ${rec.owner} • Timeline: ${rec.timeline} • KPI: ${rec.success_metric}`, {
            x: 50,
            y: currentY,
            size: 11,
            font: interRegular!,
            color: rgb(0.22, 0.26, 0.32)
          })
        })
      }
      
      addPageFooter(categoryPage, 4 + i)
    }

    // 30/60/90 Plan Page
    const planPage = pdfDoc.addPage([612, 792])
    currentY = height - 80
    
    planPage.drawText("30/60/90 Plan", {
      x: 50,
      y: currentY,
      size: 16,
      font: interBold!,
      color: rgb(0.12, 0.16, 0.23)
    })
    
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
          currentY -= 40
          planPage.drawText(period.label, {
            x: 50,
            y: currentY,
            size: 12,
            font: interBold!,
            color: rgb(0.12, 0.16, 0.23)
          })
          
          items.forEach((item) => {
            currentY -= 20
            planPage.drawText(`• ${item}`, {
              x: 50,
              y: currentY,
              size: 11,
              font: interRegular!,
              color: rgb(0.22, 0.26, 0.32)
            })
          })
        }
      })
    }

    addPageFooter(planPage, 4 + categories.length + 1)

    // CTA Footer Page
    const ctaPage = pdfDoc.addPage([612, 792])
    currentY = height - 80
    
    ctaPage.drawText("Next Steps", {
      x: 50,
      y: currentY,
      size: 14,
      font: interBold!,
      color: rgb(0.12, 0.16, 0.23)
    })
    
    currentY -= 60
    currentY = drawWrappedText(
      ctaPage,
      recommendations?.cta?.copy || "Ready to discuss your assessment results and develop a tailored implementation strategy?",
      50,
      currentY,
      width - 100,
      11,
      interRegular!,
      rgb(0.22, 0.26, 0.32)
    )
    
    currentY -= 40
    ctaPage.drawText(recommendations?.cta?.link_href || "https://www.sapphirelegal.ai/demo", {
      x: 50,
      y: currentY,
      size: 11,
      font: interRegular!,
      color: rgb(0.15, 0.39, 0.92)
    })
    
    currentY -= 40
    ctaPage.drawText("Contact us: info@sapphirefive.com | +1 (216) 577-9018", {
      x: 50,
      y: currentY,
      size: 10,
      font: interRegular!,
      color: rgb(0.4, 0.45, 0.55)
    })

    addPageFooter(ctaPage, 4 + categories.length + 2)

    // Save the PDF
    const pdfBytes = await pdfDoc.save()
    const buffer = Buffer.from(pdfBytes)
    
    return {
      bufferBase64: buffer.toString("base64"),
      buffer: buffer
    }
  } catch (error) {
    console.error("Error building PDF report:", error)
    throw error
  }
} 