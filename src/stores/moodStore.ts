import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MoodEntry } from '@/lib/types'
import { pushMoodEntry } from '@/api/moodSync'
import { seedMoodEntries } from '@/data/wellbeing'
import { todayKey } from '@/lib/dates'

interface MoodState {
  entries: MoodEntry[]
  upsertToday: (score: number, emotions: string[], note?: string) => void
  mergeRemote: (remote: MoodEntry[]) => void
}

const byDate = (a: MoodEntry, b: MoodEntry): number => a.date.localeCompare(b.date)

export const useMoodStore = create<MoodState>()(
  persist(
    (set) => ({
      entries: seedMoodEntries(),
      upsertToday: (score, emotions, note) =>
        set((state) => {
          const date = todayKey()
          const entry: MoodEntry = { date, score, emotions, note }
          void pushMoodEntry(entry)
          const rest = state.entries.filter((e) => e.date !== date)
          return { entries: [...rest, entry].sort(byDate) }
        }),
      mergeRemote: (remote) =>
        set((state) => {
          if (remote.length === 0) return state
          const remoteDates = new Set(remote.map((e) => e.date))
          const local = state.entries.filter((e) => !remoteDates.has(e.date))
          return { entries: [...local, ...remote].sort(byDate) }
        }),
    }),
    { name: 'asher:mood' },
  ),
)

export const selectTodayEntry = (state: MoodState): MoodEntry | undefined =>
  state.entries.find((e) => e.date === todayKey())
