'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { X, Check, Star, Database, ArrowRight, Loader2 } from 'lucide-react'
import { useAWSTierSelectorModal } from '@/hooks/useAWSTierSelectorModal'

interface AWSTierSelectorModalProps {}

export function AWSTierSelectorModal({}: AWSTierSelectorModalProps) {
  const { isOpen, close, source, preselectedTier } = useAWSTierSelectorModal()
  const [selectedTier, setSelectedTier] = useState<string>(preselectedTier || '')
  const [isRedirecting, setIsRedirecting] = useState(false)

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

  const handleStartTrial = async () => {
    if (!selectedTier) return

    try {
      setIsRedirecting(true)
      
      // For now, redirect to the existing demo booking flow with AWS context
      // This will be updated when Cognito integration is implemented
      const calUrl = `https://cal.com/s5-brett?utm_source=${encodeURIComponent(source)}&utm_medium=aws_tier_selector&utm_campaign=aws_trial&tier=${selectedTier}&deployment=aws`
      window.open(calUrl, '_blank')
      
      // Close modal after redirect
      setTimeout(() => {
        close()
        setIsRedirecting(false)
      }, 1000)
      
    } catch (error) {
      console.error('Failed to redirect to signup:', error)
      setIsRedirecting(false)
    }
  }

  const handleClose = () => {
    if (!isRedirecting) {
      close()
      setSelectedTier('')
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
            className="relative bg-dark-900 border border-dark-700 rounded-2xl p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-dark-400 hover:text-white transition-colors"
              disabled={isRedirecting}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Choose Your AWS Tier
              </h2>
              <p className="text-dark-300 text-lg mb-4">
                Every tier includes a dedicated Postgres instance. No shared databases, ever.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full text-sapphire-400 text-sm font-medium">
                <Database className="h-4 w-4" />
                Every tenant gets their own isolated Postgres instance
              </div>
            </div>

            {/* Tier Selection */}
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
                onClick={handleStartTrial}
                disabled={!selectedTier || isRedirecting}
                data-cta="aws-tier-selector"
                data-track="aws_tier_selector_cta"
                data-tier={selectedTier}
              >
                {isRedirecting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Opening Calendar...
                  </>
                ) : (
                  <>
                    Schedule Demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleClose}
                disabled={isRedirecting}
              >
                Cancel
              </Button>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-sm text-dark-400">
                Schedule a demo to see your dedicated AWS tenant in action • No commitment required
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
