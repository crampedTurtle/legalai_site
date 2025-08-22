'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Loader2, CheckCircle, Calendar, Clock } from 'lucide-react'
import { submitLead } from '@/lib/lead/submitLead'

type Slot = { start: string; end?: string }

export function DemoForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [leadId, setLeadId] = useState<string>()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    firm: '',
    title: '',
    phone: '',
    notes: ''
  })

  // slots & booking
  const [slots, setSlots] = useState<Slot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [booking, setBooking] = useState<any>(null)
  const [bookingLoading, setBookingLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email) return

    try {
      setLoading(true)
      const id = await submitLead({
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        firm_name: formData.firm,
        title: formData.title,
        phone: formData.phone,
        notes: formData.notes,
        wants_demo: true,
        source: 'demo:request',
      }, 'demo_request')
      setLeadId(id)
      setSuccess(true)
    } catch (err) {
      console.error('Failed to submit demo request:', err)
      alert('Could not submit your request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function loadSlots() {
    try {
      setLoadingSlots(true)
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const res = await fetch(`/api/cal/slots?tz=${encodeURIComponent(tz)}`)
      const data = await res.json()
      const normalized: Slot[] = (data.slots || []).filter(Boolean).map((s: any) => ({ start: s.start ?? s.startTime, end: s.end ?? s.endTime }))
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

  if (success) {
    return (
      <div className="card-hover p-8">
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
              setFormData({ firstName: '', lastName: '', email: '', firm: '', title: '', phone: '', notes: '' })
            }}
            variant="outline"
            size="sm"
          >
            Request Another Demo
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="card-hover p-8">
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
              name="firstName"
              required
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
              name="lastName"
              required
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
            name="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
            placeholder="john.smith@lawfirm.com"
            disabled={loading}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firm" className="block text-sm font-medium text-dark-300 mb-2">
              Firm/Organization *
            </label>
            <input
              type="text"
              id="firm"
              name="firm"
              required
              value={formData.firm}
              onChange={(e) => handleInputChange('firm', e.target.value)}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
              placeholder="Smith & Associates Law"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-dark-300 mb-2">
              Title/Role
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
              placeholder="Managing Partner"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-dark-300 mb-2">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
            placeholder="+1 (555) 123-4567"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-dark-300 mb-2">
            Anything specific you'd like to see?
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors min-h-[100px] resize-none"
            placeholder="Tell us about your specific needs, use cases, or questions..."
            disabled={loading}
          />
        </div>

        <Button type="submit" size="lg" className="w-full group" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Schedule Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
} 