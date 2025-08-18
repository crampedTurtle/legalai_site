import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhyPrivateAIHero } from '@/components/why-private-ai/WhyPrivateAIHero'
import { PrivacyComparison } from '@/components/why-private-ai/PrivacyComparison'
import { SecurityFeatures } from '@/components/why-private-ai/SecurityFeatures'
import { ComplianceSection } from '@/components/why-private-ai/ComplianceSection'

export const metadata: Metadata = {
  title: 'Why Private AI - Your Data Stays Yours, Always',
  description: 'Learn why private AI is essential for legal professionals. Unlike public AI tools, Sapphire Legal AI ensures your sensitive data never leaves your control.',
  openGraph: {
    title: 'Why Private AI - Sapphire Legal AI',
    description: 'Your data stays yours—always. Discover the benefits of private AI for legal professionals.',
  },
}

export default function WhyPrivateAIPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <WhyPrivateAIHero />
        <PrivacyComparison />
        <SecurityFeatures />
        <ComplianceSection />
      </main>
      <Footer />
    </div>
  )
} 