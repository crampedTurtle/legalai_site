'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote, Clock, Shield, Zap } from 'lucide-react'

export function CaseStudy() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const kpis = [
    {
      icon: Clock,
      metric: '20+ hours',
      label: 'saved weekly',
      description: 'Automated document processing and research'
    },
    {
      icon: Shield,
      metric: '100%',
      label: 'compliance logs',
      description: 'Complete audit trail for all activities'
    },
    {
      icon: Zap,
      metric: '<2s',
      label: 'AI search',
      description: 'Lightning-fast document retrieval'
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
              Proven Results
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              See how law firms are transforming their practice with dedicated AI tenants
            </p>
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="p-8 rounded-xl border border-sapphire-500/30 bg-sapphire-500/5">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg">
                  <Quote className="h-6 w-6 text-sapphire-400" />
                </div>
                <div>
                  <blockquote className="text-lg text-white leading-relaxed mb-4">
                    "Having our own dedicated database on AWS gives us complete confidence in our data security. The AI capabilities have transformed how we handle document review and client communication. We're saving hours every week while maintaining the highest compliance standards."
                  </blockquote>
                  <div className="text-sapphire-400 font-medium">
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-dark-300">Managing Partner, Chen & Associates</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* KPI Row */}
          <div className="grid md:grid-cols-3 gap-8">
            {kpis.map((kpi, index) => (
              <motion.div
                key={kpi.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="text-center p-6 rounded-xl border border-dark-700 bg-dark-800"
              >
                <div className="inline-flex p-4 bg-sapphire-500/20 border border-sapphire-500/30 rounded-xl mb-4">
                  <kpi.icon className="h-8 w-8 text-sapphire-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{kpi.metric}</div>
                <div className="text-lg font-semibold text-sapphire-400 mb-2">{kpi.label}</div>
                <div className="text-sm text-dark-300">{kpi.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
