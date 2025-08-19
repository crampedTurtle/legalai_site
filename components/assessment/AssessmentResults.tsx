'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Download, RefreshCw, CheckCircle } from 'lucide-react'
import { AssessmentSubmission, ASSESSMENT_CATEGORIES } from '@/lib/assessment-data'

interface AssessmentResultsProps {
  results: AssessmentSubmission
  onRestart: () => void
}

export function AssessmentResults({ results, onRestart }: AssessmentResultsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      drawSpiderChart()
    }
  }, [results])

  const drawSpiderChart = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40
    const numCategories = results.results.length

    // Draw background circles
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 1
    for (let i = 1; i <= 5; i++) {
      const circleRadius = (radius * i) / 5
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Draw category lines
    ctx.strokeStyle = '#4B5563'
    ctx.lineWidth = 1
    for (let i = 0; i < numCategories; i++) {
      const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    // Draw data points and fill
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
    ctx.strokeStyle = '#3B82F6'
    ctx.lineWidth = 2

    ctx.beginPath()
    for (let i = 0; i < numCategories; i++) {
      const result = results.results[i]
      const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
      const scoreRadius = (radius * result.percentage) / 100
      const x = centerX + scoreRadius * Math.cos(angle)
      const y = centerY + scoreRadius * Math.sin(angle)
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw data points
    ctx.fillStyle = '#3B82F6'
    for (let i = 0; i < numCategories; i++) {
      const result = results.results[i]
      const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
      const scoreRadius = (radius * result.percentage) / 100
      const x = centerX + scoreRadius * Math.cos(angle)
      const y = centerY + scoreRadius * Math.sin(angle)
      
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    }

    // Draw category labels
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '12px Inter, sans-serif'
    ctx.textAlign = 'center'
    for (let i = 0; i < numCategories; i++) {
      const angle = (2 * Math.PI * i) / numCategories - Math.PI / 2
      const labelRadius = radius + 20
      const x = centerX + labelRadius * Math.cos(angle)
      const y = centerY + labelRadius * Math.sin(angle)
      
      ctx.fillText(results.results[i].category, x, y + 4)
    }
  }

  const getOverallScore = () => {
    if (results.overallPercentage >= 80) return { label: 'Excellent', color: 'text-green-400', bg: 'bg-green-500/20' }
    if (results.overallPercentage >= 60) return { label: 'Good', color: 'text-blue-400', bg: 'bg-blue-500/20' }
    if (results.overallPercentage >= 40) return { label: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
    return { label: 'Needs Improvement', color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  const overallScore = getOverallScore()

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-sm text-green-400"
        >
          <CheckCircle className="h-4 w-4" />
          Report Generated Successfully
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold text-white"
        >
          Your AI Readiness Report
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${overallScore.bg} border border-current rounded-full text-sm ${overallScore.color}`}>
            <span className="font-semibold">Overall Score: {overallScore.label}</span>
            <span className="font-bold">{Math.round(results.overallPercentage)}%</span>
          </div>
          <p className="text-dark-300">
            Your detailed PDF report has been sent to <span className="text-white font-medium">{results.email}</span>
          </p>
        </motion.div>
      </div>

      {/* Spider Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white text-center">Your Assessment Results</h2>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            className="max-w-full h-auto"
          />
        </div>
      </motion.div>

      {/* Category Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white">Category Breakdown</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.results.map((result, index) => {
            const category = ASSESSMENT_CATEGORIES.find(cat => cat.id === result.category)
            const getScoreColor = (percentage: number) => {
              if (percentage >= 80) return 'text-green-400'
              if (percentage >= 60) return 'text-blue-400'
              if (percentage >= 40) return 'text-yellow-400'
              return 'text-red-400'
            }

            return (
              <motion.div
                key={result.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="p-6 bg-dark-800 border border-dark-700 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{category?.name}</h3>
                  <div className={`text-2xl font-bold ${getScoreColor(result.percentage)}`}>
                    {Math.round(result.percentage)}%
                  </div>
                </div>
                <p className="text-dark-300 text-sm mb-4">{category?.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Key Recommendations:</h4>
                  <ul className="space-y-1">
                    {result.recommendations.slice(0, 2).map((rec, recIndex) => (
                      <li key={recIndex} className="text-xs text-dark-300 flex items-start gap-2">
                        <span className="w-1 h-1 bg-sapphire-400 rounded-full mt-2 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-dark-800 border border-dark-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">Review Your Report</h3>
            <p className="text-dark-300 mb-4">
              Check your email for the detailed PDF report with comprehensive analysis and actionable recommendations.
            </p>
            <div className="flex items-center gap-2 text-sapphire-400 text-sm">
              <Download className="h-4 w-4" />
              <span>PDF report sent to {results.email}</span>
            </div>
          </div>

          <div className="p-6 bg-dark-800 border border-dark-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">Schedule a Consultation</h3>
            <p className="text-dark-300 mb-4">
              Ready to take the next step? Schedule a free consultation to discuss your AI implementation strategy.
            </p>
            <Button size="sm" className="group" asChild>
              <a href="https://cal.com/s5-brett" target="_blank" rel="noopener noreferrer">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button variant="secondary" onClick={onRestart} className="group">
          <RefreshCw className="mr-2 h-4 w-4" />
          Take Assessment Again
        </Button>
        <Button asChild>
          <a href="/resources">
            Explore Resources
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </motion.div>
    </div>
  )
} 