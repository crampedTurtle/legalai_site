'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FileText, Search, CheckCircle } from 'lucide-react'

export function DocumentIntelligence() {
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
            Document Intelligence
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            AI-powered document processing, analysis, and smart search capabilities.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 