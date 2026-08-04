import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { HomeworkTask } from '@/lib/types'
import { SEED_HOMEWORK } from '@/data/wellbeing'

interface HomeworkState {
  tasks: HomeworkTask[]
  toggleTask: (id: string) => void
}

export const useHomeworkStore = create<HomeworkState>()(
  persist(
    (set) => ({
      tasks: SEED_HOMEWORK,
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),
    }),
    { name: 'asher:homework' },
  ),
)

export const selectHomeworkProgress = (
  state: HomeworkState,
): { done: number; total: number } => ({
  done: state.tasks.filter((t) => t.done).length,
  total: state.tasks.length,
})
