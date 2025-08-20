'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { docsNav } from '@/lib/docs/navigation'
import { clsx } from 'clsx'

interface SidebarNavProps {
  className?: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const pathname = usePathname()

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle)
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    )
  }

  const isActive = (slug: string) => {
    return pathname === `/docs${slug}`
  }

  const isSectionActive = (section: typeof docsNav[0]) => {
    return section.items.some(item => isActive(item.slug))
  }

  // Auto-expand active section
  useState(() => {
    const activeSection = docsNav.find(section => 
      section.items.some(item => isActive(item.slug))
    )
    if (activeSection && !expandedSections.includes(activeSection.title)) {
      setExpandedSections(prev => [...prev, activeSection.title])
    }
  })

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-dark-800 border border-dark-700 rounded-lg text-white hover:bg-dark-700 transition-colors"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        'fixed lg:static inset-y-0 left-0 z-40 w-80 bg-dark-900 border-r border-dark-700 transform transition-transform duration-200 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        className
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-dark-700">
            <Link href="/docs" className="text-xl font-bold text-white hover:text-sapphire-400 transition-colors">
              Documentation
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {docsNav.map((section) => {
                const isExpanded = expandedSections.includes(section.title)
                const hasActiveItem = isSectionActive(section)

                return (
                  <div key={section.title}>
                    <button
                      onClick={() => toggleSection(section.title)}
                      className={clsx(
                        'flex items-center justify-between w-full text-left p-2 rounded-lg transition-colors',
                        hasActiveItem 
                          ? 'text-sapphire-400 bg-sapphire-500/10' 
                          : 'text-dark-300 hover:text-white hover:bg-dark-800'
                      )}
                    >
                      <span className="font-medium">{section.title}</span>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-2 ml-4 space-y-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/docs${item.slug}`}
                            className={clsx(
                              'block p-2 rounded-lg text-sm transition-colors',
                              isActive(item.slug)
                                ? 'text-sapphire-400 bg-sapphire-500/10'
                                : 'text-dark-400 hover:text-white hover:bg-dark-800'
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
} 