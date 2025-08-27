'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { DemoForm } from './DemoForm'
import { useDemoModal } from '@/hooks/useDemoModal'

export function DemoModal() {
  const { isOpen, close } = useDemoModal()

  const handleClose = () => {
    close()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-dark-900 border border-dark-700 rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-dark-400 hover:text-white transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Demo Form */}
            <DemoForm />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
