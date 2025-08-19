import { Metadata } from 'next'
import { AssessmentPage } from '@/components/assessment/AssessmentPage'

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | Sapphire Legal AI',
  description: 'Evaluate your law firm\'s readiness for AI adoption with our comprehensive assessment covering strategy, data, technology, team capabilities, and implementation.',
  openGraph: {
    title: 'AI Readiness Assessment - Sapphire Legal AI',
    description: 'Get a detailed analysis of your firm\'s AI readiness with personalized recommendations.',
  },
}

export default function Assessment() {
  return (
    <AssessmentPage />
  )
} 