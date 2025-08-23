'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { X, Calendar, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useBookingModal } from '@/hooks/useBookingModal'
import { submitLead } from '@/lib/lead/submitLead'

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

export function BookingModal() {
  const { isOpen, close } = useBookingModal()
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
        notes: `Implementation Consult - Use Case: ${formData.useCase}, Team Size: ${formData.teamSize}, Timeline: ${formData.timeline}, Additional Notes: ${formData.notes}`,
        wants_demo: false,
        source: 'framework:implementation-consult',
      }, 'implementation_consult')

      setIsSuccess(true)
    } catch (err) {
      console.error('Failed to submit implementation consult request:', err)
      setError('Could not submit your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      close()
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

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl max-h-[90vh] z-50 bg-dark-900 rounded-2xl border border-dark-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <DialogTitle className="text-2xl font-bold text-white">
            Book Implementation Consult
          </DialogTitle>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-dark-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sapphire-500"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-dark-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Request Submitted!</h3>
              <p className="text-dark-300 mb-6">
                Thank you for your interest in our implementation framework. We'll be in touch within 24 hours to schedule your consultation.
              </p>
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <p className="text-sm text-dark-300 mb-2">Or schedule directly:</p>
                <a 
                  href="https://cal.com/s5-brett" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sapphire-400 hover:text-sapphire-300 transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  cal.com/s5-brett
                </a>
              </div>
            </div>
          ) : (
            <div>
              <DialogDescription className="text-dark-300 mb-6">
                Tell us about your implementation needs and we'll schedule a consultation to discuss how our framework can transform your practice.
              </DialogDescription>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500"
                      placeholder="your.email@firm.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firm" className="block text-sm font-medium text-white mb-2">
                      Firm Name *
                    </label>
                    <input
                      type="text"
                      id="firm"
                      value={formData.firm}
                      onChange={(e) => handleInputChange('firm', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500"
                      placeholder="Your law firm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500"
                      placeholder="Your role"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500"
                      placeholder="Your phone number"
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
                      className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sapphire-500"
                    >
                      <option value="">Select team size</option>
                      <option value="1-5">1-5 attorneys</option>
                      <option value="6-15">6-15 attorneys</option>
                      <option value="16-50">16-50 attorneys</option>
                      <option value="50+">50+ attorneys</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="useCase" className="block text-sm font-medium text-white mb-2">
                    Primary Use Case
                  </label>
                  <select
                    id="useCase"
                    value={formData.useCase}
                    onChange={(e) => handleInputChange('useCase', e.target.value)}
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sapphire-500"
                  >
                    <option value="">Select primary use case</option>
                    <option value="Document Review & Analysis">Document Review & Analysis</option>
                    <option value="Contract Management">Contract Management</option>
                    <option value="Legal Research">Legal Research</option>
                    <option value="Case Management">Case Management</option>
                    <option value="Compliance & Risk">Compliance & Risk</option>
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
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sapphire-500"
                  >
                    <option value="">Select timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-white mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500"
                    placeholder="Tell us more about your implementation needs..."
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <span className="text-red-400 text-sm">{error}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-sapphire-500 hover:bg-sapphire-600 disabled:bg-sapphire-500/50 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:ring-offset-2 focus:ring-offset-dark-900"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                  <a
                    href="https://cal.com/s5-brett"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-dark-800 hover:bg-dark-700 text-white font-medium py-3 px-6 rounded-lg border border-dark-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:ring-offset-2 focus:ring-offset-dark-900 text-center"
                  >
                    <Calendar className="h-5 w-5 inline mr-2" />
                    Schedule Directly
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
