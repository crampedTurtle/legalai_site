'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, CheckCircle, Database, Zap, CreditCard } from 'lucide-react'

export function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    {
      number: '01',
      icon: CheckCircle,
      title: 'Schedule Demo',
      description: 'Choose your tier and schedule a personalized demo of your AWS tenant',
      details: 'See exactly how your dedicated database and compute will be configured'
    },
    {
      number: '02',
      icon: Database,
      title: 'Auto-provision',
      description: 'Dedicated DB + containerized services automatically provisioned on AWS',
      details: 'Aurora PostgreSQL instance created exclusively for your firm'
    },
    {
      number: '03',
      icon: CreditCard,
      title: '14-Day Trial',
      description: 'Use full platform → auto-converts to subscription (invoice on Day 14)',
      details: 'No commitment required. Cancel anytime during trial period'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              From signup to your private AI tenant in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-sapphire-500/50 to-transparent z-0" />
                )}

                <div className="relative z-10 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full mb-6">
                    <span className="text-2xl font-bold text-sapphire-400">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="inline-flex p-4 bg-dark-800 border border-dark-700 rounded-xl mb-6">
                    <step.icon className="h-8 w-8 text-sapphire-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-dark-300 mb-3 leading-relaxed">{step.description}</p>
                  <p className="text-sm text-sapphire-400 font-medium">{step.details}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-dark-300 mb-6">
              Ready to get started? Schedule a demo to see your dedicated AWS tenant in action.
            </p>
            <div className="flex justify-center">
              <a
                href="#tiers"
                className="inline-flex items-center gap-2 text-sapphire-400 hover:text-sapphire-300 font-medium transition-colors"
              >
                View Available Tiers
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
