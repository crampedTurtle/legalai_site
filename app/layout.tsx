import type { Metadata } from 'next'
import { Inter, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { DemoModalProvider } from '@/components/demo/DemoModalProvider'

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
  description: 'AI-powered platform built exclusively for law firms and legal teams—secure, private, and tailored to your practice. Document intelligence, collaborative drafting, case management, and AI assistance in one private workspace.',
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
              "@type": "SoftwareApplication",
              "name": "Sapphire Legal AI",
              "description": "AI-powered platform built exclusively for law firms and legal teams—secure, private, and tailored to your practice.",
              "url": "https://sapphirelegal.ai",
              "applicationCategory": "LegalApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "provider": {
                "@type": "Organization",
                "name": "Sapphire Five",
                "url": "https://sapphirefive.com"
              }
            })
          }}
        />
      </head>
                   <body className={`${inter.className} antialiased`}>
        <DemoModalProvider>
          {children}
        </DemoModalProvider>
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