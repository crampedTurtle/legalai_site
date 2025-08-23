'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { useBookingModal } from '@/hooks/useBookingModal'

export function BookingModal() {
  const { isOpen, close } = useBookingModal()
  const [calcomLink, setCalcomLink] = useState<string>('')

  useEffect(() => {
    const link = process.env.NEXT_PUBLIC_CALCOM_LINK
    if (link) {
      setCalcomLink(link)
    }
  }, [])

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl h-[80vh] max-h-[700px] z-50 bg-dark-900 rounded-2xl border border-dark-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <DialogTitle className="text-2xl font-bold text-white">
            Book Implementation Consult
          </DialogTitle>
          <button
            onClick={close}
            className="p-2 hover:bg-dark-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sapphire-500"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-dark-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 h-full">
          {calcomLink ? (
            <div className="w-full h-full">
              <DialogDescription className="sr-only">
                Schedule your implementation consultation using our booking system
              </DialogDescription>
              <iframe
                src={calcomLink}
                width="100%"
                height="100%"
                frameBorder="0"
                className="rounded-lg"
                title="Book Implementation Consult"
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <DialogDescription className="text-dark-300 mb-6">
                The booking system is currently being configured. Please contact us directly to schedule your implementation consult.
              </DialogDescription>
              <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-dark-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Booking System Unavailable</h3>
              <div className="space-y-2 text-sm text-dark-400">
                <p>Email: info@sapphirelegal.ai</p>
                <p>Phone: (555) 123-4567</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
