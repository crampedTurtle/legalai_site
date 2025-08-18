'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface IntroSectionProps {
  children: React.ReactNode
}

export function IntroSection({ children }: IntroSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-dark-900">
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
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-8">
      {children}
    </h1>
  )
}

interface ParagraphProps {
  children: React.ReactNode
}

export function Paragraph({ children }: ParagraphProps) {
  return (
    <p className="text-xl text-dark-300 leading-relaxed max-w-3xl mx-auto">
      {children}
    </p>
  )
} 