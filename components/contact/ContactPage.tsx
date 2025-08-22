'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Mail, Linkedin, Calendar } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useFormSubmission } from '@/hooks/useFormSubmission'
import { submitLead } from '@/lib/lead/submitLead'

interface ContactPageProps {
  children: React.ReactNode
}

export function ContactPage({ children }: ContactPageProps) {
  return (
    <div className="pt-32 pb-24">
      {children}
    </div>
  )
}

interface HeadlineProps {
  children: React.ReactNode
}

export function Headline({ children }: HeadlineProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
            {children}
          </h1>
        </motion.div>
      </div>
    </section>
  )
}

interface ContactFormData {
  name: string
  email: string
  firm: string
  message: string
}

export function ContactForm() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>()
  const { submitForm, isSubmitting, isSuccess, error, reset: resetSubmission } = useFormSubmission('contact', {
    onSuccess: () => {
      reset()
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Capture lead in Supabase
      await submitLead({
        email: data.email,
        name: data.name,
        firm_name: data.firm,
        notes: data.message,
        wants_demo: false,
        source: 'contact:general',
      })
    } catch (error) {
      console.error('Failed to capture lead:', error)
      // Continue with contact form submission even if lead capture fails
    }
    
    await submitForm(data)
  }

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Send us a Message
            </h2>
            <p className="text-xl text-dark-300">
              Have questions about Sapphire Legal AI? We're here to help.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Name *
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email *
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent"
                placeholder="your.email@firm.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="firm" className="block text-sm font-medium text-white mb-2">
                Firm
              </label>
              <input
                {...register('firm')}
                type="text"
                id="firm"
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent"
                placeholder="Your law firm name"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                Message *
              </label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                id="message"
                rows={6}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent resize-vertical"
                placeholder="Tell us about your needs or questions..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-full group" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {isSuccess && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export function ContactSidebar() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-sm"
        >
          <div className="card-hover p-8 rounded-xl border border-dark-700 bg-dark-800">
            <h3 className="text-2xl font-bold text-white mb-6">
              Get in Touch
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-sapphire-500/20 border border-sapphire-500/30">
                  <Mail className="h-6 w-6 text-sapphire-400" />
                </div>
                <div>
                  <p className="text-sm text-dark-400">Email us at</p>
                  <a 
                    href="mailto:hello@sapphirelegal.ai" 
                    className="text-white hover:text-sapphire-400 transition-colors font-medium"
                  >
                    hello@sapphirelegal.ai
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-sapphire-500/20 border border-sapphire-500/30">
                  <Linkedin className="h-6 w-6 text-sapphire-400" />
                </div>
                <div>
                  <p className="text-sm text-dark-400">Follow us on</p>
                  <a 
                    href="https://linkedin.com/company/sapphire-legal-ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-sapphire-400 transition-colors font-medium"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              
              <div className="pt-6 border-t border-dark-600">
                <Button size="lg" className="w-full group" asChild>
                  <a href="https://cal.com/s5-brett" target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule a Demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 