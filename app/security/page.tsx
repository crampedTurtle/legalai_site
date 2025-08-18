import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SecurityPage, Headline, Subhead, SecuritySection, CTA } from '@/components/security/SecurityPage'

export const metadata: Metadata = {
  title: 'Security - Your Data, Your Control | Sapphire Legal AI',
  description: 'Sapphire Legal AI is built on the principle of private by design. Bank-grade security, compliance ready, and continuous protection for your sensitive legal data.',
  openGraph: {
    title: 'Security - Sapphire Legal AI',
    description: 'Your data, your control. Private by design with bank-grade security.',
  },
}

export default function Security() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <SecurityPage>
          <Headline>Your Data. Your Control.</Headline>
          <Subhead>Sapphire Legal AI is built on the principle of private by design.</Subhead>
          
          <SecuritySection
            title="Bank-Grade Security"
            description="Enterprise-level security measures to protect your most sensitive information."
            features={[
              'End-to-end encryption for all data in transit and at rest',
              'Private AI models that never share your data',
              'Role-based access control with granular permissions',
              'Multi-factor authentication and SSO integration'
            ]}
            icon="shield"
          />
          
          <SecuritySection
            title="Compliance Ready"
            description="Built to meet the highest standards of legal and regulatory compliance."
            features={[
              'SOC 2 Type II certification',
              'HIPAA compliance for healthcare legal matters',
              'GDPR alignment for international data protection',
              'Comprehensive audit logs and reporting'
            ]}
            icon="certificate"
          />
          
          <SecuritySection
            title="Deployment Options"
            description="Choose the deployment model that best fits your security requirements."
            features={[
              'Private cloud hosting with dedicated infrastructure',
              'On-premises deployment for maximum control',
              'Hybrid options for complex environments',
              'Custom security configurations available'
            ]}
            icon="server"
          />
          
          <SecuritySection
            title="Continuous Protection"
            description="Ongoing security measures to ensure your data remains protected."
            features={[
              'Regular security patches and updates',
              'Third-party penetration testing',
              'Transparent security practices and reporting',
              '24/7 security monitoring and incident response'
            ]}
            icon="monitor"
          />
          
          <CTA>Your clients trust you with their most sensitive data. Sapphire Legal AI ensures you can trust us with yours. Request a demo.</CTA>
        </SecurityPage>
      </main>
      <Footer />
    </div>
  )
} 