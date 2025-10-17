import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import Problem from '@/components/landing/Problem'
import Guide from '@/components/landing/Guide'
import Plan from '@/components/landing/Plan'
import PracticeAreas from '@/components/landing/PracticeAreas'
import Trust from '@/components/landing/Trust'
import Stakes from '@/components/landing/Stakes'
import Success from '@/components/landing/Success'
import CTA from '@/components/landing/CTA'
import FoundingFirmBanner from '@/components/FoundingFirmBanner'

export const metadata: Metadata = {
  title: 'Sapphire Legal AI — The Private AI-Powered Legal OS for Mid-Sized Law Firms',
  description: 'Eliminate backlogs, unify tools, and practice more profitably with a private AI platform designed for law firms. 12 practice packs, EMR automation, discovery, billing, and compliance.',
  openGraph: {
    title: 'Sapphire Legal AI — The Private AI-Powered Legal OS for Mid-Sized Law Firms',
    description: 'Eliminate backlogs, unify tools, and practice more profitably with a private AI platform designed for law firms. 12 practice packs, EMR automation, discovery, billing, and compliance.',
    images: ['/og/aws-vector.png'],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <FoundingFirmBanner />
      <main>
        <Hero />
        <Problem />
        <Guide />
        <Plan />
        <PracticeAreas />
        <Trust />
        <Stakes />
        <Success />
        <CTA variant="mid" />
        <CTA variant="footer" id="book-demo" />
      </main>
      <Footer />
    </div>
  )
} 