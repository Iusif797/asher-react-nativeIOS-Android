import { Button } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import type { ProgramDay } from '@/lib/types'

interface DayBlockProps {
  icon: IconName
  label: string
  text: string
}

const DayBlock = ({ icon, label, text }: DayBlockProps) => (
  <div className="programs-block">
    <span className="programs-block-icon">
      <Icon name={icon} size={16} />
    </span>
    <div>
      <h4>{label}</h4>
      <p>{text}</p>
    </div>
  </div>
)

interface DayContentProps {
  day: ProgramDay
  done: boolean
  onToggle: () => void
}

export const DayContent = ({ day, done, onToggle }: DayContentProps) => (
  <div className="programs-day-content">
    <DayBlock icon="journal" label="Теория" text={day.theory} />
    <DayBlock icon="edit" label="Практика" text={day.exercise} />
    {done ? (
      <div className="programs-day-done">
        <Tag tone="accent" icon="check">
          День выполнен
        </Tag>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          Отменить отметку
        </Button>
      </div>
    ) : (
      <div>
        <Button icon="check" onClick={onToggle}>
          Отметить выполненным
        </Button>
      </div>
    )}
  </div>
)
