'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Shield, 
  Lock, 
  Eye, 
  CheckCircle, 
  Server, 
  Users,
  ArrowRight
} from 'lucide-react'

const trustFeatures = [
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
  },
  {
    icon: Server,
    title: 'Private Cloud Deployment',
    description: 'Deploy on your own infrastructure or use our secure private cloud environment.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Users,
    title: 'Role-Based Access Control',
    description: 'Granular permissions and access controls tailored to your firm\'s structure.',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: CheckCircle,
    title: 'Audit-Ready Compliance',
    description: 'Comprehensive logging and reporting for regulatory audits and internal reviews.',
    color: 'from-teal-500 to-green-500'
  }
]

const complianceBadges = [
  'SOC 2 Type II', 'GDPR', 'CCPA', 'HIPAA', 'ISO 27001', 'FedRAMP'
]

export function TrustSection() {
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
            Your Data Stays{' '}
            <span className="gradient-text">Yours—Always</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Unlike public AI tools, Sapphire Legal AI ensures your sensitive legal data never leaves your control. 
            Built with enterprise-grade security and compliance at its core.
          </p>
        </motion.div>

        {/* Trust Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-hover h-full p-6 relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
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

        {/* Compliance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-semibold text-white mb-8">
            Industry-Standard Compliance
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {complianceBadges.map((badge) => (
              <div
                key={badge}
                className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-full text-sm text-sapphire-400 hover:border-sapphire-500 transition-colors"
              >
                {badge}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Public AI Problems */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">
              The Problem with Public AI
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Data Leakage</h4>
                  <p className="text-dark-300 text-sm">
                    Your confidential legal documents are processed on shared servers and may be used for training.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">No Privacy Controls</h4>
                  <p className="text-dark-300 text-sm">
                    Limited control over data retention, access, and compliance with legal industry standards.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Generic Responses</h4>
                  <p className="text-dark-300 text-sm">
                    AI trained on general data, not legal-specific knowledge and terminology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sapphire Solution */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">
              The Sapphire Solution
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Complete Privacy</h4>
                  <p className="text-dark-300 text-sm">
                    Your data never leaves your control. Process everything on your own infrastructure.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Legal-Specific AI</h4>
                  <p className="text-dark-300 text-sm">
                    AI trained specifically on legal documents, cases, and industry knowledge.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Compliance Ready</h4>
                  <p className="text-dark-300 text-sm">
                    Built for legal industry compliance with audit trails and reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-dark-300 mb-6">
            Ready to experience truly private AI for your legal practice?
          </p>
          <button className="btn-primary group">
            Schedule a Security Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
} 