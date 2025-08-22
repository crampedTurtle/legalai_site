'use client'

import { DemoForm } from './DemoForm'
import { useDemoModal } from '@/hooks/useDemoModal'

interface DemoModalProviderProps {
  children: React.ReactNode
}

export function DemoModalProvider({ children }: DemoModalProviderProps) {
  const { isOpen, source, close } = useDemoModal()

  return (
    <>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-2xl bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-700">
              <h2 className="text-xl font-semibold text-white">
                Book Your Private Demo
              </h2>
              <button
                onClick={close}
                className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
              >
                <svg className="h-5 w-5 text-dark-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <DemoForm />
            </div>
          </div>
        </div>
      )}
    </>
  )
} 