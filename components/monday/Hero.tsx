'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { Calendar, Play } from 'lucide-react'
import { useDemoModal } from '@/hooks/useDemoModal'

export function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open } = useDemoModal()

  return (
    <section className="relative bg-gradient-monday overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
            The Only Legal OS With Native Monday.com Integration.
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-10 text-balance">
            Keep your teams in Monday. Sapphire handles the legal intelligence, automation, and AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => open('monday-integration:hero-demo')}
              className="group bg-white text-brand-navy hover:bg-white/90"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a 15-Minute Demo
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                const element = document.getElementById('how-it-works')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="border-white text-white hover:bg-white/10"
            >
              <Play className="mr-2 h-5 w-5" />
              See How It Works
            </Button>
          </div>
        </motion.div>

        {/* Monday-style Visual Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-2xl">
            {/* Mock Board UI */}
            <div className="space-y-4">
              {/* Board Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg"></div>
                  <div>
                    <div className="h-4 w-32 bg-white/30 rounded mb-2"></div>
                    <div className="h-3 w-24 bg-white/20 rounded"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded"></div>
                  <div className="w-8 h-8 bg-white/20 rounded"></div>
                </div>
              </div>
              
              {/* Columns */}
              <div className="grid grid-cols-4 gap-4">
                {['Case Status', 'Documents', 'Deadlines', 'AI Actions'].map((col, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="h-6 bg-white/20 rounded w-24"></div>
                    {[0, 1, 2].map((item) => (
                      <div key={item} className="bg-white/10 rounded-lg p-3 space-y-2">
                        <div className="h-3 bg-white/20 rounded w-full"></div>
                        <div className="h-3 bg-white/15 rounded w-3/4"></div>
                        {idx === 3 && (
                          <div className="flex gap-1 mt-2">
                            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-center text-white/60 text-sm mt-4">
            Placeholder: Replace with actual Monday.com + Sapphire integration screenshot
          </p>
        </motion.div>
      </div>
    </section>
  )
}

