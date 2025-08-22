'use client'

import { create } from 'zustand'

interface SecurityDemoModalState {
  isOpen: boolean
  source: string
  open: (source?: string) => void
  close: () => void
}

export const useSecurityDemoModal = create<SecurityDemoModalState>((set) => ({
  isOpen: false,
  source: 'security:demo',
  open: (source = 'security:demo') => set({ isOpen: true, source }),
  close: () => set({ isOpen: false }),
}))
