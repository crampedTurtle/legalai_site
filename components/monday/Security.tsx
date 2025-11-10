'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Lock, Database, Search, Eye, FileText } from 'lucide-react'

const securityFeatures = [
  {
    icon: Shield,
    title: 'Private AI',
    description: 'No public LLMs. All AI processing happens in your private, isolated environment.',
  },
  {
    icon: Lock,
    title: 'Tenant-Isolated Environment',
    description: 'Complete data isolation. Your firm\'s data never touches other tenants\' systems.',
  },
  {
    icon: Database,
    title: 'Monday API v2',
    description: 'Uses the latest Monday.com API v2 for secure, reliable data synchronization.',
  },
  {
    icon: Search,
    title: 'OpenSearch',
    description: 'Enterprise-grade search infrastructure. Your documents indexed securely.',
  },
  {
    icon: Eye,
    title: 'Zero Data Bleed',
    description: 'Strict access controls ensure data only flows where you authorize. No cross-contamination.',
  },
  {
    icon: FileText,
    title: 'Full Access Logs & Audit History',
    description: 'Complete audit trail of all API calls, document access, and system changes.',
  },
]

export function Security() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical & Security
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Enterprise-grade security and compliance built into every integration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800/50 border border-dark-700 rounded-xl p-6 hover:border-sapphire-500/50 transition-all duration-300"
              >
                <div className="inline-flex p-3 bg-green-500/10 border border-green-500/30 rounded-lg mb-4">
                  <Icon className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-dark-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

