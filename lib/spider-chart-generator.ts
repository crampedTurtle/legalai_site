import { AssessmentResult } from './assessment-data'

export function generateSpiderChartSVG(results: AssessmentResult[]): string {
  const width = 400
  const height = 400
  const centerX = width / 2
  const centerY = height / 2
  const radius = 150
  const numCategories = results.length

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`
  
  // Background circles
  for (let i = 1; i <= 5; i++) {
    const circleRadius = (radius * i) / 5
    svg += `<circle cx="${centerX}" cy="${centerY}" r="${circleRadius}" fill="none" stroke="#374151" stroke-width="1" opacity="0.3"/>`
  }

  // Category lines
  for (let i = 0; i < numCategories; i++) {
    const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    
    svg += `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#4B5563" stroke-width="1" opacity="0.5"/>`
  }

  // Data points and fill
  let dataPoints = ''
  for (let i = 0; i < numCategories; i++) {
    const result = results[i]
    const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
    const scoreRadius = (radius * result.percentage) / 100
    const x = centerX + scoreRadius * Math.cos(angle)
    const y = centerY + scoreRadius * Math.sin(angle)
    
    dataPoints += `${x},${y} `
  }

  // Fill area
  svg += `<polygon points="${dataPoints}" fill="rgba(59, 130, 246, 0.2)" stroke="#3B82F6" stroke-width="2"/>`

  // Data points
  for (let i = 0; i < numCategories; i++) {
    const result = results[i]
    const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
    const scoreRadius = (radius * result.percentage) / 100
    const x = centerX + scoreRadius * Math.cos(angle)
    const y = centerY + scoreRadius * Math.sin(angle)
    
    svg += `<circle cx="${x}" cy="${y}" r="4" fill="#3B82F6"/>`
  }

  // Category labels
  for (let i = 0; i < numCategories; i++) {
    const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
    const labelRadius = radius + 25
    const x = centerX + labelRadius * Math.cos(angle)
    const y = centerY + labelRadius * Math.sin(angle)
    
    // Adjust text anchor based on angle
    let textAnchor = 'middle'
    if (angle > Math.PI / 4 && angle < 3 * Math.PI / 4) textAnchor = 'start'
    else if (angle > 5 * Math.PI / 4 && angle < 7 * Math.PI / 4) textAnchor = 'end'
    
    svg += `<text x="${x}" y="${y}" text-anchor="${textAnchor}" font-family="Inter, sans-serif" font-size="12" fill="#1F2937" font-weight="500">${results[i].category}</text>`
  }

  // Center point
  svg += `<circle cx="${centerX}" cy="${centerY}" r="2" fill="#6B7280"/>`

  svg += '</svg>'
  return svg
}

export function generateSpiderChartPNG(results: AssessmentResult[]): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const svg = generateSpiderChartSVG(results)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'))
        return
      }

      canvas.width = 400
      canvas.height = 400

      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = () => reject(new Error('Failed to load SVG image'))
      
      const svgBlob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(svgBlob)
      img.src = url
    } catch (error) {
      reject(error)
    }
  })
} 