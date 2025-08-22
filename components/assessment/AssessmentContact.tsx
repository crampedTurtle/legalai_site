'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, CheckCircle, FileText, Mail, Loader2, Sparkles } from 'lucide-react'
import { submitLead } from '@/lib/lead/submitLead'

interface AssessmentContactProps {
  onSubmit: (contact: { name: string; email: string; firm: string }) => void
  isSubmitting: boolean
}

// Progress Status Component
function ProgressStatus({ isSubmitting }: { isSubmitting: boolean }) {
  if (!isSubmitting) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-dark-900 border border-dark-700 rounded-2xl p-8 max-w-md mx-4">
        <div className="text-center space-y-6">
          {/* Animated Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-16 h-16 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full flex items-center justify-center"
          >
            <Sparkles className="h-8 w-8 text-sapphire-400" />
          </motion.div>

          {/* Title */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Generating Your Report
            </h3>
            <p className="text-dark-300">
              This may take a few moments...
            </p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-sapphire-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-white">Analyzing your responses</span>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-6 h-6 bg-sapphire-500 rounded-full flex items-center justify-center"
              >
                <Loader2 className="h-4 w-4 text-white animate-spin" />
              </motion.div>
              <span className="text-white">Generating AI recommendations</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-dark-600 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-dark-400" />
              </div>
              <span className="text-dark-400">Creating PDF report</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-dark-600 rounded-full flex items-center justify-center">
                <Mail className="h-4 w-4 text-dark-400" />
              </div>
              <span className="text-dark-400">Sending to your email</span>
            </div>
          </div>

          {/* Loading Bar */}
          <div className="w-full bg-dark-700 rounded-full h-2">
            <motion.div
              className="bg-sapphire-500 h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        // Capture lead in Supabase
        await submitLead({
          email: formData.email,
          name: formData.name,
          firm_name: formData.firm,
          wants_demo: false,
          source: 'AIassessment',
        })
        
        // Proceed with existing flow
        onSubmit(formData)
      } catch (error) {
        console.error('Failed to capture lead:', error)
        // Continue with assessment flow even if lead capture fails
        onSubmit(formData)
      }
    }
  }

  return (
    <>
      <ProgressStatus isSubmitting={isSubmitting} />
      
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Your Report...
                </>
              ) : (
                <>
                  Get My AI Readiness Report
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-dark-400">
            Your information is secure and will only be used to deliver your report. 
            We'll never share your data with third parties.
          </p>
        </motion.form>
      </div>
    </>
  )
} 