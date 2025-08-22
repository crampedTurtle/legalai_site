'use client'

import { create } from 'zustand'

interface ConsultationModalState {
  isOpen: boolean
  source: string
  open: (source?: string) => void
  close: () => void
}

export const useConsultationModal = create<ConsultationModalState>((set) => ({
  isOpen: false,
  source: 'consultation:booking',
  open: (source = 'consultation:booking') => set({ isOpen: true, source }),
  close: () => set({ isOpen: false }),
}))
