'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { Calendar, Rocket } from 'lucide-react'
import { useDemoModal } from '@/hooks/useDemoModal'

export function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open } = useDemoModal()

  return (
    <section className="py-24 bg-gradient-monday relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            See Sapphire + Monday.com in Action
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Book a demo to see how the integration works, or start a 30-day pilot to test it with your team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => open('monday-integration:cta-demo')}
              className="group bg-white text-brand-navy hover:bg-white/90"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Demo
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                // TODO: Link to pilot signup form or page
                open('monday-integration:cta-pilot')
              }}
              className="border-white text-white hover:bg-white/10"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Start a 30-Day Pilot
            </Button>
          </div>

          <p className="text-white/70 text-sm mt-8">
            No credit card required • Setup in minutes • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}

