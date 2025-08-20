'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { Shield, ArrowRight, Download, FileText } from 'lucide-react'
import { WhitepaperModal } from '@/components/security/WhitepaperModal'
import { SigLiteModal } from '@/components/siglite/SigLiteModal'

const copy = {
  title: "Our Security Posture",
  body: "Sapphire Legal AI is built with privacy and security at its core. Unlike public AI systems, your legal data never leaves your environment and is never used for model training. We align our controls with industry‑standard frameworks including **SOC 2 Type II** and **ISO 27001** (both on the roadmap), and privacy regulations such as **GDPR**, **CCPA**, and **HIPAA** (aligned). All data is protected with end‑to‑end encryption and strict tenant isolation. For details, review our **Security Whitepaper** and **SIG‑Lite** summary.",
  bullets: [
    "Private deployments (on‑prem or private cloud); data residency honored",
    "End‑to‑end encryption (TLS in transit, AES‑256 at rest); customer‑managed keys supported",
    "No data used for public model training; no cross‑tenant mixing",
    "SSO (SAML/OIDC), RBAC, SCIM; comprehensive audit logging"
  ],
  govcon: "*GovCon:* FedRAMP alignment exploratory (on roadmap if serving federal agencies).",
  ctas: {
    security: "Read Security & Compliance",
    whitepaper: "Download Whitepaper (PDF)",
    siglite: "Get SIG‑Lite (PDF)"
  }
}

export function SecurityPosture() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isWhitepaperModalOpen, setIsWhitepaperModalOpen] = useState(false)
  const [isSigLiteModalOpen, setIsSigLiteModalOpen] = useState(false)
  
  const isGovConTarget = process.env.NEXT_PUBLIC_TARGET_GOVCON === "true"
  const isGated = process.env.NEXT_PUBLIC_GATE_SIGLITE === 'true'

  const handleWhitepaperClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWhitepaperModalOpen(true)
  }

  const handleSigLiteClick = (e: React.MouseEvent) => {
    if (isGated) {
      e.preventDefault()
      setIsSigLiteModalOpen(true)
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 md:p-12 shadow-xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-shrink-0 p-3 bg-sapphire-500/20 border border-sapphire-500/30 rounded-xl">
                <Shield className="h-8 w-8 text-sapphire-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {copy.title}
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Content */}
              <div className="space-y-6">
                {/* Body Paragraph */}
                <p className="text-lg text-dark-300 leading-relaxed">
                  {copy.body.split('**').map((part, index) => {
                    if (index % 2 === 1) {
                      return <strong key={index} className="text-white font-semibold">{part}</strong>
                    }
                    return part
                  })}
                </p>

                {/* Bullet List */}
                <ul className="space-y-3">
                  {copy.bullets.map((bullet, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-2 h-2 bg-sapphire-400 rounded-full mt-3" />
                      <span className="text-dark-300 leading-relaxed">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* GovCon Note (conditional) */}
                {isGovConTarget && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-sm text-dark-400 italic pt-4 border-t border-dark-700"
                  >
                    {copy.govcon}
                  </motion.p>
                )}
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                <Button 
                  size="lg" 
                  className="w-full group justify-start"
                  asChild
                >
                  <a href="/security" aria-label="Read Security & Compliance page">
                    <Shield className="mr-3 h-5 w-5" />
                    {copy.ctas.security}
                    <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>

                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full group justify-start"
                  onClick={handleWhitepaperClick}
                >
                  <Download className="mr-3 h-5 w-5" />
                  {copy.ctas.whitepaper}
                  <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full group justify-start"
                  onClick={handleSigLiteClick}
                  asChild={!isGated}
                >
                  {isGated ? (
                    <span>
                      <FileText className="mr-3 h-5 w-5" />
                      {copy.ctas.siglite}
                      <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  ) : (
                    <a href="/docs/sapphire_legal_ai_siglite.pdf" download>
                      <FileText className="mr-3 h-5 w-5" />
                      {copy.ctas.siglite}
                      <ArrowRight className="ml-auto h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <WhitepaperModal 
        isOpen={isWhitepaperModalOpen} 
        onClose={() => setIsWhitepaperModalOpen(false)} 
      />
      
      {isGated && (
        <SigLiteModal 
          isOpen={isSigLiteModalOpen} 
          onClose={() => setIsSigLiteModalOpen(false)} 
        />
      )}
    </section>
  )
} 