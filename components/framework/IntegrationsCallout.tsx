'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Database, Zap } from 'lucide-react'

export function IntegrationsCallout() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const integrations = [
    {
      name: 'Clio',
      logo: 'CLIO',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'monday.com',
      logo: 'MON',
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'Your Systems',
      logo: 'SYS',
      color: 'from-sapphire-500 to-sapphire-600'
    }
  ]

  return (
    <section className="py-16 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            We Meet You Where Your Data Lives
          </h3>
          
          {/* Integration Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {integration.logo}
                </div>
                <span className="text-dark-300 text-sm font-medium">{integration.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Additional Integration Info */}
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-start gap-3"
              >
                <Database className="h-6 w-6 text-sapphire-400 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-semibold text-white mb-2">API-First Integration</h4>
                  <p className="text-dark-300 text-sm">We integrate via API/webhooks with your existing systems, ensuring seamless data flow and minimal disruption.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-start gap-3"
              >
                <Zap className="h-6 w-6 text-sapphire-400 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-semibold text-white mb-2">Custom Connectors</h4>
                  <p className="text-dark-300 text-sm">Don't use Clio or monday.com? We'll build custom integrations for your specific tech stack.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
