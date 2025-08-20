export interface DocItem {
  title: string
  slug: string
  description?: string
}

export interface DocSection {
  title: string
  base: string
  items: DocItem[]
}

export const docsNav: DocSection[] = [
  {
    title: "Getting Started",
    base: "/docs/getting-started",
    items: [
      { 
        title: "Quick Start", 
        slug: "/quick-start",
        description: "Get up and running in 15 minutes with our step-by-step setup guide."
      },
      { 
        title: "Prerequisites & Environment", 
        slug: "/prerequisites",
        description: "What you need in place before setup."
      },
      { 
        title: "First Steps", 
        slug: "/first-steps",
        description: "Learn the basics of using Sapphire Legal AI for your first case."
      }
    ]
  },
  {
    title: "User Guide",
    base: "/docs/user-guide",
    items: [
      { 
        title: "Document Intelligence", 
        slug: "/document-intelligence",
        description: "Learn how to upload, process, and analyze legal documents effectively."
      },
      { 
        title: "Collaborative Drafting", 
        slug: "/collaborative-drafting",
        description: "Master real-time document editing and AI-assisted drafting."
      },
      { 
        title: "Case Management", 
        slug: "/case-management",
        description: "Organize cases, track progress, and manage workflows efficiently."
      },
      { 
        title: "AI Assistant", 
        slug: "/ai-assistant",
        description: "Get the most from your AI assistant for research and document generation."
      }
    ]
  },
  {
    title: "Admin Guide",
    base: "/docs/admin",
    items: [
      { 
        title: "User Management", 
        slug: "/user-management",
        description: "Add users, manage permissions, and control access to your system."
      },
      { 
        title: "Security Settings", 
        slug: "/security-settings",
        description: "Configure security policies, encryption, and compliance settings."
      },
      { 
        title: "System Configuration", 
        slug: "/system-configuration",
        description: "Customize system settings, integrations, and deployment options."
      },
      { 
        title: "Backup & Recovery", 
        slug: "/backup-and-recovery",
        description: "Set up automated backups and disaster recovery procedures."
      }
    ]
  },
  {
    title: "API Reference",
    base: "/docs/api",
    items: [
      { 
        title: "Authentication", 
        slug: "/authentication",
        description: "Learn how to authenticate with the Sapphire Legal AI API."
      },
      { 
        title: "Endpoints", 
        slug: "/endpoints",
        description: "Complete API endpoint reference with examples and parameters."
      },
      { 
        title: "Webhooks", 
        slug: "/webhooks",
        description: "Set up webhooks to receive real-time notifications from the system."
      },
      { 
        title: "SDKs & Libraries", 
        slug: "/sdks-and-libraries",
        description: "Official SDKs and client libraries for popular programming languages."
      }
    ]
  }
]

export function findDocBySlug(slug: string): DocItem | null {
  for (const section of docsNav) {
    const item = section.items.find(item => item.slug === slug)
    if (item) return item
  }
  return null
}

export function findSectionBySlug(slug: string): DocSection | null {
  return docsNav.find(section => section.base.includes(slug)) || null
}

export function getNextPrevDocs(currentSlug: string): { prev: DocItem | null; next: DocItem | null } {
  let prev: DocItem | null = null
  let next: DocItem | null = null
  let found = false

  for (const section of docsNav) {
    for (let i = 0; i < section.items.length; i++) {
      if (section.items[i].slug === currentSlug) {
        found = true
        if (i > 0) {
          prev = section.items[i - 1]
        } else if (section !== docsNav[0]) {
          // Previous section's last item
          const prevSection = docsNav[docsNav.indexOf(section) - 1]
          prev = prevSection.items[prevSection.items.length - 1]
        }
        if (i < section.items.length - 1) {
          next = section.items[i + 1]
        } else if (section !== docsNav[docsNav.length - 1]) {
          // Next section's first item
          const nextSection = docsNav[docsNav.indexOf(section) + 1]
          next = nextSection.items[0]
        }
        break
      }
    }
    if (found) break
  }

  return { prev, next }
} 