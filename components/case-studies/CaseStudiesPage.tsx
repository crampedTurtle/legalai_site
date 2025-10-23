'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote, TrendingUp, Clock, Users, Shield, ArrowRight } from 'lucide-react'
import { track } from '@/lib/analytics'

interface CaseStudy {
  id: string
  title: string
  firm: string
  practiceArea: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    description: string
  }[]
  testimonial: {
    quote: string
    author: string
    title: string
  }
  featured?: boolean
}

const caseStudies: CaseStudy[] = [
  {
    id: 'westlake-injury',
    title: 'Eliminating 500+ Case Backlog in 30 Days',
    firm: 'Westlake Injury Group',
    practiceArea: 'Personal Injury',
    challenge: 'Managing a backlog of over 500 personal injury cases with limited staff, leading to delayed client responses and potential case value loss.',
    solution: 'Implemented Sapphire Legal AI with automated case intake, document processing, and client communication workflows.',
    results: [
      { metric: 'Cases Cleared', value: '500+', description: 'Backlog eliminated in first month' },
      { metric: 'Time Saved', value: '40 hrs/week', description: 'Per attorney on administrative tasks' },
      { metric: 'Client Satisfaction', value: '+85%', description: 'Improvement in response times' }
    ],
    testimonial: {
      quote: "We cleared a backlog of over 500 cases in the first month—without hiring. The AI handles routine tasks so our attorneys can focus on what matters most: winning cases for our clients.",
      author: "Jordan Patel",
      title: "Managing Partner"
    },
    featured: true
  },
  {
    id: 'romero-klein',
    title: '30% Reduction in Discovery Time',
    firm: 'Romero, Klein & Danz',
    practiceArea: 'Litigation',
    challenge: 'Discovery processes taking 60+ hours per case, limiting attorney capacity and increasing client costs.',
    solution: 'Deployed AI-powered document review and analysis tools with automated privilege detection and relevance scoring.',
    results: [
      { metric: 'Discovery Time', value: '-30%', description: 'Reduction in hours per case' },
      { metric: 'Accuracy', value: '98%', description: 'Document classification accuracy' },
      { metric: 'Cost Savings', value: '$2.3M', description: 'Annual savings on discovery costs' }
    ],
    testimonial: {
      quote: "Discovery time dropped by 30%. Our attorneys finally focus on strategy instead of document review. The AI catches things we might miss and works 24/7.",
      author: "Alicia Romero",
      title: "Litigation Chair"
    }
  },
  {
    id: 'harborpoint-capital',
    title: 'Faster, Safer Contract Review',
    firm: 'HarborPoint Capital',
    practiceArea: 'Corporate',
    challenge: 'Contract review taking 8-12 hours per agreement with risk of missing critical terms or compliance issues.',
    solution: 'Integrated AI contract analysis with risk assessment, compliance checking, and automated redlining capabilities.',
    results: [
      { metric: 'Review Time', value: '-75%', description: 'Faster contract processing' },
      { metric: 'Risk Detection', value: '+95%', description: 'Improvement in issue identification' },
      { metric: 'Compliance', value: '100%', description: 'Regulatory requirement coverage' }
    ],
    testimonial: {
      quote: "Contract review is faster and safer—AI with proper controls changed the game. We catch more issues, review faster, and our clients get better outcomes.",
      author: "David Chen",
      title: "General Counsel"
    }
  },
  {
    id: 'regional-firm',
    title: '40% Increase in Client Conversion',
    firm: 'Regional Law Firm',
    practiceArea: 'General Practice',
    challenge: 'Low conversion rates from initial consultations to retained clients due to delayed follow-up and generic communication.',
    solution: 'Implemented AI-powered client portal with automated follow-up sequences, personalized communication, and case status tracking.',
    results: [
      { metric: 'Conversion Rate', value: '+40%', description: 'Consultation to retention' },
      { metric: 'Response Time', value: '<2 hrs', description: 'Average client response time' },
      { metric: 'Client Retention', value: '+25%', description: 'Year-over-year improvement' }
    ],
    testimonial: {
      quote: "The client portal alone increased our conversion rate by 40%. Clients love the transparency and we love the efficiency. It's a win-win.",
      author: "Practice Manager",
      title: "Regional Firm"
    }
  },
  {
    id: 'mid-sized-firm',
    title: '6 Tools Replaced with One Platform',
    firm: 'Mid-Sized Law Firm',
    practiceArea: 'Multi-Practice',
    challenge: 'Managing 6 different software tools for case management, billing, document storage, communication, calendaring, and client intake.',
    solution: 'Consolidated all operations into Sapphire Legal AI's unified platform with integrated workflows and single sign-on.',
    results: [
      { metric: 'Tools Consolidated', value: '6→1', description: 'Single platform solution' },
      { metric: 'Training Time', value: '-80%', description: 'Reduction in onboarding time' },
      { metric: 'Monthly Costs', value: '-$4,200', description: 'Software licensing savings' }
    ],
    testimonial: {
      quote: "Sapphire replaced 6 tools with one — our team finally works in one place. No more switching between systems or losing data in the gaps.",
      author: "Managing Partner",
      title: "50-lawyer firm"
    }
  },
  {
    id: 'compliance-focused',
    title: 'Compliance-First AI Implementation',
    firm: 'Compliance-Focused Firm',
    practiceArea: 'Regulatory',
    challenge: 'Need for AI capabilities while maintaining strict compliance with legal industry regulations and client confidentiality requirements.',
    solution: 'Deployed private AI infrastructure with built-in compliance controls, audit trails, and data sovereignty features.',
    results: [
      { metric: 'Compliance Score', value: '100%', description: 'Regulatory requirement adherence' },
      { metric: 'Audit Readiness', value: '24/7', description: 'Real-time compliance monitoring' },
      { metric: 'Data Security', value: 'SOC 2', description: 'Type II certified infrastructure' }
    ],
    testimonial: {
      quote: "Compliance-first and AI-native. We saved hours per case within weeks while maintaining the highest security standards our clients expect.",
      author: "Director of Ops",
      title: "Mid-sized firm"
    }
  }
]

