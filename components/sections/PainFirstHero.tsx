'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useDemoModal } from '@/hooks/useDemoModal'

export function PainFirstHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handlePersonaClick = (persona: 'partner' | 'cfo' | 'cio') => {
    useDemoModal.getState().open(`hero:${persona}`, persona)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-32 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sapphire-500/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
              
              {/* Micro-proof strip */}
              <motion.div 
                className="flex items-center gap-2 text-sm text-neutral-400"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                </div>
                <span>Trusted by early adopter firms in Corporate, Litigation, and PI practices.</span>
              </motion.div>
            </div>

            {/* Persona CTAs */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex flex-wrap gap-3">
                <a
                  href="/demo?persona=partner"
                  onClick={(e) => { e.preventDefault(); handlePersonaClick('partner'); }}
                  className="inline-flex items-center justify-center rounded-md bg-sapphire-600 hover:bg-sapphire-500 text-white px-5 py-3 text-sm font-medium transition"
                  data-track="open_demo_modal"
                  data-persona="partner"
                >
                  Protect revenue (Partner demo)
                </a>
                <a
                  href="/demo?persona=cfo"
                  onClick={(e) => { e.preventDefault(); handlePersonaClick('cfo'); }}
                  className="inline-flex items-center justify-center rounded-md border border-neutral-600 hover:border-neutral-500 text-white px-5 py-3 text-sm font-medium transition"
                  data-track="open_demo_modal"
                  data-persona="cfo"
                >
                  Control costs (CFO briefing)
                </a>
                <a
                  href="/demo?persona=cio"
                  onClick={(e) => { e.preventDefault(); handlePersonaClick('cio'); }}
                  className="inline-flex items-center justify-center rounded-md border border-neutral-600 hover:border-neutral-500 text-white px-5 py-3 text-sm font-medium transition"
                  data-track="open_demo_modal"
                  data-persona="cio"
                >
                  Secure AI (CIO walkthrough)
                </a>
              </div>
              
              {/* Urgency markers */}
              <div className="flex flex-wrap gap-6 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sapphire-500 rounded-full"></div>
                  <span>See how firms are reclaiming 5+ hrs/attorney/week.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neutral-500 rounded-full"></div>
                  <span>Learn how firms cut write-offs by 30%.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neutral-500 rounded-full"></div>
                  <span>Deploy private AI without shadow IT.</span>
                </div>
              </div>
            </motion.div>

            <motion.p 
              className="text-sm text-neutral-400"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Founding Firm pricing ends when slots are gone — lock in Firm features at Practice cost <span className="font-semibold text-white">forever</span>. <span className="font-semibold">23/25</span> slots left.
            </motion.p>
          </div>
          </motion.div>
          
          {/* Motion Element - Right Side */}
          <motion.div 
            className="hidden lg:flex items-center justify-center relative"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-80 h-80">
              {/* Floating Shield */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-sapphire-500/20 to-sapphire-600/30 rounded-full border border-sapphire-500/30 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-sapphire-400 to-sapphire-600 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Cards */}
              <motion.div
                className="absolute top-8 right-8 w-16 h-12 bg-dark-800/50 border border-neutral-700 rounded-lg flex items-center justify-center"
                animate={{
                  y: [0, -8, 0],
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="w-8 h-8 bg-sapphire-500/20 rounded flex items-center justify-center">
                  <div className="w-4 h-4 bg-sapphire-400 rounded"></div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute bottom-12 left-4 w-20 h-14 bg-dark-800/50 border border-neutral-700 rounded-lg flex items-center justify-center"
                animate={{
                  y: [0, 6, 0],
                  x: [0, -3, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="w-10 h-10 bg-green-500/20 rounded flex items-center justify-center">
                  <div className="w-5 h-5 bg-green-400 rounded"></div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute top-20 left-8 w-12 h-8 bg-dark-800/50 border border-neutral-700 rounded-lg flex items-center justify-center"
                animate={{
                  y: [0, -5, 0],
                  x: [0, 2, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-400 rounded"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

