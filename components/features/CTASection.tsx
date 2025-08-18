'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  children: React.ReactNode
}

export function CTASection({ children }: CTASectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-br from-sapphire-900/20 via-dark-900 to-purple-900/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

interface HeadlineProps {
  children: React.ReactNode
}

export function Headline({ children }: HeadlineProps) {
  return (
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
      {children}
    </h2>
  )
}

interface ParagraphProps {
  children: React.ReactNode
}

export function Paragraph({ children }: ParagraphProps) {
  return (
    <p className="text-xl text-dark-300 mb-8 leading-relaxed">
      {children}
    </p>
  )
}

interface CTAButtonProps {
  children: React.ReactNode
}

export function CTAButton({ children }: CTAButtonProps) {
  return (
    <Button size="lg" className="group">
      {children}
      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
    </Button>
  )
} 