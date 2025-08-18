'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Download, Play } from 'lucide-react'

export function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const metrics = [
    { label: 'Documents', value: 51, icon: '📄' },
    { label: 'Active Cases', value: 8, icon: '💼' },
    { label: 'Pending Tasks', value: 7, icon: '⏰' },
    { label: 'Processed', value: 51, icon: '✅' },
    { label: 'Collaborations', value: 1, icon: '👥' },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-32 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sapphire-500/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
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
                <span className="text-sapphire-400">One</span>{' '}
                <span className="bg-gradient-to-r from-sapphire-400 to-purple-500 bg-clip-text text-transparent">Private,</span>{' '}
                Intelligent{' '}
                <span className="text-white">Workspace.</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-dark-300 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                AI-powered platform built exclusively for law firms and legal teams—secure, private, and tailored to your practice.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button size="lg" className="group">
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="lg" className="group">
                <Download className="mr-2 h-5 w-5" />
                Download Whitepaper
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex items-center gap-6 text-sm text-dark-400"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Private AI</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>GDPR Compliant</span>
              </div>
            </motion.div>
          </motion.div>


        </div>
      </div>
    </section>
  )
} 