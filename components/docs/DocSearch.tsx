'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Command } from 'lucide-react'
import Link from 'next/link'
import { clsx } from 'clsx'

interface SearchResult {
  title: string
  slug: string
  section: string
  description: string
  headings: string[]
}

interface DocSearchProps {
  className?: string
}

export function DocSearch({ className }: DocSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Load search index
  useEffect(() => {
    if (isOpen && query.length > 0) {
      performSearch()
    }
  }, [query, isOpen])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
      if (e.key === 'ArrowDown' && isOpen) {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        )
      }
      if (e.key === 'ArrowUp' && isOpen) {
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0)
      }
      if (e.key === 'Enter' && isOpen && results.length > 0) {
        e.preventDefault()
        const selectedResult = results[selectedIndex]
        if (selectedResult) {
          window.location.href = `/docs${selectedResult.slug}`
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const performSearch = async () => {
    if (query.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      // For now, we'll implement a simple client-side search
      // In a real implementation, you'd load the search index from a JSON file
      const searchIndex = await loadSearchIndex()
      const filteredResults = searchIndex.filter((item: SearchResult) => {
        const searchText = `${item.title} ${item.description} ${item.headings.join(' ')}`.toLowerCase()
        return searchText.includes(query.toLowerCase())
      })
      
      setResults(filteredResults.slice(0, 10))
      setSelectedIndex(0)
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const loadSearchIndex = async (): Promise<SearchResult[]> => {
    try {
      // This would be a real search index file in production
      // For now, we'll return a mock index based on our navigation
      const { docsNav } = await import('@/lib/docs/navigation')
      
      return docsNav.flatMap(section => 
        section.items.map(item => ({
          title: item.title,
          slug: item.slug,
          section: section.title,
          description: item.description || '',
          headings: [] // Would be populated from actual MDX content
        }))
      )
    } catch (error) {
      console.error('Failed to load search index:', error)
      return []
    }
  }

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  return (
    <>
      {/* Search button */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          'flex items-center gap-2 px-3 py-2 text-sm text-dark-400 hover:text-white transition-colors',
          className
        )}
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search docs</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-dark-800 border border-dark-700 rounded">
          <Command className="h-3 w-3" />
          /
        </kbd>
      </button>

      {/* Search modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-2xl mx-4">
            <div className="bg-dark-800 border border-dark-700 rounded-lg shadow-2xl">
              {/* Search input */}
              <div className="flex items-center gap-3 p-4 border-b border-dark-700">
                <Search className="h-5 w-5 text-dark-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-dark-400 outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-dark-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Results */}
              <div ref={resultsRef} className="max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center text-dark-400">
                    Searching...
                  </div>
                ) : results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <Link
                        key={result.slug}
                        href={`/docs${result.slug}`}
                        onClick={() => handleResultClick(result)}
                        className={clsx(
                          'block px-4 py-3 hover:bg-dark-700 transition-colors',
                          index === selectedIndex && 'bg-dark-700'
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-white mb-1">
                              {result.title}
                            </div>
                            <div className="text-sm text-dark-400 mb-1">
                              {result.section}
                            </div>
                            {result.description && (
                              <div className="text-sm text-dark-300">
                                {result.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : query.length > 0 ? (
                  <div className="p-4 text-center text-dark-400">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="p-4 text-center text-dark-400">
                    Type to search documentation
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 