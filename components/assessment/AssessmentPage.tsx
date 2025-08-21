'use client'

import { useState, useEffect } from 'react'
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

  // Helper function to calculate average score for a category
  const calculateCategoryAverage = (answers: Record<string, number>, category: string): number => {
    const categoryAnswers = Object.entries(answers)
      .filter(([id]) => id.startsWith(category + '_'))
      .map(([, score]) => score || 0)
    
    if (categoryAnswers.length === 0) return 0
    
    const sum = categoryAnswers.reduce((acc, score) => acc + score, 0)
    return Math.round((sum / categoryAnswers.length) * 10) / 10 // Round to 1 decimal place
  }

  // Ensure page starts at top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleStartAssessment = () => {
    setCurrentStep('questionnaire')
    // Scroll to top when starting assessment
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleQuestionnaireComplete = (questionAnswers: Record<string, number>) => {
    setAnswers(questionAnswers)
    setCurrentStep('contact')
    // Scroll to top when moving to contact step
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleContactSubmit = async (contact: { name: string; email: string; firm: string }) => {
    setContactInfo(contact)
    setIsSubmitting(true)

    try {
      // Step 1: Generate report with OpenAI and PDF
      const reportResponse = await fetch('/api/assessment/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          firm: { name: contact.firm },
          scores: {
            strategy: calculateCategoryAverage(answers, 'strategy'),
            data: calculateCategoryAverage(answers, 'data'),
            technology: calculateCategoryAverage(answers, 'technology'),
            team: calculateCategoryAverage(answers, 'team'),
            change: calculateCategoryAverage(answers, 'implementation') // Note: category is 'implementation' but we map to 'change'
          },
          questions: Object.entries(answers).map(([id, score]) => ({
            id,
            score,
            category: id.split('_')[0] as any
          })),
          thresholds: {
            emerging: 1.5,
            developing: 3.5,
            mature: 5.0
          },
          requirements: {
            compliance: [],
            security: [],
            integration: []
          },
          brand: {
            name: "Sapphire Legal AI",
            values: ["Privacy-first", "Security", "Compliance"]
          }
        }),
      })

      if (!reportResponse.ok) {
        throw new Error('Failed to generate assessment report')
      }

      const { pdfBase64, recommendations } = await reportResponse.json()

      // Step 2: Send email with PDF
      const emailResponse = await fetch('/api/assessment/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toEmail: contact.email,
          firmName: contact.firm,
          pdfBase64: pdfBase64
        }),
      })

      if (!emailResponse.ok) {
        console.warn('Email sending failed, but report was generated')
      }

      // Step 3: Create results object for display
      console.log('Raw recommendations:', recommendations)
      console.log('Categories:', recommendations.categories)
      
      // Map OpenAI category keys to expected category IDs
      const categoryKeyMapping: { [key: string]: string } = {
        'strategy': 'strategy',
        'data': 'data', 
        'technology': 'technology',
        'team': 'team',
        'change': 'implementation', // OpenAI returns 'change' but we expect 'implementation'
        'implementation': 'implementation'
      }
      
      const assessmentResults = {
        name: contact.name,
        email: contact.email,
        firm: contact.firm,
        answers: answers,
        results: recommendations.categories.map((cat: any) => {
          console.log('Processing category:', cat)
          
          // Map the category key to the expected ID
          const categoryId = categoryKeyMapping[cat.key] || cat.key
          const score = typeof cat.score === 'number' && !isNaN(cat.score) ? cat.score : 0
          const percentage = Math.round(score * 20) // Convert to percentage (0-5 scale to 0-100)
          
          console.log(`Category ${cat.key} -> ${categoryId}: score=${cat.score}, calculated=${score}, percentage=${percentage}`)
          
          return {
            category: categoryId, // Use the mapped category ID
            score: percentage,
            maxScore: 100,
            percentage: percentage,
            recommendations: Array.isArray(cat.recommendations) 
              ? cat.recommendations.map((rec: any) => rec.title || 'Recommendation')
              : []
          }
        }),
        totalScore: typeof recommendations.overall?.score === 'number' && !isNaN(recommendations.overall.score) 
          ? recommendations.overall.score 
          : 0,
        maxTotalScore: 100,
        overallPercentage: typeof recommendations.overall?.score === 'number' && !isNaN(recommendations.overall.score) 
          ? recommendations.overall.score 
          : 0
      }
      
      console.log('Final assessment results:', assessmentResults)

      setResults(assessmentResults)
      setCurrentStep('results')
      
      // Scroll to top when showing results
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
    // Scroll to top when restarting
    window.scrollTo({ top: 0, behavior: 'smooth' })
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