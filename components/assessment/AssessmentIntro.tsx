'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, CheckCircle, Clock, FileText, BarChart3 } from 'lucide-react'

interface AssessmentIntroProps {
  onStart: () => void
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  const features = [
    {
      icon: Clock,
      title: '15-20 minutes',
      description: 'Complete the assessment at your own pace'
    },
    {
      icon: FileText,
      title: '25 questions',
      description: 'Comprehensive evaluation across 5 key areas'
    },
    {
      icon: BarChart3,
      title: 'Detailed report',
      description: 'Get personalized recommendations and insights'
    },
    {
      icon: CheckCircle,
      title: 'Free PDF report',
      description: 'Receive your results via email with actionable next steps'
    }
  ]

  return (
    <div className="text-center space-y-12">
      {/* Header */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full text-sm text-sapphire-400"
        >
          <div className="w-2 h-2 bg-sapphire-400 rounded-full" />
          AI Readiness Assessment
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Is Your Firm Ready for{' '}
          <span className="text-sapphire-400">AI Adoption?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed"
        >
          Evaluate your law firm's readiness for AI adoption with our comprehensive assessment. 
          Get personalized insights and recommendations to accelerate your AI journey.
        </motion.p>
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            className="p-6 bg-dark-800 border border-dark-700 rounded-xl text-center"
          >
            <div className="inline-flex p-3 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg mb-4">
              <feature.icon className="h-6 w-6 text-sapphire-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-dark-300 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Assessment Areas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white">What We'll Assess</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'AI Strategy & Vision',
            'Data Readiness & Quality',
            'Technology Infrastructure',
            'Team Capabilities & Skills',
            'Implementation & Change Management'
          ].map((area, index) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-3 p-4 bg-dark-800 border border-dark-700 rounded-lg"
            >
              <CheckCircle className="h-5 w-5 text-sapphire-400 flex-shrink-0" />
              <span className="text-dark-200">{area}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="space-y-4"
      >
        <Button size="lg" className="group" onClick={onStart}>
          Start Your Assessment
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        <p className="text-sm text-dark-400">
          No registration required • Takes 15-20 minutes • Get your free report
        </p>
      </motion.div>
    </div>
  )
} 