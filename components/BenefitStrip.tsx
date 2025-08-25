'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingUp, Clock, Shield } from 'lucide-react'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Win More Clients',
    description: 'Modern portal experience and guided intake convert faster.'
  },
  {
    icon: Clock,
    title: 'Save Hours Per Case',
    description: 'AI drafting and automation remove manual work.'
  },
  {
    icon: Shield,
    title: 'Reduce Risk & Leakage',
    description: 'Built-in compliance and better time capture.'
  }
]

export function BenefitStrip() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="inline-flex p-3 bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg mb-4">
                <benefit.icon className="h-6 w-6 text-sapphire-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-dark-300 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
