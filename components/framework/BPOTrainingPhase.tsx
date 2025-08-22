'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Clock, TrendingUp, Users } from 'lucide-react'

export function BPOTrainingPhase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const whatWeOperate = [
    'Queue triage & exception handling',
    'Template/library upkeep',
    'Weekly enablement',
    'KPI tracking',
    'Feedback loop to improve automations'
  ]

  const whatYouGet = [
    'Time-to-value',
    'Adoption',
    'Measurable SLA improvements'
  ]

  const slaMetrics = [
    { metric: 'MTTR', value: '< 2 hours', description: 'Mean Time To Resolution' },
    { metric: 'Turnaround Time', value: '< 4 hours', description: 'Document processing' },
    { metric: 'Uptime', value: '99.9%', description: 'System availability' },
    { metric: 'Response Time', value: '< 30 min', description: 'Support response' }
  ]

  return (
    <section className="py-24 bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            3-Month BPO & Training Phase
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            We operate with you to cement adoption and outcomes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - What We Operate */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-dark-800 rounded-2xl p-8 border border-dark-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-sapphire-500 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">What We Operate</h3>
            </div>
            
            <ul className="space-y-3">
              {whatWeOperate.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - What You Get */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-dark-800 rounded-2xl p-8 border border-dark-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-sapphire-500 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">What You Get</h3>
            </div>
            
            <ul className="space-y-3 mb-8">
              {whatYouGet.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-300">{item}</span>
                </li>
              ))}
            </ul>

            {/* SLA Table */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Service Level Agreements</h4>
              <div className="bg-dark-700 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-dark-600">
                      <th className="px-4 py-3 text-left text-sm font-medium text-dark-200">Metric</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-dark-200">Target</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-dark-200">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slaMetrics.map((sla, index) => (
                      <tr key={index} className="border-t border-dark-600">
                        <td className="px-4 py-3 text-sm font-medium text-white">{sla.metric}</td>
                        <td className="px-4 py-3 text-sm text-sapphire-400 font-semibold">{sla.value}</td>
                        <td className="px-4 py-3 text-sm text-dark-300">{sla.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
