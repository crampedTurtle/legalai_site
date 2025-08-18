import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PricingPage, Headline, Subhead, PricingCard, CTA } from '@/components/pricing/PricingPage'

export const metadata: Metadata = {
  title: 'Pricing - Simple, Transparent Pricing | Sapphire Legal AI',
  description: 'Simple, transparent pricing for Sapphire Legal AI. Choose from Starter, Professional, or Enterprise plans designed for law firms of all sizes.',
  openGraph: {
    title: 'Pricing - Sapphire Legal AI',
    description: 'Simple, transparent pricing for private AI legal solutions.',
  },
}

export default function Pricing() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <PricingPage>
          <Headline>Simple, Transparent Pricing</Headline>
          <Subhead>All features. Private. Secure. Backed by expert onboarding.</Subhead>
          
          <PricingCard
            title="Starter"
            price="$1,500"
            period="month"
            users="5 users"
            description="Perfect for small firms getting started with AI"
            features={[
              'Document Intelligence',
              'Collaborative Drafting',
              'AI Assistant',
              'Basic Support',
              'Private Cloud Deployment'
            ]}
            cta="Get Started"
            popular={false}
          />
          
          <PricingCard
            title="Professional"
            price="$3,500"
            period="month"
            users="25 users"
            description="Ideal for growing firms with complex workflows"
            features={[
              'Everything in Starter',
              'Case Management',
              'Legal Research Tools',
              'Premium Support',
              'Custom Templates',
              'Advanced Analytics'
            ]}
            cta="Get Started"
            popular={true}
          />
          
          <PricingCard
            title="Enterprise"
            price="Custom"
            period=""
            users="Unlimited users"
            description="For large firms requiring maximum control and customization"
            features={[
              'Everything in Professional',
              'Advanced Integrations',
              'Dedicated Environment',
              'Custom AI Training',
              'Dedicated Support Team',
              'Compliance Consulting'
            ]}
            cta="Contact Sales"
            popular={false}
          />
          
          <CTA>Not sure which plan is right for your firm? Schedule a demo and we'll help you choose.</CTA>
        </PricingPage>
      </main>
      <Footer />
    </div>
  )
} 