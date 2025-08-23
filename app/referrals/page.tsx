import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ReferralsPage } from '@/components/referrals/ReferralsPage'

export const metadata: Metadata = {
  title: 'Referral Partner Program | Sapphire Legal AI',
  description: 'Earn 10% for introducing law firms to Sapphire Legal AI — the private, compliant AI workspace with a proven 4‑week Launch Pack.',
  openGraph: {
    title: 'Referral Partner Program | Sapphire Legal AI',
    description: 'Earn 10% for introducing law firms to Sapphire Legal AI — the private, compliant AI workspace with a proven 4‑week Launch Pack.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Referral Partner Program | Sapphire Legal AI',
    description: 'Earn 10% for introducing law firms to Sapphire Legal AI — the private, compliant AI workspace with a proven 4‑week Launch Pack.',
  },
}

export default function Referrals() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <ReferralsPage />
      </main>
      <Footer />
    </div>
  )
}
