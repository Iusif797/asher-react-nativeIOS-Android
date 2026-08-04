import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { THERAPIST_SCHEDULE } from '@/data/therapist'
import { formatDayTime } from '@/lib/dates'

interface ScheduleListProps {
  onOpenClient: () => void
}

export const ScheduleList = ({ onOpenClient }: ScheduleListProps) => (
  <ul className="therapist-panel">
    {THERAPIST_SCHEDULE.map((slot) => (
      <li key={slot.id} className="card therapist-slot">
        <div>
          <p className="therapist-slot-time">{formatDayTime(slot.dateISO)}</p>
          <div className="therapist-slot-meta">
            <span className="therapist-slot-client">{slot.client}</span>
            {slot.format === 'online' ? (
              <Tag tone="accent" icon="video">
                Онлайн
              </Tag>
            ) : (
              <Tag tone="neutral" icon="mapPin">
                Очно
              </Tag>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm" iconAfter="arrowRight" onClick={onOpenClient}>
          Открыть карточку
        </Button>
      </li>
    ))}
  </ul>
)
