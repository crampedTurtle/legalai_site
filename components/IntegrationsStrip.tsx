'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const integrations = [
  {
    name: 'Box',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zM2.5 7.5L12 12l9.5-4.5v9L12 21l-9.5-4.5v-9z"/>
      </svg>
    )
  },
  {
    name: 'Dropbox',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M6 2l6 4 6-4v4l-6 4-6-4V2zm0 8l6 4 6-4v4l-6 4-6-4v-4zm0 8l6 4 6-4v4l-6 4-6-4v-4z"/>
      </svg>
    )
  },
  {
    name: 'DocuSign',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    )
  },
  {
    name: 'Microsoft 365',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
      </svg>
    )
  },
  {
    name: 'monday.com',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    )
  }
]

export function IntegrationsStrip() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Works with the tools you use
          </h2>
          
          {/* Integration Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-center justify-center w-16 h-16 text-dark-400 group-hover:text-white transition-colors duration-300 opacity-80 group-hover:opacity-100">
                  {integration.logo}
                </div>
                <span className="sr-only">{integration.name}</span>
              </motion.div>
            ))}
          </div>
          
          <p className="text-lg text-dark-300 max-w-2xl mx-auto">
            Secure connectors for import/export, e-signature, and task sync.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
