import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Modal } from '@/components/ui/Modal'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { slotsFor } from '@/data/specialists'
import type { SessionFormat, Specialist } from '@/lib/types'
import { formatDay, formatTime, formatWeekday } from '@/lib/dates'
import { formatPrice } from '@/lib/format'
import { useBookingStore } from '@/stores/bookingStore'

interface BookingModalProps {
  specialist: Specialist | null
  onClose: () => void
}

const groupByDay = (slots: string[]): [string, string[]][] => {
  const groups = slots.reduce<Record<string, string[]>>((acc, slot) => {
    const dayKey = slot.slice(0, 10)
    return { ...acc, [dayKey]: [...(acc[dayKey] ?? []), slot] }
  }, {})
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
}

export const BookingModal = ({ specialist, onClose }: BookingModalProps) => {
  const book = useBookingStore((s) => s.book)
  const [slot, setSlot] = useState<string | null>(null)
  const [format, setFormat] = useState<SessionFormat>('online')
  const [confirmed, setConfirmed] = useState(false)
  const slots = useMemo(() => (specialist ? slotsFor(specialist) : []), [specialist])

  if (!specialist) return null

  const effectiveFormat = specialist.formats.length === 1 ? specialist.formats[0] : format

  const confirm = () => {
    if (!slot) return
    book(specialist.id, slot, effectiveFormat)
    setConfirmed(true)
  }

  const close = () => {
    setSlot(null)
    setConfirmed(false)
    onClose()
  }

  return (
    <Modal open title={confirmed ? 'Запись подтверждена' : specialist.name} onClose={close} wide>
      {confirmed && slot ? (
        <div className="booking-success">
          <span className="booking-success__badge">
            <Icon name="check" size={26} strokeWidth={2.2} />
          </span>
          <h3>Вы записаны</h3>
          <p>
            {formatWeekday(slot)}, {formatDay(slot)} в {formatTime(slot)} ·{' '}
            {effectiveFormat === 'online' ? 'онлайн' : 'очно в центре'}
          </p>
          <Link to="/account" onClick={close}>
            <Button iconAfter="arrowRight">Перейти в кабинет</Button>
          </Link>
        </div>
      ) : (
        <div className="booking-slots">
          {specialist.formats.length > 1 && (
            <SegmentedControl<SessionFormat>
              ariaLabel="Формат встречи"
              value={format}
              onChange={setFormat}
              options={[
                { value: 'online', label: 'Онлайн' },
                { value: 'inperson', label: 'Очно' },
              ]}
            />
          )}
          {groupByDay(slots).map(([dayKey, daySlots]) => (
            <div className="booking-slots__day" key={dayKey}>
              <p className="booking-slots__label">
                {formatWeekday(daySlots[0])}, {formatDay(daySlots[0])}
              </p>
              <div className="booking-slots__times">
                {daySlots.map((s) => (
                  <button
                    key={s}
                    className={
                      s === slot ? 'booking-slot booking-slot--active' : 'booking-slot'
                    }
                    aria-pressed={s === slot}
                    onClick={() => setSlot(s)}
                  >
                    {formatTime(s)}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="booking-slots__confirm">
            <p>
              {slot
                ? `${formatDay(slot)}, ${formatTime(slot)} · ${formatPrice(specialist.price)}`
                : 'Выберите удобное время'}
            </p>
            <Button disabled={!slot} onClick={confirm}>
              Подтвердить запись
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
