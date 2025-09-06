'use client'

import { create } from 'zustand'

interface AWSTierSelectorModalState {
  isOpen: boolean
  source: string
  preselectedTier?: string
  open: (source?: string, preselectedTier?: string) => void
  close: () => void
}

export const useAWSTierSelectorModal = create<AWSTierSelectorModalState>((set) => ({
  isOpen: false,
  source: 'aws:tier-selector',
  preselectedTier: undefined,
  open: (source = 'aws:tier-selector', preselectedTier) => set({ isOpen: true, source, preselectedTier }),
  close: () => set({ isOpen: false, preselectedTier: undefined }),
}))
