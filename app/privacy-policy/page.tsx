import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Page, Hero, Section, Muted, H3, P, List, Li, Link } from '@/components/privacy-policy/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'Privacy Policy - Data Protection & Confidentiality | Sapphire Legal AI',
  description: 'We protect your data and your clients\' confidentiality. Learn about our privacy practices, data security, and your rights.',
  openGraph: {
    title: 'Privacy Policy - Sapphire Legal AI',
    description: 'We protect your data and your clients\' confidentiality.',
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <Page>
          <Hero title="Privacy Policy" subtitle="We protect your data and your clients' confidentiality." />
          <Section>
            <Muted>Last updated: December 15, 2024</Muted>

            <H3>Overview</H3>
            <P>At Sapphire Legal AI, we value and protect your privacy. This policy explains what we collect, how we use it, and the choices you have.</P>

            <H3>Information We Collect</H3>
            <List>
              <Li>Contact details (name, email, phone) when you request a demo, subscribe, or contact support.</Li>
              <Li>Usage data (pages visited, device/browser, interactions) to improve our platform.</Li>
              <Li>Client documents and case information uploaded by you, stored in your private environment.</Li>
            </List>

            <H3>How We Use Information</H3>
            <List>
              <Li>Provide, operate, and improve Sapphire Legal AI.</Li>
              <Li>Communicate about features, updates, security, and support.</Li>
              <Li>Meet legal, regulatory, and contractual obligations.</Li>
            </List>

            <H3>Data Security</H3>
            <P>We use encryption in transit and at rest, role‑based access controls, audit logging, and private deployment options (private cloud or on‑prem).</P>

            <H3>Your Rights</H3>
            <List>
              <Li>Access, correction, deletion of personal information (subject to applicable law).</Li>
              <Li>Opt‑out of marketing communications.</Li>
            </List>
            <P>Privacy requests: <Link href="mailto:privacy@sapphirelegal.ai">privacy@sapphirelegal.ai</Link></P>

            <H3>Changes to This Policy</H3>
            <P>We may update this policy to reflect product, legal, or regulatory changes. We'll update the "Last updated" date above.</P>
          </Section>
        </Page>
      </main>
      <Footer />
    </div>
  )
} 