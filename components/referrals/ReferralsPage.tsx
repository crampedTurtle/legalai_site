'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { useDemoModal } from '@/hooks/useDemoModal'

export function ReferralsPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const openDemoModal = (utm: string) => {
    useDemoModal.getState().open(`referrals:${utm}`)
  }

  return (
    <div className="pt-32 pb-24">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-sapphire-500/5 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sapphire Legal AI Referral Partner Program
            </motion.h1>
            
            <motion.p
              className="text-xl text-dark-300 leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Earn 10% by introducing us to law firms that want private, compliant AI. We handle the sales process. You get paid.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="group" 
                onClick={() => openDemoModal('hero')}
                data-utm="referrals-hero"
                aria-label="Introduce a firm (opens contact modal)"
              >
                Introduce a Firm
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="group" 
                asChild
              >
                <a href="/schedule?utm=referrals">
                  Book a Partner Call
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>

            <motion.p
              className="text-sm text-dark-400"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Quarterly payouts once invoices are paid. Non-exclusive; simple agreement.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
