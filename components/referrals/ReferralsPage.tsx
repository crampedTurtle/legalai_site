'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, ShieldCheck, Workflow, Users, Copy, CheckCircle } from 'lucide-react'
import { useDemoModal } from '@/hooks/useDemoModal'
import { useState } from 'react'

export function ReferralsPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [copied, setCopied] = useState(false)

  const copyIntroScript = () => {
    const script = `Hi [Law Firm Contact],

I'd like to introduce you to **Sapphire Legal AI**. They provide a **private, compliant AI workspace** built for law firms and a structured **4‑week Launch Pack** for adoption. I think this could save your team significant time while tightening compliance. Looping in Brett to take it from here.`

    navigator.clipboard.writeText(script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openDemoModal = (utm: string) => {
    useDemoModal.getState().open(`referrals:${utm}`)
  }

  return (
    <div className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-sapphire-500/5 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sapphire Legal AI Referral Partner Program
            </motion.h1>
            
            <motion.p
              className="text-xl text-dark-300 leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Earn 10% by introducing us to law firms that want private, compliant AI. We handle the sales process. You get paid.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="group" 
                onClick={() => openDemoModal('hero')}
                data-utm="referrals-hero"
                aria-label="Introduce a firm (opens contact modal)"
              >
                Introduce a Firm
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="group" 
                asChild
              >
                <a href="/schedule?utm=referrals">
                  Book a Partner Call
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>

            <motion.p
              className="text-sm text-dark-400"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Quarterly payouts once invoices are paid. Non-exclusive; simple agreement.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20 bg-dark-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Partner With Sapphire?
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              We're building the future of legal AI, and we want partners who share our vision for secure, compliant technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-sapphire-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Proven Security</h3>
              <p className="text-dark-300">
                Our private AI approach is trusted by forward-thinking firms. No data leaves your environment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Workflow className="h-8 w-8 text-sapphire-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Clear Framework</h3>
              <p className="text-dark-300">
                Our 4-week implementation process is repeatable and proven. Firms see value quickly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-sapphire-500/20 border border-sapphire-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-sapphire-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Simple Partnership</h3>
              <p className="text-dark-300">
                No exclusivity requirements. We handle sales and implementation. You get paid quarterly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commission Plan Section */}
      <section className="py-20 bg-dark-950">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Simple Commission Structure
            </h2>
            <p className="text-xl text-dark-300 mb-12">
              Earn 10% on all revenue from firms you introduce to us.
            </p>

            <div className="bg-dark-900 rounded-2xl p-8 border border-dark-700">
              <ul className="text-left space-y-4 text-lg text-white">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-sapphire-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>10% commission on all platform subscriptions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-sapphire-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>10% commission on Launch Pack implementations ($12,000)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-sapphire-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>10% commission on Managed Ops subscriptions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-sapphire-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>10% commission on Fractional CTO services</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-dark-400 mt-6">
              Commissions paid quarterly once invoices are collected. No caps or limits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-dark-900">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-dark-300 mb-12">
              It's simple: introduce us to law firms, we handle everything else.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-sapphire-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Introduce</h3>
                <p className="text-dark-300 text-sm">
                  Connect us with law firms interested in private AI solutions
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-sapphire-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">We Sell</h3>
                <p className="text-dark-300 text-sm">
                  Our team handles demos, proposals, and contract negotiations
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-sapphire-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">You Get Paid</h3>
                <p className="text-dark-300 text-sm">
                  Earn 10% commission on all revenue from your referrals
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="group"
              onClick={() => openDemoModal('how')}
              data-utm="referrals-how"
            >
              Introduce a Firm
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Typical Payout Examples Section */}
      <section className="py-20 bg-dark-950">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Typical Payout Examples
            </h2>
            <p className="text-xl text-dark-300 mb-12">
              See what you can earn by introducing firms to Sapphire Legal AI.
            </p>

            <div className="bg-dark-900 rounded-2xl p-8 border border-dark-700">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="py-3 px-4 text-white font-semibold">Firm Size</th>
                      <th className="py-3 px-4 text-white font-semibold">Typical Revenue</th>
                      <th className="py-3 px-4 text-white font-semibold">Your Commission</th>
                    </tr>
                  </thead>
                  <tbody className="text-dark-300">
                    <tr className="border-b border-dark-800">
                      <td className="py-3 px-4">Small Practice (2-5 attorneys)</td>
                      <td className="py-3 px-4">$25,000/year</td>
                      <td className="py-3 px-4 text-sapphire-400 font-semibold">$2,500/year</td>
                    </tr>
                    <tr className="border-b border-dark-800">
                      <td className="py-3 px-4">Mid-size Firm (10-25 attorneys)</td>
                      <td className="py-3 px-4">$75,000/year</td>
                      <td className="py-3 px-4 text-sapphire-400 font-semibold">$7,500/year</td>
                    </tr>
                    <tr className="border-b border-dark-800">
                      <td className="py-3 px-4">Large Practice (50+ attorneys)</td>
                      <td className="py-3 px-4">$200,000/year</td>
                      <td className="py-3 px-4 text-sapphire-400 font-semibold">$20,000/year</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Implementation (Launch Pack)</td>
                      <td className="py-3 px-4">$12,000 (one-time)</td>
                      <td className="py-3 px-4 text-sapphire-400 font-semibold">$1,200 (one-time)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-dark-400 mt-6">
              These are typical examples. Actual revenue varies based on firm needs and service selection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Script Section */}
      <section className="py-20 bg-dark-900">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready-to-Use Intro Script
            </h2>
            <p className="text-xl text-dark-300 mb-8">
              Use this script to introduce us to law firms you know.
            </p>

            <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700 text-left">
              <div className="bg-dark-950 rounded-lg p-6 mb-6">
                <p className="text-white leading-relaxed">
                  Hi [Law Firm Contact],
                </p>
                <br />
                <p className="text-white leading-relaxed">
                  I'd like to introduce you to <strong>Sapphire Legal AI</strong>. They provide a <strong>private, compliant AI workspace</strong> built for law firms and a structured <strong>4‑week Launch Pack</strong> for adoption.
                </p>
                <br />
                <p className="text-white leading-relaxed">
                  I think this could save your team significant time while tightening compliance. Looping in Brett to take it from here.
                </p>
              </div>

              <Button
                onClick={copyIntroScript}
                className="group"
                disabled={copied}
              >
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-5 w-5" />
                    Copy Script
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark-950">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-dark-300 mb-12">
              Everything you need to know about our referral program.
            </p>

            <div className="space-y-6 text-left">
              <div className="bg-dark-900 rounded-lg p-6 border border-dark-700">
                <h3 className="text-lg font-semibold text-white mb-3">How do I get started?</h3>
                <p className="text-dark-300">
                  Simply introduce us to law firms you know. We'll handle the sales process and keep you updated on progress.
                </p>
              </div>

              <div className="bg-dark-900 rounded-lg p-6 border border-dark-700">
                <h3 className="text-lg font-semibold text-white mb-3">When do I get paid?</h3>
                <p className="text-dark-300">
                  Commissions are paid quarterly once we collect payment from the client. We'll send you a detailed report.
                </p>
              </div>

              <div className="bg-dark-900 rounded-lg p-6 border border-dark-700">
                <h3 className="text-lg font-semibold text-white mb-3">Is there an exclusivity requirement?</h3>
                <p className="text-dark-300">
                  No, you can partner with other companies. We believe in building mutually beneficial relationships.
                </p>
              </div>

              <div className="bg-dark-900 rounded-lg p-6 border border-dark-700">
                <h3 className="text-lg font-semibold text-white mb-3">What if the firm doesn't buy?</h3>
                <p className="text-dark-300">
                  No problem! You only earn commission on actual sales. There's no risk or obligation.
                </p>
              </div>

              <div className="bg-dark-900 rounded-lg p-6 border border-dark-700">
                <h3 className="text-lg font-semibold text-white mb-3">How do you track referrals?</h3>
                <p className="text-dark-300">
                  We use UTM parameters and ask prospects how they heard about us. We'll always credit you for introductions.
                </p>
              </div>

              <div className="bg-dark-900 rounded-lg p-6 border border-dark-700">
                <h3 className="text-lg font-semibold text-white mb-3">Can I earn commission on renewals?</h3>
                <p className="text-dark-300">
                  Yes! You earn 10% on all ongoing revenue from firms you introduce, including renewals and upsells.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Button
                size="lg"
                className="group"
                onClick={() => openDemoModal('faq')}
                data-utm="referrals-faq"
              >
                Introduce a Firm
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="py-20 bg-dark-900">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-dark-300 mb-12">
              Join our referral program and start earning 10% commission on every law firm you introduce to Sapphire Legal AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group"
                onClick={() => openDemoModal('footer')}
                data-utm="referrals-footer"
              >
                Introduce a Firm
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="group"
                asChild
              >
                <a href="/schedule?utm=referrals">
                  Book a Partner Call
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
