'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Lock, EyeOff } from 'lucide-react'

interface SecurityPillarsProps {
  copy: Array<{
    title: string
    desc: string
  }>
}

const icons = [Shield, Lock, EyeOff]

export function SecurityPillars({ copy }: SecurityPillarsProps) {
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
          className="grid md:grid-cols-3 gap-8"
        >
          {copy.map((pillar, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-8 bg-dark-800 border border-dark-700 rounded-xl text-center group hover:border-sapphire-500/30 transition-colors"
              >
                <div className="inline-flex p-4 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg mb-6 group-hover:bg-sapphire-500/30 transition-colors">
                  <Icon className="h-8 w-8 text-sapphire-400" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  {pillar.title}
                </h3>
                
                <p className="text-dark-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
} 