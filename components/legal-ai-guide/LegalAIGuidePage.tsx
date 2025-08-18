'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, Briefcase, Shield, Map, ArrowRight } from 'lucide-react'

interface LegalAIGuidePageProps {
  children: React.ReactNode
}

export function LegalAIGuidePage({ children }: LegalAIGuidePageProps) {
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

interface ContentItem {
  subtitle: string
  text: string
}

interface GuideSectionProps {
  title: string
  description: string
  content: ContentItem[]
  icon: 'brain' | 'briefcase' | 'shield' | 'map'
}

export function GuideSection({ title, description, content, icon }: GuideSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const getIcon = () => {
    switch (icon) {
      case 'brain':
        return <Brain className="h-12 w-12" />
      case 'briefcase':
        return <Briefcase className="h-12 w-12" />
      case 'shield':
        return <Shield className="h-12 w-12" />
      case 'map':
        return <Map className="h-12 w-12" />
      default:
        return <Brain className="h-12 w-12" />
    }
  }

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="inline-flex p-4 rounded-xl bg-sapphire-500/20 border border-sapphire-500/30 mb-6">
              <div className="text-sapphire-400">
                {getIcon()}
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-xl text-dark-300 leading-relaxed">
              {description}
            </p>
          </div>
          
          <div className="space-y-8">
            {content.map((item, index) => (
              <motion.div
                key={item.subtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover p-8 rounded-xl border border-dark-700 bg-dark-800"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-sapphire-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {item.subtitle}
                    </h3>
                    <p className="text-dark-300 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 