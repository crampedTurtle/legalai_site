'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { X, Check, Star, Database, ArrowRight, Loader2, Calendar, Clock, CheckCircle } from 'lucide-react'
import { useAWSTierSelectorModal } from '@/hooks/useAWSTierSelectorModal'
import { submitLead } from '@/lib/lead/submitLead'

interface AWSTierSelectorModalProps {}

interface FormData {
  firstName: string
  lastName: string
  email: string
  firm: string
  title?: string
  phone?: string
}

type Slot = { start: string; end?: string }

export function AWSTierSelectorModal({}: AWSTierSelectorModalProps) {
  const { isOpen, close, source, preselectedTier } = useAWSTierSelectorModal()
  const [selectedTier, setSelectedTier] = useState<string>(preselectedTier || '')
  const [currentStep, setCurrentStep] = useState<'tier' | 'form' | 'calendar' | 'success'>('tier')
  
  // Form data
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    firm: '',
    title: '',
    phone: ''
  })
  
  // Form submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leadId, setLeadId] = useState<string>()
  
  // Calendar integration
  const [slots, setSlots] = useState<Slot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [booking, setBooking] = useState<any>(null)
  const [bookingLoading, setBookingLoading] = useState(false)

  const tiers = [
    {
      id: 'core',
      name: 'Core',
      price: '$1,500',
      perUser: '$39/user/mo',
      userCap: 'Up to 10 users',
      badge: null,
      description: 'Dedicated DB + shared App Runner compute',
      features: [
        'Private workspace',
        'Guardrails & redaction',
        'Policy controls',
        'Basic workflows',
        'Email support',
        'Standard audit logs'
      ]
    },
    {
      id: 'practice',
      name: 'Practice',
      price: '$3,500',
      perUser: '$35/user/mo',
      userCap: 'Up to 25 users',
      badge: 'Most Popular',
      description: 'Dedicated DB + reserved compute slice',
      features: [
        'Everything in Core',
        'Advanced workflow builder',
        'Model routing',
        'DMS connectors*',
        'Priority support',
        'Usage analytics',
        'Workflow Optimization Service',
        'Document Intelligence (lite)'
      ]
    },
    {
      id: 'firm',
      name: 'Firm',
      price: '$6,000',
      perUser: '$32/user/mo',
      userCap: 'Up to 50 users',
      badge: null,
      description: 'Dedicated DB + dedicated VPC/App Runner service',
      features: [
        'Everything in Practice',
        'SSO/SAML',
        'Granular policy controls',
        'Sandbox environments',
        'Admin insights',
        'Scheduled exports',
        'Document Intelligence (full)',
        'Citation Validation Service'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      perUser: null,
      userCap: 'Unlimited',
      badge: null,
      description: 'Dedicated DB + full private VPC deployment',
      features: [
        'Everything in Firm',
        'Private VPC/on-prem',
        'Custom SLAs',
        'BAA/HIPAA',
        'Advanced governance',
        'Dedicated success',
        'Contract Intelligence Service',
        'Client Intelligence Service',
        'Enhanced Client Retention Service'
      ]
    }
  ]

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.firm) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      
      const id = await submitLead({
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        firm_name: formData.firm,
        title: formData.title,
        phone: formData.phone,
        notes: `AWS Demo Request - Selected Tier: ${selectedTier}, Source: ${source}`,
        wants_demo: true,
        source: source,
      }, 'demo_request')
      
      setLeadId(id)
      setCurrentStep('calendar')
    } catch (err) {
      console.error('Failed to submit demo request:', err)
      setError('Could not submit your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function loadSlots() {
    try {
      setLoadingSlots(true)
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      
      const res = await fetch(`/api/cal/slots?tz=${encodeURIComponent(tz)}`)
      const data = await res.json()
      
      if (!res.ok) {
        console.error('Cal.com slots API error:', data)
        return
      }
      
      const normalized: Slot[] = (data.slots || []).filter(Boolean).map((s: any) => ({ 
        start: s.start ?? s.startTime, 
        end: s.end ?? s.endTime 
      }))
      
      setSlots(normalized.slice(0, 12))
    } catch (error) {
      console.error('Failed to load slots:', error)
    } finally {
      setLoadingSlots(false)
    }
  }

  async function book(startIso: string) {
    if (!leadId) return
    try {
      setBookingLoading(true)
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const res = await fetch('/api/cal/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          leadId, 
          start: startIso, 
          tz,
          notes: `AWS Demo - Tier: ${selectedTier}`
        })
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Could not book time')
        return
      }
      setBooking(data.booking)
      setCurrentStep('success')
    } catch (error) {
      console.error('Failed to book:', error)
      alert('Could not book the selected time. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  useEffect(() => { 
    if (currentStep === 'calendar' && leadId) loadSlots() 
  }, [currentStep, leadId])

  const handleClose = () => {
    if (!isSubmitting && !bookingLoading) {
      close()
      // Reset all state
      setSelectedTier('')
      setCurrentStep('tier')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        firm: '',
        title: '',
        phone: ''
      })
      setError(null)
      setLeadId(undefined)
      setSlots([])
      setBooking(null)
    }
  }

  // Success state
  if (currentStep === 'success') {
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
                    Demo Scheduled!
                  </h3>
                  <p className="text-dark-300 mb-6">
                    Thanks! We've scheduled your AWS demo for the {selectedTier} tier. You'll receive a calendar invite shortly.
                  </p>
                  <p className="text-sm text-dark-400">
                    We'll show you exactly how your dedicated Postgres instance will be configured on AWS.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button onClick={handleClose} size="lg">
                    Close
                  </Button>
                </div>
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
            className="relative bg-dark-900 border border-dark-700 rounded-2xl p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-dark-400 hover:text-white transition-colors"
              disabled={isSubmitting || bookingLoading}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                {currentStep === 'tier' && 'Choose Your AWS Tier'}
                {currentStep === 'form' && 'Schedule Your AWS Demo'}
                {currentStep === 'calendar' && 'Select Your Demo Time'}
              </h2>
              <p className="text-dark-300 text-lg mb-4">
                {currentStep === 'tier' && 'Every tier includes a dedicated Postgres instance. No shared databases, ever.'}
                {currentStep === 'form' && 'Tell us about yourself and we\'ll show you your dedicated AWS tenant in action.'}
                {currentStep === 'calendar' && 'Choose a time that works for you to see your dedicated AWS deployment.'}
              </p>
              {currentStep === 'tier' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full text-sapphire-400 text-sm font-medium">
                  <Database className="h-4 w-4" />
                  Every tenant gets their own isolated Postgres instance
                </div>
              )}
            </div>

            {/* Tier Selection Step */}
            {currentStep === 'tier' && (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {tiers.map((tier) => (
                    <motion.div
                      key={tier.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedTier === tier.id
                          ? 'border-sapphire-500 bg-sapphire-500/10'
                          : 'border-dark-700 bg-dark-800 hover:border-dark-600'
                      }`}
                      onClick={() => handleTierSelect(tier.id)}
                    >
                      {tier.badge === "Most Popular" && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <div className="inline-flex items-center gap-1 px-2 py-1 bg-sapphire-500 text-white rounded-full text-xs font-medium">
                            <Star className="h-3 w-3" />
                            {tier.badge}
                          </div>
                        </div>
                      )}
                      
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                        <p className="text-xs text-dark-300 mb-2">{tier.userCap}</p>
                        <div className="mb-2">
                          <span className="text-2xl font-bold text-white">
                            {tier.price}
                          </span>
                          {tier.price !== 'Custom' && <span className="text-dark-300 ml-1 text-sm">/mo</span>}
                        </div>
                        {tier.perUser && (
                          <p className="text-xs text-dark-400">+ {tier.perUser}</p>
                        )}
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-xs text-sapphire-400 font-medium mb-2">{tier.description}</p>
                        <ul className="space-y-1">
                          {tier.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="h-3 w-3 text-sapphire-400 mt-0.5 flex-shrink-0" />
                              <span className="text-xs text-dark-300">{feature}</span>
                            </li>
                          ))}
                          {tier.features.length > 3 && (
                            <li className="text-xs text-dark-400">
                              +{tier.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>

                      {selectedTier === tier.id && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-sapphire-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    className="group text-lg px-8 py-4"
                    onClick={() => setCurrentStep('form')}
                    disabled={!selectedTier}
                    data-cta="aws-tier-selector"
                    data-track="aws_tier_selector_cta"
                    data-tier={selectedTier}
                  >
                    Continue to Demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}

            {/* Form Step */}
            {currentStep === 'form' && (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                      placeholder="Your first name"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                      placeholder="Your last name"
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
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <X className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="group text-lg px-8 py-4"
                    disabled={isSubmitting}
                    data-cta="aws-form-submit"
                    data-track="aws_form_submit"
                    data-tier={selectedTier}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Continue to Calendar
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep('tier')}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}

            {/* Calendar Step */}
            {currentStep === 'calendar' && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-dark-300 mb-4">
                    Select a time slot for your AWS demo. We'll show you exactly how your {selectedTier} tier will be configured with a dedicated Postgres instance.
                  </p>
                </div>

                {loadingSlots ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-sapphire-400" />
                    <span className="ml-3 text-dark-300">Loading available times...</span>
                  </div>
                ) : slots.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {slots.map((slot, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        onClick={() => book(slot.start)}
                        disabled={bookingLoading}
                        className="p-4 rounded-lg border border-dark-700 bg-dark-800 hover:border-sapphire-500 hover:bg-sapphire-500/10 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-sapphire-400" />
                          <div>
                            <div className="text-white font-medium">
                              {new Date(slot.start).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="text-dark-300 text-sm">
                              {new Date(slot.start).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-dark-300 mb-4">No available time slots found.</p>
                    <p className="text-sm text-dark-400">
                      Please try again later or contact us directly.
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep('form')}
                    disabled={bookingLoading}
                  >
                    Back
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleClose}
                    disabled={bookingLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-sm text-dark-400">
                {currentStep === 'tier' && 'Schedule a demo to see your dedicated AWS tenant in action • No commitment required'}
                {currentStep === 'form' && 'We\'ll show you exactly how your dedicated Postgres instance will be configured'}
                {currentStep === 'calendar' && 'Your demo will showcase the dedicated database architecture for your selected tier'}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
