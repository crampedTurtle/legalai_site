import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { 
  AboutPage, 
  Headline, 
  Subhead, 
  MissionSection, 
  TwoColumn, 
  Column, 
  SectionTitle, 
  SectionText,
  ValuesSection,
  ValueCard,
  QuoteSection,
  CTASection,
  CTAButton
} from '@/components/about/AboutPage'
import { Shield, Zap, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Sapphire Legal AI',
  description:
    'Sapphire Legal AI empowers law firms with private, secure, and practical AI—streamlining operations without sacrificing client confidentiality.',
}

export default function About() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <AboutPage>
          <Headline>About Sapphire Legal AI</Headline>
          <Subhead>
            We empower law firms with private, secure, and practical AI—streamlining operations without sacrificing client confidentiality.
          </Subhead>
          
          <MissionSection>
            <TwoColumn>
              <Column>
                <SectionTitle>Why We Exist</SectionTitle>
                <SectionText>
                  Public AI tools risk exposing sensitive client data and undermining compliance. 
                  Sapphire Legal AI was built to give law firms the benefits of AI—efficiency, 
                  automation, and insight—without compromising privacy, ethics, or security. 
                  We believe law firms deserve AI that strengthens trust, not erodes it.
                </SectionText>
              </Column>
              
              <Column>
                <SectionTitle>What We Do</SectionTitle>
                <SectionText>
                  We deliver a private AI workspace designed for legal professionals. Our platform combines:
                </SectionText>
                <ul className="mt-4 space-y-3 text-dark-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Secure Document Automation</strong> — draft, review, and generate legal documents with precision.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                    <span><strong>AI‑Powered Case Research</strong> — find precedents, analyze filings, and surface insights in seconds.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Compliance‑Ready Workflows</strong> — built with SOC 2, GDPR, and CCPA alignment in mind.</span>
                  </li>
                </ul>
                <p className="mt-4 text-dark-300">
                  All under your firm's control, with no data shared or trained outside your environment.
                </p>
              </Column>
            </TwoColumn>
          </MissionSection>

          <MissionSection>
            <TwoColumn>
              <Column>
                <SectionTitle>Our Mission</SectionTitle>
                <SectionText>
                  Our mission is to empower law firms with secure, private, and practical AI that 
                  enhances productivity, safeguards confidentiality, and ensures compliance. 
                  We bridge innovation with responsibility so legal teams can focus on serving 
                  clients—not managing technology risks.
                </SectionText>
              </Column>
              
              <Column>
                <SectionTitle>Who We Serve</SectionTitle>
                <ul className="space-y-3 text-dark-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                    <span>Mid‑sized firms looking to modernize operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                    <span>Private equity–backed practices scaling quickly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                    <span>Forward‑thinking legal teams seeking a competitive edge</span>
                  </li>
                </ul>
                <p className="mt-4 text-dark-300">
                  From boutique specialists to multi‑practice firms, Sapphire Legal AI scales with you.
                </p>
              </Column>
            </TwoColumn>
          </MissionSection>

          <ValuesSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                The principles that guide everything we build and every decision we make.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <ValueCard
                icon={<Shield className="h-5 w-5" />}
                title="Confidentiality First"
                description="Your client data never leaves your control. We believe privacy isn't just a feature—it's the foundation of trust in legal technology."
                index={0}
              />
              <ValueCard
                icon={<Zap className="h-5 w-5" />}
                title="Practical Innovation"
                description="AI that works the way legal teams work. We focus on real-world problems and measurable improvements to your practice."
                index={1}
              />
              <ValueCard
                icon={<CheckCircle className="h-5 w-5" />}
                title="Compliance by Design"
                description="Built to meet regulatory requirements from day one. We understand the legal industry's unique compliance needs."
                index={2}
              />
            </div>
          </ValuesSection>

          <QuoteSection>
            "We envision a legal industry where firms harness AI confidently — maximizing efficiency 
            while safeguarding the integrity of client relationships."
          </QuoteSection>

          <CTASection>
            <CTAButton href="/features">
              Explore Our Features
            </CTAButton>
          </CTASection>
        </AboutPage>
      </main>
      <Footer />
    </div>
  )
} 