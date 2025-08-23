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
            From Launch to Ongoing Success
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Every firm starts with a structured Launch Pack to configure, train, and go live. Many then continue with Managed Ops for ongoing support, compliance monitoring, and content upkeep.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Launch Pack */}
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
              <h3 className="text-2xl font-bold text-white">Launch Pack (required for new deployments)</h3>
            </div>
            
            <p className="text-sm text-dark-400 mb-4">Fixed $12,000 • 4 weeks</p>
            
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">Discovery & risk workshop</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">Guardrails & policy setup</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">Connector configuration</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">5 priority workflows</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">Admin training & pilot enablement</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">Go‑live support</span>
              </li>
            </ul>
            
            <p className="text-sm text-dark-400">Maps to Crawl → Design → Build → Validate → Launch.</p>
          </motion.div>

          {/* Right Column - Managed Ops */}
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
              <h3 className="text-2xl font-bold text-white">Managed Ops (optional add‑on)</h3>
            </div>
            
            <p className="text-sm text-dark-400 mb-4">Subscriptions from $2,000/mo</p>
            
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">Content & playbook upkeep (templates, prompts, tuning)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">Intake & triage desk (human‑in‑loop, routing, SLAs)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">Data & evaluation ops (red‑team prompts, drift watch)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">Ongoing admin & compliance support</span>
              </li>
            </ul>
            
            <p className="text-sm text-dark-400">Extends the Framework beyond launch.</p>
          </motion.div>
        </div>
        
        {/* CTA Row */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/pricing"
              className="bg-sapphire-500 hover:bg-sapphire-600 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:ring-offset-2 focus:ring-offset-dark-950"
            >
              See Pricing
            </a>
            <a
              href="/schedule"
              className="text-sapphire-400 hover:text-sapphire-300 font-medium py-3 px-6 transition-colors focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:ring-offset-2 focus:ring-offset-dark-950"
            >
              Get timeline & quote
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
