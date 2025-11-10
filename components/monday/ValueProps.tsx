'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RefreshCw, Zap, Workflow } from 'lucide-react'

const valueProps = [
  {
    icon: RefreshCw,
    title: 'Zero Double Entry',
    description: 'Cases, boards, tasks, deadlines, and documents stay in sync. Update once, sync everywhere.',
  },
  {
    icon: Zap,
    title: 'AI-Powered Automation',
    description: 'Generate letters, link documents, and trigger workflows automatically. Save 5-10 hours per week.',
  },
  {
    icon: Workflow,
    title: 'Fits Existing Workflows',
    description: 'Your Monday boards stay the same — Sapphire enhances everything around them. No disruption.',
  },
]

export function ValueProps() {
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
            Why Monday.com + Sapphire
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            The only integration that brings legal intelligence to your existing Monday workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-dark-800/50 border border-dark-700 rounded-xl p-8 hover:border-sapphire-500/50 transition-all duration-300"
            >
              <div className="inline-flex p-3 bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg mb-6">
                <prop.icon className="h-6 w-6 text-sapphire-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {prop.title}
              </h3>
              <p className="text-dark-300 leading-relaxed">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

