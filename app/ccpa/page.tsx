import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Page, Hero, Section, H3, P, List, Li, Link, B } from '@/components/privacy-policy/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'CCPA Compliance - California Privacy Rights | Sapphire Legal AI',
  description: 'Your California privacy rights with Sapphire Legal AI. Learn about your rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA).',
  openGraph: {
    title: 'CCPA Compliance - Sapphire Legal AI',
    description: 'Your California privacy rights with Sapphire Legal AI.',
  },
}

export default function CCPA() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <Page>
          <Hero title="CCPA Compliance" subtitle="Your California privacy rights with Sapphire Legal AI." />
          <Section>
            <H3>Your Rights Under CCPA/CPRA</H3>
            <List>
              <Li><B>Right to Know:</B> Request the categories and specific pieces of personal information we collect and how we use them.</Li>
              <Li><B>Right to Delete:</B> Request deletion of personal information, subject to legal exceptions.</Li>
              <Li><B>Right to Opt‑Out:</B> We do not sell your personal information.</Li>
              <Li><B>Non‑Discrimination:</B> You will not be discriminated against for exercising your rights.</Li>
            </List>

            <H3>How to Submit a Request</H3>
            <P>Email: <Link href="mailto:ccpa@sapphirelegal.ai">ccpa@sapphirelegal.ai</Link>. We will verify your identity consistent with applicable law.</P>

            <H3>Authorized Agents</H3>
            <P>California residents may designate an authorized agent to make a request on their behalf, subject to verification.</P>
          </Section>
        </Page>
      </main>
      <Footer />
    </div>
  )
} 