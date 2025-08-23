'use client'

import { create } from 'zustand'

interface PartnerCallModalState {
  isOpen: boolean
  source: string
  open: (source?: string) => void
  close: () => void
}

export const usePartnerCallModal = create<PartnerCallModalState>((set) => ({
  isOpen: false,
  source: 'partner:call',
  open: (source = 'partner:call') => set({ isOpen: true, source }),
  close: () => set({ isOpen: false }),
}))
