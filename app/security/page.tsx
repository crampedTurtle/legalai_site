import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SecurityHero } from '@/components/security/SecurityHero'
import { SecurityPillars } from '@/components/security/SecurityPillars'
import { SecurityArchitecture } from '@/components/security/SecurityArchitecture'
import { SecurityStandards } from '@/components/security/SecurityStandards'
import { SecurityCompliance } from '@/components/security/SecurityCompliance'
import { SecurityFAQ } from '@/components/security/SecurityFAQ'
import { SecurityCTA } from '@/components/security/SecurityCTA'


export const metadata: Metadata = {
  title: 'Security & Compliance | Sapphire Legal AI',
  description: 'Private AI for law firms. On-prem or private cloud, end-to-end encryption, zero data sharing.',
  openGraph: {
    title: 'Security & Compliance | Sapphire Legal AI',
    description: 'Private AI for law firms. On-prem or private cloud, end-to-end encryption, zero data sharing.',
    type: 'website',
    url: 'https://sapphirelegal.ai/security',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security & Compliance | Sapphire Legal AI',
    description: 'Private AI for law firms. On-prem or private cloud, end-to-end encryption, zero data sharing.',
  },
}

const copy = {
  hero: {
    title: "Security & Compliance",
    subtitle: "Private by design. Your client data never trains public models—ever.",
    primaryCta: "Download Security Whitepaper",
    secondaryCta: "Request a Private Demo"
  },
  pillars: [
    { title: "Complete Control", desc: "Deploy on‑prem or private cloud. Data residency honored." },
    { title: "End‑to‑End Encryption", desc: "TLS in transit, AES‑256 at rest. KMS/externally managed keys supported." },
    { title: "Zero Data Sharing", desc: "No training on your data. Strict tenant isolation." }
  ],
  architecture: {
    title: "How Sapphire Legal AI Protects Your Data",
    caption: "Supported deployments: on‑prem, private cloud (AWS/GCP/Azure), or hybrid. No cross‑tenant mixing."
  },
  standards: [
    { k: "Access Control", v: "Role‑based access, SSO (SAML/OIDC), SCIM provisioning." },
    { k: "Data Protection", v: "PII/PHI detection, masking & redaction in drafting workflows." },
    { k: "Key Management", v: "Customer‑managed keys (KMS/HSM) or provider‑managed." },
    { k: "Logging & Audit", v: "Comprehensive logs; SIEM export and alerting." },
    { k: "Secure SDLC", v: "SAST/DAST, dependency scanning, signed builds." },
    { k: "Backups & DR", v: "Configurable RPO/RTO; customer‑controlled retention." },
    { k: "Vendor Review", v: "Minimal third‑party reliance; security reviews available." }
  ],
  compliance: {
    title: "Compliance & Standards",
    subtitle: "Our security controls align with industry standards. We're committed to achieving full certification while maintaining transparency about our current status.",
    frameworks: [
      {
        name: "SOC 2 Type II",
        status: "Roadmap",
        description: "Controls aligned, certification in progress.",
        icon: "Shield",
        color: "from-blue-500 to-cyan-500"
      },
      {
        name: "ISO 27001",
        status: "Roadmap",
        description: "Global standard for information security, planned certification.",
        icon: "Lock",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "GDPR",
        status: "Aligned",
        description: "Designed with data privacy principles for EU clients.",
        icon: "Eye",
        color: "from-purple-500 to-pink-500"
      },
      {
        name: "CCPA",
        status: "Aligned",
        description: "Supports California privacy rights and consumer data protection.",
        icon: "CheckCircle",
        color: "from-teal-500 to-green-500"
      },
      {
        name: "HIPAA",
        status: "Aligned",
        description: "Safeguards PHI for firms handling healthcare matters.",
        icon: "Server",
        color: "from-orange-500 to-red-500"
      }
    ]
  },
  faq: [
    { q: "Do you train on our data?", a: "No. Customer data is never used to train public or shared models." },
    { q: "Where is our data stored?", a: "In your environment (on‑prem or private cloud). You control the region and residency." },
    { q: "How do you handle encryption and keys?", a: "TLS 1.2+ in transit, AES‑256 at rest. Use your KMS/HSM or ours." },
    { q: "How do you integrate with our DMS/IDP?", a: "Native connectors and SSO (SAML/OIDC). SCIM for provisioning and lifecycle." },
    { q: "Can we get a Security Review doc?", a: "Yes—download the whitepaper or request our SIG‑Lite package." }
  ],
  cta: {
    banner: "Want a deeper review with your security team?",
    button: "Book a private security review"
  }
}

export default function SecurityPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark-950">
        <SecurityHero copy={copy.hero} />
        <SecurityPillars copy={copy.pillars} />
        <SecurityArchitecture copy={copy.architecture} />
        <SecurityStandards copy={copy.standards} />
        <SecurityCompliance copy={copy.compliance} />
        <SecurityFAQ copy={copy.faq} />
        <SecurityCTA copy={copy.cta} />
      </main>
      <Footer />
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Security & Compliance | Sapphire Legal AI",
            "description": "Private AI for law firms. On-prem or private cloud, end-to-end encryption, zero data sharing.",
            "url": "https://sapphirelegal.ai/security",
            "about": {
              "@type": "Thing",
              "name": "AI Security & Compliance"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Sapphire Legal AI",
              "url": "https://sapphirelegal.ai"
            },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": "https://sapphirelegal.ai/images/security-hero.jpg"
            }
          })
        }}
      />
    </>
  )
} 