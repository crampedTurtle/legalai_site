'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Database, Shield, Zap } from 'lucide-react'
import { useAWSTierSelectorModal } from '@/hooks/useAWSTierSelectorModal'

export function FinalCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open } = useAWSTierSelectorModal()

  return (
    <section className="py-20 bg-gradient-to-br from-sapphire-500/10 via-dark-900 to-sapphire-500/10">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to see your private AI tenant on AWS?
          </h2>
          <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
            Join law firms who trust Sapphire Legal AI for their most sensitive legal work. 
            Schedule a demo to see your dedicated AWS tenant in action.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-dark-400">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-sapphire-400" />
              <span>Dedicated Postgres Instance</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-sapphire-400" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sapphire-400" />
              <span>Auto-provisioned in Minutes</span>
            </div>
          </div>

          <Button
            size="lg"
            className="group text-lg px-8 py-4 mb-6"
            onClick={() => open('final-cta')}
            data-cta="aws-final"
            data-track="aws_final_cta"
          >
            Schedule Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-sm text-dark-400">
            See your dedicated AWS tenant in action • No commitment required
          </p>
        </motion.div>
      </div>
    </section>
  )
}
