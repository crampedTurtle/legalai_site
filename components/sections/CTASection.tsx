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
  CheckCircle
} from 'lucide-react'

const benefits = [
  '30-minute personalized demo',
  'See real legal workflows',
  'Security & compliance walkthrough',
  'Custom implementation plan',
  'No sales pressure',
  'Free consultation'
]

export function CTASection() {
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
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-dark-300">
                  <Mail className="h-5 w-5 text-sapphire-400" />
                  <span>info@sapphirelegal.ai</span>
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
            <h3 className="text-2xl font-semibold text-white mb-6">
              Request Your Demo
            </h3>
            <form className="space-y-6">
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
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    placeholder="John"
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
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                    placeholder="Smith"
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
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                  placeholder="john.smith@lawfirm.com"
                />
              </div>

              <div>
                <label htmlFor="firm" className="block text-sm font-medium text-dark-300 mb-2">
                  Firm/Organization *
                </label>
                <input
                  type="text"
                  id="firm"
                  name="firm"
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
                  placeholder="Smith & Associates Law"
                />
              </div>

              <div>
                <label htmlFor="practiceArea" className="block text-sm font-medium text-dark-300 mb-2">
                  Practice Area
                </label>
                <select
                  id="practiceArea"
                  name="practiceArea"
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors"
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
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-sapphire-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your current challenges and what you're looking to achieve..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full group">
                Schedule Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-xs text-dark-400 text-center">
                By submitting this form, you agree to our{' '}
                <a href="/privacy" className="text-sapphire-400 hover:text-sapphire-300 transition-colors">
                  Privacy Policy
                </a>
                . We'll never share your information with third parties.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 