'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Download } from 'lucide-react'
import { useConsultationModal } from '@/hooks/useConsultationModal'
import { useResourceModal } from '@/hooks/useResourceModal'

export function SolutionsCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open: openConsultation } = useConsultationModal()
  const { open: openResource } = useResourceModal()

  const handleGuideClick = () => {
    openResource({
      title: 'Sapphire Legal AI: Your Private & Intelligent Legal Workspace',
      type: 'Guide',
      downloadUrl: '/docs/sapphire_legalai_features.pdf'
    })
  }

  return (
    <section className="py-24 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto mb-8">
            Let's discuss how our software + enablement approach can help your firm adapt and thrive in the AI era.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group" onClick={() => openConsultation('solutions:consultation')}>
              Schedule a Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="group" onClick={handleGuideClick}>
              <Download className="mr-2 h-5 w-5" />
              Sapphire Legal AI Guide
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 