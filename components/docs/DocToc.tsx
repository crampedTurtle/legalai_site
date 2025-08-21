'use client'

import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

interface TocItem {
  id: string
  text: string
  level: number
}

interface DocTocProps {
  className?: string
}

export function DocToc({ className }: DocTocProps) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from the page
    const headingElements = document.querySelectorAll('h2, h3')
    const tocItems: TocItem[] = Array.from(headingElements).map((element, index) => {
      // Generate ID if none exists
      let id = element.id
      if (!id) {
        id = `heading-${index}`
        element.id = id
      }
      
      return {
        id,
        text: element.textContent || '',
        level: parseInt(element.tagName.charAt(1))
      }
    })
    setHeadings(tocItems)

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -35% 0px' }
    )

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) {
    return null
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={clsx('hidden lg:block', className)}>
      <div className="sticky top-24">
        <div className="text-sm font-medium text-dark-300 mb-4">On this page</div>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={clsx(
                'block w-full text-left text-sm transition-colors hover:text-sapphire-400',
                heading.level === 2 ? 'font-medium' : 'font-normal ml-4',
                activeId === heading.id
                  ? 'text-sapphire-400'
                  : 'text-dark-400'
              )}
            >
              <div className="flex items-center gap-2">
                {heading.level === 3 && (
                  <ChevronRight className="h-3 w-3 flex-shrink-0" />
                )}
                <span className="truncate">{heading.text}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
} 