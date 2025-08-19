'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, CheckCircle, FileText, Mail } from 'lucide-react'

interface AssessmentContactProps {
  onSubmit: (contact: { name: string; email: string; firm: string }) => void
  isSubmitting: boolean
}

export function AssessmentContact({ onSubmit, isSubmitting }: AssessmentContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    firm: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.firm.trim()) {
      newErrors.firm = 'Firm name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-sm text-green-400"
        >
          <CheckCircle className="h-4 w-4" />
          Assessment Complete!
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold text-white"
        >
          Get Your Personalized Report
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-dark-300 max-w-2xl mx-auto"
        >
          Enter your details below to receive your comprehensive AI readiness report with personalized recommendations.
        </motion.p>
      </div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="p-6 bg-dark-800 border border-dark-700 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg">
              <FileText className="h-5 w-5 text-sapphire-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Detailed PDF Report</h3>
          </div>
          <p className="text-dark-300">
            Get a comprehensive 15+ page report with your scores, detailed analysis, and actionable recommendations for each area.
          </p>
        </div>

        <div className="p-6 bg-dark-800 border border-dark-700 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-lg">
              <Mail className="h-5 w-5 text-sapphire-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Email Delivery</h3>
          </div>
          <p className="text-dark-300">
            Your report will be sent directly to your email within minutes, along with additional resources and next steps.
          </p>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 bg-dark-800 border rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors ${
                errors.name ? 'border-red-500' : 'border-dark-600'
              }`}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-dark-800 border rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors ${
                errors.email ? 'border-red-500' : 'border-dark-600'
              }`}
              placeholder="your.email@firm.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="firm" className="block text-sm font-medium text-white mb-2">
            Law Firm / Organization *
          </label>
          <input
            type="text"
            id="firm"
            value={formData.firm}
            onChange={(e) => handleInputChange('firm', e.target.value)}
            className={`w-full px-4 py-3 bg-dark-800 border rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors ${
              errors.firm ? 'border-red-500' : 'border-dark-600'
            }`}
            placeholder="Your law firm name"
          />
          {errors.firm && (
            <p className="mt-1 text-sm text-red-400">{errors.firm}</p>
          )}
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            size="lg"
            className="w-full group"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Generating Your Report...' : 'Get My AI Readiness Report'}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <p className="text-center text-sm text-dark-400">
          Your information is secure and will only be used to deliver your report. 
          We'll never share your data with third parties.
        </p>
      </motion.form>
    </div>
  )
} 