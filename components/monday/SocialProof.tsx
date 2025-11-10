'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    firm: 'Moran Law',
    quote: 'Sapphire\'s Monday.com integration eliminated our double-entry problem. Cases sync automatically, and our team saves hours every week.',
    author: 'Managing Partner',
    practiceArea: 'Personal Injury',
  },
  {
    firm: 'Early Adopter Firm',
    quote: 'The automation is incredible. Demand letters generate automatically from our Monday boards. It\'s like having an associate working 24/7.',
    author: 'Operations Director',
    practiceArea: 'PI & Probate',
  },
  {
    firm: 'Family Law Practice',
    quote: 'Document versioning and client updates sync seamlessly. Our Monday boards stay current without manual work.',
    author: 'Practice Manager',
    practiceArea: 'Family Law',
  },
]

export function SocialProof() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Early Traction
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Law firms using Monday.com + Sapphire are already seeing results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.firm}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-dark-800/50 border border-dark-700 rounded-xl p-8 hover:border-sapphire-500/50 transition-all duration-300"
            >
              <Quote className="h-8 w-8 text-sapphire-400 mb-4" />
              <p className="text-dark-200 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-dark-700 pt-4">
                <p className="font-semibold text-white">
                  {testimonial.firm}
                </p>
                <p className="text-sm text-dark-400">
                  {testimonial.author} • {testimonial.practiceArea}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-dark-400">
            💡 <strong>Note:</strong> Replace with actual testimonials and firm logos when available.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

