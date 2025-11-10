import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/monday/Hero'
import { ValueProps } from '@/components/monday/ValueProps'
import { ProductScreenshot } from '@/components/monday/ProductScreenshot'
import { HowItWorks } from '@/components/monday/HowItWorks'
import { PracticeAreas } from '@/components/monday/PracticeAreas'
import { Security } from '@/components/monday/Security'
import { SocialProof } from '@/components/monday/SocialProof'
import { CTA } from '@/components/monday/CTA'

export const metadata: Metadata = {
  title: 'Sapphire Legal AI + Monday.com Integration',
  description: 'The only Legal OS with native Monday.com sync. Automate letters, documents, and case workflows without changing your boards.',
  openGraph: {
    title: 'Sapphire Legal AI + Monday.com Integration',
    description: 'The only Legal OS with native Monday.com sync. Automate letters, documents, and case workflows without changing your boards.',
    images: [
      {
        url: '/og/monday-integration.png', // TODO: Replace with actual OG image
        width: 1200,
        height: 630,
        alt: 'Sapphire Legal AI + Monday.com Integration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sapphire Legal AI + Monday.com Integration',
    description: 'The only Legal OS with native Monday.com sync. Automate letters, documents, and case workflows without changing your boards.',
    images: ['/og/monday-integration.png'], // TODO: Replace with actual OG image
  },
  alternates: {
    canonical: '/monday-integration',
  },
}

export default function MondayIntegrationPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <Hero />
        <ValueProps />
        <ProductScreenshot />
        <HowItWorks />
        <PracticeAreas />
        <Security />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
      
      {/* JSON-LD Schema for SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Sapphire Legal AI + Monday.com Integration',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'The only Legal OS with native Monday.com sync. Automate letters, documents, and case workflows without changing your boards.',
            provider: {
              '@type': 'Organization',
              name: 'Sapphire Five, Inc.',
              url: 'https://sapphirelegal.ai',
            },
            featureList: [
              'Native Monday.com integration',
              'Zero double entry',
              'AI-powered automation',
              'Document auto-linking',
              'Automated letter generation',
              'Real-time sync',
            ],
          }),
        }}
      />
    </div>
  )
}

