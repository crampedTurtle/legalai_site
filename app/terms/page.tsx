import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Page, Hero, Section, Muted, H3, P, List, Li, Link } from '@/components/privacy-policy/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'Terms of Service - Legal Agreement | Sapphire Legal AI',
  description: 'Please read these terms before using Sapphire Legal AI. Our terms of service outline your rights and responsibilities when using our platform.',
  openGraph: {
    title: 'Terms of Service - Sapphire Legal AI',
    description: 'Please read these terms before using Sapphire Legal AI.',
  },
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <Page>
          <Hero title="Terms of Service" subtitle="Please read these terms before using Sapphire Legal AI." />
          <Section>
            <Muted>Last updated: December 15, 2024</Muted>

            <H3>Acceptance of Terms</H3>
            <P>By accessing or using Sapphire Legal AI (the "Service"), you agree to these Terms of Service and our Privacy Policy.</P>

            <H3>Use of the Service</H3>
            <List>
              <Li>You will not use the Service for unlawful purposes or to store illegal content.</Li>
              <Li>You are responsible for maintaining the confidentiality of your account credentials.</Li>
              <Li>All data you upload remains your property. We will not use your data to train public models.</Li>
            </List>

            <H3>Intellectual Property</H3>
            <P>The Service, software, and branding are owned by Sapphire Legal AI. You may not copy, resell, or sublicense the Service without written consent.</P>

            <H3>Disclaimers & Limitation of Liability</H3>
            <P>The Service is provided "as is." We do not provide legal advice. To the fullest extent permitted by law, Sapphire Legal AI is not liable for indirect, incidental, special, or consequential damages.</P>

            <H3>Termination</H3>
            <P>We may suspend or terminate access for violations of these terms. Upon termination, your right to use the Service ceases immediately.</P>

            <H3>Contact</H3>
            <P>Questions about these terms: <Link href="mailto:legal@sapphirelegal.ai">legal@sapphirelegal.ai</Link></P>
          </Section>
        </Page>
      </main>
      <Footer />
    </div>
  )
} 