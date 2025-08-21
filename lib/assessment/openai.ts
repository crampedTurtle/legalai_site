import OpenAI from "openai"
import { AssessmentPayload, OpenAIRecommendations } from "./types"

const client = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || '' 
})

const SYSTEM_PROMPT = `You are a senior legal-technology consultant with 15+ years of experience helping law firms implement AI solutions. You specialize in privacy-first, secure AI deployments that enhance legal practice efficiency while maintaining client confidentiality.

Your role is to analyze AI readiness assessment data and provide structured, actionable recommendations. You must respond ONLY with valid JSON in the exact format specified below.

Key principles:
- Privacy-first approach: Emphasize data security and client confidentiality
- Practical implementation: Focus on achievable, step-by-step recommendations
- Risk mitigation: Address potential challenges and compliance requirements
- Measurable outcomes: Provide specific KPIs and success metrics
- Scalable solutions: Consider firm growth and technology evolution

Response format must be valid JSON with this exact structure:
{
  "overall": {
    "summary": "2-3 sentence executive summary of the firm's AI readiness",
    "level": "Emerging|Developing|Mature",
    "score": 0-100
  },
  "categories": [
    {
      "key": "strategy|data|technology|team|change",
      "score": 0-5,
      "level": "Emerging|Developing|Mature",
      "what_this_means": "1-2 sentences explaining what this score indicates",
      "quick_wins": ["actionable item 1", "actionable item 2", "actionable item 3"],
      "recommendations": [
        {
          "title": "Specific recommendation title",
          "why_it_matters": "1-2 sentences on business impact",
          "how_to_execute": ["step 1", "step 2", "step 3"],
          "owner": "role or department responsible",
          "timeline": "realistic timeframe (e.g., '2-3 months')",
          "success_metric": "measurable outcome (e.g., '20% reduction in document review time')"
        }
      ]
    }
  ],
  "plan_30_60_90": {
    "day_30": ["immediate action 1", "immediate action 2", "immediate action 3"],
    "day_60": ["short-term goal 1", "short-term goal 2", "short-term goal 3"],
    "day_90": ["medium-term objective 1", "medium-term objective 2", "medium-term objective 3"]
  },
  "cta": {
    "primary": "Primary call-to-action text",
    "secondary": "Secondary call-to-action text"
  }
}

Score interpretation:
- 0-1.5: Emerging (basic awareness, needs foundational work)
- 1.6-3.5: Developing (some progress, needs strategic focus)
- 3.6-5.0: Mature (advanced capabilities, needs optimization)

Remember: Always prioritize security, compliance, and practical implementation over theoretical perfection.`

