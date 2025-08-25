'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Sapphire replaced 6 tools with one — our team finally works in one place.",
    author: "Managing Partner",
    firm: "50-lawyer firm"
  },
  {
    quote: "Compliance-first and AI-native. We saved hours per case within weeks.",
    author: "Director of Ops",
    firm: "Mid-sized firm"
  },
  {
    quote: "The client portal alone increased our conversion rate by 40%.",
    author: "Practice Manager",
    firm: "Regional firm"
  }
]

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Law firms across the country are transforming their practice with Sapphire Legal AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="card-hover p-8 bg-dark-800 border border-dark-700 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-sapphire-500/10 border border-sapphire-500/30 rounded-lg">
                  <Quote className="h-6 w-6 text-sapphire-400" />
                </div>
                <div className="flex-1">
                  <blockquote className="text-lg text-white leading-relaxed mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-sm text-dark-400">
                    <div className="font-semibold text-sapphire-400">{testimonial.author}</div>
                    <div>{testimonial.firm}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
