'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { 
  ASSESSMENT_QUESTIONS, 
  ASSESSMENT_CATEGORIES, 
  LIKERT_SCALE_OPTIONS,
  Question 
} from '@/lib/assessment-data'

interface AssessmentQuestionnaireProps {
  onComplete: (answers: Record<string, number>) => void
}

export function AssessmentQuestionnaire({ onComplete }: AssessmentQuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null)

  const currentQuestion = ASSESSMENT_QUESTIONS[currentQuestionIndex]
  const currentCategory = ASSESSMENT_CATEGORIES.find(cat => cat.id === currentQuestion.category)
  const totalQuestions = ASSESSMENT_QUESTIONS.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const questionsInCurrentCategory = ASSESSMENT_QUESTIONS.filter(q => q.category === currentQuestion.category)
  const categoryQuestionIndex = questionsInCurrentCategory.findIndex(q => q.id === currentQuestion.id)
  const categoryProgress = ((categoryQuestionIndex + 1) / questionsInCurrentCategory.length) * 100

  const handleAnswerSelect = (value: number) => {
    setCurrentAnswer(value)
  }

  const handleNext = () => {
    if (currentAnswer !== null) {
      const newAnswers = { ...answers, [currentQuestion.id]: currentAnswer }
      setAnswers(newAnswers)
      
      if (currentQuestionIndex === totalQuestions - 1) {
        onComplete(newAnswers)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setCurrentAnswer(answers[ASSESSMENT_QUESTIONS[currentQuestionIndex + 1].id] || null)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      const prevQuestion = ASSESSMENT_QUESTIONS[currentQuestionIndex - 1]
      setCurrentAnswer(answers[prevQuestion.id] || null)
    }
  }

  const canProceed = currentAnswer !== null
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm text-sapphire-400">
          <CheckCircle className="h-4 w-4" />
          AI Readiness Assessment
        </div>
        <h1 className="text-3xl font-bold text-white">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </h1>
        
        {/* Progress Bar */}
        <div className="w-full bg-dark-800 rounded-full h-2">
          <motion.div
            className="bg-sapphire-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Category Progress */}
        {currentCategory && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark-300">{currentCategory.name}</span>
              <span className="text-sapphire-400">
                {categoryQuestionIndex + 1} of {questionsInCurrentCategory.length}
              </span>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-1">
              <motion.div
                className="h-1 rounded-full"
                style={{ backgroundColor: currentCategory.color }}
                initial={{ width: 0 }}
                animate={{ width: `${categoryProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Likert Scale */}
          <div className="space-y-6">
            <div className="grid grid-cols-5 gap-4">
              {LIKERT_SCALE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    currentAnswer === option.value
                      ? 'border-sapphire-500 bg-sapphire-500/20 text-white'
                      : 'border-dark-700 bg-dark-800 text-dark-300 hover:border-dark-600 hover:text-dark-200'
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div 
                      className="w-4 h-4 rounded-full mx-auto"
                      style={{ backgroundColor: option.color }}
                    />
                    <div className="text-sm font-medium">{option.value}</div>
                    <div className="text-xs leading-tight">{option.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="group"
        >
          {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Question Counter */}
      <div className="text-center text-sm text-dark-400">
        {currentQuestionIndex + 1} of {totalQuestions} questions completed
      </div>
    </div>
  )
} 