import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PricingPage, Headline, Subhead, TrustAnchors, DayOneSection, PricingTabs, PlatformTab, LaunchPackTab, ManagedOpsTab, FAQSection, FrameworkCTABand, WhyPrivateAISection, RoleBasedValueSection } from '@/components/pricing/PricingPage'
import FoundingFirmBanner from '@/components/FoundingFirmBanner'

export const metadata: Metadata = {
  title: 'Sapphire Legal AI Pricing — Private AI for Law Firms',
  description: 'Explore Sapphire Legal AI pricing. Private, secure AI for law firms with automated case summaries, timelines, workflow automation, and tenant-isolated vector intelligence.',
  openGraph: {
    title: 'Sapphire Legal AI Pricing — Private AI for Law Firms',
    description: 'Explore Sapphire Legal AI pricing. Private, secure AI for law firms with automated case summaries, timelines, workflow automation, and tenant-isolated vector intelligence.',
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
          <TrustAnchors />
          <DayOneSection />
          
          <PricingTabs>
            <PlatformTab />
            <LaunchPackTab />
            <ManagedOpsTab />
          </PricingTabs>
          
          <FrameworkCTABand />
          <WhyPrivateAISection />
          <RoleBasedValueSection />
          <FAQSection />
        </PricingPage>
      </main>
      <Footer />
      
      {/* JSON-LD Schema for Legal SaaS Pricing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Sapphire Legal AI',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: [
              {
                '@type': 'Offer',
                name: 'Core',
                price: '1500',
                priceCurrency: 'USD',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: '1500',
                  priceCurrency: 'USD',
                  billingIncrement: 'P1M'
                }
              },
              {
                '@type': 'Offer',
                name: 'Practice',
                price: '3500',
                priceCurrency: 'USD',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: '3500',
                  priceCurrency: 'USD',
                  billingIncrement: 'P1M'
                }
              },
              {
                '@type': 'Offer',
                name: 'Firm',
                price: '6000',
                priceCurrency: 'USD',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: '6000',
                  priceCurrency: 'USD',
                  billingIncrement: 'P1M'
                }
              }
            ],
            description: 'Private AI-powered legal operating system with secure document intelligence, automated case summaries, timelines, and workflow automation for law firms.',
            provider: {
              '@type': 'Organization',
              name: 'Sapphire Five, Inc.',
              url: 'https://sapphirelegal.ai',
            },
            featureList: [
              'Smart Document → Task Automation',
              'Case Summary Sheets',
              'Case Timelines',
              'Multi-Document Ingestion',
              'Vector Intelligence',
              'Practice Pack workflows',
              'EMR Automation',
              'Private AI deployment'
            ],
          }),
        }}
      />
    </div>
  )
} 