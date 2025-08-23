'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, ArrowRight } from 'lucide-react'

export function FrameworkTimeline() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    {
      step: 1,
      title: 'Crawl (Discovery)',
      timeframe: 'Days 1–3',
      outcome: 'Foundation and alignment.',
      objectives: 'Align goals, define value, map current workflows.',
      keyActivities: [
        '**Intake & interviews:** current tools, bottlenecks, risks.',
        '**Data & integrations:** Clio, monday.com, DMS, email.',
        '**Use‑case prioritization:** quick wins vs. high impact.',
        '**Compliance baseline:** SOC 2 / GDPR / CCPA alignment.'
      ],
      deliverables: [
        'Current-state map',
        'Risk & dependency list',
        'Draft success scorecard'
      ]
    },
    {
      step: 2,
      title: 'Design',
      timeframe: 'Days 4–7',
      outcome: 'Target workflow and success metrics.',
      objectives: 'Define target workflows & governance.',
      keyActivities: [
        '**Process maps:** document → review → filing.',
        '**AI roles:** drafting, summarization, extraction.',
        '**Governance:** roles, RBAC, data retention.',
        '**KPIs:** time saved, error rate, cycle time.'
      ],
      deliverables: [
        'Solution design',
        'Integration spec',
        'Change plan',
        'Security baseline'
      ]
    },
    {
      step: 3,
      title: 'Build',
      timeframe: 'Weeks 2–3',
      outcome: 'Working environment configured.',
      objectives: 'Configure, connect, and automate.',
      keyActivities: [
        '**Private AI workspace:** tenant + access setup.',
        '**Connect systems:** Clio/monday.com/Drive.',
        '**Playbooks & templates:** matter/case types.',
        '**Security controls:** encryption, audit logs.'
      ],
      deliverables: [
        'Connected environment',
        'Automations & templates',
        'Audit & logging'
      ]
    },
    {
      step: 4,
      title: 'Validate',
      timeframe: 'Week 3',
      outcome: 'Prove value, tighten controls.',
      objectives: 'Prove reliability and safety.',
      keyActivities: [
        '**UAT scripts:** real docs & real matters.',
        '**Quality checks:** redlines, citations, sources.',
        '**Change requests:** iterate prompts/flows.',
        '**Compliance checkpoint:** evidence, settings, logs.'
      ],
      deliverables: [
        'UAT results',
        'Guardrail config',
        'Go-live readiness'
      ]
    },
    {
      step: 5,
      title: 'Launch',
      timeframe: 'Week 4',
      outcome: 'Go‑live and handover.',
      objectives: 'Ship and enable.',
      keyActivities: [
        '**Go‑live plan:** comms, training, support.',
        '**Champion enablement:** power‑user cohort.',
        '**Runbook:** playbooks, rollback, SLAs.',
        '**Handover:** admins, audit, reporting.'
      ],
      deliverables: [
        'Live environment',
        'Playbooks',
        'Adoption plan',
        'Week-5 review'
      ]
    }
  ]

  return (
    <section id="framework-timeline" className="py-24 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Sapphire Implementation Framework
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Our framework blends OGSM for focus and ADKAR for change adoption. In four weeks we implement Sapphire Legal AI, connect your data, and enable your team—then we operate alongside you for the next three months to lock in outcomes.
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Progress Bar - Hidden on mobile */}
          <div className="hidden lg:block absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-full bg-dark-700">
            <div className="absolute top-0 left-0 w-full h-0 bg-sapphire-500 transition-all duration-1000 ease-out"
                 style={{ height: inView ? '100%' : '0%' }} />
          </div>

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-12 items-center ${
                  index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Step Number */}
                <div className={`hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-sapphire-500 text-white font-bold text-xl absolute top-0 ${
                  index % 2 === 0 ? 'lg:left-1/2 lg:transform lg:-translate-x-8' : 'lg:right-1/2 lg:transform lg:translate-x-8'
                }`}>
                  {step.step}
                </div>

                {/* Content */}
                <div className={`${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700 hover:border-sapphire-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="lg:hidden w-12 h-12 rounded-full bg-sapphire-500 text-white font-bold text-lg flex items-center justify-center">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                        <p className="text-sapphire-400 font-medium">{step.timeframe}</p>
                        <p className="text-lg font-semibold text-white mt-1">{step.outcome}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Objectives</h4>
                        <p className="text-dark-300">{step.objectives}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Key Activities</h4>
                        <ul className="space-y-1">
                          {step.keyActivities.map((activity, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-dark-300">
                              <ArrowRight className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                              <span dangerouslySetInnerHTML={{ __html: activity.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Deliverables</h4>
                        <ul className="space-y-1">
                          {step.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-dark-300">
                              <CheckCircle className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* CTA Rows after Design and Validate */}
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/schedule"
                  className="bg-sapphire-500 hover:bg-sapphire-600 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:ring-offset-2 focus:ring-offset-dark-900"
                >
                  Request a Demo
                </a>
                <a
                  href="/resources/sample-implementation"
                  className="text-sapphire-400 hover:text-sapphire-300 font-medium py-3 px-6 transition-colors focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:ring-offset-2 focus:ring-offset-dark-900"
                >
                  See a sample implementation plan
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
