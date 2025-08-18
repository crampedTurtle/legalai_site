'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface PrivacyPolicyPageProps {
  children: React.ReactNode
}

export function Page({ children }: PrivacyPolicyPageProps) {
  return (
    <div className="pt-32 pb-24">
      {children}
    </div>
  )
}

interface HeroProps {
  title: string
  subtitle: string
}

export function Hero({ title, subtitle }: HeroProps) {
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
            {title}
          </h1>
          <p className="text-xl text-dark-300 leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

interface SectionProps {
  children: React.ReactNode
}

export function Section({ children }: SectionProps) {
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
          className="prose prose-invert prose-lg max-w-none"
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

interface MutedProps {
  children: React.ReactNode
}

export function Muted({ children }: MutedProps) {
  return (
    <p className="text-dark-400 text-sm mb-8">
      {children}
    </p>
  )
}

interface H3Props {
  children: React.ReactNode
}

export function H3({ children }: H3Props) {
  return (
    <h3 className="text-2xl font-bold text-white mt-12 mb-4 first:mt-0">
      {children}
    </h3>
  )
}

interface PProps {
  children: React.ReactNode
}

export function P({ children }: PProps) {
  return (
    <p className="text-dark-300 leading-relaxed mb-6">
      {children}
    </p>
  )
}

interface ListProps {
  children: React.ReactNode
}

export function List({ children }: ListProps) {
  return (
    <ul className="space-y-3 mb-6">
      {children}
    </ul>
  )
}

interface LiProps {
  children: React.ReactNode
}

export function Li({ children }: LiProps) {
  return (
    <li className="text-dark-300 leading-relaxed flex items-start gap-3">
      <span className="w-2 h-2 bg-sapphire-400 rounded-full mt-2 flex-shrink-0" />
      <span>{children}</span>
    </li>
  )
}

interface BProps {
  children: React.ReactNode
}

export function B({ children }: BProps) {
  return (
    <span className="font-semibold text-white">
      {children}
    </span>
  )
}

interface LinkProps {
  href: string
  children: React.ReactNode
}

export function Link({ href, children }: LinkProps) {
  return (
    <a 
      href={href}
      className="text-sapphire-400 hover:text-sapphire-300 transition-colors underline"
    >
      {children}
    </a>
  )
} 