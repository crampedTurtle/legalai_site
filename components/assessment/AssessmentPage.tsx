'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AssessmentIntro } from './AssessmentIntro'
import { AssessmentQuestionnaire } from './AssessmentQuestionnaire'
import { AssessmentContact } from './AssessmentContact'
import { AssessmentResults } from './AssessmentResults'
import { AssessmentSubmission } from '@/lib/assessment-data'

type AssessmentStep = 'intro' | 'questionnaire' | 'contact' | 'results'

export function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro')
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', firm: '' })
  const [results, setResults] = useState<AssessmentSubmission | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStartAssessment = () => {
    setCurrentStep('questionnaire')
  }

  const handleQuestionnaireComplete = (questionAnswers: Record<string, number>) => {
    setAnswers(questionAnswers)
    setCurrentStep('contact')
  }

  const handleContactSubmit = async (contact: { name: string; email: string; firm: string }) => {
    setContactInfo(contact)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          firm: contact.firm,
          answers: answers,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit assessment')
      }

      const assessmentResults = await response.json()
      setResults(assessmentResults)
      setCurrentStep('results')
    } catch (error) {
      console.error('Error submitting assessment:', error)
      // Handle error - could show a toast notification
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRestart = () => {
    setCurrentStep('intro')
    setAnswers({})
    setContactInfo({ name: '', email: '', firm: '' })
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {currentStep === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AssessmentIntro onStart={handleStartAssessment} />
              </motion.div>
            )}

            {currentStep === 'questionnaire' && (
              <motion.div
                key="questionnaire"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AssessmentQuestionnaire onComplete={handleQuestionnaireComplete} />
              </motion.div>
            )}

            {currentStep === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AssessmentContact 
                  onSubmit={handleContactSubmit} 
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            )}

            {currentStep === 'results' && results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AssessmentResults 
                  results={results} 
                  onRestart={handleRestart}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  )
} 