export default function CaseStudiesPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const featuredCaseStudy = caseStudies.find(cs => cs.featured)
  const otherCaseStudies = caseStudies.filter(cs => !cs.featured)

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Real Results from Real Firms
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 max-w-3xl mx-auto">
              See how law firms across the country are transforming their practice with Sapphire Legal AI. 
              From eliminating backlogs to increasing efficiency, these case studies show the measurable impact of AI-powered legal operations.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => {
                  track("cta_case_studies_book_demo_clicked");
                  // Add demo modal trigger here
                }}
                className="rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Case Study */}
      {featuredCaseStudy && (
        <section className="py-20 bg-slate-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-white">Featured Case Study</h2>
              <p className="mt-4 text-slate-300">See how one firm eliminated their entire case backlog</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-slate-800 rounded-2xl p-8 lg:p-12 border border-slate-700"
            >
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-sky-500/20 text-sky-400 text-sm font-medium rounded-full">
                      {featuredCaseStudy.practiceArea}
                    </span>
                    <span className="text-slate-400 text-sm">{featuredCaseStudy.firm}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6">{featuredCaseStudy.title}</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Challenge</h4>
                      <p className="text-slate-200">{featuredCaseStudy.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Solution</h4>
                      <p className="text-slate-200">{featuredCaseStudy.solution}</p>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <Quote className="h-6 w-6 text-sky-400 mt-1 flex-shrink-0" />
                      <div>
                        <blockquote className="text-slate-200 italic mb-4">
                          "{featuredCaseStudy.testimonial.quote}"
                        </blockquote>
                        <div className="text-sm">
                          <div className="font-semibold text-white">{featuredCaseStudy.testimonial.author}</div>
                          <div className="text-slate-400">{featuredCaseStudy.testimonial.title}, {featuredCaseStudy.firm}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Key Results</h4>
                  <div className="space-y-4">
                    {featuredCaseStudy.results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        className="bg-slate-700/30 rounded-lg p-4 border border-slate-600"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-sky-500/20 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-sky-400" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white">{result.value}</div>
                            <div className="text-sm font-medium text-slate-300">{result.metric}</div>
                            <div className="text-xs text-slate-400">{result.description}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Other Case Studies */}
      <section className="py-20 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white">More Success Stories</h2>
            <p className="mt-4 text-slate-300">See how different practice areas are benefiting from AI</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherCaseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-sky-500/20 text-sky-400 text-xs font-medium rounded-full">
                    {caseStudy.practiceArea}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3">{caseStudy.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{caseStudy.firm}</p>
                
                <div className="space-y-3 mb-6">
                  {caseStudy.results.slice(0, 2).map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center gap-3">
                      <div className="p-1.5 bg-sky-500/20 rounded">
                        <TrendingUp className="h-4 w-4 text-sky-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{result.value}</div>
                        <div className="text-xs text-slate-400">{result.metric}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <Quote className="h-4 w-4 text-sky-400 mb-2" />
                  <p className="text-sm text-slate-200 italic mb-3">
                    "{caseStudy.testimonial.quote.substring(0, 120)}..."
                  </p>
                  <div className="text-xs">
                    <div className="font-semibold text-white">{caseStudy.testimonial.author}</div>
                    <div className="text-slate-400">{caseStudy.testimonial.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-semibold text-white tracking-tight sm:text-4xl">
              Ready to Transform Your Practice?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Join these firms and see how Sapphire Legal AI can eliminate your backlog and increase efficiency.
            </p>
            <div className="mt-8">
              <button
                onClick={() => {
                  track("cta_case_studies_footer_book_demo_clicked");
                  // Add demo modal trigger here
                }}
                className="group relative inline-flex rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                <span className="relative z-10">Book a Demo</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
