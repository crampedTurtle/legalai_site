import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SolutionsHero } from '@/components/solutions/SolutionsHero'
import { ImplementationFramework } from '@/components/solutions/ImplementationFramework'
import { IndustrySolutions } from '@/components/solutions/IndustrySolutions'
import { SolutionsCTA } from '@/components/solutions/SolutionsCTA'

export const metadata: Metadata = {
  title: 'Solutions - Software + Enablement for Law Firms and Legal Teams',
  description: 'We don\'t just hand you software—we ensure your practice adapts and thrives. Complete implementation framework with training and ongoing optimization.',
  openGraph: {
    title: 'Solutions - Sapphire Legal AI',
    description: 'Complete software and enablement solutions for law firms and legal teams.',
  },
}

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <SolutionsHero />
        <ImplementationFramework />
        <IndustrySolutions />
        <SolutionsCTA />
      </main>
      <Footer />
    </div>
  )
} 