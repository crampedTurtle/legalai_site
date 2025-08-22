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
          <ResourceCard title="Why Public AI Tools Put Firms At Risk" type="Whitepaper" link="/docs/sapphire_why_public_ai_put_firms_at_risk.pdf" />
          <ResourceCard title="Sapphire Legal AI: Your Private & Intelligent Legal Workspace" type="Guide" link="/docs/sapphire_legalai_features.pdf" />
          <ResourceCard title="AI Readiness Assessment for Mid-Sized Firms" type="Assessment" link="/assessment" />
          <ResourceCard title="Sapphire Legal AI Demo Walkthrough" type="Video" link="/resources/demo-video" />
          <CTA>Book a Demo</CTA>
        </ResourcesPage>
      </main>
      <Footer />
    </div>
  )
} 