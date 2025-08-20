'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle } from 'lucide-react'

interface SecurityStandardsProps {
  copy: Array<{
    k: string
    v: string
  }>
}

export function SecurityStandards({ copy }: SecurityStandardsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Standards & Controls
          </h2>
          <p className="text-dark-300 max-w-3xl mx-auto">
            Enterprise-grade security controls and compliance standards to protect your sensitive legal data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {copy.map((standard, index) => (
            <motion.div
              key={standard.k}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="p-6 bg-dark-800 border border-dark-700 rounded-xl hover:border-sapphire-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-sapphire-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {standard.k}
                  </h3>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    {standard.v}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-8 bg-dark-800 border border-dark-700 rounded-xl text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            On the Roadmap
          </h3>
          <p className="text-dark-300 mb-6">
            SOC 2 Type II, ISO 27001, and additional compliance certifications.
          </p>
          <a 
            href="/demo" 
            className="inline-flex items-center gap-2 text-sapphire-400 hover:text-sapphire-300 transition-colors font-medium"
          >
            Request our Security Overview
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
} 