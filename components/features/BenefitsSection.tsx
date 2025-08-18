'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface BenefitsSectionProps {
  children: React.ReactNode
}

export function BenefitsSection({ children }: BenefitsSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

interface HeadlineProps {
  children: React.ReactNode
}

export function Headline({ children }: HeadlineProps) {
  return (
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16 text-center">
      {children}
    </h2>
  )
}

interface BenefitProps {
  title: string
  children: React.ReactNode
}

export function Benefit({ title, children }: BenefitProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="card-hover p-8 rounded-xl border border-dark-700 bg-dark-800"
    >
      <h3 className="text-xl font-semibold text-white mb-4">
        {title}
      </h3>
      <p className="text-dark-300 leading-relaxed">
        {children}
      </p>
    </motion.div>
  )
} 