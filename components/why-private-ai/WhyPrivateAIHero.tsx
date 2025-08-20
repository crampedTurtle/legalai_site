'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Shield, Lock, Eye } from 'lucide-react'

const privacyFeatures = [
  {
    icon: Shield,
    title: 'Complete Control',
    description: 'Your data never leaves your infrastructure or private cloud environment.'
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'Military-grade encryption protects your data in transit and at rest.'
  },
  {
    icon: Eye,
    title: 'Zero Data Sharing',
    description: 'Unlike public AI, your documents are never used for training or shared.'
  }
]

export function WhyPrivateAIHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
            Your Data Stays{' '}
            <span className="gradient-text">Yours—Always</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Unlike public AI tools that process your confidential legal documents on shared servers, 
            Sapphire Legal AI ensures your sensitive data never leaves your control. 
            Built with privacy and security at its core.
          </p>
        </motion.div>

        {/* Privacy Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="inline-flex p-4 bg-sapphire-500/10 rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-sapphire-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-dark-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button size="lg" className="group" asChild>
            <a href="/security">
              Learn More About Our Security
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 