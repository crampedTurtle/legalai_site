'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Check, Star, ChevronDown, ChevronUp } from 'lucide-react'

interface PricingPageProps {
  children: React.ReactNode
}

export function PricingPage({ children }: PricingPageProps) {
  return (
    <div className="pt-32 pb-24">
      {children}
    </div>
  )
}

interface HeadlineProps {
  children: React.ReactNode
}

export function Headline({ children }: HeadlineProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
            {children}
          </h1>
        </motion.div>
      </div>
    </section>
  )
}

interface SubheadProps {
  children: React.ReactNode
}

export function Subhead({ children }: SubheadProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xl text-dark-300 leading-relaxed">
            {children}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

interface PricingTabsProps {
  children: React.ReactNode
}

export function PricingTabs({ children }: PricingTabsProps) {
  const [activeTab, setActiveTab] = useState('platform')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const tabs = [
    { id: 'platform', label: 'Platform' },
    { id: 'launch-pack', label: 'Launch Pack' },
    { id: 'managed-ops', label: 'Managed Ops' }
  ]

  return (
    <section className="py-20 bg-dark-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="flex bg-dark-800 rounded-lg p-1 border border-dark-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-sapphire-500 text-white'
                      : 'text-dark-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'platform' && <PlatformTab />}
            {activeTab === 'launch-pack' && <LaunchPackTab />}
            {activeTab === 'managed-ops' && <ManagedOpsTab />}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function PlatformTab() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const plans = [
    {
      title: 'Core',
      users: 'Up to 10 users',
      price: '$1,500',
      perUser: '$39',
      features: [
        'Private workspace',
        'Guardrails & redaction',
        'Policy controls',
        'Basic workflows',
        'Email support',
        'Standard audit logs'
      ],
      popular: false
    },
    {
      title: 'Practice',
      users: 'Up to 25 users',
      price: '$3,500',
      perUser: '$35',
      features: [
        'Everything in Core',
        'Advanced workflow builder',
        'Model routing',
        'DMS connectors*',
        'Priority support',
        'Usage analytics'
      ],
      popular: true
    },
    {
      title: 'Firm',
      users: 'Up to 50 users',
      price: '$6,000',
      perUser: '$32',
      features: [
        'Everything in Practice',
        'SSO/SAML',
        'Granular policy controls',
        'Sandbox envs',
        'Admin insights',
        'Scheduled exports'
      ],
      popular: false
    },
    {
      title: 'Enterprise',
      users: 'Contact us',
      price: 'Custom',
      perUser: '',
      features: [
        'Unlimited org size',
        'Private VPC/on-prem',
        'Custom SLAs',
        'BAA/HIPAA',
        'Advanced governance',
        'Dedicated success'
      ],
      popular: false
    }
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative p-6 rounded-xl border ${
              plan.popular 
                ? 'border-sapphire-500 bg-dark-800' 
                : 'border-dark-700 bg-dark-800'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-sapphire-500 text-white rounded-full text-xs font-medium">
                  <Star className="h-3 w-3" />
                  Most Popular
                </div>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
              <p className="text-sm text-dark-300 mb-3">{plan.users}</p>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-dark-300 ml-1">/mo</span>}
              </div>
              {plan.perUser && (
                <p className="text-sm text-dark-400">+ {plan.perUser}/user/mo</p>
              )}
            </div>
            
            <div className="mb-6">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
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
                className={`w-full group ${plan.popular ? 'bg-sapphire-500 hover:bg-sapphire-600' : ''}`}
                asChild
                data-cta="pricing"
              >
                <a href="https://cal.com/s5-brett" target="_blank" rel="noopener noreferrer">
                  Book a 20-min scoping call
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
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
  )
}

export function LaunchPackTab() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    'Discovery & risk workshop',
    'Guardrails & policies',
    'Connector setup',
    '5 priority workflows',
    'Admin training',
    'Pilot enablement',
    'Go-live support'
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      <div className="p-8 rounded-xl border border-sapphire-500 bg-dark-800">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Launch Pack</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold text-white">$12,000</span>
            <span className="text-dark-300 ml-2">fixed (4 weeks)</span>
          </div>
        </div>
        
        <div className="mb-8">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-sapphire-400 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-center">
          <Button size="lg" className="w-full group" asChild data-cta="pricing">
            <a href="https://cal.com/s5-brett" target="_blank" rel="noopener noreferrer">
              Get timeline & quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export function ManagedOpsTab() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      title: 'Content & Playbook Ops',
      price: 'from $2,500/mo',
      features: [
        'Knowledge packs',
        'Prompt libraries',
        'Template upkeep',
        'Monthly tuning'
      ]
    },
    {
      title: 'Intake & Triage Desk',
      price: 'from $3,000/mo',
      features: [
        'Human-in-the-loop review',
        'Routing',
        'SLAs',
        'Escalations'
      ]
    },
    {
      title: 'Data & Evaluation Ops',
      price: 'from $2,000/mo',
      features: [
        'Red-team prompts',
        'Eval sets',
        'Quality scoring',
        'Drift watch'
      ]
    }
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="p-6 rounded-xl border border-dark-700 bg-dark-800"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-2xl font-bold text-sapphire-400">{service.price}</p>
            </div>
            
            <div className="mb-6">
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-sapphire-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-dark-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <Button size="lg" className="w-full group" asChild data-cta="pricing">
                <a href="https://cal.com/s5-brett" target="_blank" rel="noopener noreferrer">
                  Get timeline & quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

interface FAQItem {
  question: string
  answer: string
}

export function FAQSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [openItems, setOpenItems] = useState<number[]>([])

  const faqs: FAQItem[] = [
    {
      question: 'How are platform and per-user fees billed?',
      answer: 'Platform fees are billed monthly in advance. Per-user fees are calculated based on your actual user count and billed monthly. You can add or remove users at any time with prorated billing.'
    },
    {
      question: 'Can we host in our own VPC or on-prem?',
      answer: 'Yes, Enterprise customers can deploy Sapphire Legal AI in their own VPC or on-premises environment. We provide the necessary infrastructure requirements and deployment support.'
    },
    {
      question: 'Do you sign a BAA?',
      answer: 'Yes, we sign Business Associate Agreements (BAAs) for Enterprise customers who handle PHI. Our platform is designed to support HIPAA compliance requirements.'
    },
    {
      question: 'What\'s included in the Launch Pack?',
      answer: 'The Launch Pack is a 4-week implementation service that includes discovery workshops, security configuration, workflow setup, admin training, and go-live support to ensure successful deployment.'
    },
    {
      question: 'Can we start on Core and upgrade later?',
      answer: 'Absolutely. You can start with any platform tier and upgrade as your needs grow. We provide seamless migration support and prorated billing for upgrades.'
    },
    {
      question: 'What\'s your cancellation policy?',
      answer: 'You can cancel your subscription at any time with 30 days notice. We\'ll help you export your data and ensure a smooth transition.'
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="py-20 bg-dark-950">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-dark-300">
              Everything you need to know about our pricing and services
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-dark-700 rounded-lg bg-dark-800"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-dark-700 transition-colors"
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-dark-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-dark-400" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-dark-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 