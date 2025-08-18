'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Play } from 'lucide-react'

const metrics = [
  { label: 'Documents', value: 51, icon: '📄' },
  { label: 'Active Cases', value: 8, icon: '🏢' },
  { label: 'Pending Tasks', value: 7, icon: '⏰' },
  { label: 'Recent Activity', value: 0, icon: '📈' },
  { label: 'Processed', value: 51, icon: '✅' },
  { label: 'Collaborations', value: 1, icon: '👥' },
]

export function DashboardShowcase() {
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
            Your Legal Workflow,{' '}
            <span className="bg-gradient-to-r from-sapphire-400 to-purple-500 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Experience the future of legal practice with our intelligent workspace.
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mx-auto max-w-6xl"
        >
          {/* Device Frame */}
          <div className="relative bg-dark-800 rounded-3xl p-2 shadow-2xl">
            <div className="bg-dark-900 rounded-2xl overflow-hidden">
              {/* Dashboard Interface */}
              <div className="relative h-[600px] bg-dark-900">
                {/* Top Bar */}
                <div className="flex items-center justify-between p-4 border-b border-dark-700">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/logo_full_light_trans.png"
                      alt="Sapphire Legal AI"
                      width={120}
                      height={30}
                      className="h-6 w-auto"
                    />
                  </div>
                  <div className="flex-1 max-w-md mx-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search documents, cases, tasks, or ask AI assistant..."
                        className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 text-sm focus:outline-none focus:ring-2 focus:ring-sapphire-500"
                      />
                      <div className="absolute right-3 top-2.5">
                        <div className="w-5 h-5 bg-sapphire-500 rounded flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-dark-700 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-dark-400 rounded-full" />
                    </div>
                    <div className="w-8 h-8 bg-dark-700 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-sapphire-400 rounded-full" />
                    </div>
                    <div className="w-8 h-8 bg-dark-700 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-dark-400 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex h-full">
                  {/* Left Navigation */}
                  <div className="w-64 bg-dark-800 border-r border-dark-700 p-4">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">Dashboard</h3>
                        <div className="space-y-2">
                          <div className="bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg px-3 py-2">
                            <div className="text-sm text-sapphire-400 font-medium">Unified Dashboard</div>
                          </div>
                          <div className="text-sm text-dark-300 px-3 py-2">Analytics & Reports</div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">Document Intelligence</h3>
                        <div className="space-y-2">
                          <div className="text-sm text-dark-300 px-3 py-2">Upload & Process</div>
                          <div className="text-sm text-dark-300 px-3 py-2">Documents</div>
                          <div className="text-sm text-dark-300 px-3 py-2">Smart Search</div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">Collaborative Drafting</h3>
                        <div className="space-y-2">
                          <div className="text-sm text-dark-300 px-3 py-2">Document Editor</div>
                          <div className="text-sm text-dark-300 px-3 py-2">Templates & Clauses</div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">Legal Research</h3>
                        <div className="space-y-2">
                          <div className="text-sm text-dark-300 px-3 py-2">Case Law Search</div>
                          <div className="text-sm text-dark-300 px-3 py-2">Citation Analysis</div>
                          <div className="text-sm text-dark-300 px-3 py-2">Precedent Search</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Dashboard Content */}
                  <div className="flex-1 p-6">
                    {/* Tabs */}
                    <div className="flex space-x-6 mb-6">
                      <div className="text-sm font-medium text-sapphire-400 border-b-2 border-sapphire-500 pb-2">Overview</div>
                      <div className="text-sm text-dark-300 pb-2">Quick Actions</div>
                      <div className="text-sm text-dark-300 pb-2">Recent Items</div>
                      <div className="text-sm text-dark-300 pb-2">AI Insights</div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-6 gap-4 mb-8">
                      {metrics.map((metric, index) => (
                        <motion.div
                          key={metric.label}
                          className="bg-dark-800 rounded-lg p-4 border border-dark-700"
                          initial={{ opacity: 0, y: 20 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                        >
                          <div className="text-2xl mb-2">{metric.icon}</div>
                          <div className="text-xl font-bold text-white mb-1">
                            {inView && (
                              <CountUp
                                end={metric.value}
                                duration={2}
                                delay={1.5 + index * 0.1}
                              />
                            )}
                          </div>
                          <div className="text-xs text-dark-300">{metric.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Common tasks and workflows</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700 hover:border-sapphire-500/50 transition-colors">
                          <div className="text-2xl mb-3">📤</div>
                          <h4 className="font-medium text-white mb-2">Upload Document</h4>
                          <p className="text-sm text-dark-300">Process and analyze legal documents</p>
                        </div>
                        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700 hover:border-sapphire-500/50 transition-colors">
                          <div className="text-2xl mb-3">➕</div>
                          <h4 className="font-medium text-white mb-2">Create Document</h4>
                          <p className="text-sm text-dark-300">Start a new legal document</p>
                        </div>
                        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700 hover:border-sapphire-500/50 transition-colors">
                          <div className="text-2xl mb-3">👥</div>
                          <h4 className="font-medium text-white mb-2">Start Collaboration</h4>
                          <p className="text-sm text-dark-300">Begin real-time document editing</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Assistant Popup */}
                  <motion.div
                    className="absolute bottom-6 right-6 w-80 bg-dark-800 rounded-lg border border-dark-700 shadow-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 2 }}
                  >
                    <div className="p-4 border-b border-dark-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white">AI Assistant</h3>
                        <div className="w-6 h-6 bg-dark-700 rounded flex items-center justify-center">
                          <div className="w-3 h-3 text-dark-400">×</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-dark-300 mb-4">How can I help you today?</p>
                      <input
                        type="text"
                        placeholder="Ask me anything..."
                        className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded text-white placeholder-dark-400 text-sm mb-3"
                      />
                      <button className="w-full bg-sapphire-500 text-white py-2 rounded text-sm font-medium mb-3">
                        Ask
                      </button>
                      <div className="space-y-2">
                        <div className="text-xs text-dark-400">Search documents</div>
                        <div className="text-xs text-dark-400">Draft a document</div>
                        <div className="text-xs text-dark-400">Legal research</div>
                        <div className="text-xs text-dark-400">Get help</div>
                      </div>
                      <div className="text-xs text-dark-500 mt-4">8/4/2025, 12:13:29 AM</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button size="lg" className="group">
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 