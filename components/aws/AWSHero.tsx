'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Shield, Database, Zap } from 'lucide-react'
import { useAWSTierSelectorModal } from '@/hooks/useAWSTierSelectorModal'

export function AWSHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open } = useAWSTierSelectorModal()

  return (
    <section className="relative py-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full text-sapphire-400 text-sm font-medium mb-8"
          >
            <Database className="h-4 w-4" />
            Now Available on AWS
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6"
          >
            Private AI for Law Firms —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sapphire-400 to-primary-400">
              Now on AWS
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-dark-300 leading-relaxed mb-8 max-w-4xl mx-auto"
          >
            Every client gets their own secure Postgres database. No shared schemas. Compliance-first. Built for mid-sized firms.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-dark-400"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-sapphire-400" />
              <span>Dedicated Database per Tenant</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-sapphire-400" />
              <span>Aurora PostgreSQL</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sapphire-400" />
              <span>Auto-provisioned in Minutes</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="group text-lg px-8 py-4"
              onClick={() => open('hero')}
              data-cta="aws-trial"
              data-track="aws_hero_cta"
            >
              Schedule Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group text-lg px-8 py-4"
              asChild
            >
              <a href="#how-it-works">
                See How It Works
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-sm text-dark-400 mt-8 max-w-3xl mx-auto"
          >
            <strong className="text-sapphire-400">On AWS, every tenant is provisioned with a dedicated Postgres instance and isolated environment.</strong> No data ever shares a database with other firms.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
