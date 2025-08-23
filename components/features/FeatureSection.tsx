'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface FeatureSectionProps {
  title: string
  children: React.ReactNode
  id?: string
}

export function FeatureSection({ title, children, id }: FeatureSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-dark-900" id={id}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            {title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface FeatureProps {
  title: string
  children: React.ReactNode
}

export function Feature({ title, children }: FeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="card-hover p-6 rounded-xl border border-dark-700 bg-dark-800"
    >
      <h3 className="text-xl font-semibold text-white mb-3">
        {title}
      </h3>
      <p className="text-dark-300 leading-relaxed">
        {children}
      </p>
    </motion.div>
  )
} 