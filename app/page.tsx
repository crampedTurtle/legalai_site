import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PainFirstHero } from '@/components/sections/PainFirstHero'
import PersonaChips from '@/components/PersonaChips'
import { FeaturePills } from '@/components/FeaturePills'
import { DashboardShowcase } from '@/components/sections/DashboardShowcase'
import { BenefitStrip } from '@/components/BenefitStrip'
import { FeaturesOverview } from '@/components/sections/FeaturesOverview'
import { PracticeAreas } from '@/components/PracticeAreas'
import { IntegrationsStrip } from '@/components/IntegrationsStrip'
import SemanticSearchPrivate from '@/components/SemanticSearchPrivate'
import MaslowMini from '@/components/MaslowMini'
import FoundingProof from '@/components/FoundingProof'
import { TrustSection } from '@/components/sections/TrustSection'
import { ResourcesTeaser } from '@/components/ResourcesTeaser'
import { Testimonials } from '@/components/Testimonials'
import { CTASection } from '@/components/sections/CTASection'
import FoundingFirmBanner from '@/components/FoundingFirmBanner'

export const metadata: Metadata = {
  title: 'Sapphire Legal AI — Stop Losing Billable Hours. Protect Client Trust.',
  description: 'Private, compliance-ready AI for mid-sized law firms. Semantic search and automated drafting return hours to actual lawyering—no client work ever touches public tools.',
  openGraph: {
    title: 'Sapphire Legal AI — Stop Losing Billable Hours. Protect Client Trust.',
    description: 'Private, compliance-ready AI for mid-sized law firms. Semantic search and automated drafting return hours to actual lawyering—no client work ever touches public tools.',
    images: ['/og/aws-vector.png'],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <FoundingFirmBanner />
      <main>
        <PainFirstHero />
        <PersonaChips />
        <FeaturePills />
        <DashboardShowcase />
        <BenefitStrip />
        <FeaturesOverview />
        <PracticeAreas />
        <IntegrationsStrip />
        <SemanticSearchPrivate />
        <MaslowMini />
        <FoundingProof />
        <TrustSection />
        <ResourcesTeaser />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
} 