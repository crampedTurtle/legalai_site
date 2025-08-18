'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building, Users, Briefcase, CheckCircle } from 'lucide-react'

const solutions = [
  {
    icon: Building,
    title: 'Small Firms',
    description: 'Perfect for firms with 2-20 attorneys looking to modernize their practice.',
    features: ['Quick setup and deployment', 'Affordable pricing', 'Essential features', 'Dedicated support'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Midsized Firms',
    description: 'Scalable solution for growing firms with 20-100 attorneys.',
    features: ['Advanced workflow automation', 'Multi-office support', 'Custom integrations', 'Priority support'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Briefcase,
    title: 'In-House Teams',
    description: 'Enterprise-grade solution for corporate legal departments.',
    features: ['Enterprise security', 'Custom development', 'Dedicated account manager', '24/7 support'],
    color: 'from-green-500 to-emerald-500'
  }
]

export function IndustrySolutions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Solutions for Every Practice
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Tailored solutions designed to meet the unique needs of different types of legal organizations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="card-hover h-full p-6 relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${solution.color} mb-6`}>
                  <solution.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {solution.title}
                </h3>
                <p className="text-dark-300 mb-6 leading-relaxed">
                  {solution.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2">
                  {solution.features.map((feature) => (
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
      </div>
    </section>
  )
} 