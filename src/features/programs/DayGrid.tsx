import { Icon } from '@/components/ui/Icon'
import type { ProgramDay } from '@/lib/types'

interface DayGridProps {
  days: ProgramDay[]
  completedDays: number[]
  currentDay: number
  onOpen: (dayNum: number) => void
}

const cellClass = (dayNum: number, done: boolean, currentDay: number): string => {
  if (done) return 'programs-cell programs-cell--done'
  if (dayNum === currentDay) return 'programs-cell programs-cell--current'
  if (dayNum < currentDay) return 'programs-cell programs-cell--open'
  return 'programs-cell programs-cell--locked'
}

export const DayGrid = ({ days, completedDays, currentDay, onOpen }: DayGridProps) => (
  <div className="programs-calendar">
    {days.map((programDay) => {
      const done = completedDays.includes(programDay.day)
      const locked = !done && programDay.day > currentDay
      return (
        <button
          key={programDay.day}
          type="button"
          className={cellClass(programDay.day, done, currentDay)}
          aria-label={`День ${programDay.day}`}
          disabled={locked}
          onClick={() => onOpen(programDay.day)}
        >
          {done ? <Icon name="check" size={15} strokeWidth={2.2} /> : programDay.day}
        </button>
      )
    })}
  </div>
)
