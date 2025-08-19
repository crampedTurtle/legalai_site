'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Why Private AI', href: '/why-private-ai' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
]

const solutions = [
  { name: 'Small Firms', href: '/solutions#small-firms' },
  { name: 'Midsized Firms', href: '/solutions#midsized-firms' },
  { name: 'In-House Teams', href: '/solutions#in-house' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-950/95 backdrop-blur-md border-b border-dark-800' : 'bg-transparent'
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Sapphire Legal AI</span>
            <Image
              src="/images/logo_full_light_trans.png"
              alt="Sapphire Legal AI"
              width={384}
              height={88}
              className="h-18 w-auto"
              priority
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.name === 'Solutions' ? (
                <div className="relative">
                  <button
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                    className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white hover:text-sapphire-400 transition-colors"
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  <AnimatePresence>
                    {solutionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4"
                      >
                        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-dark-800 text-sm leading-6 shadow-lg ring-1 ring-dark-700">
                          <div className="p-4">
                            {solutions.map((solution) => (
                              <div key={solution.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-dark-700">
                                <div>
                                  <Link href={solution.href} className="font-semibold text-white">
                                    {solution.name}
                                    <span className="absolute inset-0" />
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-white hover:text-sapphire-400 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://cal.com/s5-brett" target="_blank" rel="noopener noreferrer">Schedule Demo</a>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <a href="https://cal.com/s5-brett" target="_blank" rel="noopener noreferrer">Request Demo</a>
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-dark-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-dark-700"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Sapphire Legal AI</span>
                  <Image
                    src="/images/logo_full_500px_transparent.png"
                    alt="Sapphire Legal AI"
                    width={150}
                    height={33}
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-dark-700">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-dark-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6 space-y-4">
                    <Button variant="ghost" className="w-full" asChild>
                      <a href="https://cal.com/s5-brett" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                        Schedule Demo
                      </a>
                    </Button>
                    <Button variant="primary" className="w-full" asChild>
                      <a href="https://cal.com/s5-brett" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                        Request Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 