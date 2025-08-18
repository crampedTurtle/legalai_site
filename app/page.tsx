import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { DashboardShowcase } from '@/components/sections/DashboardShowcase'
import { FeaturesOverview } from '@/components/sections/FeaturesOverview'
import { TrustSection } from '@/components/sections/TrustSection'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Sapphire Legal AI - All Your Legal Work. One Private, Intelligent Workspace.',
  description: 'AI-powered platform built exclusively for law firms and legal teams—secure, private, and tailored to your practice. Document intelligence, collaborative drafting, case management, and AI assistance in one private workspace.',
  openGraph: {
    title: 'Sapphire Legal AI - All Your Legal Work. One Private, Intelligent Workspace.',
    description: 'AI-powered platform built exclusively for law firms and legal teams—secure, private, and tailored to your practice.',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <HeroSection />
        <DashboardShowcase />
        <FeaturesOverview />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
} 