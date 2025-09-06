'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function TrustBar() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const trustItems = [
    { name: 'AWS', logo: '☁️' },
    { name: 'SOC-2', logo: '🛡️' },
    { name: 'HIPAA', logo: '🏥' },
    { name: 'ISO 27001', logo: '✅' },
  ]

  return (
    <section className="py-12 bg-dark-900 border-y border-dark-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-dark-400 mb-8">Trusted by law firms with enterprise-grade security</p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-3 text-dark-300 hover:text-white transition-colors"
              >
                <span className="text-2xl">{item.logo}</span>
                <span className="text-lg font-medium">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
