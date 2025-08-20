import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SigLiteHero } from '@/components/siglite/SigLiteHero'
import { SigLiteContent } from '@/components/siglite/SigLiteContent'
import { SigLiteCTA } from '@/components/siglite/SigLiteCTA'

export const metadata: Metadata = {
  title: 'SIG-Lite Security Summary | Sapphire Legal AI',
  description: 'A concise, vendor-friendly overview of Sapphire Legal AI\'s security posture: deployment, encryption, IAM, logging, SDLC, and compliance roadmaps.',
  openGraph: {
    title: 'SIG-Lite Security Summary | Sapphire Legal AI',
    description: 'A concise, vendor-friendly overview of Sapphire Legal AI\'s security posture: deployment, encryption, IAM, logging, SDLC, and compliance roadmaps.',
    type: 'website',
    url: 'https://sapphirelegal.ai/siglite',
    images: [
      {
        url: 'https://sapphirelegal.ai/images/logo_full_light_trans.png',
        width: 1200,
        height: 630,
        alt: 'Sapphire Legal AI SIG-Lite Security Summary',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIG-Lite Security Summary | Sapphire Legal AI',
    description: 'A concise, vendor-friendly overview of Sapphire Legal AI\'s security posture: deployment, encryption, IAM, logging, SDLC, and compliance roadmaps.',
    images: ['https://sapphirelegal.ai/images/logo_full_light_trans.png'],
  },
}

const copy = {
  hero: {
    title: "SIG‑Lite Security Summary",
    subtitle: "A concise overview of Sapphire Legal AI's security posture for vendor due diligence.",
    primary: "Download SIG‑Lite (PDF)",
    secondary: "Full Security Whitepaper"
  },
  inside: [
    { k: "Hosting & Deployment", v: "On‑prem or private cloud; customer‑controlled data residency." },
    { k: "Data Protection", v: "AES‑256 at rest; TLS 1.2+ in transit; customer‑managed keys (KMS/HSM) supported." },
    { k: "Identity & Access", v: "SSO (SAML/OIDC), MFA, RBAC, SCIM provisioning." },
    { k: "Logging & Monitoring", v: "Comprehensive audit logs; SIEM export; configurable alerts." },
    { k: "Secure SDLC", v: "SAST/DAST, dependency scanning, signed builds, vulnerability management." },
    { k: "Compliance & Standards", v: "SOC 2 Type II & ISO 27001 on roadmap; HIPAA alignment; GDPR/CCPA principles." }
  ],
  whenToUse: "Intended for procurement and security teams who need a concise first pass. For a deeper review, use the Security Whitepaper or book a security review.",
  cta: {
    title: "Need a deeper review?",
    buttons: [
      { text: "Read the Security & Compliance Page", href: "/security" },
      { text: "Book a Private Security Review", href: "/demo" }
    ]
  }
}

export default function SigLitePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark-950">
        <SigLiteHero copy={copy.hero} />
        <SigLiteContent copy={copy} />
        <SigLiteCTA copy={copy.cta} />
      </main>
      <Footer />
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "SIG-Lite Security Summary | Sapphire Legal AI",
            "description": "A concise, vendor-friendly overview of Sapphire Legal AI's security posture: deployment, encryption, IAM, logging, SDLC, and compliance roadmaps.",
            "url": "https://sapphirelegal.ai/siglite",
            "about": {
              "@type": "Thing",
              "name": "Security and compliance summary for legal AI"
            },
            "isPartOf": {
              "@type": "Organization",
              "name": "Sapphire Legal AI",
              "url": "https://sapphirelegal.ai"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Sapphire Legal AI",
              "url": "https://sapphirelegal.ai"
            },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": "https://sapphirelegal.ai/images/logo_full_light_trans.png"
            }
          })
        }}
      />
    </>
  )
} 