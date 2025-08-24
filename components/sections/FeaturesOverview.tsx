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
  Shield,
  Clock,
  BarChart3
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Document Intelligence',
    description: 'Upload, process, and analyze legal documents with AI-powered insights and smart search capabilities.',
    benefits: ['Smart document processing', 'Citation analysis', 'Precedent search', 'Automated summaries'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Collaborative Drafting',
    description: 'Real-time document editing with AI assistance, clause templates, and seamless team collaboration.',
    benefits: ['Real-time collaboration', 'AI drafting assistance', 'Clause templates', 'Version control'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Search,
    title: 'Case Management',
    description: 'Comprehensive case management with intake forms, workflow automation, and task management.',
    benefits: ['Intake automation', 'Workflow management', 'Task tracking', 'Client portal'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    title: 'AI Assistant',
    description: 'Intelligent AI chat, document generation, and insights tailored specifically for legal professionals.',
    benefits: ['AI chat support', 'Document generation', 'Legal insights', 'Research assistance'],
    color: 'from-orange-500 to-red-500'
  }
]

export function FeaturesOverview() {
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Everything You Need in{' '}
            <span className="gradient-text">One Platform</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            From document processing to case management, Sapphire Legal AI provides all the tools your practice needs in a secure, private environment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-hover h-full p-6 relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Benefits */}
                <ul className="space-y-2 mb-6">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center text-sm text-dark-300">
                      <div className="w-1.5 h-1.5 bg-sapphire-400 rounded-full mr-3" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                {/* Learn More Link */}
                <div className="mt-auto relative z-10">
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      console.log(`CLICKED! Navigating to: /features#${feature.title.toLowerCase().replace(/\s+/g, '-')}`)
                      console.log('Feature title:', feature.title)
                      console.log('Generated href:', `/features#${feature.title.toLowerCase().replace(/\s+/g, '-')}`)
                      console.log('Button clicked successfully!')
                      
                      // Try programmatic navigation
                      window.location.href = `/features#${feature.title.toLowerCase().replace(/\s+/g, '-')}`
                    }}
                    onMouseEnter={() => console.log('Mouse entered button')}
                    onMouseDown={() => console.log('Mouse down on button')}
                    className="inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sapphire-400 focus:ring-offset-2 focus:ring-offset-dark-950 h-9 px-3 text-sm rounded-md bg-transparent text-sapphire-400 hover:text-white hover:bg-sapphire-500/10 group/link cursor-pointer"
                    style={{ 
                      pointerEvents: 'auto',
                      position: 'relative',
                      zIndex: 30,
                      userSelect: 'none'
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                  
                  {/* Debug info */}
                  <div className="text-xs text-dark-400 mt-2">
                    Target: {`/features#${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-sapphire-500/10 rounded-full mx-auto mb-4">
              <Shield className="h-8 w-8 text-sapphire-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-dark-300">Private & Secure</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">80%</div>
            <div className="text-dark-300">Time Saved</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-full mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">3x</div>
            <div className="text-dark-300">Productivity Boost</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mx-auto mb-4">
              <Users className="h-8 w-8 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-dark-300">AI Support</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a 
            href="/features"
            className="inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sapphire-400 focus:ring-offset-2 focus:ring-offset-dark-950 h-14 px-8 text-lg rounded-xl bg-gradient-to-r from-sapphire-500 to-primary-600 hover:from-sapphire-600 hover:to-primary-700 text-white transform hover:scale-105 hover:shadow-glow group"
          >
            Explore All Features
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
} 