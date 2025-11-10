'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Check, Star, ChevronDown, ChevronUp, Zap, FileText, Clock, Upload, Play, Shield, Lock, Database, Users, Briefcase, Settings, Award, Server } from 'lucide-react'
import { usePricingBookingModal } from '@/hooks/usePricingBookingModal'
import { PricingBookingModal } from './PricingBookingModal'
import { pricingTiers, pricingFootnote, planMatrix } from '@/data/pricing'
import content from '@/content/foundingFirm.json'
import { VideoModal } from '@/components/VideoModal'

interface PricingPageProps {
  children: React.ReactNode
}

export function PricingPage({ children }: PricingPageProps) {
  const { isOpen, close, source } = usePricingBookingModal()
  
  return (
    <div className="pt-32 pb-24">
      {children}
      <PricingBookingModal isOpen={isOpen} onClose={close} source={source} />
    </div>
  )
}

interface HeadlineProps {
  children: React.ReactNode
}

export function Headline({ children }: HeadlineProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
            {children}
          </h1>
        </motion.div>
      </div>
    </section>
  )
}

interface SubheadProps {
  children: React.ReactNode
}

export function Subhead({ children }: SubheadProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xl text-dark-300 leading-relaxed">
            {children}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export function TrustAnchors() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const trustItems = [
    { icon: Award, text: 'SOC 2 Type II Certified' },
    { icon: Database, text: 'Tenant-Isolated Vector Indexes' },
    { icon: Lock, text: 'Zero Shared Embeddings' },
    { icon: Server, text: 'On-Prem or Private VPC Deployment' },
  ]

  return (
    <section className="py-8 bg-dark-900 border-b border-dark-700">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {trustItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex items-center gap-2 text-dark-300">
                <Icon className="h-4 w-4 text-dark-400" />
                <span className="text-sm">{item.text}</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

interface PricingTabsProps {
  children: React.ReactNode
}

export function PricingTabs({ children }: PricingTabsProps) {
  const [activeTab, setActiveTab] = useState('platform')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const tabs = [
    { id: 'platform', label: 'Platform' },
    { id: 'launch-pack', label: 'Launch Pack' },
    { id: 'managed-ops', label: 'Managed Ops' }
  ]

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="flex bg-dark-800 rounded-lg p-1 border border-dark-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-sapphire-500 text-white'
                      : 'text-dark-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'platform' && <PlatformTab />}
            {activeTab === 'launch-pack' && <LaunchPackTab />}
            {activeTab === 'managed-ops' && <ManagedOpsTab />}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function DayOneSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Everything You See in the Demo—Available on Day One
          </h2>
          <p className="text-xl text-dark-300 mb-12 text-center max-w-3xl mx-auto">
            Your first day with Sapphire mirrors the live demo. These workflows are available instantly.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Smart Document → Task Automation */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg">
                  <Zap className="h-5 w-5 text-sapphire-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Smart Document → Task Automation</h3>
                  <p className="text-xs text-dark-400 mt-1">(Litigation, PI, Probate, Corporate)</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-dark-300">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Generate tasks directly from PDFs, Word docs, and scanned files</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Auto-route tasks to responsible roles</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Extract key dates, obligations, and action items</span>
                </li>
              </ul>
            </div>

            {/* Case Summary Sheets */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg">
                  <FileText className="h-5 w-5 text-sapphire-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Case Summary Sheets</h3>
                  <p className="text-xs text-dark-400 mt-1">(PI, Litigation, Corporate)</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-dark-300">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Automated partner-ready summaries for any matter</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Extracts facts, issues, parties, chronology</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Links back to source documents</span>
                </li>
              </ul>
            </div>

            {/* Case Timelines */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg">
                  <Clock className="h-5 w-5 text-sapphire-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Case Timelines</h3>
                  <p className="text-xs text-dark-400 mt-1">(All practice areas)</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-dark-300">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Auto-generated timelines from one or many documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Consolidates dates, events, milestones, and filings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Editable + exportable for partner review</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Multi-Document Ingestion */}
          <div className="mt-6 bg-dark-800/50 border border-dark-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg">
                <Upload className="h-5 w-5 text-sapphire-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Multi-Document Ingestion & Vector Intelligence</h3>
                <p className="text-xs text-dark-400 mt-1">(All matter types)</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-dark-300">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span>Upload multiple files → watch real-time embedding</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span>Cross-document Q&A with citations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span>Document Intelligence (lite/full depending on tier)</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function PlatformTab() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open } = usePricingBookingModal()

  const slotsLeft = Math.max(0, content.maxSlots - content.claimedSlots)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Founding Firm Program Banner */}
      <div className="mb-8 p-6 rounded-xl border border-sapphire-500/20 bg-gradient-to-r from-sapphire-500/10 to-indigo-500/10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sapphire-500 text-white rounded-full text-sm font-medium mb-3">
            <Star className="h-4 w-4" />
            Founding Firm Program
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Firm features at Practice pricing for 12 months
          </h3>
          <p className="text-dark-300 mb-4">
            Join {content.claimedSlots} firms already in the program. Only {slotsLeft} slots left.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-sm text-dark-400">Public Firm price</p>
              <p className="text-lg font-bold line-through text-dark-400">${content.pricing.firmMonthly.toLocaleString()}/mo</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-sapphire-400">Your Founder price (Year 1)</p>
              <p className="text-2xl font-bold text-sapphire-400">${content.pricing.practiceMonthly.toLocaleString()}/mo</p>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              size="lg" 
              className="bg-sapphire-500 hover:bg-sapphire-600"
              onClick={() => window.open('/founding-firm', '_blank')}
            >
              Learn More About Founding Firm Program
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tier Selection Guide */}
      <div className="text-center mb-8">
        <p className="text-dark-300 leading-relaxed text-lg">
          <strong className="text-white">Core</strong> = Private AI workspace · <strong className="text-white">Practice</strong> = Automation & Workflows · <strong className="text-white">Firm</strong> = Enterprise Controls & Compliance
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative p-6 rounded-xl border ${
              tier.badge === "Most Popular"
                ? 'border-sapphire-500 bg-dark-800' 
                : 'border-dark-700 bg-dark-800'
            }`}
          >
            {tier.badge === "Most Popular" && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-sapphire-500 text-white rounded-full text-xs font-medium">
                  <Star className="h-3 w-3" />
                  {tier.badge}
                </div>
              </div>
            )}
            {tier.id === "practice" && (
              <div className="absolute -top-3 right-4">
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500 text-white rounded-full text-xs font-medium">
                  Founder Forever Discount
                </div>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-sm text-dark-300 mb-3">{tier.userCap}</p>
              <div className="mb-2">
                {tier.id === "practice" ? (
                  <div className="space-y-1">
                    <div className="text-sm text-dark-400 line-through">
                      Firm features at Practice pricing (12 months)
                    </div>
                    <span className="text-3xl font-bold text-white">
                      {typeof tier.monthlyPrice === 'number' ? `$${tier.monthlyPrice.toLocaleString()}` : tier.monthlyPrice}
                    </span>
                    {typeof tier.monthlyPrice === 'number' && <span className="text-dark-300 ml-1">/mo</span>}
                  </div>
                ) : (
                  <>
                    <span className="text-3xl font-bold text-white">
                      {typeof tier.monthlyPrice === 'number' ? `$${tier.monthlyPrice.toLocaleString()}` : tier.monthlyPrice}
                    </span>
                    {typeof tier.monthlyPrice === 'number' && <span className="text-dark-300 ml-1">/mo</span>}
                  </>
                )}
              </div>
              {tier.perUser && (
                <p className="text-sm text-dark-400">+ {tier.perUser}</p>
              )}
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">{tier.blurb}</h4>
              <p className="text-sm text-dark-300 mb-3 leading-relaxed">{tier.paragraph}</p>
              <p className="text-xs text-sapphire-400 font-medium mb-4">{tier.bestFor}</p>
              
              {/* Outcomes Section */}
              {tier.id === 'core' && (
                <div className="bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg p-3 mb-4">
                  <p className="text-xs font-semibold text-sapphire-400 mb-2">Outcomes:</p>
                  <ul className="space-y-1 text-xs text-dark-300">
                    <li>• Reduce admin overhead 30–40% in the first month</li>
                    <li>• Private AI workspace that stays inside your walls</li>
                  </ul>
                </div>
              )}
              
              {tier.id === 'practice' && (
                <div className="bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg p-3 mb-4">
                  <p className="text-xs font-semibold text-sapphire-400 mb-2">Practice Pack:</p>
                  <p className="text-xs text-dark-300 mb-2">Practice Pack workflows for 12 core practice areas (PI, Real Estate, Estate, Corporate, Litigation)</p>
                  <p className="text-xs font-semibold text-sapphire-400 mb-2 mt-3">Outcomes:</p>
                  <ul className="space-y-1 text-xs text-dark-300">
                    <li>• Automate 40–60% of repetitive matter tasks</li>
                    <li>• Eliminate document drift with structured intelligence</li>
                  </ul>
                </div>
              )}
              
              {tier.id === 'firm' && (
                <div className="bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg p-3 mb-4">
                  <p className="text-xs font-semibold text-sapphire-400 mb-2">Practice Pack:</p>
                  <p className="text-xs text-dark-300 mb-2">Advanced Practice Pack automations with risk scoring & batch workflows</p>
                  <p className="text-xs font-semibold text-sapphire-400 mb-2 mt-3">Outcomes:</p>
                  <ul className="space-y-1 text-xs text-dark-300">
                    <li>• Enterprise-grade governance for multi-office environments</li>
                    <li>• Reduce risk and errors through citation validation & timeline scoring</li>
                  </ul>
                </div>
              )}
              
              {tier.id === 'enterprise' && (
                <div className="bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg p-3 mb-4">
                  <p className="text-xs font-semibold text-sapphire-400 mb-2">Outcomes:</p>
                  <ul className="space-y-1 text-xs text-dark-300">
                    <li>• Fully automated matter dashboards for large teams</li>
                    <li>• Predictive client intelligence & risk analysis</li>
                    <li>• End-to-end governance and regulatory posture</li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-dark-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center space-y-2">
              <Button 
                size="lg" 
                className={`w-full group ${tier.badge === "Most Popular" ? 'bg-sapphire-500 hover:bg-sapphire-600' : ''}`}
                onClick={() => open('platform')}
                data-cta="pricing"
                data-track="pricing_cta"
                data-tier={tier.id}
              >
                Watch the Workflow Tour
                <Play className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="secondary"
                size="md" 
                className="w-full group"
                onClick={() => open('platform')}
                data-cta="pricing"
                data-track="pricing_cta"
                data-tier={tier.id}
              >
                Schedule a Private AI Demo
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-xs text-dark-400 mt-2">
                Upload a sample document during your demo and see Sapphire process it live.
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Footnote */}
      <div className="mt-8 text-center">
        <p className="text-sm text-dark-400">
          {pricingFootnote}
        </p>
        <p className="text-sm text-sapphire-400 mt-2">
          All tiers include a <strong>dedicated Postgres database</strong>. Hosted <strong>on-premise</strong> or <strong>on AWS</strong>. 14-day trial with commitment; invoice on Day 14 unless cancelled.
        </p>
      </div>
      
      {/* Mini Comparison Strip */}
      <section className="mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6 max-w-3xl mx-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left p-3 text-white font-medium">Capability</th>
                  <th className="text-center p-3 text-white font-medium">Core</th>
                  <th className="text-center p-3 text-white font-medium">Practice</th>
                  <th className="text-center p-3 text-white font-medium">Firm</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dark-700">
                  <td className="p-3 text-dark-300">AI Workspace</td>
                  <td className="p-3 text-center text-sapphire-400">✅</td>
                  <td className="p-3 text-center text-sapphire-400">✅</td>
                  <td className="p-3 text-center text-sapphire-400">✅</td>
                </tr>
                <tr className="border-b border-dark-700">
                  <td className="p-3 text-dark-300">Automation</td>
                  <td className="p-3 text-center text-dark-400">—</td>
                  <td className="p-3 text-center text-sapphire-400">✅</td>
                  <td className="p-3 text-center text-sapphire-400">✅</td>
                </tr>
                <tr>
                  <td className="p-3 text-dark-300">Enterprise Controls</td>
                  <td className="p-3 text-center text-dark-400">—</td>
                  <td className="p-3 text-center text-dark-400">—</td>
                  <td className="p-3 text-center text-sapphire-400">✅</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-6 text-center">
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  const element = document.getElementById('compare-plans')
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Compare plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Everything in the Live Demo Is Included */}
      <section className="mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Everything in the Live Demo Is Included
          </h2>
          <p className="text-xl text-dark-300 mb-12 text-center max-w-3xl mx-auto">
            Your demo experience is the production experience.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-300">Multi-document ingestion pipeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-300">Real-time answering with citations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-300">Case summaries for any matter</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-300">Automatically generated timelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-300">Automated tasks from documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-300">Practice Pack workflows for 12 core practice areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-300">EMR Automation (for PI firms)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-300">Case → Client → Document linkage</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <VideoModal
                videoId="cd40e8b0c3a14b9da24f138035ac4772"
                buttonLabel="Watch the 3-Minute Workflow Tour"
                className="group"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Compare Plans Matrix */}
      <section id="compare-plans" className="mt-12">
        <h2 className="text-xl font-semibold mb-6 text-center text-white">Compare plans</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="text-left">
              <tr>
                <th className="p-3 text-white font-medium min-w-[200px]">Feature</th>
                <th className="p-3 text-center text-white font-medium min-w-[120px]">Core</th>
                <th className="p-3 text-center text-white font-medium min-w-[120px]">Practice</th>
                <th className="p-3 text-center text-white font-medium min-w-[120px]">Firm</th>
                <th className="p-3 text-center text-white font-medium min-w-[120px]">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {planMatrix.map((row) => (
                <tr key={row.key} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-3">
                    <span className="text-white">
                      {row.label}
                    </span>
                  </td>
                  {(["core","practice","firm","enterprise"] as const).map((tier) => (
                    <td key={tier} className="p-3 text-center">
                      {row.tiers[tier] ? "✔️" : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-white/60 text-center">
          *NetDocuments / iManage connectors on the roadmap. Contact us for timeline.
        </p>
      </section>
    </motion.div>
  )
}

export function LaunchPackTab() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open } = usePricingBookingModal()

  const features = [
    'Discovery & risk workshop',
    'Guardrails & policies',
    'Connector setup',
    '5 priority workflows',
    'Admin training',
    'Pilot enablement',
    'Go-live support'
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      <div className="p-8 rounded-xl border border-sapphire-500 bg-dark-800">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">The Sapphire Launch Pack</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold text-white">$12,000</span>
          </div>
          <p className="text-sm text-dark-400 mb-4">
            Fixed $12,000 • 4 weeks • Required for all new deployments
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-sm text-dark-300 mb-4 text-center leading-relaxed">
            A structured, 4‑week rollout that maps to the first phases of the Sapphire Implementation Framework (Crawl → Design → Build → Validate → Launch).
          </p>
          <p className="text-xs text-sapphire-400 font-medium text-center mb-6">
            Best for: Firms that want a structured, hands-on rollout with minimal disruption.
          </p>
          
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-center">
          <Button size="lg" className="w-full group" onClick={() => open('launch-pack')} data-cta="pricing" data-track="pricing_cta" data-tier="launch-pack">
            Schedule a Meeting
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export function ManagedOpsTab() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open } = usePricingBookingModal()

  const services = [
    {
      title: 'Content & Playbook Ops',
      price: 'from $2,500/mo',
      heading: 'Keep your AI knowledge sharp and up to date.',
      description: 'Knowledge packs & updates, prompt libraries, template upkeep, monthly tuning.',
      bestFor: 'Best for: Firms that want their content library to stay current without manual upkeep.',
      features: [
        'Knowledge packs',
        'Prompt libraries',
        'Template upkeep',
        'Monthly tuning'
      ]
    },
    {
      title: 'Intake & Triage Desk',
      price: 'from $3,000/mo',
      heading: 'Human-in-the-loop review to keep your workflows safe and compliant.',
      description: 'Intake & routing, SLA-backed support, escalations, human review for edge cases.',
      bestFor: 'Best for: Firms needing high-volume, quality-controlled intake processes.',
      features: [
        'Human-in-the-loop review',
        'Routing',
        'SLAs',
        'Escalations'
      ]
    },
    {
      title: 'Data & Evaluation Ops',
      price: 'from $2,000/mo',
      heading: 'Continuous monitoring for accuracy, compliance, and drift.',
      description: 'Red-team prompts, evaluation sets, quality scoring, drift watch.',
      bestFor: 'Best for: Firms that want proactive oversight of AI performance and compliance.',
      features: [
        'Red-team prompts',
        'Eval sets',
        'Quality scoring',
        'Drift watch'
      ]
    }
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Ongoing Managed Ops</h2>
        <p className="text-dark-300 leading-relaxed">
          Continuous services that extend the Sapphire Implementation Framework beyond launch. Choose the level of oversight your firm needs — from content upkeep to intake desk to compliance monitoring.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="p-6 rounded-xl border border-dark-700 bg-dark-800"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-2xl font-bold text-sapphire-400">{service.price}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">{service.heading}</h4>
              <p className="text-sm text-dark-300 mb-3 leading-relaxed">{service.description}</p>
              <p className="text-xs text-sapphire-400 font-medium mb-4">{service.bestFor}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-dark-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <Button size="lg" className="w-full group" onClick={() => open('managed-ops')} data-cta="pricing" data-track="pricing_cta" data-tier="managed-ops">
                Schedule a Meeting
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-dark-400">
          Managed Ops are optional subscriptions layered on top of your platform tier.
        </p>
      </div>
    </motion.div>
  )
}

export function FrameworkCTABand() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-dark-950">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-lg text-dark-300 mb-6">
            Not sure how tiers, the Launch Pack, and Managed Ops fit together? See the Sapphire Implementation Framework for how we deliver adoption step‑by‑step.
          </p>
          <Button variant="secondary" size="lg" className="group" asChild>
            <a href="/framework">
              View the Framework
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

interface FAQItem {
  question: string
  answer: string
}

export function WhyPrivateAISection() {
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
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Why Firms Choose Private AI Over Generic Tools
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Security & Isolation */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Security & Isolation</h3>
              </div>
              <ul className="space-y-2 text-sm text-dark-300">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Tenant-isolated vector indexes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Dedicated Postgres database</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Zero shared embeddings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>SOC 2 posture, GDPR/CCPA compliance</span>
                </li>
              </ul>
            </div>

            {/* Deployment Control */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <Settings className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Deployment Control</h3>
              </div>
              <ul className="space-y-2 text-sm text-dark-300">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Private VPC or on-prem</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>SSO/SAML integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Granular policy controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Full auditability</span>
                </li>
              </ul>
            </div>

            {/* Legal-Grade Precision */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <Briefcase className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Legal-Grade Precision</h3>
              </div>
              <ul className="space-y-2 text-sm text-dark-300">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Case-structured outputs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Chronological timelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Obligation extraction</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                  <span>Matter-to-document relationships</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function RoleBasedValueSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const roles = [
    {
      icon: Users,
      title: 'Managing Partners',
      benefits: [
        'Predictable costs',
        'Higher margins',
        'Reduced errors'
      ]
    },
    {
      icon: Briefcase,
      title: 'Attorneys',
      benefits: [
        'Faster matter handling',
        'More billables',
        'Fewer admin tasks'
      ]
    },
    {
      icon: Settings,
      title: 'Operations/Admin',
      benefits: [
        'Automated workflows',
        'Standardized processes'
      ]
    },
    {
      icon: Shield,
      title: 'IT/Compliance',
      benefits: [
        'SSO/SAML',
        'Audit logs',
        'Data governance',
        'On-prem options'
      ]
    }
  ]

  return (
    <section className="py-20 bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Built For Every Role in Your Firm
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => {
              const Icon = role.icon
              return (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-dark-800/50 border border-dark-700 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg">
                      <Icon className="h-5 w-5 text-sapphire-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{role.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {role.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-dark-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function FAQSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [openItems, setOpenItems] = useState<number[]>([])

  const faqs: FAQItem[] = [
    {
      question: 'How are platform and per-user fees billed?',
      answer: 'Platform fees are billed monthly in advance. Per-user fees are calculated based on your actual user count and billed monthly. You can add or remove users at any time with prorated billing.'
    },
    {
      question: 'Can we host in our own VPC or on-prem?',
      answer: 'Yes, Enterprise customers can deploy Sapphire Legal AI in their own VPC or on-premises environment. We provide the necessary infrastructure requirements and deployment support.'
    },
    {
      question: 'Do you sign a BAA?',
      answer: 'Yes, we sign Business Associate Agreements (BAAs) for Enterprise customers who handle PHI. Our platform is designed to support HIPAA compliance requirements.'
    },
    {
      question: 'What\'s included in the Launch Pack?',
      answer: 'The Launch Pack is a 4-week implementation service that includes discovery workshops, security configuration, workflow setup, admin training, and go-live support to ensure successful deployment.'
    },
    {
      question: 'Can we start on Core and upgrade later?',
      answer: 'Absolutely. You can start with any platform tier and upgrade as your needs grow. We provide seamless migration support and prorated billing for upgrades.'
    },
    {
      question: 'What\'s your cancellation policy?',
      answer: 'You can cancel your subscription at any time with 30 days notice. We\'ll help you export your data and ensure a smooth transition.'
    },
    {
      question: 'Do we share a database with other firms?',
      answer: 'No. Every tenant has a **dedicated Postgres database** for isolation and performance.'
    },
    {
      question: 'Can we run Sapphire on AWS?',
      answer: 'Yes. We provision a private tenant on AWS (App Runner + Aurora + S3 with KMS). Your data remains encrypted in your tenant.'
    },
    {
      question: 'What is Vector Intelligence?',
      answer: 'A built-in vector database that powers semantic search, contract similarity, automatic relationships, practice-specific results, and explainable similarity scores.'
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="py-20 bg-dark-950">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-dark-300">
              Everything you need to know about our pricing and services
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-dark-700 rounded-lg bg-dark-800"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-dark-700 transition-colors"
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-dark-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-dark-400" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-dark-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 