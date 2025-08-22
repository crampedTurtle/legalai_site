'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RefreshCw, Zap, Database, Shield } from 'lucide-react'

export function OngoingOptimization() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const optimizationAreas = [
    {
      icon: RefreshCw,
      title: 'Quarterly Workflow Audits',
      description: 'Regular assessment and optimization of your automated workflows to ensure peak performance and efficiency.',
      color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30'
    },
    {
      icon: Zap,
      title: 'New Feature Rollout',
      description: 'Seamless integration of new Sapphire Legal AI capabilities as they become available.',
      color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30'
    },
    {
      icon: Database,
      title: 'Data Quality Improvements',
      description: 'Continuous enhancement of data accuracy, completeness, and consistency across your systems.',
      color: 'from-green-500/20 to-green-600/20 border-green-500/30'
    },
    {
      icon: Shield,
      title: 'Compliance Mapping',
      description: 'Ongoing alignment with SOC 2, HIPAA, ISO 27001, GDPR/CCPA requirements and best practices.',
      color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30'
    }
  ]

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
            Ongoing Optimization
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Continuous improvement is built into our partnership. We don't just implement—we evolve with you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {optimizationAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-dark-800 rounded-2xl p-6 border border-dark-700 hover:border-sapphire-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.color} border flex items-center justify-center mb-4`}>
                <area.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3">
                {area.title}
              </h3>
              
              <p className="text-dark-300 text-sm leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
