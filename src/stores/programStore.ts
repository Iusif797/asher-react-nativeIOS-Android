import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProgramState {
  enrolledId: string | null
  completedDays: number[]
  enroll: (programId: string) => void
  toggleDay: (dayNum: number) => void
}

export const useProgramStore = create<ProgramState>()(
  persist(
    (set) => ({
      enrolledId: 'prog-anxiety-30',
      completedDays: [1, 2, 3, 4, 5, 6, 7, 8],
      enroll: (programId) => set({ enrolledId: programId, completedDays: [] }),
      toggleDay: (dayNum) =>
        set((state) => ({
          completedDays: state.completedDays.includes(dayNum)
            ? state.completedDays.filter((d) => d !== dayNum)
            : [...state.completedDays, dayNum],
        })),
    }),
    { name: 'asher:program' },
  ),
)

export const selectCurrentDay = (state: ProgramState): number =>
  Math.min(30, state.completedDays.length + 1)
