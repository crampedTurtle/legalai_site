'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LayoutGrid, Briefcase, Zap, FileText } from 'lucide-react'

const tabs = [
  { id: 'boards', label: 'Boards', icon: LayoutGrid },
  { id: 'cases', label: 'Cases', icon: Briefcase },
  { id: 'automation', label: 'Automation', icon: Zap },
  { id: 'letters', label: 'Letters', icon: FileText },
]

export function ProductScreenshot() {
  const [activeTab, setActiveTab] = useState('boards')
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Monday.com boards enhanced with Sapphire's legal intelligence and automation.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-sapphire-500 text-white'
                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Screenshot Container */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-dark-800/50 border border-dark-700 rounded-2xl p-8 shadow-2xl"
        >
          <div className="aspect-video bg-gradient-to-br from-dark-800 to-dark-900 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Placeholder Screenshot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-sapphire-500/20 rounded-2xl flex items-center justify-center mx-auto">
                  {tabs.find(t => t.id === activeTab)?.icon && (
                    <tabs.find(t => t.id === activeTab)!.icon className="h-12 w-12 text-sapphire-400" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-48 bg-dark-700 rounded mx-auto"></div>
                  <div className="h-3 w-32 bg-dark-700 rounded mx-auto"></div>
                </div>
              </div>
            </div>
            
            {/* Mock UI Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-4 gap-4 p-8 h-full">
                {[0, 1, 2, 3].map((col) => (
                  <div key={col} className="space-y-3">
                    <div className="h-6 bg-white/10 rounded w-20"></div>
                    {[0, 1, 2].map((item) => (
                      <div key={item} className="bg-white/5 rounded p-3 space-y-2">
                        <div className="h-2 bg-white/10 rounded w-full"></div>
                        <div className="h-2 bg-white/10 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-center text-dark-400 text-sm mt-4">
            📸 Replace with actual screenshot: {activeTab === 'boards' && 'Monday.com board view with Sapphire integration'}
            {activeTab === 'cases' && 'Case management sync between Monday and Sapphire'}
            {activeTab === 'automation' && 'Automated workflow triggers and AI actions'}
            {activeTab === 'letters' && 'Auto-generated legal letters synced to Monday'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

