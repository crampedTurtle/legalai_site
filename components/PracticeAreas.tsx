'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Scale, 
  Building2, 
  Home, 
  Heart, 
  FileText, 
  Briefcase, 
  Car, 
  Plane, 
  FileX, 
  Lightbulb, 
  Calculator, 
  Shield
} from 'lucide-react'

const practiceAreas = [
  {
    icon: Scale,
    title: 'Litigation',
    description: 'discovery, motion drafting, deposition prep',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Building2,
    title: 'Corporate',
    description: 'contract lifecycle, M&A diligence, governance',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Home,
    title: 'Real Estate',
    description: 'contract analysis, due diligence, closings',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Heart,
    title: 'Family Law',
    description: 'custody, financial affidavits, court filings',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: FileText,
    title: 'Estate Planning',
    description: 'wills/trusts, probate filings, asset management',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    icon: Briefcase,
    title: 'Employment',
    description: 'policies, investigations, separation agreements',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Car,
    title: 'Personal Injury',
    description: 'medical records, demand letters, settlements',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Plane,
    title: 'Immigration',
    description: 'petitions, RFE responses, document checklists',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: FileX,
    title: 'Bankruptcy',
    description: 'petitions, schedules, claims analysis',
    color: 'from-gray-500 to-slate-500'
  },
  {
    icon: Lightbulb,
    title: 'IP',
    description: 'office actions, prior-art search, docketing support',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    icon: Calculator,
    title: 'Tax',
    description: 'memoranda, compliance workpapers, ruling requests',
    color: 'from-emerald-500 to-green-500'
  },
  {
    icon: Shield,
    title: 'Compliance / Regulatory',
    description: 'audits, policy management, reporting',
    color: 'from-violet-500 to-purple-500'
  }
]

export function PracticeAreas() {
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
            Practice Areas We Support
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Prebuilt playbooks tuned to each discipline—ready on day one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {practiceAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group"
            >
              <div className="card-hover h-full p-6 relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${area.color} mb-4`}>
                  <area.icon className="h-6 w-6 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {area.title}
                </h3>
                <p className="text-dark-300 text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-sapphire-400 font-medium">
            All practice areas leverage our Vector Intelligence for semantic search, clause matching, and automatic document relationships.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
