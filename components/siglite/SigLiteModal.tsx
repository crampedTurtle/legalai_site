'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { X, Download, CheckCircle, AlertCircle } from 'lucide-react'

interface SigLiteModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  company: string
  region: string
  optIn: boolean
}

export function SigLiteModal({ isOpen, onClose }: SigLiteModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    region: '',
    optIn: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/lead/security-whitepaper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          resourceType: 'SIG-Lite',
          resourceTitle: 'SIG-Lite Security Summary'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const result = await response.json()
      setIsSuccess(true)
    } catch (err) {
      setError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      // Reset form after a delay to allow animation to complete
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          region: '',
          optIn: false
        })
        setIsSuccess(false)
        setError(null)
      }, 300)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-dark-800 border border-dark-700 rounded-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-700">
              <h2 className="text-xl font-semibold text-white">
                {isSuccess ? 'Download Ready' : 'Download SIG-Lite'}
              </h2>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-2 hover:bg-dark-700 rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="h-5 w-5 text-dark-300" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSuccess ? (
                <div className="text-center">
                  <div className="inline-flex p-4 bg-green-500/20 border border-green-500/30 rounded-lg mb-6">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Thank You!
                  </h3>
                  
                  <p className="text-dark-300 mb-6">
                    Your SIG-Lite Security Summary is ready for download. We've also sent a copy to your email.
                  </p>
                  
                  <Button 
                    size="lg" 
                    className="w-full group"
                    asChild
                  >
                    <a href="/docs/sapphire_legal_ai_siglite.pdf" download>
                      <Download className="mr-2 h-5 w-5" />
                      Download SIG-Lite
                    </a>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500/50 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500/50 focus:border-transparent"
                      placeholder="Enter your work email"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                      Firm/Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500/50 focus:border-transparent"
                      placeholder="Enter your firm or company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-white mb-2">
                      Region
                    </label>
                    <select
                      id="region"
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sapphire-500/50 focus:border-transparent"
                    >
                      <option value="">Select your region</option>
                      <option value="north-america">North America</option>
                      <option value="europe">Europe</option>
                      <option value="asia-pacific">Asia Pacific</option>
                      <option value="latin-america">Latin America</option>
                      <option value="middle-east-africa">Middle East & Africa</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="optIn"
                      checked={formData.optIn}
                      onChange={(e) => handleInputChange('optIn', e.target.checked)}
                      className="mt-1 h-4 w-4 text-sapphire-500 bg-dark-700 border-dark-600 rounded focus:ring-sapphire-500/50 focus:ring-2"
                    />
                    <label htmlFor="optIn" className="text-sm text-dark-300">
                      Send me product updates and security insights
                    </label>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Download SIG-Lite'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 