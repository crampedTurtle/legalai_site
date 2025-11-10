'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Scale, FileCheck, Clock, Users, FolderTree, History, Calendar, FileText } from 'lucide-react'

const practiceAreas = [
  {
    title: 'For PI Firms',
    icon: Scale,
    benefits: [
      {
        icon: FileText,
        title: 'Automated Demand Letters',
        description: 'Generate demand letters automatically from Monday case data. Medical records, liability analysis, and settlement calculations included.',
      },
      {
        icon: FolderTree,
        title: 'Medical Records Workflow',
        description: 'Track medical records requests and responses in Monday. Auto-link to Sapphire case documents for easy access.',
      },
      {
        icon: Scale,
        title: 'Liability Analysis',
        description: 'AI analyzes case facts from Monday items and generates liability assessments. Updates sync back to your boards.',
      },
      {
        icon: Calendar,
        title: 'Litigation Task Sync',
        description: 'Discovery deadlines, motion filings, and court dates sync between Monday boards and Sapphire calendars.',
      },
    ],
  },
  {
    title: 'For Probate Firms',
    icon: FileCheck,
    benefits: [
      {
        icon: FolderTree,
        title: 'Estate Inventory Workflows',
        description: 'Track estate assets in Monday. Automatically create Sapphire case folders with document templates.',
      },
      {
        icon: History,
        title: 'Document Versioning',
        description: 'Will drafts, codicils, and trust documents version-controlled in Sapphire. Status updates reflect in Monday.',
      },
      {
        icon: Clock,
        title: 'Auto-Timeline Generation',
        description: 'Sapphire builds probate timelines from Monday task dates. Deadlines and court dates auto-populate.',
      },
      {
        icon: Users,
        title: 'Client Updates Synced',
        description: 'Beneficiary communications and status updates flow from Sapphire to Monday. Keep everyone informed.',
      },
    ],
  },
]

export function PracticeAreas() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Practice Area Specific Benefits
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Tailored workflows for PI and probate firms using Monday.com.
          </p>
        </motion.div>

        <div className="space-y-16">
          {practiceAreas.map((area, areaIndex) => {
            const AreaIcon = area.icon
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: areaIndex * 0.2 }}
                className="bg-dark-800/50 border border-dark-700 rounded-2xl p-8 lg:p-12"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg">
                    <AreaIcon className="h-8 w-8 text-sapphire-400" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {area.title}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {area.benefits.map((benefit, benefitIndex) => {
                    const BenefitIcon = benefit.icon
                    return (
                      <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: areaIndex * 0.2 + benefitIndex * 0.1 }}
                        className="bg-dark-900/50 border border-dark-700 rounded-xl p-6 hover:border-sapphire-500/50 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 p-2 bg-sapphire-500/10 rounded-lg">
                            <BenefitIcon className="h-5 w-5 text-sapphire-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">
                              {benefit.title}
                            </h4>
                            <p className="text-dark-300 text-sm leading-relaxed">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

