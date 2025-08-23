'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function SocialProofBand() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-dark-900">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700">
            <blockquote className="text-xl text-white italic mb-4">
              "This framework made adoption seamless and measurable in weeks."
            </blockquote>
            <cite className="text-lg font-semibold text-sapphire-400 not-italic">
              — Managing Partner, Mid‑Sized Estate Practice
            </cite>
          </div>
          <p className="text-sm text-dark-400 mt-4">Trusted by forward‑thinking firms</p>
        </motion.div>
      </div>
    </section>
  )
}
