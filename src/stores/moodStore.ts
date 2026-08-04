import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MoodEntry } from '@/lib/types'
import { seedMoodEntries } from '@/data/wellbeing'
import { todayKey } from '@/lib/dates'

interface MoodState {
  entries: MoodEntry[]
  upsertToday: (score: number, emotions: string[], note?: string) => void
}

export const useMoodStore = create<MoodState>()(
  persist(
    (set) => ({
      entries: seedMoodEntries(),
      upsertToday: (score, emotions, note) =>
        set((state) => {
          const date = todayKey()
          const entry: MoodEntry = { date, score, emotions, note }
          const rest = state.entries.filter((e) => e.date !== date)
          return { entries: [...rest, entry].sort((a, b) => a.date.localeCompare(b.date)) }
        }),
    }),
    { name: 'asher:mood' },
  ),
)

export const selectTodayEntry = (state: MoodState): MoodEntry | undefined =>
  state.entries.find((e) => e.date === todayKey())
