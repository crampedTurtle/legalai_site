'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Shield, Lock, Eye, CheckCircle, Server } from 'lucide-react'
import { useSecurityDemoModal } from '@/hooks/useSecurityDemoModal'

const complianceFrameworks = [
  {
    name: 'SOC 2 Type II',
    status: 'Roadmap',
    description: 'Controls aligned, certification in progress.',
    icon: Shield,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'ISO 27001',
    status: 'Roadmap',
    description: 'Global standard for information security, planned certification.',
    icon: Lock,
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'GDPR',
    status: 'Aligned',
    description: 'Designed with data privacy principles for EU clients.',
    icon: Eye,
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'CCPA',
    status: 'Aligned',
    description: 'Supports California privacy rights and consumer data protection.',
    icon: CheckCircle,
    color: 'from-teal-500 to-green-500'
  },
  {
    name: 'HIPAA',
    status: 'Aligned',
    description: 'Safeguards PHI for firms handling healthcare matters.',
    icon: Server,
    color: 'from-orange-500 to-red-500'
  }
]

export function ComplianceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open } = useSecurityDemoModal()

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
            Compliance Alignment & Roadmap
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto mb-12">
            Our security controls align with industry standards. We're committed to achieving full certification while maintaining transparency about our current status.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {complianceFrameworks.map((framework, index) => (
              <motion.div
                key={framework.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <a 
                  href="/security"
                  className="block p-6 bg-dark-800 border border-dark-700 rounded-xl hover:border-sapphire-500/30 hover:bg-dark-750 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-sapphire-500/10"
                  aria-label={`${framework.name}, ${framework.status.toLowerCase()}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${framework.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                      <framework.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-sapphire-400 transition-colors">
                          {framework.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          framework.status === 'Roadmap' 
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                            : 'bg-green-500/20 text-green-400 border border-green-500/30'
                        }`}>
                          {framework.status}
                        </span>
                      </div>
                      <p className="text-sm text-dark-300 leading-relaxed">
                        {framework.description}
                      </p>
                    </div>
                  </div>
                </a>
              </motion.div>
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
          <Button size="lg" className="group" onClick={() => open('why-private-ai:security-demo')}>
            Schedule a Security Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 