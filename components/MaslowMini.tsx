'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Zap, Brain } from 'lucide-react'

export default function MaslowMini() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const layers = [
    { 
      title: "Safety", 
      desc: "Private AI, access controls, audit trails, compliance-ready.",
      icon: Shield
    },
    { 
      title: "Efficiency", 
      desc: "Unified workflows, automation, fewer tools to manage.",
      icon: Zap
    },
    { 
      title: "Transformation", 
      desc: "AI-first research & drafting; lawyers practice at their highest level.",
      icon: Brain
    },
  ];

  return (
    <section className="px-6 py-16 bg-neutral-900/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              From Risk to Transformation
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              The journey from protecting your practice to transforming how you practice law.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {layers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-lg border border-neutral-800 p-6 bg-neutral-900 flex flex-col items-center text-center"
              >
                <div className="p-3 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg mb-4">
                  <layer.icon className="h-6 w-6 text-sapphire-400" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-3">{layer.title}</h3>
                <p className="text-neutral-400">{layer.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

