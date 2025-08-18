import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FeaturesHero } from '@/components/features/FeaturesHero'
import { DocumentIntelligence } from '@/components/features/DocumentIntelligence'
import { CollaborativeDrafting } from '@/components/features/CollaborativeDrafting'
import { CaseManagement } from '@/components/features/CaseManagement'
import { AIAssistant } from '@/components/features/AIAssistant'
import { FeaturesCTA } from '@/components/features/FeaturesCTA'

export const metadata: Metadata = {
  title: 'Features - Document Intelligence, Collaborative Drafting, Case Management & AI Assistant',
  description: 'Explore Sapphire Legal AI features: Document Intelligence, Collaborative Drafting, Case Management, and AI Assistant. Built exclusively for legal professionals.',
  openGraph: {
    title: 'Features - Sapphire Legal AI',
    description: 'Explore our comprehensive suite of legal AI features designed for modern law firms.',
  },
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <FeaturesHero />
        <DocumentIntelligence />
        <CollaborativeDrafting />
        <CaseManagement />
        <AIAssistant />
        <FeaturesCTA />
      </main>
      <Footer />
    </div>
  )
} 