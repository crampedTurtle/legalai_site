'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Download, Shield, Lock, Users } from 'lucide-react'
import { useDemoModal } from '@/hooks/useDemoModal'

export function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-32 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sapphire-500/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {/* Now Available Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800 border border-sapphire-500/30 rounded-full text-sm text-sapphire-400"
              >
                <div className="w-2 h-2 bg-sapphire-400 rounded-full" />
                Now Available for Law Firms
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                All Your Legal Work.{' '}
                <span className="text-sapphire-400">Private.</span>{' '}
                <span className="bg-gradient-to-r from-sapphire-400 to-purple-500 bg-clip-text text-transparent">Intelligent.</span>{' '}
                <span className="text-white">Secure.</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-dark-300 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Sapphire Legal AI is built exclusively for law firms. Unlike public AI tools, your data stays private, compliant, and tailored to your practice.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button size="lg" className="group" onClick={() => useDemoModal.getState().open('hero:request-demo')}>
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="lg" className="group" asChild>
                <a href="/resources">
                  <Download className="mr-2 h-5 w-5" />
                  Download Whitepaper
                </a>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 text-sm text-dark-400 border-t border-dark-800 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-sapphire-400" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-sapphire-400" />
                <span>GDPR & CCPA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-sapphire-400" />
                <span>Built for Legal Teams</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Main Shield */}
              <div className="absolute inset-0 bg-gradient-to-br from-sapphire-500/20 to-purple-500/20 rounded-full blur-3xl" />
              <div className="relative w-full h-full bg-gradient-to-br from-sapphire-500/10 to-purple-500/10 rounded-full border border-sapphire-500/30 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-sapphire-500/20 to-purple-500/20 rounded-full border border-sapphire-500/50 flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-24 h-24 text-sapphire-400" strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-8 right-8 w-8 h-8 bg-sapphire-500/30 rounded-full border border-sapphire-400/50 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-sapphire-400 rounded-full" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [10, -10, 10],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-12 left-8 w-6 h-6 bg-purple-500/30 rounded-full border border-purple-400/50 flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [-5, 15, -5],
                  x: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-1/2 -left-4 w-4 h-4 bg-sapphire-400/40 rounded-full border border-sapphire-300/60 flex items-center justify-center"
              >
                <div className="w-1 h-1 bg-sapphire-300 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 