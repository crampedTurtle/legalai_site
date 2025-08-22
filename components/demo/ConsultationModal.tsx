'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { X, Calendar, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { submitLead } from '@/lib/lead/submitLead'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  source?: string
}

interface FormData {
  name: string
  email: string
  firm: string
  title: string
  phone: string
  useCase: string
  teamSize: string
  timeline: string
  notes: string
}

export function ConsultationModal({ isOpen, onClose, source = 'consultation:booking' }: ConsultationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    firm: '',
    title: '',
    phone: '',
    useCase: '',
    teamSize: '',
    timeline: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.name || !formData.firm) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      // Capture lead in Supabase
      await submitLead({
        email: formData.email,
        name: formData.name,
        firm_name: formData.firm,
        title: formData.title,
        phone: formData.phone,
        notes: `Consultation Request - Use Case: ${formData.useCase}, Team Size: ${formData.teamSize}, Timeline: ${formData.timeline}, Additional Notes: ${formData.notes}`,
        wants_demo: false,
        source: source,
      }, 'consultation_request')

      setIsSuccess(true)
    } catch (err) {
      console.error('Failed to submit consultation request:', err)
      setError('Could not submit your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      // Reset form after a delay to allow animation to complete
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          firm: '',
          title: '',
          phone: '',
          useCase: '',
          teamSize: '',
          timeline: '',
          notes: ''
        })
        setIsSuccess(false)
        setError(null)
      }, 300)
    }
  }

  if (isSuccess) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-dark-900 border border-dark-700 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center space-y-6">
                <div className="inline-flex p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Consultation Request Submitted!
                  </h3>
                  <p className="text-dark-300 mb-6">
                    Thanks! We've received your consultation request and will be in touch within 24 hours to schedule your personalized consultation.
                  </p>
                  <p className="text-sm text-dark-400">
                    In the meantime, feel free to explore our resources or reach out if you have any questions.
                  </p>
                </div>
                <Button onClick={handleClose} size="lg">
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
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
            className="relative bg-dark-900 border border-dark-700 rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-dark-400 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Schedule a Consultation
              </h2>
              <p className="text-dark-300 text-lg">
                Let's discuss how our software + enablement approach can help your firm adapt and thrive in the AI era
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                    disabled={isSubmitting}
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
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    placeholder="your.email@firm.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="firm" className="block text-sm font-medium text-white mb-2">
                    Firm/Organization *
                  </label>
                  <input
                    type="text"
                    id="firm"
                    required
                    value={formData.firm}
                    onChange={(e) => handleInputChange('firm', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    placeholder="Your law firm name"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                    Title/Role
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    placeholder="Managing Partner, General Counsel, etc."
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    placeholder="+1 (555) 123-4567"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-white mb-2">
                    Team Size
                  </label>
                  <select
                    id="teamSize"
                    value={formData.teamSize}
                    onChange={(e) => handleInputChange('teamSize', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    disabled={isSubmitting}
                  >
                    <option value="">Select team size</option>
                    <option value="1-5">1-5 attorneys</option>
                    <option value="6-25">6-25 attorneys</option>
                    <option value="26-100">26-100 attorneys</option>
                    <option value="100+">100+ attorneys</option>
                    <option value="In-house">In-house legal team</option>
                  </select>
                </div>
              </div>

              {/* Use Case & Timeline */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="useCase" className="block text-sm font-medium text-white mb-2">
                    Primary Use Case
                  </label>
                  <select
                    id="useCase"
                    value={formData.useCase}
                    onChange={(e) => handleInputChange('useCase', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    disabled={isSubmitting}
                  >
                    <option value="">Select primary use case</option>
                    <option value="Contract Review & Drafting">Contract Review & Drafting</option>
                    <option value="Legal Research">Legal Research</option>
                    <option value="Document Analysis">Document Analysis</option>
                    <option value="Compliance & Risk">Compliance & Risk</option>
                    <option value="Client Communication">Client Communication</option>
                    <option value="Workflow Automation">Workflow Automation</option>
                    <option value="Knowledge Management">Knowledge Management</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-white mb-2">
                    Implementation Timeline
                  </label>
                  <select
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    disabled={isSubmitting}
                  >
                    <option value="">Select timeline</option>
                    <option value="Immediate (0-30 days)">Immediate (0-30 days)</option>
                    <option value="Short-term (1-3 months)">Short-term (1-3 months)</option>
                    <option value="Medium-term (3-6 months)">Medium-term (3-6 months)</option>
                    <option value="Long-term (6+ months)">Long-term (6+ months)</option>
                    <option value="Just exploring">Just exploring</option>
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-white mb-2">
                  Additional Notes or Questions
                </label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your specific needs, questions, or anything else you'd like us to know..."
                  disabled={isSubmitting}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-5 w-5" />
                    Request Consultation
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
