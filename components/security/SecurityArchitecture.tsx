'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SecurityArchitectureProps {
  copy: {
    title: string
    caption: string
  }
}

export function SecurityArchitecture({ copy }: SecurityArchitectureProps) {
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
          className="text-center max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {copy.title}
          </h2>
          
          <p className="text-dark-300 mb-12 max-w-3xl mx-auto">
            {copy.caption}
          </p>

          {/* Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <svg
              viewBox="0 0 800 600"
              className="w-full max-w-4xl mx-auto"
              style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))' }}
            >
              {/* Background */}
              <rect width="800" height="600" fill="#0f172a" rx="12" />
              
              {/* Customer Infrastructure */}
              <g transform="translate(50, 50)">
                <rect width="300" height="120" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="8" />
                <text x="150" y="30" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">
                  Your Infrastructure
                </text>
                <text x="150" y="50" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  On-Prem / Private Cloud
                </text>
                <text x="150" y="70" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  (AWS/GCP/Azure)
                </text>
                <text x="150" y="90" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  Data Residency Controlled
                </text>
              </g>

              {/* Encrypted Storage */}
              <g transform="translate(50, 200)">
                <rect width="300" height="100" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="8" />
                <text x="150" y="30" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">
                  Encrypted Storage
                </text>
                <text x="150" y="50" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  Documents, DMS, Database
                </text>
                <text x="150" y="70" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  AES-256 at Rest
                </text>
              </g>

              {/* Private AI Runtime */}
              <g transform="translate(450, 125)">
                <rect width="300" height="150" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" rx="8" />
                <text x="150" y="30" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">
                  Private AI Runtime
                </text>
                <text x="150" y="50" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  Model + Guardrails
                </text>
                <text x="150" y="70" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  Inside Customer VPC
                </text>
                <text x="150" y="90" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  No External Calls
                </text>
                <text x="150" y="110" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  Zero Data Sharing
                </text>
              </g>

              {/* Policy & Audit Layer */}
              <g transform="translate(450, 300)">
                <rect width="300" height="100" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" rx="8" />
                <text x="150" y="30" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">
                  Policy & Audit Layer
                </text>
                <text x="150" y="50" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  Access Control, Logging
                </text>
                <text x="150" y="70" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  SIEM Export Available
                </text>
              </g>

              {/* Connection Lines */}
              <g stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.6">
                {/* Infrastructure to Storage */}
                <path d="M 200 170 L 200 200" markerEnd="url(#arrowhead)" />
                
                {/* Storage to AI */}
                <path d="M 350 250 L 450 200" markerEnd="url(#arrowhead)" />
                
                {/* AI to Policy */}
                <path d="M 600 275 L 600 300" markerEnd="url(#arrowhead)" />
              </g>

              {/* Arrow Markers */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                </marker>
              </defs>

              {/* Security Notes */}
              <g transform="translate(50, 350)">
                <rect width="700" height="80" fill="#1e293b" stroke="#ef4444" strokeWidth="1" rx="8" opacity="0.8" />
                <text x="350" y="25" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">
                  Security Guarantees
                </text>
                <text x="350" y="45" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  No data sent to public model training • No cross-tenant mixing
                </text>
                <text x="350" y="65" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  Complete data isolation • Customer-controlled encryption keys
                </text>
              </g>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 