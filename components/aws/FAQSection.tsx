'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

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
      question: 'Do we share a database with other firms?',
      answer: 'No. Every tenant gets its own dedicated Postgres instance, provisioned automatically on AWS. This ensures maximum security, performance, and compliance. Your data is completely isolated from all other firms.'
    },
    {
      question: 'How quickly can we get started?',
      answer: 'Schedule a demo to see your dedicated AWS tenant in action. After the demo, your dedicated AWS environment is provisioned automatically within minutes. The 14-day trial gives you full access to all features with no commitment required.'
    },
    {
      question: 'What happens after the 14-day trial?',
      answer: 'Your trial automatically converts to a paid subscription on Day 14. You can cancel anytime during the trial period with no charges. We\'ll send you an invoice only if you continue using the service.'
    },
    {
      question: 'Can we migrate from our current system?',
      answer: 'Yes! We include a migration wizard that supports TrialWorks import and other common legal practice management systems. Our team provides guided migration support as part of the Launch Pack.'
    },
    {
      question: 'Is our data backed up?',
      answer: 'Absolutely. Aurora PostgreSQL provides automatic backups with point-in-time recovery. Your data is also replicated across multiple availability zones for maximum durability.'
    },
    {
      question: 'Can we upgrade or downgrade tiers?',
      answer: 'Yes, you can change tiers at any time. Upgrades take effect immediately with prorated billing. Downgrades take effect at the next billing cycle.'
    },
    {
      question: 'Do you sign Business Associate Agreements (BAAs)?',
      answer: 'Yes, we sign BAAs for Enterprise customers who handle PHI. Our platform is designed to support HIPAA compliance requirements with proper controls and audit trails.'
    },
    {
      question: 'What if we need to cancel?',
      answer: 'You can cancel your subscription at any time with 30 days notice. We\'ll help you export your data and ensure a smooth transition. No long-term contracts required.'
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
              Everything you need to know about AWS deployment
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
