'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import { submitLead } from '@/lib/lead/submitLead'

export function DemoForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    firm: '',
    title: '',
    phone: '',
    notes: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email) return

    try {
      setLoading(true)
      await submitLead({
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        firm_name: formData.firm,
        title: formData.title,
        phone: formData.phone,
        notes: formData.notes,
        wants_demo: true,
        source: 'demo:request',
      })
      setSuccess(true)
    } catch (err) {
      console.error('Failed to submit demo request:', err)
      alert('Could not submit your request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="card-hover p-8 text-center">
        <div className="inline-flex p-3 bg-green-500/20 border border-green-500/30 rounded-lg mb-4">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">
          Demo Request Submitted!
        </h3>
        <p className="text-dark-300 mb-6">
          Thanks! We'll be in touch shortly to schedule your demo.
        </p>
        <Button 
          onClick={() => {
            setSuccess(false)
            setFormData({ firstName: '', lastName: '', email: '', firm: '', title: '', phone: '', notes: '' })
          }}
          size="lg"
        >
          Request Another Demo
        </Button>
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