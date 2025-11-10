import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MediaKitPage } from '@/components/media-kit/MediaKitPage'

export const metadata: Metadata = {
  title: 'Media Kit | Sapphire Legal AI',
  description: 'Brand assets, logos, company information, and press resources for media and partners. Download logos, brand guidelines, and company boilerplate.',
  openGraph: {
    title: 'Media Kit | Sapphire Legal AI',
    description: 'Brand assets, logos, and resources for media and partners.',
  },
}

export default function MediaKit() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <MediaKitPage />
      </main>
      <Footer />
    </div>
  )
}

