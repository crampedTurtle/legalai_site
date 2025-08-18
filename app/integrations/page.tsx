import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { IntegrationsPage, Headline, Subhead, IntegrationSection, CTA } from '@/components/integrations/IntegrationsPage'

export const metadata: Metadata = {
  title: 'Integrations - Connect with Your Existing Tools | Sapphire Legal AI',
  description: 'Sapphire Legal AI plugs into your existing ecosystem. Connect with document management, case management, CRM, billing, and more.',
  openGraph: {
    title: 'Integrations - Sapphire Legal AI',
    description: 'Connect with the tools your firm already uses.',
  },
}

export default function Integrations() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <IntegrationsPage>
          <Headline>Connect with the Tools Your Firm Already Uses</Headline>
          <Subhead>Sapphire Legal AI plugs into your existing ecosystem.</Subhead>
          
          <IntegrationSection
            title="Document Management"
            description="Seamlessly integrate with your existing document management systems."
            integrations={[
              { name: 'iManage', status: 'Available' },
              { name: 'NetDocuments', status: 'Available' },
              { name: 'SharePoint', status: 'Available' }
            ]}
            icon="folder"
          />
          
          <IntegrationSection
            title="Case Management & Practice Tools"
            description="Connect with popular case management and practice management platforms."
            integrations={[
              { name: 'Clio', status: 'Available' },
              { name: 'Filevine', status: 'Available' },
              { name: 'MyCase', status: 'Available' },
              { name: 'PracticePanther', status: 'Available' }
            ]}
            icon="briefcase"
          />
          
          <IntegrationSection
            title="CRM & Client Intake"
            description="Streamline client relationships and intake processes."
            integrations={[
              { name: 'Salesforce', status: 'Available' },
              { name: 'HubSpot', status: 'Available' },
              { name: 'Zoho CRM', status: 'Available' }
            ]}
            icon="users"
          />
          
          <IntegrationSection
            title="Billing & Finance"
            description="Integrate with your financial systems for seamless billing and accounting."
            integrations={[
              { name: 'QuickBooks', status: 'Available' },
              { name: 'LeanLaw', status: 'Roadmap' }
            ]}
            icon="credit-card"
          />
          
          <IntegrationSection
            title="Open API"
            description="Build custom integrations with our comprehensive API."
            integrations={[
              { name: 'REST API', status: 'Available' },
              { name: 'Webhooks', status: 'Available' },
              { name: 'Custom Connectors', status: 'Available' }
            ]}
            icon="code"
          />
          
          <CTA>Future-proof your practice. Sapphire Legal AI grows with you. See a demo.</CTA>
        </IntegrationsPage>
      </main>
      <Footer />
    </div>
  )
} 