import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DocsPage, Headline, Subhead, DocSection } from '@/components/docs/DocsPage'
import { docsNav } from '@/lib/docs/navigation'

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
            articles={docsNav[0].items.map(item => ({
              title: item.title,
              description: item.description || "",
              link: `${docsNav[0].base}${item.slug}`,
              icon: item.slug === "/quick-start" ? "rocket" : 
                    item.slug === "/prerequisites" ? "download" : "play"
            }))}
            icon="rocket"
          />
          
          <DocSection
            title="User Guide"
            description="Comprehensive guides for daily use of Sapphire Legal AI features and workflows."
            articles={docsNav[1].items.map(item => ({
              title: item.title,
              description: item.description || "",
              link: `${docsNav[1].base}${item.slug}`,
              icon: item.slug === "/document-intelligence" ? "file-text" : 
                    item.slug === "/collaborative-drafting" ? "users" : 
                    item.slug === "/case-management" ? "briefcase" : "bot"
            }))}
            icon="book"
          />
          
          <DocSection
            title="Admin Guide"
            description="Administrative tasks, user management, and system configuration."
            articles={docsNav[2].items.map(item => ({
              title: item.title,
              description: item.description || "",
              link: `${docsNav[2].base}${item.slug}`,
              icon: item.slug === "/user-management" ? "users" : 
                    item.slug === "/security-settings" ? "shield" : 
                    item.slug === "/system-configuration" ? "settings" : "database"
            }))}
            icon="shield"
          />
          
          <DocSection
            title="API Reference"
            description="Technical documentation for developers and system integrators."
            articles={docsNav[3].items.map(item => ({
              title: item.title,
              description: item.description || "",
              link: `${docsNav[3].base}${item.slug}`,
              icon: item.slug === "/authentication" ? "key" : 
                    item.slug === "/endpoints" ? "code" : 
                    item.slug === "/webhooks" ? "bell" : "package"
            }))}
            icon="code"
          />
        </DocsPage>
      </main>
      <Footer />
    </div>
  )
} 