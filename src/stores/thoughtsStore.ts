import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThoughtEntry } from '@/lib/types'
import { SEED_THOUGHTS } from '@/data/wellbeing'

interface ThoughtsState {
  entries: ThoughtEntry[]
  addEntry: (situation: string, thought: string) => void
  toggleDiscussed: (id: string) => void
  removeEntry: (id: string) => void
}

export const useThoughtsStore = create<ThoughtsState>()(
  persist(
    (set) => ({
      entries: SEED_THOUGHTS,
      addEntry: (situation, thought) =>
        set((state) => ({
          entries: [
            {
              id: `th-${Date.now()}`,
              createdAtISO: new Date().toISOString(),
              situation,
              thought,
              discussed: false,
            },
            ...state.entries,
          ],
        })),
      toggleDiscussed: (id) =>
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, discussed: !e.discussed } : e,
          ),
        })),
      removeEntry: (id) =>
        set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),
    }),
    { name: 'asher:thoughts' },
  ),
)
