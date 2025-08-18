'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react'

const securityFeatures = [
  {
    icon: Shield,
    title: 'SOC 2 Type II Certified',
    description: 'Enterprise-grade security with comprehensive audit trails and compliance reporting.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit and at rest with military-grade encryption standards.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Eye,
    title: 'GDPR & CCPA Compliant',
    description: 'Full compliance with international privacy regulations and data protection laws.',
    color: 'from-purple-500 to-pink-500'
  }
]

export function SecurityFeatures() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
            Enterprise-Grade Security
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Built with security and compliance at its core, ensuring your data is always protected.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="card-hover h-full p-6 text-center relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 