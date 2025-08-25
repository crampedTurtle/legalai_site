'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Play } from 'lucide-react'
import { useDemoModal } from '@/hooks/useDemoModal'
import { VideoModal } from '@/components/VideoModal'

const steps = [
  {
    number: '01',
    title: 'Client Experience First',
    description: 'Guided intake to portal in minutes.'
  },
  {
    number: '02',
    title: 'AI-Driven Docs',
    description: 'Upload, analyze, and generate filings fast.'
  },
  {
    number: '03',
    title: 'Matter & Team Flow',
    description: 'Tasks, deadlines, and collaboration automated.'
  },
  {
    number: '04',
    title: 'From Time to Cash',
    description: 'Billable capture, invoices, trust, and scheduling.'
  }
]

export function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleWatchDemo = () => {
    if (typeof window !== 'undefined' && (window as any).mt) {
      (window as any).mt('send', 'event', 'ui', 'howitworks_watch')
    }
  }

  const handleBookDemo = () => {
    if (typeof window !== 'undefined' && (window as any).mt) {
      (window as any).mt('send', 'event', 'ui', 'howitworks_demo')
    }
    useDemoModal.getState().open('howitworks:book-demo')
  }

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            From client intake to final billing — see how Sapphire Legal AI transforms your firm's workflow in just 30 minutes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sapphire-500/10 border border-sapphire-500/30 rounded-full mb-6">
                <span className="text-2xl font-bold text-sapphire-400">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-dark-300 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <VideoModal 
            videoId="cd40e8b0c3a14b9da24f138035ac4772"
            buttonLabel="Watch 45-sec demo"
            className="w-full sm:w-auto"
            onOpen={handleWatchDemo}
          />
          <Button 
            variant="secondary" 
            size="lg" 
            className="group w-full sm:w-auto"
            onClick={handleBookDemo}
          >
            Book a Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
