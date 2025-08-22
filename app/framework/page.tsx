import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FrameworkHero } from '@/components/framework/FrameworkHero'
import { FrameworkTimeline } from '@/components/framework/FrameworkTimeline'
import { BPOTrainingPhase } from '@/components/framework/BPOTrainingPhase'
import { OngoingOptimization } from '@/components/framework/OngoingOptimization'
import { FractionalCTO } from '@/components/framework/FractionalCTO'
import { IntegrationsCallout } from '@/components/framework/IntegrationsCallout'
import { FrameworkFAQ } from '@/components/framework/FrameworkFAQ'
import { FrameworkCTA } from '@/components/framework/FrameworkCTA'

export const metadata: Metadata = {
  title: 'Sapphire Implementation Framework | Software + Enablement',
  description: 'We combine private AI with proven change management (OGSM, ADKAR) to deliver outcomes within 4 weeks, then a 3-month BPO & training phase.',
  openGraph: {
    title: 'Sapphire Implementation Framework | Software + Enablement',
    description: 'We combine private AI with proven change management (OGSM, ADKAR) to deliver outcomes within 4 weeks, then a 3-month BPO & training phase.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sapphire Implementation Framework | Software + Enablement',
    description: 'We combine private AI with proven change management (OGSM, ADKAR) to deliver outcomes within 4 weeks, then a 3-month BPO & training phase.',
  },
}

export default function FrameworkPage() {
  return (
    <div className="min-h-screen bg-dark-950" data-analytics="framework_view">
      <Header />
      <main>
        <FrameworkHero />
        <FrameworkTimeline />
        <BPOTrainingPhase />
        <OngoingOptimization />
        <FractionalCTO />
        <IntegrationsCallout />
        <FrameworkFAQ />
        <FrameworkCTA />
      </main>
      <Footer />
    </div>
  )
}
