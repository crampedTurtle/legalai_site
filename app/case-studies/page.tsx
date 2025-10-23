import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import CaseStudiesPage from '@/components/case-studies/CaseStudiesPage'

export const metadata: Metadata = {
  title: 'Case Studies — Real Results from Law Firms Using Sapphire Legal AI',
  description: 'See how law firms are transforming their practice with Sapphire Legal AI. Real case studies showing increased efficiency, reduced backlogs, and improved client outcomes.',
  openGraph: {
    title: 'Case Studies — Real Results from Law Firms Using Sapphire Legal AI',
    description: 'See how law firms are transforming their practice with Sapphire Legal AI. Real case studies showing increased efficiency, reduced backlogs, and improved client outcomes.',
    images: ['/og/aws-vector.png'],
  },
}

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        <CaseStudiesPage />
      </main>
      <Footer />
    </div>
  )
}
