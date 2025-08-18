'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { 
  FileText, 
  Users, 
  Search, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const featurePillars = [
  {
    icon: FileText,
    title: 'Document Intelligence',
    description: 'AI-powered document processing, analysis, and smart search capabilities.',
    color: 'from-blue-500 to-cyan-500',
    features: ['Smart document processing', 'Citation analysis', 'Precedent search', 'Automated summaries']
  },
  {
    icon: Users,
    title: 'Collaborative Drafting',
    description: 'Real-time document editing with AI assistance and team collaboration.',
    color: 'from-purple-500 to-pink-500',
    features: ['Real-time collaboration', 'AI drafting assistance', 'Clause templates', 'Version control']
  },
  {
    icon: Search,
    title: 'Case Management',
    description: 'Comprehensive case management with workflow automation and task tracking.',
    color: 'from-green-500 to-emerald-500',
    features: ['Intake automation', 'Workflow management', 'Task tracking', 'Client portal']
  },
  {
    icon: Zap,
    title: 'AI Assistant',
    description: 'Intelligent AI chat and document generation for legal professionals.',
    color: 'from-orange-500 to-red-500',
    features: ['AI chat support', 'Document generation', 'Legal insights', 'Research assistance']
  }
]

export function FeaturesHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
            Powerful Features for{' '}
            <span className="gradient-text">Modern Legal Practice</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Sapphire Legal AI combines four powerful pillars to create a comprehensive legal workspace 
            that adapts to your practice's unique needs and workflows.
          </p>
        </motion.div>

        {/* Feature Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featurePillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-hover h-full p-6 text-center relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${pillar.color} mb-6`}>
                  <pillar.icon className="h-10 w-10 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-dark-300 mb-6 leading-relaxed">
                  {pillar.description}
                </p>
                
                {/* Key Features */}
                <ul className="space-y-2 text-left">
                  {pillar.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-dark-300">
                      <CheckCircle className="h-4 w-4 text-sapphire-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button size="lg" className="group">
            See Features in Action
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 