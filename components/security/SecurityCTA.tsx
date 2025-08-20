'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Shield } from 'lucide-react'

interface SecurityCTAProps {
  copy: {
    banner: string
    button: string
  }
}

export function SecurityCTA({ copy }: SecurityCTAProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-br from-sapphire-900/20 via-dark-900 to-purple-900/20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex p-4 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg mb-8">
            <Shield className="h-8 w-8 text-sapphire-400" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {copy.banner}
          </h2>
          
          <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
            Schedule a comprehensive security review with our team. We'll walk through our architecture, 
            answer your specific questions, and provide detailed documentation for your security team.
          </p>
          
          <Button 
            size="lg" 
            className="group"
            asChild
          >
            <a href="/demo">
              {copy.button}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 