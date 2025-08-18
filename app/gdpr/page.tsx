import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Page, Hero, Section, H3, P, List, Li, Link, B } from '@/components/privacy-policy/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'GDPR Compliance - EU Data Protection | Sapphire Legal AI',
  description: 'Our approach to EU data protection and privacy. Sapphire Legal AI aligns with the General Data Protection Regulation (GDPR) for customers located in the European Union.',
  openGraph: {
    title: 'GDPR Compliance - Sapphire Legal AI',
    description: 'Our approach to EU data protection and privacy.',
  },
}

export default function GDPR() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <Page>
          <Hero title="GDPR Compliance" subtitle="Our approach to EU data protection and privacy." />
          <Section>
            <H3>Our Commitment</H3>
            <P>Sapphire Legal AI aligns with the General Data Protection Regulation (GDPR) for customers located in the European Union.</P>

            <H3>Key Principles</H3>
            <List>
              <Li><B>Lawful Basis:</B> We process personal data based on consent, contract necessity, or legitimate interests.</Li>
              <Li><B>Data Subject Rights:</B> Access, rectification, erasure, restriction, portability, and objection.</Li>
              <Li><B>Data Minimization:</B> We collect only what is necessary to deliver and improve the Service.</Li>
              <Li><B>Security:</B> Encryption, role‑based access, audit logs, and private deployment options.</Li>
              <Li><B>Data Residency:</B> EU hosting options available to support local residency requirements.</Li>
              <Li><B>Subprocessors:</B> We use GDPR‑compliant vendors under written agreements and conduct due diligence.</Li>
            </List>

            <H3>Exercising Your Rights</H3>
            <P>To submit a GDPR request, contact our Data Protection Officer: <Link href="mailto:dpo@sapphirelegal.ai">dpo@sapphirelegal.ai</Link></P>
          </Section>
        </Page>
      </main>
      <Footer />
    </div>
  )
} 