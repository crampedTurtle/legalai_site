import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SupportPage, Headline, SupportSection, ContactForm } from '@/components/support/SupportPage'

export const metadata: Metadata = {
  title: 'Support - How Can We Help? | Sapphire Legal AI',
  description: 'Get help with Sapphire Legal AI. Access our knowledge base, contact support, and learn about customer success resources.',
  openGraph: {
    title: 'Support - Sapphire Legal AI',
    description: 'How can we help?',
  },
}

export default function Support() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <SupportPage>
          <Headline>How Can We Help?</Headline>
          
          <SupportSection
            title="Knowledge Base"
            description="Find answers to common questions and detailed guides in our comprehensive documentation."
            icon="book"
            link="/docs"
            linkText="Browse Documentation"
            features={[
              "Step-by-step tutorials and guides",
              "API documentation and examples",
              "Troubleshooting common issues",
              "Best practices and tips"
            ]}
          />
          
          <SupportSection
            title="Contact Support"
            description="Need personalized help? Our support team is here to assist you with any questions or issues."
            icon="headphones"
            features={[
              "24/7 technical support",
              "Priority support for enterprise customers",
              "Email and ticket-based support",
              "Response within 4 hours during business hours"
            ]}
          />
          
          <SupportSection
            title="Customer Success"
            description="Get the most out of Sapphire Legal AI with our comprehensive training and onboarding programs."
            icon="users"
            features={[
              "Personalized onboarding sessions",
              "Team training and workshops",
              "Implementation consulting",
              "Ongoing success check-ins"
            ]}
          />
          
          <ContactForm />
        </SupportPage>
      </main>
      <Footer />
    </div>
  )
} 