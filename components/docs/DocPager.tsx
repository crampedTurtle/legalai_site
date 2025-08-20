'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getNextPrevDocs } from '@/lib/docs/navigation'

interface DocPagerProps {
  currentSlug: string
}

export function DocPager({ currentSlug }: DocPagerProps) {
  const { prev, next } = getNextPrevDocs(currentSlug)

  if (!prev && !next) {
    return null
  }

  return (
    <div className="flex items-center justify-between pt-8 mt-12 border-t border-dark-700">
      {prev ? (
        <Link
          href={`/docs${prev.slug}`}
          className="group flex items-center gap-2 text-dark-400 hover:text-sapphire-400 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <div>
            <div className="text-xs text-dark-500">Previous</div>
            <div className="font-medium">{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/docs${next.slug}`}
          className="group flex items-center gap-2 text-dark-400 hover:text-sapphire-400 transition-colors text-right"
        >
          <div>
            <div className="text-xs text-dark-500">Next</div>
            <div className="font-medium">{next.title}</div>
          </div>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
} 