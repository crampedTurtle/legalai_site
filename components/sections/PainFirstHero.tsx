'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useDemoModal } from '@/hooks/useDemoModal'

export function PainFirstHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handlePersonaClick = (persona: string) => {
    useDemoModal.getState().open(`hero:${persona}`)
  }

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
          className="max-w-4xl"
        >
          <div className="space-y-8">
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Stop losing billable hours. Protect client trust. End the admin drag.
              </motion.h1>
              
              <motion.p 
                className="text-lg text-dark-300 leading-relaxed max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Sapphire Legal AI gives mid-sized firms private, compliance-ready AI—so no client work ever touches
                public tools—while semantic search and automated drafting return hours to actual lawyering.
              </motion.p>
            </div>

            {/* Persona CTAs */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <button 
                onClick={() => handlePersonaClick('partner')}
                className="inline-flex items-center justify-center rounded-md bg-sapphire-600 hover:bg-sapphire-500 text-white px-5 py-3 text-sm font-medium transition"
              >
                Protect revenue (Partner demo)
              </button>
              <button 
                onClick={() => handlePersonaClick('cfo')}
                className="inline-flex items-center justify-center rounded-md border border-neutral-600 hover:border-neutral-500 text-white px-5 py-3 text-sm font-medium transition"
              >
                Control costs (CFO briefing)
              </button>
              <button 
                onClick={() => handlePersonaClick('cio')}
                className="inline-flex items-center justify-center rounded-md border border-neutral-600 hover:border-neutral-500 text-white px-5 py-3 text-sm font-medium transition"
              >
                Secure AI (CIO walkthrough)
              </button>
            </motion.div>

            <motion.p 
              className="text-sm text-neutral-400"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Founding Firm Program: Firm features at Practice pricing — <span className="font-semibold">23/25</span> slots left.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

