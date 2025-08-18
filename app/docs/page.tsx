import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DocsPage, Headline, Subhead, DocSection } from '@/components/docs/DocsPage'

export const metadata: Metadata = {
  title: 'Documentation - Sapphire Legal AI Docs',
  description: 'Everything you need to set up, customize, and get the most from Sapphire Legal AI. Complete documentation for users, admins, and developers.',
  openGraph: {
    title: 'Documentation - Sapphire Legal AI',
    description: 'Complete documentation and guides.',
  },
}

export default function Documentation() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <DocsPage>
          <Headline>Sapphire Legal AI Documentation</Headline>
          <Subhead>Everything you need to set up, customize, and get the most from Sapphire Legal AI.</Subhead>
          
          <DocSection
            title="Getting Started"
            description="Quick start guides and tutorials to get you up and running with Sapphire Legal AI."
            articles={[
              {
                title: "Quick Start Guide",
                description: "Get up and running in 15 minutes with our step-by-step setup guide.",
                link: "/docs/getting-started/quick-start",
                icon: "rocket"
              },
              {
                title: "Installation Guide",
                description: "Detailed installation instructions for different deployment options.",
                link: "/docs/getting-started/installation",
                icon: "download"
              },
              {
                title: "First Steps",
                description: "Learn the basics of using Sapphire Legal AI for your first case.",
                link: "/docs/getting-started/first-steps",
                icon: "play"
              }
            ]}
            icon="rocket"
          />
          
          <DocSection
            title="User Guide"
            description="Comprehensive guides for daily use of Sapphire Legal AI features and workflows."
            articles={[
              {
                title: "Document Intelligence",
                description: "Learn how to upload, process, and analyze legal documents effectively.",
                link: "/docs/user-guide/document-intelligence",
                icon: "file-text"
              },
              {
                title: "Collaborative Drafting",
                description: "Master real-time document editing and AI-assisted drafting.",
                link: "/docs/user-guide/collaborative-drafting",
                icon: "users"
              },
              {
                title: "Case Management",
                description: "Organize cases, track progress, and manage workflows efficiently.",
                link: "/docs/user-guide/case-management",
                icon: "briefcase"
              },
              {
                title: "AI Assistant",
                description: "Get the most from your AI assistant for research and document generation.",
                link: "/docs/user-guide/ai-assistant",
                icon: "bot"
              }
            ]}
            icon="book"
          />
          
          <DocSection
            title="Admin Guide"
            description="Administrative tasks, user management, and system configuration."
            articles={[
              {
                title: "User Management",
                description: "Add users, manage permissions, and control access to your system.",
                link: "/docs/admin-guide/user-management",
                icon: "users"
              },
              {
                title: "Security Settings",
                description: "Configure security policies, encryption, and compliance settings.",
                link: "/docs/admin-guide/security-settings",
                icon: "shield"
              },
              {
                title: "System Configuration",
                description: "Customize system settings, integrations, and deployment options.",
                link: "/docs/admin-guide/system-configuration",
                icon: "settings"
              },
              {
                title: "Backup & Recovery",
                description: "Set up automated backups and disaster recovery procedures.",
                link: "/docs/admin-guide/backup-recovery",
                icon: "database"
              }
            ]}
            icon="shield"
          />
          
          <DocSection
            title="API Reference"
            description="Technical documentation for developers and system integrators."
            articles={[
              {
                title: "Authentication",
                description: "Learn how to authenticate with the Sapphire Legal AI API.",
                link: "/docs/api-reference/authentication",
                icon: "key"
              },
              {
                title: "Endpoints",
                description: "Complete API endpoint reference with examples and parameters.",
                link: "/docs/api-reference/endpoints",
                icon: "code"
              },
              {
                title: "Webhooks",
                description: "Set up webhooks to receive real-time notifications from the system.",
                link: "/docs/api-reference/webhooks",
                icon: "bell"
              },
              {
                title: "SDKs & Libraries",
                description: "Official SDKs and client libraries for popular programming languages.",
                link: "/docs/api-reference/sdks",
                icon: "package"
              }
            ]}
            icon="code"
          />
        </DocsPage>
      </main>
      <Footer />
    </div>
  )
} 