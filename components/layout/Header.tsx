'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Menu, X } from 'lucide-react'
import { useDemoModal } from '@/hooks/useDemoModal'

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Framework', href: '/framework' },
  { name: 'Why Private AI', href: '/why-private-ai' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative bg-slate-950 border-b border-slate-800">
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
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white hover:text-sapphire-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button variant="primary" size="sm" onClick={() => useDemoModal.getState().open('header:request-demo')}>
            Request Demo
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
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 w-full max-w-sm h-screen overflow-y-auto bg-slate-900 shadow-2xl"
            >
              <div className="flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                  <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
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
                    className="rounded-lg p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-1">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="block rounded-lg px-4 py-3 text-lg font-medium text-white hover:bg-slate-800 hover:text-sky-400 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Footer CTA */}
                <div className="p-6 border-t border-slate-800">
                  <Button 
                    variant="primary" 
                    className="w-full py-3 text-lg font-semibold" 
                    onClick={() => {
                      useDemoModal.getState().open('header:mobile-request-demo')
                      setMobileMenuOpen(false)
                    }}
                  >
                    Request Demo
                  </Button>
                  <p className="mt-3 text-sm text-slate-400 text-center">
                    See how Sapphire Legal AI can transform your practice
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 