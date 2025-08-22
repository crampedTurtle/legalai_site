import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { IntroSection, Headline, Paragraph } from '@/components/features/IntroSection'
import { FeaturesHero } from '@/components/features/FeaturesHero'
import { FeatureSection, Feature } from '@/components/features/FeatureSection'
import { BenefitsSection, Headline as BenefitsHeadline, Benefit } from '@/components/features/BenefitsSection'
import { CTASection, Headline as CTAHeadline, Paragraph as CTAParagraph } from '@/components/features/CTASection'
import { FeaturesCTA } from '@/components/features/FeaturesCTA'

export const metadata: Metadata = {
  title: 'Features - Document Intelligence, Collaborative Drafting, Case Management & AI Assistant',
  description: 'Explore Sapphire Legal AI features: Document Intelligence, Collaborative Drafting, Case Management, and AI Assistant. Built exclusively for legal professionals.',
  openGraph: {
    title: 'Features - Sapphire Legal AI',
    description: 'Explore our comprehensive suite of legal AI features designed for modern law firms.',
  },
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <IntroSection>
          <Headline>Everything your firm needs. One private, intelligent workspace.</Headline>
          <Paragraph>
            Sapphire Legal AI unifies case management, document drafting, research, and compliance into a single platform —
            powered by private AI that keeps your client data secure. From intake to final filing, your firm saves time,
            reduces costs, and delivers better client service with tools built specifically for legal professionals.
          </Paragraph>
        </IntroSection>
        <FeaturesHero />
        
        <FeatureSection title="Dashboard">
          <Feature title="Unified Dashboard">
            All your firm's work in one place — cases, documents, and tasks at a glance.
          </Feature>
          <Feature title="Analytics & Reports">
            Get real-time visibility into workloads, deadlines, and performance metrics.
          </Feature>
        </FeatureSection>

        <FeatureSection title="Document Intelligence">
          <Feature title="Upload & Process">
            Securely upload case files, evidence, and documents — instantly structured and searchable.
          </Feature>
          <Feature title="Smart Search">
            Find exactly what you need in seconds with AI-powered search across your entire knowledge base.
          </Feature>
          <Feature title="Documents">
            Organize, tag, and manage all case materials in a central, private repository.
          </Feature>
        </FeatureSection>

        <FeatureSection title="Collaborative Drafting">
          <Feature title="Document Editor">
            Draft motions, contracts, and pleadings collaboratively with built-in AI assistance.
          </Feature>
          <Feature title="Templates & Clauses">
            Save time with reusable, jurisdiction-specific templates and clause libraries.
          </Feature>
        </FeatureSection>

        <FeatureSection title="Legal Research">
          <Feature title="Case Law Search">
            Access case law tailored to your jurisdiction — faster and more relevant than generic tools.
          </Feature>
          <Feature title="Citation Analysis">
            Check citations instantly for accuracy and precedent strength.
          </Feature>
          <Feature title="Precedent Search">
            Surface past cases and arguments to strengthen your position.
          </Feature>
        </FeatureSection>

        <FeatureSection title="Case Management">
          <Feature title="Case Management Hub">
            Track every case from intake to closure in one unified system.
          </Feature>
          <Feature title="Intake Forms">
            Digitize client intake with customizable, automated forms.
          </Feature>
          <Feature title="Workflow Dashboard">
            Visualize case progress and assign tasks to the right people.
          </Feature>
          <Feature title="Task Management">
            Stay on top of deadlines with AI-prioritized task lists.
          </Feature>
        </FeatureSection>

        <FeatureSection title="AI Assistant">
          <Feature title="AI Chat">
            Ask case questions in natural language — get instant, cited answers.
          </Feature>
          <Feature title="AI Document Generation">
            Generate contracts, motions, and filings in minutes, not hours.
          </Feature>
          <Feature title="Enhanced Generation">
            Fine-tune documents for tone, jurisdiction, and client-specific details.
          </Feature>
          <Feature title="AI Insights">
            Receive proactive suggestions to improve drafting, strategy, and compliance.
          </Feature>
        </FeatureSection>

        <FeatureSection title="Administration">
          <Feature title="Admin Dashboard">
            Control access, permissions, and user activity at a glance.
          </Feature>
          <Feature title="Audit Logs">
            Maintain full compliance with detailed audit trails.
          </Feature>
          <Feature title="Data Management">
            Secure, private storage with full control of your data.
          </Feature>
        </FeatureSection>

        <BenefitsSection>
          <BenefitsHeadline>Why Firms Choose Sapphire Legal AI</BenefitsHeadline>
          <div className="grid md:grid-cols-2 gap-8">
            <Benefit title="Save Time, Increase Billables">
              Automate routine filings, research, and drafting so your team spends more time on clients and less time on admin.
            </Benefit>
            <Benefit title="Replace Fragmented Tools">
              One secure workspace instead of juggling multiple platforms. Simplify your tech stack and reduce overhead.
            </Benefit>
            <Benefit title="Protect Client Data">
              Unlike public AI tools, Sapphire Legal AI is fully private. Your data stays yours — never used to train third-party models.
            </Benefit>
            <Benefit title="Adoption Guaranteed">
              Implementation includes setup, migration, and 3 months of training & support — so your team sees value from day one.
            </Benefit>
          </div>
        </BenefitsSection>

        <CTASection>
          <CTAHeadline>Be Among the First Firms to Adopt Private AI for Law</CTAHeadline>
          <CTAParagraph>
            Early adopters receive priority onboarding, training, and locked-in pricing.
            Don't wait — see how Sapphire Legal AI can transform your practice today.
          </CTAParagraph>
        </CTASection>

        <FeaturesCTA />
      </main>
      <Footer />
    </div>
  )
} 