import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PricingPage, Headline, Subhead, PricingTabs, PlatformTab, LaunchPackTab, ManagedOpsTab, FAQSection, FrameworkCTABand } from '@/components/pricing/PricingPage'
import FoundingFirmBanner from '@/components/FoundingFirmBanner'

export const metadata: Metadata = {
  title: 'Pricing - Hybrid Platform & Services Model | Sapphire Legal AI',
  description: 'Choose from our flexible pricing model: Platform tiers (Core, Practice, Firm, Enterprise) with per-user pricing, Launch Pack implementation services, or Managed Operations.',
  openGraph: {
    title: 'Pricing - Sapphire Legal AI',
    description: 'Flexible pricing for private AI legal solutions.',
  },
}

export default function Pricing() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <FoundingFirmBanner />
      <main>
        <PricingPage>
          <Headline>Flexible Pricing for Every Stage</Headline>
          <Subhead>Choose the right combination of platform and services for your firm's needs.</Subhead>
          
          <PricingTabs>
            <PlatformTab />
            <LaunchPackTab />
            <ManagedOpsTab />
          </PricingTabs>
          
          <FrameworkCTABand />
          <FAQSection />
        </PricingPage>
      </main>
      <Footer />
    </div>
  )
} 