'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, FileText, Shield } from 'lucide-react'

export default function SemanticSearchPrivate() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const bullets = [
    "Find prior work instantly across matters, clauses, and filings.",
    "Reuse best language; improve consistency and speed.",
    "All search runs on your private data—never public AI.",
  ];

  return (
    <section className="px-6 py-16 bg-dark-900" id="semantic-search">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full text-sapphire-400 text-sm font-medium mb-6">
              <Search className="h-4 w-4" />
              Semantic Search (Private)
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Semantic Search (Private)
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Outcomes, not keywords: faster answers, consistent documents, zero public AI risk.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {bullets.map((bullet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-lg border border-neutral-800 p-6 bg-neutral-900/30 flex items-start gap-4"
              >
                <div className="flex-shrink-0 p-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg">
                  <Shield className="h-5 w-5 text-sapphire-400" />
                </div>
                <p className="text-neutral-300">{bullet}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

