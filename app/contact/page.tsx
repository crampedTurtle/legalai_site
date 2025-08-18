import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactPage, Headline, ContactForm, ContactSidebar } from '@/components/contact/ContactPage'

export const metadata: Metadata = {
  title: 'Contact - Get in Touch | Sapphire Legal AI',
  description: 'We\'d love to hear from you. Contact Sapphire Legal AI for questions, demos, or to learn more about our private AI solutions for law firms.',
  openGraph: {
    title: 'Contact - Sapphire Legal AI',
    description: 'Get in touch with our team.',
  },
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <ContactPage>
          <Headline>We'd Love to Hear From You</Headline>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="lg:col-span-1">
              <ContactSidebar />
            </div>
          </div>
        </ContactPage>
      </main>
      <Footer />
    </div>
  )
} 