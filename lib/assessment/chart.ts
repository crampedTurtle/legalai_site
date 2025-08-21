import { ChartData } from "./types"

export async function renderRadarBase64({ labels, data }: ChartData): Promise<string> {
  try {
    // Use QuickChart for serverless environments
    const cfg = {
      type: "radar",
      data: {
        labels,
        datasets: [{ 
          label: "Readiness", 
          data,
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
    const res = await fetch(`${url}?w=900&h=600&format=png&backgroundColor=white&c=${encodeURIComponent(JSON.stringify(cfg))}`);
    
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