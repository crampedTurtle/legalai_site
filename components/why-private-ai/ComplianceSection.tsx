'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

const complianceBadges = [
  'SOC 2 Type II', 'GDPR', 'CCPA', 'HIPAA', 'ISO 27001', 'FedRAMP'
]

export function ComplianceSection() {
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
            Industry-Standard Compliance
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto mb-8">
            Meet the highest standards of security and compliance required by the legal industry.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {complianceBadges.map((badge) => (
              <div
                key={badge}
                className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-full text-sm text-sapphire-400 hover:border-sapphire-500 transition-colors"
              >
                {badge}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-lg text-dark-300 mb-6">
            Ready to experience truly private AI for your legal practice?
          </p>
          <Button size="lg" className="group">
            Schedule a Security Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 