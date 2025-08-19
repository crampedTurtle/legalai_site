export interface Question {
  id: string
  text: string
  category: string
  weight: number
}

export interface AssessmentCategory {
  id: string
  name: string
  description: string
  color: string
}

export const ASSESSMENT_CATEGORIES: AssessmentCategory[] = [
  {
    id: 'strategy',
    name: 'AI Strategy & Vision',
    description: 'Your firm\'s strategic approach to AI adoption and long-term vision',
    color: '#3B82F6' // blue
  },
  {
    id: 'data',
    name: 'Data Readiness & Quality',
    description: 'The state of your data infrastructure and quality management',
    color: '#10B981' // emerald
  },
  {
    id: 'technology',
    name: 'Technology Infrastructure',
    description: 'Your current technology stack and infrastructure readiness',
    color: '#F59E0B' // amber
  },
  {
    id: 'team',
    name: 'Team Capabilities & Skills',
    description: 'Your team\'s skills, knowledge, and readiness for AI adoption',
    color: '#8B5CF6' // violet
  },
  {
    id: 'implementation',
    name: 'Implementation & Change Management',
    description: 'Your ability to implement and manage organizational change',
    color: '#EF4444' // red
  }
]

export const ASSESSMENT_QUESTIONS: Question[] = [
  // AI Strategy & Vision (5 questions)
  {
    id: 'strategy_1',
    text: 'Our firm has a clear vision for how AI will transform our practice areas',
    category: 'strategy',
    weight: 1
  },
  {
    id: 'strategy_2',
    text: 'Leadership is committed to AI adoption and has allocated budget for implementation',
    category: 'strategy',
    weight: 1
  },
  {
    id: 'strategy_3',
    text: 'We have identified specific use cases where AI can improve our efficiency',
    category: 'strategy',
    weight: 1
  },
  {
    id: 'strategy_4',
    text: 'Our firm has a roadmap for AI adoption over the next 12-24 months',
    category: 'strategy',
    weight: 1
  },
  {
    id: 'strategy_5',
    text: 'We understand the competitive advantages AI can provide in our practice areas',
    category: 'strategy',
    weight: 1
  },

  // Data Readiness & Quality (5 questions)
  {
    id: 'data_1',
    text: 'Our firm has a centralized document management system',
    category: 'data',
    weight: 1
  },
  {
    id: 'data_2',
    text: 'We have established data governance policies and procedures',
    category: 'data',
    weight: 1
  },
  {
    id: 'data_3',
    text: 'Our data is well-organized and consistently formatted',
    category: 'data',
    weight: 1
  },
  {
    id: 'data_4',
    text: 'We have processes for data quality control and validation',
    category: 'data',
    weight: 1
  },
  {
    id: 'data_5',
    text: 'Our firm has a data backup and recovery strategy',
    category: 'data',
    weight: 1
  },

  // Technology Infrastructure (5 questions)
  {
    id: 'technology_1',
    text: 'Our firm has modern, cloud-based technology infrastructure',
    category: 'technology',
    weight: 1
  },
  {
    id: 'technology_2',
    text: 'We have robust cybersecurity measures in place',
    category: 'technology',
    weight: 1
  },
  {
    id: 'technology_3',
    text: 'Our systems can integrate with third-party AI tools and APIs',
    category: 'technology',
    weight: 1
  },
  {
    id: 'technology_4',
    text: 'We have the technical capacity to support AI workloads',
    category: 'technology',
    weight: 1
  },
  {
    id: 'technology_5',
    text: 'Our IT team has experience with modern software development practices',
    category: 'technology',
    weight: 1
  },

  // Team Capabilities & Skills (5 questions)
  {
    id: 'team_1',
    text: 'Our team is open to learning new technologies and workflows',
    category: 'team',
    weight: 1
  },
  {
    id: 'team_2',
    text: 'We have staff with experience in process improvement and optimization',
    category: 'team',
    weight: 1
  },
  {
    id: 'team_3',
    text: 'Our team understands the basics of AI and machine learning',
    category: 'team',
    weight: 1
  },
  {
    id: 'team_4',
    text: 'We have a culture of continuous learning and professional development',
    category: 'team',
    weight: 1
  },
  {
    id: 'team_5',
    text: 'Our team can adapt to new tools and processes quickly',
    category: 'team',
    weight: 1
  },

  // Implementation & Change Management (5 questions)
  {
    id: 'implementation_1',
    text: 'Our firm has experience successfully implementing new technologies',
    category: 'implementation',
    weight: 1
  },
  {
    id: 'implementation_2',
    text: 'We have clear communication channels for change management',
    category: 'implementation',
    weight: 1
  },
  {
    id: 'implementation_3',
    text: 'Our team receives regular training on new tools and processes',
    category: 'implementation',
    weight: 1
  },
  {
    id: 'implementation_4',
    text: 'We have processes for measuring and tracking the success of new initiatives',
    category: 'implementation',
    weight: 1
  },
  {
    id: 'implementation_5',
    text: 'Our firm can allocate dedicated time for AI implementation and training',
    category: 'implementation',
    weight: 1
  }
]

export const LIKERT_SCALE_OPTIONS = [
  { value: 1, label: 'Strongly Disagree', color: '#EF4444' },
  { value: 2, label: 'Disagree', color: '#F97316' },
  { value: 3, label: 'Neutral', color: '#F59E0B' },
  { value: 4, label: 'Agree', color: '#10B981' },
  { value: 5, label: 'Strongly Agree', color: '#059669' }
]

export interface AssessmentResult {
  category: string
  score: number
  maxScore: number
  percentage: number
  recommendations: string[]
}

export interface AssessmentSubmission {
  name: string
  email: string
  firm: string
  answers: Record<string, number>
  results: AssessmentResult[]
  totalScore: number
  maxTotalScore: number
  overallPercentage: number
} 