'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle } from 'lucide-react'

interface SigLiteContentProps {
  copy: {
    inside: Array<{
      k: string
      v: string
    }>
    whenToUse: string
  }
}

export function SigLiteContent({ copy }: SigLiteContentProps) {
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
            What's Inside
          </h2>
          <p className="text-dark-300 max-w-3xl mx-auto">
            A comprehensive overview of our security controls and compliance posture.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {copy.inside.map((item, index) => (
            <motion.div
              key={item.k}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="p-6 bg-dark-800 border border-dark-700 rounded-xl hover:border-sapphire-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-sapphire-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.k}
                  </h3>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    {item.v}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            When to Use SIG-Lite
          </h3>
          <p className="text-dark-300 leading-relaxed">
            {copy.whenToUse}
          </p>
        </motion.div>
      </div>
    </section>
  )
} 