export async function generateRecommendations(payload: AssessmentPayload): Promise<OpenAIRecommendations> {
  try {
    const chat = await client.chat.completions.create({
      model: "gpt-4o-mini", // Using gpt-4o-mini for better performance and cost
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: JSON.stringify(payload) }
      ],
      max_tokens: 4000
    })

    const content = chat.choices[0]?.message?.content
    if (!content) {
      throw new Error("No response content from OpenAI")
    }

    const recommendations = JSON.parse(content) as OpenAIRecommendations
    
    // Validate the response structure
    if (!recommendations.overall || !recommendations.categories || !recommendations.plan_30_60_90) {
      throw new Error("Invalid response structure from OpenAI")
    }

    return recommendations
  } catch (error) {
    console.error("OpenAI API error:", error)
    
    // Return fallback recommendations if OpenAI fails
    return {
      overall: {
        summary: "Based on your assessment, your firm shows potential for AI implementation with some areas needing attention. We recommend starting with foundational improvements in data organization and team training.",
        level: "Emerging",
        score: Math.round((payload.scores.strategy + payload.scores.data + payload.scores.technology + payload.scores.team + payload.scores.change) / 5 * 20)
      },
      categories: [
        {
          key: "strategy",
          score: payload.scores.strategy,
          level: payload.scores.strategy < 2 ? "Emerging" : payload.scores.strategy < 3.5 ? "Developing" : "Mature",
          what_this_means: "Your AI strategy needs development to align with business objectives.",
          quick_wins: ["Define AI vision statement", "Identify 3 high-impact use cases", "Create AI governance framework"],
          recommendations: [
            {
              title: "Develop AI Strategy Roadmap",
              why_it_matters: "Clear strategy ensures AI investments align with business goals and deliver measurable ROI.",
              how_to_execute: ["Conduct stakeholder interviews", "Define success metrics", "Create implementation timeline"],
              owner: "Managing Partner / IT Director",
              timeline: "2-3 months",
              success_metric: "Completed AI strategy document with stakeholder buy-in"
            }
          ]
        },
        {
          key: "data",
          score: payload.scores.data,
          level: payload.scores.data < 2 ? "Emerging" : payload.scores.data < 3.5 ? "Developing" : "Mature",
          what_this_means: "Data quality and organization need improvement for effective AI implementation.",
          quick_wins: ["Audit existing data sources", "Implement data backup procedures", "Create data classification system"],
          recommendations: [
            {
              title: "Establish Data Governance Framework",
              why_it_matters: "Proper data governance ensures AI systems have clean, reliable data to work with.",
              how_to_execute: ["Define data ownership", "Create data quality standards", "Implement data security protocols"],
              owner: "Data Manager / IT Director",
              timeline: "3-4 months",
              success_metric: "Data quality score improvement of 25%"
            }
          ]
        },
        {
          key: "technology",
          score: payload.scores.technology,
          level: payload.scores.technology < 2 ? "Emerging" : payload.scores.technology < 3.5 ? "Developing" : "Mature",
          what_this_means: "Technology infrastructure requires upgrades to support AI workloads.",
          quick_wins: ["Assess current infrastructure", "Plan cloud migration", "Implement security measures"],
          recommendations: [
            {
              title: "Upgrade Technology Infrastructure",
              why_it_matters: "Modern infrastructure is essential for AI performance and scalability.",
              how_to_execute: ["Evaluate cloud options", "Plan migration strategy", "Implement monitoring tools"],
              owner: "IT Director / CTO",
              timeline: "4-6 months",
              success_metric: "System uptime of 99.9% and reduced response times"
            }
          ]
        },
        {
          key: "team",
          score: payload.scores.team,
          level: payload.scores.team < 2 ? "Emerging" : payload.scores.team < 3.5 ? "Developing" : "Mature",
          what_this_means: "Team capabilities need development to effectively use AI tools.",
          quick_wins: ["Conduct skills assessment", "Plan training programs", "Identify AI champions"],
          recommendations: [
            {
              title: "Develop AI Training Program",
              why_it_matters: "Skilled teams are essential for successful AI adoption and maximizing ROI.",
              how_to_execute: ["Assess current skills", "Design training curriculum", "Implement certification program"],
              owner: "HR Director / Training Manager",
              timeline: "3-5 months",
              success_metric: "80% of staff complete AI fundamentals training"
            }
          ]
        },
        {
          key: "change",
          score: payload.scores.change,
          level: payload.scores.change < 2 ? "Emerging" : payload.scores.change < 3.5 ? "Developing" : "Mature",
          what_this_means: "Change management processes need development to ensure smooth AI adoption.",
          quick_wins: ["Create communication plan", "Identify change champions", "Plan pilot programs"],
          recommendations: [
            {
              title: "Implement Change Management Strategy",
              why_it_matters: "Effective change management ensures smooth AI adoption and user acceptance.",
              how_to_execute: ["Develop communication plan", "Create training schedule", "Establish feedback loops"],
              owner: "Managing Partner / Change Manager",
              timeline: "2-4 months",
              success_metric: "90% user adoption rate for new AI tools"
            }
          ]
        }
      ],
      plan_30_60_90: {
        day_30: [
          "Complete AI readiness assessment review",
          "Identify 3 high-impact pilot projects",
          "Begin stakeholder interviews"
        ],
        day_60: [
          "Develop AI strategy document",
          "Start data governance implementation",
          "Begin team training program"
        ],
        day_90: [
          "Launch first AI pilot project",
          "Complete infrastructure assessment",
          "Establish AI governance committee"
        ]
      },
      cta: {
        primary: "Schedule a private demo to see how Sapphire Legal AI can accelerate your implementation",
        secondary: "Download our AI implementation guide for detailed next steps"
      }
    }
  }
} 