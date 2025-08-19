'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Book, Headphones, Users, Check, Mail, MessageSquare, Calendar } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useFormSubmission } from '@/hooks/useFormSubmission'

interface SupportPageProps {
  children: React.ReactNode
}

export function SupportPage({ children }: SupportPageProps) {
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

interface SupportSectionProps {
  title: string
  description: string
  icon: 'book' | 'headphones' | 'users'
  link?: string
  linkText?: string
  features: string[]
}

export function SupportSection({ title, description, icon, link, linkText, features }: SupportSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const getIcon = () => {
    switch (icon) {
      case 'book':
        return <Book className="h-12 w-12" />
      case 'headphones':
        return <Headphones className="h-12 w-12" />
      case 'users':
        return <Users className="h-12 w-12" />
      default:
        return <Book className="h-12 w-12" />
    }
  }

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="inline-flex p-4 rounded-xl bg-sapphire-500/20 border border-sapphire-500/30 mb-6">
              <div className="text-sapphire-400">
                {getIcon()}
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-xl text-dark-300 leading-relaxed mb-8">
              {description}
            </p>
            
            {link && linkText && (
              <Button size="lg" className="group">
                {linkText}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-lg border border-dark-700 bg-dark-800"
              >
                <Check className="h-6 w-6 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300 leading-relaxed">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface ContactFormData {
  name: string
  email: string
  subject: string
  priority: string
  message: string
}

export function ContactForm() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>()
  const { submitForm, isSubmitting, isSuccess, error, reset: resetSubmission } = useFormSubmission('support', {
    onSuccess: () => {
      reset()
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    await submitForm(data)
  }

  return (
    <section className="py-20 bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Submit a Support Ticket
            </h2>
            <p className="text-xl text-dark-300">
              Our team will get back to you as soon as possible.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
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
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                  Subject *
                </label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent"
                  placeholder="Brief description of your issue"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-white mb-2">
                  Priority
                </label>
                <select
                  {...register('priority')}
                  id="priority"
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
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
                placeholder="Please describe your issue in detail..."
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
              <MessageSquare className="mr-2 h-5 w-5" />
              {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {isSuccess && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">Support ticket submitted successfully! We'll get back to you soon.</p>
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