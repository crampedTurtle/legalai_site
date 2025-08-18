import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DemoHero } from '@/components/demo/DemoHero'
import { DemoForm } from '@/components/demo/DemoForm'
import { ContactInfo } from '@/components/demo/ContactInfo'

export const metadata: Metadata = {
  title: 'Request Demo - See Sapphire Legal AI in Action',
  description: 'Schedule a personalized demo of Sapphire Legal AI. See how our private AI platform can transform your legal practice with document intelligence, collaborative drafting, and case management.',
  openGraph: {
    title: 'Request Demo - Sapphire Legal AI',
    description: 'Schedule a personalized demo and see how Sapphire Legal AI can transform your legal practice.',
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