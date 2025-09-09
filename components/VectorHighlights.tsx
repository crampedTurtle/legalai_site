'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, Search, Link, FileText, BarChart3, Target, Zap, CheckCircle } from 'lucide-react'

const vectorFeatures = [
  {
    icon: Search,
    title: 'Semantic Document Search',
    description: 'Find by meaning, not just keywords'
  },
  {
    icon: Link,
    title: 'Automatic Document Relationships',
    description: 'Discover connections between filings and exhibits'
  },
  {
    icon: FileText,
    title: 'Contract Similarity Matching',
    description: 'Compare contracts and clauses instantly'
  },
  {
    icon: BarChart3,
    title: 'Vector Database Analytics',
    description: 'Monitor your AI knowledge base'
  },
  {
    icon: Target,
    title: 'Practice-Specific Intelligence',
    description: 'Tailored results per practice area'
  },
  {
    icon: CheckCircle,
    title: 'Real-time Similarity Scoring',
    description: 'Confidence you can explain in court'
  },
  {
    icon: Zap,
    title: 'Seamless Integration',
    description: 'Vector ops work across search, drafting, and case management'
  }
]

export function VectorHighlights() {
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
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full text-sapphire-400 text-sm font-medium mb-6">
              <Brain className="h-4 w-4" />
              Vector Intelligence
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vector Intelligence — Your Firm's Private AI Brain
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Transform your documents into a searchable, intelligent knowledge base that understands context and relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vectorFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl border border-dark-700 bg-dark-800 hover:border-sapphire-500/30 transition-colors"
              >
                <div className="flex-shrink-0 p-3 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg">
                  <feature.icon className="h-6 w-6 text-sapphire-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-dark-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
