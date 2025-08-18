import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ResourcesPage, Headline, Intro, ResourceCard, CTA } from '@/components/resources/ResourcesPage'

export const metadata: Metadata = {
  title: 'Resources - Legal AI Insights, Guides & Tools | Sapphire Legal AI',
  description: 'Access curated legal AI resources: whitepapers, guides, checklists, and insights to help your firm understand and adopt AI responsibly.',
  openGraph: {
    title: 'Resources - Sapphire Legal AI',
    description: 'Stay ahead with legal AI insights, guides, and tools for modern law firms.',
  },
}

export default function Resources() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <ResourcesPage>
          <Headline>Stay Ahead with Legal AI Insights</Headline>
          <Intro>
            Sapphire Legal AI curates the latest strategies, guides, and tools to help firms understand and adopt AI responsibly.
          </Intro>
          <ResourceCard title="Top 5 AI Opportunities for Law Firms in 2025" type="Whitepaper" link="/resources/ai-opportunities-2025" />
          <ResourceCard title="How Private AI Protects Client Data vs. Public Tools" type="Guide" link="/resources/private-ai-guide" />
          <ResourceCard title="AI Readiness Assessment for Mid-Sized Firms" type="Checklist" link="/resources/ai-readiness-checklist" />
          <ResourceCard title="Sapphire Legal AI Demo Walkthrough" type="Video" link="/resources/demo-video" />
          <CTA>Book a Demo</CTA>
        </ResourcesPage>
      </main>
      <Footer />
    </div>
  )
} 