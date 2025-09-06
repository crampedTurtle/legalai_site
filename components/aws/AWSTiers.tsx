'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Check, Star, Database } from 'lucide-react'
import { useAWSTierSelectorModal } from '@/hooks/useAWSTierSelectorModal'

export function AWSTiers() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { open } = useAWSTierSelectorModal()

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
      ],
      highlight: 'Perfect for small firms starting with AI'
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
      ],
      highlight: 'Best for growing practices'
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
      ],
      highlight: 'Enterprise-grade security and control'
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
      ],
      highlight: 'Tailored for largest firms'
    }
  ]

  return (
    <section id="tiers" className="py-20 bg-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your AWS Tier
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto mb-6">
              Every tier includes a dedicated Postgres instance. No shared databases, ever.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full text-sapphire-400 text-sm font-medium">
              <Database className="h-4 w-4" />
              Every tenant gets their own isolated Postgres instance
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-6 rounded-xl border ${
                  tier.badge === "Most Popular"
                    ? 'border-sapphire-500 bg-dark-800' 
                    : 'border-dark-700 bg-dark-800'
                }`}
              >
                {tier.badge === "Most Popular" && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-sapphire-500 text-white rounded-full text-xs font-medium">
                      <Star className="h-3 w-3" />
                      {tier.badge}
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-sm text-dark-300 mb-3">{tier.userCap}</p>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-white">
                      {tier.price}
                    </span>
                    {tier.price !== 'Custom' && <span className="text-dark-300 ml-1">/mo</span>}
                  </div>
                  {tier.perUser && (
                    <p className="text-sm text-dark-400">+ {tier.perUser}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-sapphire-400 font-medium mb-3">{tier.description}</p>
                  <p className="text-xs text-dark-400 mb-4">{tier.highlight}</p>
                  
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-dark-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center">
                  <Button 
                    size="lg" 
                    className={`w-full group ${tier.badge === "Most Popular" ? 'bg-sapphire-500 hover:bg-sapphire-600' : ''}`}
                    onClick={() => open('tiers', tier.id)}
                    data-cta="aws-tiers"
                    data-track="aws_tier_cta"
                    data-tier={tier.id}
                  >
                    Schedule Demo
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Footnote */}
          <div className="mt-8 text-center">
            <p className="text-sm text-dark-400">
              *NetDocuments / iManage connectors on the roadmap. Contact us for timeline.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
