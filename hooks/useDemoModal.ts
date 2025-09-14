'use client'

import { create } from 'zustand'

type Persona = "partner" | "cfo" | "cio" | "coo" | "chair" | "paralegal"

interface DemoModalState {
  isOpen: boolean
  source: string
  persona?: Persona
  open: (source?: string, persona?: Persona) => void
  close: () => void
}

export const useDemoModal = create<DemoModalState>((set) => ({
  isOpen: false,
  source: 'demo:booking',
  persona: undefined,
  open: (source = 'demo:booking', persona) => set({ isOpen: true, source, persona }),
  close: () => set({ isOpen: false, persona: undefined }),
})) 