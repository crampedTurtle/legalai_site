'use client'

import { create } from 'zustand'

interface DemoModalState {
  isOpen: boolean
  source: string
  open: (source?: string) => void
  close: () => void
}

export const useDemoModal = create<DemoModalState>((set) => ({
  isOpen: false,
  source: 'demo:booking',
  open: (source = 'demo:booking') => set({ isOpen: true, source }),
  close: () => set({ isOpen: false }),
})) 