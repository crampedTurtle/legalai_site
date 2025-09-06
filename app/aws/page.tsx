import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AWSHero } from '@/components/aws/AWSHero'
import { TrustBar } from '@/components/aws/TrustBar'
import { ValueProps } from '@/components/aws/ValueProps'
import { HowItWorks } from '@/components/aws/HowItWorks'
import { AWSTiers } from '@/components/aws/AWSTiers'
import { FeatureHighlights } from '@/components/aws/FeatureHighlights'
import { SecurityCompliance } from '@/components/aws/SecurityCompliance'
import { CaseStudy } from '@/components/aws/CaseStudy'
import { FAQSection } from '@/components/aws/FAQSection'
import { FinalCTA } from '@/components/aws/FinalCTA'
import { AWSTierSelectorModal } from '@/components/aws/AWSTierSelectorModal'

export const metadata: Metadata = {
  title: 'Sapphire Legal AI on AWS — Dedicated Database for Every Law Firm',
  description: 'Provision a secure AI tenant on AWS with its own Postgres database. No shared schemas. 14-day trial with commitment.',
  openGraph: {
    title: 'Sapphire Legal AI on AWS — Dedicated Database for Every Law Firm',
    description: 'Provision a secure AI tenant on AWS with its own Postgres database. No shared schemas. 14-day trial with commitment.',
  },
}

export default function AWSPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <AWSHero />
        <TrustBar />
        <ValueProps />
        <HowItWorks />
        <AWSTiers />
        <FeatureHighlights />
        <SecurityCompliance />
        <CaseStudy />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <AWSTierSelectorModal />
    </div>
  )
}
