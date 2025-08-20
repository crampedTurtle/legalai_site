'use client'

import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react'
import { clsx } from 'clsx'

interface CalloutProps {
  type: 'note' | 'tip' | 'warning'
  children: React.ReactNode
  className?: string
}

export function Callout({ type, children, className }: CalloutProps) {
  const getIcon = () => {
    switch (type) {
      case 'note':
        return <Info className="h-5 w-5" />
      case 'tip':
        return <Lightbulb className="h-5 w-5" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'note':
        return 'border-blue-500/20 bg-blue-500/10 text-blue-300'
      case 'tip':
        return 'border-green-500/20 bg-green-500/10 text-green-300'
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/10 text-yellow-300'
      default:
        return 'border-blue-500/20 bg-blue-500/10 text-blue-300'
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'note':
        return 'Note'
      case 'tip':
        return 'Tip'
      case 'warning':
        return 'Warning'
      default:
        return 'Note'
    }
  }

  return (
    <div className={clsx(
      'rounded-lg border p-4 my-6',
      getStyles(),
      className
    )}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="font-medium mb-2">{getTitle()}</div>
          <div className="text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 