'use client'

import { DemoBookingModal } from './DemoBookingModal'
import { useDemoModal } from '@/hooks/useDemoModal'

interface DemoModalProviderProps {
  children: React.ReactNode
}

export function DemoModalProvider({ children }: DemoModalProviderProps) {
  const { isOpen, source, close } = useDemoModal()

  return (
    <>
      {children}
      <DemoBookingModal isOpen={isOpen} onClose={close} source={source} />
    </>
  )
} 