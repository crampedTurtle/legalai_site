'use client'

import { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SidebarNav } from './SidebarNav'
import { DocToc } from './DocToc'
import { DocSearch } from './DocSearch'

interface DocLayoutProps {
  children: ReactNode
  currentSlug: string
  currentTitle: string
}

export function DocLayout({ children, currentSlug, currentTitle }: DocLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      
      {/* Search in header area */}
      <div className="pt-32 pb-6 bg-dark-900 border-b border-dark-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{currentTitle}</h1>
            </div>
            <DocSearch />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <SidebarNav className="w-80 flex-shrink-0" />
        
        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
        
        {/* Table of contents */}
        <DocToc className="w-64 flex-shrink-0 px-6 py-8" />
      </div>
      
      <Footer />
    </div>
  )
} 