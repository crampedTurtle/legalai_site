'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { docsNav } from '@/lib/docs/navigation'

interface DocBreadcrumbsProps {
  currentSlug: string
  currentTitle: string
}

export function DocBreadcrumbs({ currentSlug, currentTitle }: DocBreadcrumbsProps) {
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { title: 'Home', href: '/', icon: Home }
    ]

    // Find which section this page belongs to
    for (const section of docsNav) {
      const item = section.items.find(item => item.slug === currentSlug)
      if (item) {
        breadcrumbs.push(
          { title: 'Docs', href: '/docs', icon: Home },
          { title: section.title, href: section.base, icon: Home },
          { title: currentTitle, href: `${section.base}${currentSlug}`, icon: Home }
        )
        break
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <nav className="flex items-center space-x-2 text-sm text-dark-400 mb-8" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => {
        const Icon = crumb.icon
        const isLast = index === breadcrumbs.length - 1

        if (isLast) {
          return (
            <span key={crumb.title} className="text-white font-medium">
              {Icon && <Icon className="h-4 w-4 inline mr-1" />}
              {crumb.title}
            </span>
          )
        }

        return (
          <div key={crumb.title} className="flex items-center space-x-2">
            <Link
              href={crumb.href}
              className="flex items-center hover:text-sapphire-400 transition-colors"
            >
              {Icon && <Icon className="h-4 w-4 mr-1" />}
              {crumb.title}
            </Link>
            <ChevronRight className="h-4 w-4 text-dark-500" />
          </div>
        )
      })}
    </nav>
  )
} 