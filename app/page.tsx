import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturePills } from '@/components/FeaturePills'
import { DashboardShowcase } from '@/components/sections/DashboardShowcase'
import { BenefitStrip } from '@/components/BenefitStrip'
import { FeaturesOverview } from '@/components/sections/FeaturesOverview'
import { TrustSection } from '@/components/sections/TrustSection'
import { ResourcesTeaser } from '@/components/ResourcesTeaser'
import { Testimonials } from '@/components/Testimonials'
import { CTASection } from '@/components/sections/CTASection'
import { VectorHighlights } from '@/components/VectorHighlights'
import FoundingFirmBanner from '@/components/FoundingFirmBanner'

export const metadata: Metadata = {
  title: 'Sapphire Legal AI — Private Legal AI on AWS with Vector Intelligence',
  description: 'Run Sapphire on-premise or on AWS with a dedicated Postgres database. Built-in Vector Intelligence delivers semantic search, contract similarity, and automatic document relationships — all private and compliant.',
  openGraph: {
    title: 'Sapphire Legal AI — Private Legal AI on AWS with Vector Intelligence',
    description: 'Run Sapphire on-premise or on AWS with a dedicated Postgres database. Built-in Vector Intelligence delivers semantic search, contract similarity, and automatic document relationships — all private and compliant.',
    images: ['/og/aws-vector.png'],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <FoundingFirmBanner />
      <main>
        <HeroSection />
        <FeaturePills />
        <DashboardShowcase />
        <BenefitStrip />
        <FeaturesOverview />
        <VectorHighlights />
        <TrustSection />
        <ResourcesTeaser />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
} 