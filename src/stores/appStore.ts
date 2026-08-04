import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AppMode = 'client' | 'therapist'

interface AppState {
  mode: AppMode
  subscriptionActive: boolean
  setMode: (mode: AppMode) => void
  activateSubscription: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      mode: 'client',
      subscriptionActive: false,
      setMode: (mode) => set({ mode }),
      activateSubscription: () => set({ subscriptionActive: true }),
    }),
    { name: 'asher:app' },
  ),
)
