import type { Metadata } from 'next'
import { Inter, IBM_Plex_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { ModalProvider } from '@/components/demo/ModalProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Sapphire Legal AI - All Your Legal Work. One Private, Intelligent Workspace.',
    template: '%s | Sapphire Legal AI'
  },
  description: 'AI-powered platform built exclusively for law firms and legal teams—secure, private, and tailored to your practice. All-in-One Legal Operating System with document intelligence, collaborative drafting, case management, and AI assistance in one private workspace.',
  keywords: [
    'legal AI',
    'law firm software',
    'document intelligence',
    'legal technology',
    'private AI',
    'legal workflow',
    'case management',
    'legal research',
    'document drafting',
    'legal automation'
  ],
  authors: [{ name: 'Sapphire Five' }],
  creator: 'Sapphire Five',
  publisher: 'Sapphire Legal AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sapphirelegal.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sapphirelegal.ai',
    title: 'Sapphire Legal AI - All Your Legal Work. One Private, Intelligent Workspace.',
    description: 'AI-powered platform built exclusively for law firms and legal teams—secure, private, and tailored to your practice.',
    siteName: 'Sapphire Legal AI',
    images: [
      {
        url: '/images/social_1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Sapphire Legal AI - Private AI for Legal Professionals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sapphire Legal AI - All Your Legal Work. One Private, Intelligent Workspace.',
    description: 'AI-powered platform built exclusively for law firms and legal teams—secure, private, and tailored to your practice.',
    images: ['/images/social_1200x630.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSans.variable}`}>
      <head>
        <link rel="icon" href="/images/favicon_32px.png" />
        <link rel="apple-touch-icon" href="/images/favicon_128px.png" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Plausible Analytics */}
        <script defer data-domain="sapphirelegal.ai" src="https://analytics.sapphirefive.com/js/script.js"></script>
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sapphire Legal AI",
              "url": "https://sapphirelegal.ai",
              "logo": "https://sapphirelegal.ai/images/logo.png",
              "description": "Private AI-powered legal operating system that eliminates backlogs, unifies tools, and helps law firms practice more profitably.",
              "sameAs": [
                "https://www.linkedin.com/company/sapphire-legal-ai"
              ],
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Sapphire Legal AI",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Private AI-powered legal operating system with 12 practice packs, EMR automation, discovery, billing, and compliance for mid-sized law firms.",
              "offers": { "@type": "Offer", "priceCurrency": "USD" },
              "publisher": { "@type": "Organization", "name": "Sapphire Legal AI" }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Sapphire Legal AI",
              "url": "https://sapphirelegal.ai/",
              "description": "The private AI-powered legal operating system for mid-sized law firms.",
              "brand": {
                "@type": "Brand",
                "name": "Sapphire Legal AI",
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "27",
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewBody": "We cleared a backlog of over 500 cases in the first month—without hiring.",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                  "author": { "@type": "Person", "name": "Jordan Patel" },
                },
                {
                  "@type": "Review",
                  "reviewBody": "Discovery time dropped by 30%. Our attorneys finally focus on strategy.",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                  "author": { "@type": "Person", "name": "Alicia Romero" },
                },
                {
                  "@type": "Review",
                  "reviewBody": "Contract review is faster and safer—AI with proper controls changed the game.",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                  "author": { "@type": "Person", "name": "David Chen" },
                },
              ],
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ModalProvider>
          {children}
        </ModalProvider>
        <Analytics />
        {/* Mautic Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Set Mautic tracking endpoint before loading the script
              window.MauticTrackingObject = 'mt';
              window.mt = window.mt || function(){(window.mt.q=window.mt.q||[]).push(arguments)};
              window.mt.trackingUrl = 'https://mautic.sapphirefive.com';
              
              (function(w,d,t,u,n,a,m){
                  w['MauticTrackingObject']=n;
                  w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
                  a=d.createElement(t);
                  m=d.getElementsByTagName(t)[0];
                  a.async=1;
                  a.src=u;
                  m.parentNode.insertBefore(a,m);
              })(window,document,'script','https://mautic.sapphirefive.com/mtc.js','mt');

              mt('send', 'pageview');
            `
          }}
        />
      </body>
    </html>
  )
} 