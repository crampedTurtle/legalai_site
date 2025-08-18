import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhitepapersPage, Headline, WhitepaperCard } from '@/components/whitepapers/WhitepapersPage'

export const metadata: Metadata = {
  title: 'Whitepapers - In-Depth Research & Strategy Guides | Sapphire Legal AI',
  description: 'Access in-depth research and strategy guides on legal AI, compliance, and the future of law practice. Download comprehensive whitepapers from Sapphire Legal AI.',
  openGraph: {
    title: 'Whitepapers - Sapphire Legal AI',
    description: 'In-depth research and strategy guides.',
  },
}

export default function Whitepapers() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <WhitepapersPage>
          <Headline>In-Depth Research & Strategy Guides</Headline>
          
          <WhitepaperCard
            title="Top 5 Compliance Risks for Law Firms in 2025"
            description="A comprehensive analysis of emerging compliance challenges facing law firms in the AI era, including data privacy regulations, ethical AI usage, and client confidentiality requirements."
            author="Sapphire Legal AI Research Team"
            date="December 2024"
            pages="24 pages"
            downloadUrl="/whitepapers/compliance-risks-2025.pdf"
            image="/images/whitepapers/compliance-risks-cover.jpg"
            category="Compliance & Risk Management"
          />
          
          <WhitepaperCard
            title="Private AI vs Public AI: Why It Matters for Legal"
            description="An in-depth comparison of private and public AI solutions for legal practice, examining security implications, data sovereignty, and ethical considerations for law firms."
            author="Sapphire Legal AI Research Team"
            date="November 2024"
            pages="32 pages"
            downloadUrl="/whitepapers/private-vs-public-ai.pdf"
            image="/images/whitepapers/private-ai-cover.jpg"
            category="AI Strategy & Security"
          />
          
          <WhitepaperCard
            title="Future of AI in Mid-Sized Law Firms"
            description="Strategic insights into how mid-sized law firms can leverage AI to compete with larger firms, including implementation roadmaps, ROI analysis, and best practices."
            author="Sapphire Legal AI Research Team"
            date="October 2024"
            pages="28 pages"
            downloadUrl="/whitepapers/future-ai-midsized-firms.pdf"
            image="/images/whitepapers/future-ai-cover.jpg"
            category="Strategy & Implementation"
          />
        </WhitepapersPage>
      </main>
      <Footer />
    </div>
  )
} 