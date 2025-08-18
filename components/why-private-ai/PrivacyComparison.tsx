'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, CheckCircle } from 'lucide-react'

export function PrivacyComparison() {
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
            Public AI vs. Private AI
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            See the difference between public AI tools and Sapphire Legal AI's private approach.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Public AI Problems */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              The Problem with Public AI
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                  <X className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Data Leakage</h4>
                  <p className="text-dark-300 text-sm">
                    Your confidential legal documents are processed on shared servers and may be used for training.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                  <X className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">No Privacy Controls</h4>
                  <p className="text-dark-300 text-sm">
                    Limited control over data retention, access, and compliance with legal industry standards.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                  <X className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Generic Responses</h4>
                  <p className="text-dark-300 text-sm">
                    AI trained on general data, not legal-specific knowledge and terminology.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sapphire Solution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              The Sapphire Solution
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Complete Privacy</h4>
                  <p className="text-dark-300 text-sm">
                    Your data never leaves your control. Process everything on your own infrastructure.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Legal-Specific AI</h4>
                  <p className="text-dark-300 text-sm">
                    AI trained specifically on legal documents, cases, and industry knowledge.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Compliance Ready</h4>
                  <p className="text-dark-300 text-sm">
                    Built for legal industry compliance with audit trails and reporting.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 