'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Calendar, Play, CheckCircle } from 'lucide-react'

const demoBenefits = [
  '30-minute personalized walkthrough',
  'See real legal workflows in action',
  'Security & compliance demonstration',
  'Custom implementation discussion',
  'No sales pressure - just education',
  'Free consultation included'
]

export function DemoHero() {
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
            See Sapphire Legal AI{' '}
            <span className="gradient-text">in Action</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Experience how our private AI platform can transform your legal practice. 
            Get a personalized demo tailored to your specific needs and workflows.
          </p>
        </motion.div>

        {/* Demo Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {demoBenefits.map((benefit, index) => (
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
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="group" asChild>
            <a href="https://cal.com/s5-brett" target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button variant="secondary" size="lg" className="group">
            <Play className="mr-2 h-5 w-5" />
            Watch Product Demo
          </Button>
        </motion.div>

        {/* Cal.com Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-dark-300 mb-4">
            Or schedule directly with our calendar:
          </p>
          <a
            href="https://cal.com/s5-brett"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sapphire-400 hover:text-sapphire-300 transition-colors"
          >
            <Calendar className="h-5 w-5" />
            cal.com/s5-brett
          </a>
        </motion.div>
      </div>
    </section>
  )
} 