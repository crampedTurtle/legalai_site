import { ChartData } from "./types"

// Lazy load ChartJS to avoid build-time issues
let chartJSNodeCanvas: any = null

async function getChartJSNodeCanvas() {
  if (!chartJSNodeCanvas) {
    const { ChartJSNodeCanvas } = await import("chartjs-node-canvas")
    chartJSNodeCanvas = new ChartJSNodeCanvas({
      width: 900,
      height: 600,
      backgroundColour: 'white',
      chartCallback: (ChartJS: any) => {
        // Register any plugins if needed
        ChartJS.defaults.font.family = 'Arial, sans-serif'
        ChartJS.defaults.font.size = 12
      }
    })
  }
  return chartJSNodeCanvas
}

export async function renderRadarBase64({ labels, data }: ChartData): Promise<string> {
  try {
    // Check if we're in a serverless environment
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      console.log('Skipping chart generation in serverless environment')
      return ''
    }

    const chartCanvas = await getChartJSNodeCanvas()
    
    const configuration = {
      type: 'radar' as const,
      data: {
        labels: labels,
        datasets: [
          {
            label: 'AI Readiness Score',
            data: data,
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            borderColor: 'rgba(37, 99, 235, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(37, 99, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(37, 99, 235, 1)',
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'AI Readiness Assessment - Category Scores',
            font: {
              size: 16,
              weight: 'bold' as const
            },
            color: '#1e293b'
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 5,
            min: 0,
            ticks: {
              stepSize: 1,
              font: {
                size: 11
              },
              color: '#64748b'
            },
            grid: {
              color: 'rgba(100, 116, 139, 0.2)'
            },
            angleLines: {
              color: 'rgba(100, 116, 139, 0.3)'
            },
            pointLabels: {
              font: {
                size: 12,
                weight: '500' as const
              },
              color: '#1e293b'
            }
          }
        },
        elements: {
          line: {
            tension: 0.1
          }
        }
      }
    }

    const pngBuffer = await chartCanvas.renderToBuffer(configuration)
    return pngBuffer.toString('base64')
  } catch (error) {
    console.error('Chart generation error:', error)
    
    // Return empty string - the PDF will handle missing charts gracefully
    return ''
  }
}

// Helper function to compute category averages from assessment data
export function computeCategoryAverages(scores: { [key: string]: number }): ChartData {
  const labels = ["Strategy", "Data", "Technology", "Team", "Change"]
  const data = [
    scores.strategy || 0,
    scores.data || 0,
    scores.technology || 0,
    scores.team || 0,
    scores.change || 0
  ]

  return { labels, data }
} 