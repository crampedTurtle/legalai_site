'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useBookingModal } from '@/hooks/useBookingModal'

export function FrameworkHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open } = useBookingModal()

  const valuePoints = [
    'Complete implementation framework',
    '3-month BPO & training phase',
    'Ongoing optimization support',
    'Fractional CTO opportunities'
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-32 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sapphire-500/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Beyond Software: A Proven Framework for Adoption + Success
          </motion.h1>
          
          {/* Subheading */}
          <motion.p
            className="text-xl text-dark-300 leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            More than a platform—we deliver a repeatable enablement model that gets your firm from pilot to value in weeks, not months.
          </motion.p>

          {/* Value Points */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {valuePoints.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-left"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <CheckCircle className="h-6 w-6 text-sapphire-400 flex-shrink-0" />
                <span className="text-dark-200">{point}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Button variant="secondary" size="lg" className="group" onClick={() => open()}>
              Book Implementation Consult
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
