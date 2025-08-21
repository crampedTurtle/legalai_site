import { ChartData } from "./types"

export async function renderRadarBase64({ labels, data }: ChartData): Promise<string> {
  try {
    // Validate and sanitize input data
    const validLabels = labels?.filter(label => label && label !== 'undefined') || ["Strategy", "Data", "Technology", "Team", "Change"]
    const validData = data?.map(val => typeof val === 'number' && !isNaN(val) ? val : 0) || [0, 0, 0, 0, 0]
    
    // Ensure we have the same number of labels and data points
    const chartLabels = validLabels.slice(0, 5) // Ensure exactly 5 categories
    const chartData = validData.slice(0, 5) // Ensure exactly 5 data points
    
    // Pad arrays if needed
    while (chartLabels.length < 5) {
      chartLabels.push("Category")
    }
    while (chartData.length < 5) {
      chartData.push(0)
    }

    console.log('Chart data:', { labels: chartLabels, data: chartData })

    // Use QuickChart for serverless environments
    const cfg = {
      type: "radar",
      data: {
        labels: chartLabels,
        datasets: [{ 
          label: "Readiness", 
          data: chartData,
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          borderColor: 'rgba(37, 99, 235, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(37, 99, 235, 1)',
          pointBorderColor: '#fff',
          pointRadius: 4
        }]
      },
      options: { 
        scales: { 
          r: { 
            suggestedMin: 0, 
            suggestedMax: 5,
            beginAtZero: true,
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
                weight: '500'
              },
              color: '#1e293b'
            }
          } 
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'AI Readiness Assessment - Category Scores',
            font: {
              size: 16,
              weight: 'bold'
            },
            color: '#1e293b'
          }
        }
      } 
    };

    const url = "https://quickchart.io/chart";
    const res = await fetch(`${url}?w=600&h=400&format=png&backgroundColor=white&c=${encodeURIComponent(JSON.stringify(cfg))}`);
    
    if (!res.ok) {
      throw new Error(`QuickChart failed: ${res.status} ${res.statusText}`);
    }
    
    const buf = Buffer.from(await res.arrayBuffer());
    return buf.toString("base64");
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