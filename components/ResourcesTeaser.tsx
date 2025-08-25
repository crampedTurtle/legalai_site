'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, FileText, Shield, TrendingUp } from 'lucide-react'

const resources = [
  {
    title: "Why Every Mid-Sized Firm Needs a Legal OS",
    description: "The case for consolidating your tech stack into one intelligent platform.",
    icon: FileText,
    href: "/features#client-experience",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "AI + Compliance: Adopt Safely, Move Faster",
    description: "How private AI enables innovation without compromising security.",
    icon: Shield,
    href: "/features#ai-docs",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "From 6 Tools to 1: The Economics of Consolidation",
    description: "Real ROI calculations from firms that made the switch.",
    icon: TrendingUp,
    href: "/features#case-workflow",
    color: "from-green-500 to-emerald-500"
  }
]

export function ResourcesTeaser() {
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Resources & Insights
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Learn how leading law firms are transforming their practice with AI-powered legal technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.title}
              href={resource.href}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group card-hover p-8 bg-dark-800 border border-dark-700 rounded-2xl hover:border-sapphire-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`flex-shrink-0 p-3 bg-gradient-to-r ${resource.color} rounded-lg`}>
                  <resource.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white group-hover:text-sapphire-400 transition-colors">
                    {resource.title}
                  </h3>
                </div>
              </div>
              <p className="text-dark-300 leading-relaxed mb-6">
                {resource.description}
              </p>
              <div className="flex items-center text-sapphire-400 group-hover:text-sapphire-300 transition-colors">
                <span className="text-sm font-medium">Read More</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
