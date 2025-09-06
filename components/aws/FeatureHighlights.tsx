'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Brain, FileText, Users, BarChart3, Shield } from 'lucide-react'

export function FeatureHighlights() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const phases = [
    {
      title: 'Phase 1: Foundation',
      icon: Shield,
      features: [
        'Private workspace setup',
        'Guardrails & redaction',
        'Basic workflows',
        'Policy controls'
      ],
      status: 'Implemented'
    },
    {
      title: 'Phase 2: Intelligence',
      icon: Brain,
      features: [
        'Document Intelligence',
        'Citation Validation',
        'Workflow Optimization',
        'Model routing'
      ],
      status: 'Implemented'
    },
    {
      title: 'Phase 3: Advanced',
      icon: BarChart3,
      features: [
        'Contract Intelligence',
        'Client Intelligence',
        'Enhanced Retention',
        'Advanced analytics'
      ],
      status: 'Implemented'
    }
  ]

  const additionalFeatures = [
    {
      icon: FileText,
      title: 'AI Negotiation',
      description: 'Intelligent contract negotiation with risk assessment and optimization suggestions'
    },
    {
      icon: Users,
      title: 'Legacy Journaling',
      description: 'Automated time tracking and journaling for accurate billing and compliance'
    }
  ]

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Feature Highlights
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              All phases implemented, plus advanced AI negotiation and legacy journaling capabilities
            </p>
          </div>

          {/* Implementation Phases */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-dark-700 bg-dark-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg">
                    <phase.icon className="h-6 w-6 text-sapphire-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-medium">
                      <CheckCircle className="h-3 w-3" />
                      {phase.status}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-sapphire-400 flex-shrink-0" />
                      <span className="text-sm text-dark-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="p-6 rounded-xl border border-sapphire-500/30 bg-sapphire-500/5"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg">
                    <feature.icon className="h-6 w-6 text-sapphire-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-dark-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
