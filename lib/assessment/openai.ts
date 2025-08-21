import OpenAI from "openai"
import { AssessmentPayload, OpenAIRecommendations } from "./types"

const client = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || '' 
})

export const SYSTEM_PROMPT = `
You are a senior legal-technology consultant advising law firms and in-house legal teams.
Your job is to turn an AI Readiness Assessment into concise, actionable guidance.

Non‑negotiables:
- PRIVACY-FIRST: assume on‑prem or private‑cloud deployments; never send or train on client data.
- LEGAL CONTEXT: tie every point to confidentiality, privilege, risk, and client outcomes.
- ACTIONABLE: concrete steps, owners, timelines, and measurable success metrics.
- PLAIN ENGLISH: no vendor hype, no fluff, no marketing claims.
- JURISDICTION: assume U.S. by default; keep advice jurisdiction‑agnostic unless stated.
- OUTPUT FORMAT: You MUST return ONLY valid JSON that conforms to the user's provided schema. No prose outside JSON.

Scoring semantics:
- Scores are 1–5. Use thresholds from the payload (e.g., Emerging ≤ 2.5, Developing ≤ 3.7, else Mature).
- Levels must align with provided thresholds. Do not invent categories.

Content requirements by section:
1) overall:
   - level: "Emerging" | "Developing" | "Mature"
   - summary: 2–3 sentences linking readiness to legal outcomes and privacy posture
   - top_priorities: 3 crisp items (verbs first)

2) categories[] (for strategy|data|technology|team|change):
   - key: MUST be one of "strategy", "data", "technology", "team", "change"
   - score: MUST be the numerical score (1-5) for this category
   - level: "Emerging" | "Developing" | "Mature" based on score and thresholds
   - what_this_means: 2–4 sentences diagnosing gaps/opportunities
   - quick_wins: 2–4 bullets that can be done in ≤ 30 days
   - recommendations[]: 3–4 items with:
       title (short), why_it_matters (risk or value), how_to_execute (3–6 steps),
       owner (role), timeline (e.g., "2–4 weeks" / "1–2 months" / "3–6 months"),
       success_metric (measurable KPI; e.g., "reduce drafting cycle time by 30%")

3) plan_30_60_90:
   - Each list contains 3–6 concrete actions, sequenced logically

4) cta:
   - copy: 1–2 lines inviting a private review/demo (no hard sell)
   - link_text: "Request a Private Demo"
   - link_href: https://www.sapphirelegal.ai/demo

CRITICAL: Each category MUST include "key" and "score" properties. The "key" must be exactly one of: "strategy", "data", "technology", "team", "change".

Guardrails:
- Never imply using public models that train on client data.
- Prefer wording like "private model/runtime," "customer‑managed keys," "no cross‑tenant mixing."
- If payload indicates healthcare matters, explicitly mention PHI handling.
- If data score is low, prioritize data quality, DMS integration, and retention/PII controls before advanced AI use.
- If change management score is low, emphasize enablement, pilot scope, and adoption metrics over tooling.

Return ONLY the JSON object. Do not include markdown, backticks, or commentary.
`;

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
    
    // Validate the response structure and add missing properties
    if (!recommendations.overall || !recommendations.categories || !recommendations.plan_30_60_90) {
      throw new Error("Invalid response structure from OpenAI")
    }

    // Ensure each category has the required key and score properties
    const expectedKeys = ['strategy', 'data', 'technology', 'team', 'change']
    recommendations.categories = recommendations.categories.map((cat, index) => {
      if (!cat.key || !expectedKeys.includes(cat.key)) {
        cat.key = expectedKeys[index] || 'strategy'
      }
      if (typeof cat.score !== 'number' || isNaN(cat.score)) {
        // Calculate score from the payload scores if available
        const categoryKey = cat.key
        cat.score = payload.scores[categoryKey as keyof typeof payload.scores] || 0
      }
      if (!cat.level) {
        const score = cat.score
        cat.level = score < 2.5 ? 'Emerging' : score < 3.7 ? 'Developing' : 'Mature'
      }
      return cat
    })

    return recommendations
  } catch (error) {
    console.error("OpenAI API error:", error)
    
    // Return fallback recommendations if OpenAI fails
    return {
      overall: {
        summary: "Based on your assessment, your firm shows potential for AI implementation with some areas needing attention. We recommend starting with foundational improvements in data organization and team training.",
        level: "Emerging",
        score: Math.round((payload.scores.strategy + payload.scores.data + payload.scores.technology + payload.scores.team + payload.scores.change) / 5 * 20),
        top_priorities: [
          "Establish data governance framework",
          "Develop AI strategy roadmap",
          "Begin team training program"
        ]
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
        copy: "Ready to discuss your assessment results and develop a tailored implementation strategy?",
        link_text: "Request a Private Demo",
        link_href: "https://www.sapphirelegal.ai/demo"
      }
    }
  }
} 