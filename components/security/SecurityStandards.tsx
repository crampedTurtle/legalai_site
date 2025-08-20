'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Shield, Lock, Eye, Server } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Download, FileText } from 'lucide-react'

interface SecurityStandardsProps {
  copy: Array<{
    k: string
    v: string
  }>
}

export function SecurityStandards({ copy }: SecurityStandardsProps) {
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
            Standards & Controls
          </h2>
          <p className="text-dark-300 max-w-3xl mx-auto">
            Enterprise-grade security controls and compliance standards to protect your sensitive legal data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {copy.map((standard, index) => (
            <motion.div
              key={standard.k}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="p-6 bg-dark-800 border border-dark-700 rounded-xl hover:border-sapphire-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-sapphire-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {standard.k}
                  </h3>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    {standard.v}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Compliance & Standards Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Compliance & Standards
            </h3>
            <p className="text-dark-300 max-w-3xl mx-auto">
              Sapphire Legal AI is aligned with global security and privacy frameworks. Some standards are currently aligned with our controls, while others are on our certification roadmap.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                name: "SOC 2 Type II",
                status: "Roadmap",
                description: "Controls aligned, certification in progress.",
                icon: Shield,
                color: "from-blue-500 to-cyan-500"
              },
              {
                name: "ISO 27001",
                status: "Roadmap",
                description: "Global standard for information security, planned certification.",
                icon: Lock,
                color: "from-green-500 to-emerald-500"
              },
              {
                name: "GDPR",
                status: "Aligned",
                description: "Designed with data privacy principles for EU clients.",
                icon: Eye,
                color: "from-purple-500 to-pink-500"
              },
              {
                name: "CCPA",
                status: "Aligned",
                description: "Supports California privacy rights and consumer data protection.",
                icon: CheckCircle,
                color: "from-teal-500 to-green-500"
              },
              {
                name: "HIPAA",
                status: "Aligned",
                description: "Safeguards PHI for firms handling healthcare matters.",
                icon: Server,
                color: "from-orange-500 to-red-500"
              }
            ].map((framework, index) => (
              <motion.div
                key={framework.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="p-6 bg-dark-800 border border-dark-700 rounded-xl hover:border-sapphire-500/30 transition-all duration-300"
                aria-label={`${framework.name}, ${framework.status.toLowerCase()}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${framework.color} opacity-80`}>
                    <framework.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="text-lg font-semibold text-white">
                        {framework.name}
                      </h4>
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
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center p-8 bg-dark-800 border border-dark-700 rounded-xl">
            <h4 className="text-xl font-semibold text-white mb-4">
              Want a copy of our detailed Security Whitepaper or SIG-Lite?
            </h4>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="group" asChild>
                <a href="/docs/security_whitepaper.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Whitepaper
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="secondary" size="lg" className="group" asChild>
                <a href="/docs/sapphire_legal_ai_siglite.pdf" download>
                  <FileText className="mr-2 h-5 w-5" />
                  Get SIG-Lite
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 