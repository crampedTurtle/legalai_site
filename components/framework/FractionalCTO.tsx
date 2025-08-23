'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Building2, Shield, TrendingUp } from 'lucide-react'

export function FractionalCTO() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const ctoServices = [
    {
      icon: Target,
      title: 'Strategic Roadmap',
      description: 'Long-term technology planning aligned with your firm\'s growth objectives and market demands.'
    },
    {
      icon: Building2,
      title: 'Vendor Evaluations',
      description: 'Objective assessment of technology partners and solutions to ensure optimal fit and ROI.'
    },
    {
      icon: Shield,
      title: 'Security Governance',
      description: 'Comprehensive security strategy and compliance framework to protect your data and systems.'
    },
    {
      icon: TrendingUp,
      title: 'Data Platform Strategy',
      description: 'Architecture decisions for data integration, analytics, and platform scalability.'
    }
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
            Fractional CTO Opportunities
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            As your practice scales, new opportunities emerge. If you want strategic support beyond the product, Sapphire offers optional Fractional CTO services in areas such as:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {ctoServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-dark-800 rounded-2xl p-8 border border-dark-700 hover:border-sapphire-500/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-sapphire-500/20 border border-sapphire-500/30 flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-sapphire-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {service.title}
              </h3>
              
              <p className="text-dark-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Technology Leadership Without the Overhead
            </h3>
            <p className="text-dark-300 text-lg mb-6">
              Our fractional CTO services give you access to enterprise-level technology strategy and governance without the full-time commitment. We become an extension of your leadership team, providing the expertise you need when you need it.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full text-sm text-sapphire-400">
              <Shield className="h-4 w-4" />
              Available as add-on to implementation packages
            </div>
            <p className="text-sm text-dark-400 mt-4">Optional. Month‑to‑month. No long contracts.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
