'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Download, FileText, Shield } from 'lucide-react'
import { SigLiteModal } from './SigLiteModal'

interface SigLiteHeroProps {
  copy: {
    title: string
    subtitle: string
    primary: string
    secondary: string
  }
}

export function SigLiteHero({ copy }: SigLiteHeroProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalResourceType, setModalResourceType] = useState<'SIG-Lite' | 'Security Whitepaper'>('SIG-Lite')
  
  // Check if gating is enabled
  const isGated = process.env.NEXT_PUBLIC_GATE_SIGLITE === 'true'

  const handlePrimaryClick = (e: React.MouseEvent) => {
    if (isGated) {
      e.preventDefault()
      setModalResourceType('SIG-Lite')
      setIsModalOpen(true)
    }
  }

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setModalResourceType('Security Whitepaper')
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full text-sm text-sapphire-400 mb-8"
            >
              <Shield className="h-4 w-4" />
              Vendor Due Diligence
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6"
            >
              {copy.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              {copy.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                size="lg" 
                className="group w-full sm:w-auto"
                onClick={handlePrimaryClick}
                asChild={!isGated}
              >
                {isGated ? (
                  <span>
                    <Download className="mr-2 h-5 w-5" />
                    {copy.primary}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                ) : (
                  <a href="/docs/sapphire_legal_ai_siglite.pdf" download>
                    <Download className="mr-2 h-5 w-5" />
                    {copy.primary}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg" 
                className="group w-full sm:w-auto"
                onClick={handleSecondaryClick}
              >
                <FileText className="mr-2 h-5 w-5" />
                {copy.secondary}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SigLiteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        resourceType={modalResourceType}
      />
    </>
  )
} 