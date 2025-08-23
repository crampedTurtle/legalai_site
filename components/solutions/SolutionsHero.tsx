'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  'Complete implementation framework',
  '3-month BPO & training phase',
  'Ongoing optimization support',
  'Fractional CTO opportunities'
]

export function SolutionsHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
            Software +{' '}
            <span className="gradient-text">Enablement</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed mb-8">
            We don't just hand you software—we ensure your practice adapts and thrives. 
            Our comprehensive approach combines cutting-edge AI technology with proven 
            implementation methodologies and ongoing support.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="h-5 w-5 text-sapphire-400 flex-shrink-0" />
                <span className="text-dark-200">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button size="lg" className="group" asChild>
            <Link href="/framework">
              Explore Our Framework
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 