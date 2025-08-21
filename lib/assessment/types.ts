export type Scores = {
  strategy: number
  data: number
  technology: number
  team: number
  change: number
}

export type Firm = {
  name: string
  size_bracket?: string
  practice_mix?: string[]
  deployment_pref?: string
  notes?: string
}

export type Question = {
  category: "strategy" | "data" | "technology" | "team" | "change"
  prompt: string
  score: number
}

export type AssessmentPayload = {
  firm: Firm
  scores: Scores
  questions: Question[]
  thresholds: {
    emerging: number
    developing: number
    mature: number
  }
  requirements: {
    compliance: string[]
    security: string[]
    integration: string[]
  }
  brand: {
    name: string
    values: string[]
  }
  name: string
  email: string
}

export type OpenAIRecommendations = {
  overall: {
    summary: string
    level: "Emerging" | "Developing" | "Mature"
    score: number
    top_priorities: string[]
  }
  categories: Array<{
    key: string
    score: number
    level: "Emerging" | "Developing" | "Mature"
    what_this_means: string
    quick_wins: string[]
    recommendations: Array<{
      title: string
      why_it_matters: string
      how_to_execute: string[]
      owner: string
      timeline: string
      success_metric: string
    }>
  }>
  plan_30_60_90: {
    day_30: string[]
    day_60: string[]
    day_90: string[]
  }
  cta: {
    copy: string
    link_text: string
    link_href: string
  }
}

export type ChartData = {
  labels: string[]
  data: number[]
}

export type PDFReportData = {
  firm: Firm
  scores: Scores
  recommendations: OpenAIRecommendations
  chartBase64: string
} 