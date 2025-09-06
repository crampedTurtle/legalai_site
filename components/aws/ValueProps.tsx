'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Database, Shield, Zap, Wrench } from 'lucide-react'

export function ValueProps() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const valueProps = [
    {
      icon: Database,
      title: 'Dedicated Database',
      description: 'Each client gets their own Postgres instance on Aurora Serverless v2.',
      highlight: 'No shared schemas'
    },
    {
      icon: Shield,
      title: 'Compliance-First',
      description: 'SOC-2, HIPAA, ISO-ready foundations built into every deployment.',
      highlight: 'Enterprise security'
    },
    {
      icon: Zap,
      title: 'Provisioned in Minutes',
      description: 'From signup to full tenant automatically provisioned on AWS.',
      highlight: 'Instant setup'
    },
    {
      icon: Wrench,
      title: 'Migration Wizard',
      description: 'TrialWorks import included with guided data migration tools.',
      highlight: 'Easy transition'
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
              Why Choose AWS Deployment?
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Every tenant gets their own isolated Postgres instance. Maximum security, performance, and compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex p-4 bg-sapphire-500/20 border border-sapphire-500/30 rounded-xl mb-6 group-hover:bg-sapphire-500/30 transition-colors">
                  <prop.icon className="h-8 w-8 text-sapphire-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{prop.title}</h3>
                <p className="text-dark-300 mb-3 leading-relaxed">{prop.description}</p>
                <p className="text-sm text-sapphire-400 font-medium">{prop.highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
