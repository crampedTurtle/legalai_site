'use client'

import { create } from 'zustand'

interface ResourceModalState {
  isOpen: boolean
  resource: {
    title: string
    type: string
    downloadUrl: string
  } | null
  open: (resource: { title: string; type: string; downloadUrl: string }) => void
  close: () => void
}

export const useResourceModal = create<ResourceModalState>((set) => ({
  isOpen: false,
  resource: null,
  open: (resource) => set({ isOpen: true, resource }),
  close: () => set({ isOpen: false, resource: null }),
}))
