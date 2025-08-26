import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DemoHero } from '@/components/demo/DemoHero'
import { DemoForm } from '@/components/demo/DemoForm'
import { ContactInfo } from '@/components/demo/ContactInfo'

export const metadata: Metadata = {
  title: 'Book a Demo | Sapphire Legal AI',
  description: 'See how Sapphire Legal AI saves hours, captures billables, and reduces compliance headaches.',
  openGraph: {
    title: 'Book a Demo | Sapphire Legal AI',
    description: 'See how Sapphire Legal AI saves hours, captures billables, and reduces compliance headaches.',
    url: 'https://sapphirelegal.ai/demo',
    siteName: 'Sapphire Legal AI',
    images: [
      {
        url: 'https://sapphirelegal.ai/images/slai_demo_sm.png',
        width: 1200,
        height: 630,
        alt: 'Book Your Demo - Sapphire Legal AI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Demo | Sapphire Legal AI',
    description: 'See how Sapphire Legal AI saves hours, captures billables, and reduces compliance headaches.',
    images: ['https://sapphirelegal.ai/images/slai_demo_sm.png'],
  },
  alternates: {
    canonical: 'https://sapphirelegal.ai/demo',
  },
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <DemoHero />
        <div className="py-24 bg-dark-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <ContactInfo />
              <DemoForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 