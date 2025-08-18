import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AboutPage, Headline, Paragraph, SubHeadline, CTA } from '@/components/about/AboutPage'

export const metadata: Metadata = {
  title: 'About - Our Mission & Story | Sapphire Legal AI',
  description: 'Learn about Sapphire Legal AI\'s mission to empower law firms with private, secure, and practical AI solutions that protect client confidentiality.',
  openGraph: {
    title: 'About - Sapphire Legal AI',
    description: 'Empowering law firms with private, secure, and practical AI solutions.',
  },
}

export default function About() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <AboutPage>
          <Headline>Our Mission</Headline>
          <Paragraph>
            Sapphire Legal AI empowers law firms with private, secure, and practical AI — helping firms streamline operations without sacrificing client confidentiality.
          </Paragraph>
          <SubHeadline>Why We Exist</SubHeadline>
          <Paragraph>
            Public AI tools risk exposing sensitive client data. Sapphire Legal AI was built to give firms the benefits of AI without compromising privacy or ethics.
          </Paragraph>
          <SubHeadline>Who We Serve</SubHeadline>
          <Paragraph>
            We support mid-sized firms, private equity–backed practices, and forward-thinking legal teams who want a competitive edge.
          </Paragraph>
          <CTA>Schedule a Demo</CTA>
        </AboutPage>
      </main>
      <Footer />
    </div>
  )
} 