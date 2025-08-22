'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Download } from 'lucide-react'
import { useBookingModal } from '@/hooks/useBookingModal'

export function FrameworkCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open } = useBookingModal()

  const handleDownloadPDF = () => {
    // TODO: Replace with actual PDF download when available
    // For now, link to the print view route
    window.open('/framework/print', '_blank')
  }

  return (
    <section className="py-24 bg-gradient-to-br from-sapphire-900/20 via-dark-900 to-purple-900/20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to see your workflows run themselves?
          </h2>
          <p className="text-xl text-dark-300 mb-12 max-w-2xl mx-auto">
            Join the firms already experiencing the power of Software + Enablement. Let's transform your practice together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group" onClick={() => open()}>
              Book Implementation Consult
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="group" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-5 w-5" />
              Download Framework PDF
            </Button>
          </div>

          <div className="mt-8 text-sm text-dark-400">
            <p>Implementation starts in as little as 2 weeks • 4-week delivery • 3-month BPO & training included</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
