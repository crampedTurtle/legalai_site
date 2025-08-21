'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Shield, Zap, CheckCircle } from 'lucide-react'

interface AboutPageProps {
  children: React.ReactNode
}

export function AboutPage({ children }: AboutPageProps) {
  return (
    <div className="pt-32 pb-24">
      {children}
    </div>
  )
}

interface HeadlineProps {
  children: React.ReactNode
}

export function Headline({ children }: HeadlineProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
            {children}
          </h1>
        </motion.div>
      </div>
    </section>
  )
}

interface SubheadProps {
  children: React.ReactNode
}

export function Subhead({ children }: SubheadProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xl text-dark-300 leading-relaxed">
            {children}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

interface MissionSectionProps {
  children: React.ReactNode
}

export function MissionSection({ children }: MissionSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

interface TwoColumnProps {
  children: React.ReactNode
}

export function TwoColumn({ children }: TwoColumnProps) {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      {children}
    </div>
  )
}

interface ColumnProps {
  children: React.ReactNode
}

export function Column({ children }: ColumnProps) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  )
}

interface SectionTitleProps {
  children: React.ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
      {children}
    </h2>
  )
}

interface SectionTextProps {
  children: React.ReactNode
}

export function SectionText({ children }: SectionTextProps) {
  return (
    <p className="text-lg text-dark-300 leading-relaxed">
      {children}
    </p>
  )
}

interface ValuesSectionProps {
  children: React.ReactNode
}

export function ValuesSection({ children }: ValuesSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

interface ValueCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

export function ValueCard({ icon, title, description, index }: ValueCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-6 rounded-xl border border-dark-700 bg-dark-800 hover:border-sapphire-500/50 transition-colors"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-sapphire-500/10 text-sapphire-400">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-dark-300 leading-relaxed">{description}</p>
    </motion.div>
  )
}

interface QuoteSectionProps {
  children: React.ReactNode
}

export function QuoteSection({ children }: QuoteSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <blockquote className="border-l-4 border-sapphire-500 pl-6 text-xl md:text-2xl italic text-dark-300 leading-relaxed">
            {children}
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}

interface CTASectionProps {
  children: React.ReactNode
}

export function CTASection({ children }: CTASectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

interface CTAButtonProps {
  href: string
  children: React.ReactNode
}

export function CTAButton({ href, children }: CTAButtonProps) {
  return (
    <Button size="lg" className="group" asChild>
      <a href={href}>
        {children}
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </a>
    </Button>
  )
} 