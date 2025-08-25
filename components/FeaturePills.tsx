'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, FileText, Workflow, CreditCard } from 'lucide-react'

const pills = [
  {
    id: 'client-experience',
    label: 'Client Portal & CRM',
    icon: Users,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'ai-docs',
    label: 'AI Document Processing & Drafting',
    icon: FileText,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'case-workflow',
    label: 'Workflow & Collaboration',
    icon: Workflow,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'billing-scheduling',
    label: 'Billing, Trust Accounting & Scheduling',
    icon: CreditCard,
    color: 'from-orange-500 to-red-500'
  }
]

export function FeaturePills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handlePillClick = (pillId: string) => {
    // Track with Mautic if available
    if (typeof window !== 'undefined' && (window as any).mt) {
      (window as any).mt('send', 'event', 'pill', pillId)
    }
  }

  return (
    <section className="py-12 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {pills.map((pill, index) => (
            <motion.a
              key={pill.id}
              href={`/features#${pill.id}`}
              onClick={() => handlePillClick(pill.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group inline-flex items-center gap-3 px-6 py-3 bg-dark-800 border border-dark-700 rounded-full text-sm font-medium text-dark-300 hover:text-white hover:border-sapphire-500/50 hover:bg-dark-700 transition-all duration-300"
            >
              <div className={`p-1.5 rounded-full bg-gradient-to-r ${pill.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                <pill.icon className="w-4 h-4 text-white" />
              </div>
              {pill.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
