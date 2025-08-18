'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Users, TrendingUp, CheckCircle } from 'lucide-react'

const phases = [
  {
    icon: Code,
    title: 'Phase 1: Deploy',
    subtitle: 'Sapphire Legal AI (on-premise or private cloud)',
    description: 'Infrastructure setup, initial configuration, and security hardening.',
    color: 'from-sapphire-500 to-primary-600',
    features: ['Infrastructure setup', 'Initial configuration', 'Security hardening']
  },
  {
    icon: Users,
    title: 'Phase 2: Enable',
    subtitle: '3-month BPO & training phase',
    description: 'Comprehensive training, workflow optimization, and change management.',
    color: 'from-purple-500 to-pink-600',
    features: ['Comprehensive training', 'Workflow optimization', 'Change management']
  },
  {
    icon: TrendingUp,
    title: 'Phase 3: Optimize',
    subtitle: 'Ongoing optimization & support',
    description: 'Performance monitoring, continuous improvement, and fractional CTO support.',
    color: 'from-green-500 to-emerald-600',
    features: ['Performance monitoring', 'Continuous improvement', 'Fractional CTO support']
  }
]

export function ImplementationFramework() {
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
            Sapphire Implementation Framework
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Our proven three-phase approach ensures successful adoption and maximum ROI for your legal practice.
          </p>
        </motion.div>

        <div className="space-y-12">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card-hover p-8"
            >
              <div className="flex items-start gap-6">
                <div className={`flex-shrink-0 p-4 rounded-xl bg-gradient-to-br ${phase.color}`}>
                  <phase.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sapphire-400 font-medium mb-3">
                    {phase.subtitle}
                  </p>
                  <p className="text-dark-300 mb-6">
                    {phase.description}
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {phase.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sapphire-400 flex-shrink-0" />
                        <span className="text-sm text-dark-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 