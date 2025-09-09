'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { 
  ArrowRight, 
  Calendar, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { submitLead } from '@/lib/lead/submitLead'

const benefits = [
  '30-minute personalized demo',
  'See real legal workflows',
  'Security & compliance walkthrough',
  'Custom implementation plan',
  'No sales pressure',
  'Free consultation'
]

interface DemoFormData {
  firstName: string
  lastName: string
  email: string
  firm: string
  practiceArea?: string
  message?: string
}

type Slot = { start: string; end?: string }

export function CTASection() {
  const [formData, setFormData] = useState<DemoFormData>({
    firstName: '',
    lastName: '',
    email: '',
    firm: '',
    practiceArea: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Cal.com integration
  const [leadId, setLeadId] = useState<string>()
  const [slots, setSlots] = useState<Slot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [booking, setBooking] = useState<any>(null)
  const [bookingLoading, setBookingLoading] = useState(false)

  const handleInputChange = (field: keyof DemoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.firm) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const id = await submitLead({
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        firm_name: formData.firm,
        notes: `Practice Area: ${formData.practiceArea || 'Not specified'}\nAdditional Information: ${formData.message || 'None provided'}`,
        wants_demo: true,
        source: 'demo:landing-page',
      }, 'demo_request')
      
      setLeadId(id)
      setSuccess(true)
    } catch (err) {
      console.error('Failed to submit demo request:', err)
      setError('Could not submit your request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function loadSlots() {
    try {
      setLoadingSlots(true)
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      console.log('Loading Cal.com slots for timezone:', tz)
      
      const res = await fetch(`/api/cal/slots?tz=${encodeURIComponent(tz)}`)
      const data = await res.json()
      
      console.log('Cal.com slots response:', data)
      
      if (!res.ok) {
        console.error('Cal.com slots API error:', data)
        return
      }
      
      const normalized: Slot[] = (data.slots || []).filter(Boolean).map((s: any) => ({ start: s.start ?? s.startTime, end: s.end ?? s.endTime }))
      console.log('Normalized slots:', normalized)
      
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
        body: JSON.stringify({ leadId, start: startIso, tz })
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Could not book time')
        return
      }
      setBooking(data.booking)
    } catch (error) {
      console.error('Failed to book:', error)
      alert('Could not book the selected time. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  useEffect(() => { 
    if (success && leadId) loadSlots() 
  }, [success, leadId])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your{' '}
            <span className="gradient-text">Legal Practice?</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Join forward-thinking law firms and legal departments who are already using Sapphire Legal AI 
            to streamline their workflows and deliver better client outcomes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Benefits & Contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                What You'll Get
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-sapphire-400 flex-shrink-0" />
                    <span className="text-dark-200">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Get in Touch
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-dark-300">
                  <Calendar className="h-5 w-5 text-sapphire-400" />
                  <span>Schedule a demo at cal.com/s5-brett</span>
                </div>
                <div className="flex items-center gap-3 text-dark-300">
                  <Phone className="h-5 w-5 text-sapphire-400" />
                  <span>+1 (216) 577-9018</span>
                </div>
                <div className="flex items-center gap-3 text-dark-300">
                  <Mail className="h-5 w-5 text-sapphire-400" />
                  <span>info@sapphirefive.com</span>
                </div>
                <div className="flex items-center gap-3 text-dark-300">
                  <Clock className="h-5 w-5 text-sapphire-400" />
                  <span>Available Mon-Fri, 9AM-6PM EST</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Demo Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card-hover p-8"
          >
            {!success ? (
              <>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Request Your Demo
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-dark-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    placeholder="John"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-dark-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    placeholder="Smith"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                  placeholder="john.smith@lawfirm.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="firm" className="block text-sm font-medium text-dark-300 mb-2">
                  Firm/Organization *
                </label>
                <input
                  type="text"
                  id="firm"
                  value={formData.firm}
                  onChange={(e) => handleInputChange('firm', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                  placeholder="Smith & Associates Law"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="practiceArea" className="block text-sm font-medium text-dark-300 mb-2">
                  Practice Area
                </label>
                <select
                  id="practiceArea"
                  value={formData.practiceArea}
                  onChange={(e) => handleInputChange('practiceArea', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                  disabled={loading}
                >
                  <option value="">Select your practice area</option>
                  <option value="corporate">Corporate Law</option>
                  <option value="litigation">Litigation</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="family">Family Law</option>
                  <option value="criminal">Criminal Law</option>
                  <option value="intellectual-property">Intellectual Property</option>
                  <option value="employment">Employment Law</option>
                  <option value="tax">Tax Law</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-300 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your current challenges and what you're looking to achieve..."
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full group" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Start 14-Day Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              {error && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <p className="text-sm text-dark-400 text-center mt-4">
                On-premise or AWS—your choice. Provisioned in minutes.
              </p>

              <p className="text-xs text-dark-400 text-center">
                By submitting this form, you agree to our{' '}
                <a href="/privacy-policy" className="text-sapphire-400 hover:text-sapphire-300 transition-colors">
                  Privacy Policy
                </a>
                . We'll never share your information with third parties.
              </p>
            </form>
              </>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <div className="inline-flex p-3 bg-green-500/20 border border-green-500/30 rounded-lg mb-4">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Demo Request Submitted!
                  </h3>
                  <p className="text-dark-300">
                    Thanks! Pick a time that works for you:
                  </p>
                </div>

                {loadingSlots && (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-sapphire-400" />
                    <p className="text-dark-300">Loading available times...</p>
                  </div>
                )}

                {!loadingSlots && slots.length > 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {slots.map((s) => {
                        const dt = new Date(s.start)
                        const label = dt.toLocaleString([], { 
                          weekday: 'short',
                          month: 'short', 
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })
                        return (
                          <button 
                            key={s.start} 
                            onClick={() => book(s.start)}
                            disabled={bookingLoading}
                            className="flex items-center justify-between p-4 bg-dark-800 border border-dark-700 rounded-lg hover:bg-dark-700 hover:border-sapphire-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="flex items-center space-x-3">
                              <Calendar className="h-5 w-5 text-sapphire-400" />
                              <span className="text-white font-medium">{label}</span>
                            </div>
                            {bookingLoading && <Loader2 className="h-4 w-4 animate-spin text-sapphire-400" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {!loadingSlots && slots.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="h-8 w-8 mx-auto mb-4 text-dark-400" />
                    <p className="text-dark-300 mb-4">No available times found for the next 2 weeks.</p>
                    <p className="text-sm text-dark-400">We'll be in touch to schedule your demo manually.</p>
                  </div>
                )}

                {booking && (
                  <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <h4 className="font-medium text-white">Demo Scheduled!</h4>
                    </div>
                    <p className="text-dark-300 text-sm mb-3">
                      We've scheduled your demo. You'll receive a confirmation email shortly.
                    </p>
                    {booking?.htmlLink && (
                      <a 
                        href={booking.htmlLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2 text-sapphire-400 hover:text-sapphire-300 text-sm"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Open calendar event</span>
                      </a>
                    )}
                  </div>
                )}

                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => {
                      setSuccess(false)
                      setLeadId(undefined)
                      setSlots([])
                      setBooking(null)
                      setFormData({ firstName: '', lastName: '', email: '', firm: '', practiceArea: '', message: '' })
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Request Another Demo
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 