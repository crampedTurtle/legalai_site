'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Lock, Eye, Database, Server, Key } from 'lucide-react'

export function SecurityCompliance() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const securityFeatures = [
    {
      icon: Server,
      title: 'AWS App Runner',
      description: 'Containerized, auto-scaling compute with built-in load balancing'
    },
    {
      icon: Database,
      title: 'Aurora PostgreSQL',
      description: 'Fully managed, highly available database with automatic backups'
    },
    {
      icon: Lock,
      title: 'S3 + KMS',
      description: 'Encrypted object storage with customer-managed encryption keys'
    },
    {
      icon: Shield,
      title: 'TLS Encryption',
      description: 'End-to-end encryption in transit and at rest'
    },
    {
      icon: Eye,
      title: 'Audit Trails',
      description: 'Comprehensive logging of all user and system actions'
    },
    {
      icon: Key,
      title: 'Role-Based Access',
      description: 'Granular permissions and multi-factor authentication'
    }
  ]

  return (
    <section className="py-20 bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security & Compliance
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto mb-6">
              Enterprise-grade security built on AWS infrastructure
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-medium">
              <Shield className="h-4 w-4" />
              No data ever shares a database
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-dark-700 bg-dark-800 hover:border-sapphire-500/30 transition-colors"
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

          {/* Compliance Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-dark-300 mb-8">Compliance certifications and standards</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {['SOC-2 Type II', 'HIPAA Ready', 'ISO 27001', 'GDPR Compliant'].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sapphire-400 font-medium"
                >
                  {cert}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
