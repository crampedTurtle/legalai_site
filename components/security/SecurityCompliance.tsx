'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Lock, Eye, CheckCircle, Server } from 'lucide-react'

const iconMap = {
  Shield,
  Lock,
  Eye,
  CheckCircle,
  Server
}

interface SecurityComplianceProps {
  copy: {
    title: string
    subtitle: string
    frameworks: Array<{
      name: string
      status: string
      description: string
      icon: string
      color: string
    }>
  }
}

export function SecurityCompliance({ copy }: SecurityComplianceProps) {
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
            {copy.title}
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            {copy.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {copy.frameworks.map((framework, index) => (
            <motion.div
              key={framework.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="p-6 bg-dark-800 border border-dark-700 rounded-xl hover:border-sapphire-500/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${framework.color} opacity-80`}>
                  {React.createElement(iconMap[framework.icon as keyof typeof iconMap], { className: "h-6 w-6 text-white" })}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-white">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 