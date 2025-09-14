'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Users, Clock, Shield } from 'lucide-react'

export default function FoundingProof() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const proofPoints = [
    {
      icon: Users,
      stat: "23/25",
      label: "Founding Firms",
      description: "Join the exclusive cohort"
    },
    {
      icon: Clock,
      stat: "12 months",
      label: "Firm Features",
      description: "At Practice pricing"
    },
    {
      icon: CheckCircle,
      stat: "25%",
      label: "Forever Discount",
      description: "After year one"
    },
    {
      icon: Shield,
      stat: "AWS",
      label: "Compliance Ready",
      description: "SOC-2, HIPAA, ISO"
    }
  ]

  return (
    <section className="px-6 py-16 bg-dark-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Trusted by Forward-Thinking Firms
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Join the founding cohort and transform your practice with private, compliance-ready AI.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {proofPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="p-4 bg-sapphire-500/10 border border-sapphire-500/20 rounded-lg mb-4">
                  <point.icon className="h-8 w-8 text-sapphire-400 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{point.stat}</div>
                <div className="text-sm font-medium text-sapphire-400 mb-1">{point.label}</div>
                <div className="text-xs text-neutral-400">{point.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

