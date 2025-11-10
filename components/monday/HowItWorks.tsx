'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Plug, CheckSquare, Settings, FileText, Mail, RefreshCw } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Plug,
    title: 'Connect Monday to Sapphire',
    description: 'One-click OAuth connection. Authorize Sapphire to access your Monday.com workspace.',
  },
  {
    number: 2,
    icon: CheckSquare,
    title: 'Choose Boards to Sync',
    description: 'Select which Monday boards should sync with Sapphire cases. Map columns and statuses.',
  },
  {
    number: 3,
    icon: Settings,
    title: 'Enable Case/Board Automations',
    description: 'Set up rules: new Monday item creates Sapphire case, status changes trigger workflows.',
  },
  {
    number: 4,
    icon: FileText,
    title: 'Documents Auto-Link to Cases',
    description: 'Uploads to Monday automatically appear in Sapphire. Documents indexed and searchable.',
  },
  {
    number: 5,
    icon: Mail,
    title: 'Letters Generate Automatically',
    description: 'AI drafts demand letters, notices, and correspondence based on case data from Monday.',
  },
  {
    number: 6,
    icon: RefreshCw,
    title: 'Real-Time Sync',
    description: 'Updates flow between systems instantly. No delays, no manual refresh needed.',
  },
]

export function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="how-it-works" className="py-24 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How the Integration Works
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Six simple steps to connect your Monday.com workspace with Sapphire's legal intelligence.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-dark-700 hidden md:block"></div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex gap-8 items-start"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-sapphire-500/10 border-2 border-sapphire-500 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-sapphire-400" />
                    </div>
                    <div className="absolute inset-0 bg-sapphire-500/20 rounded-full animate-pulse"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-sapphire-400">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-dark-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

