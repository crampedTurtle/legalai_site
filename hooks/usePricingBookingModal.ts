import { create } from 'zustand'

interface PricingBookingModalState {
  isOpen: boolean
  source: string
  open: (source?: string) => void
  close: () => void
}

export const usePricingBookingModal = create<PricingBookingModalState>((set) => ({
  isOpen: false,
  source: 'pricing',
  open: (source = 'pricing') => set({ isOpen: true, source }),
  close: () => set({ isOpen: false }),
}))
