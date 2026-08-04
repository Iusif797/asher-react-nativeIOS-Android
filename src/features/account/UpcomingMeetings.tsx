import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { specialistById } from '@/data/specialists'
import { formatDayTime } from '@/lib/dates'
import type { Consultation } from '@/lib/types'
import { selectUpcoming, useBookingStore } from '@/stores/bookingStore'
import { FormatTag } from './FormatTag'
import { PaymentModal } from './PaymentModal'

interface MeetingCardProps {
  consultation: Consultation
  onPay: (consultation: Consultation) => void
  onCancel: (id: string) => void
}

const MeetingCard = ({ consultation, onPay, onCancel }: MeetingCardProps) => {
  const specialist = specialistById(consultation.specialistId)
  if (!specialist) return null
  return (
    <article className="account-meeting card">
      <div className="account-meeting__specialist">
        <Avatar name={specialist.name} hue={specialist.hue} size={46} />
        <div className="account-meeting__person">
          <h4>{specialist.name}</h4>
          <p className="account-meeting__role">{specialist.role}</p>
        </div>
      </div>
      <div className="account-meeting__meta">
        <span className="account-meeting__date">
          <Icon name="clock" size={15} strokeWidth={2} />
          {formatDayTime(consultation.dateISO)}
        </span>
        <FormatTag format={consultation.format} />
        {consultation.paid ? (
          <Tag tone="accent" icon="check">
            Оплачено
          </Tag>
        ) : (
          <Tag tone="warm" icon="clock">
            Ожидает оплаты
          </Tag>
        )}
      </div>
      <div className="account-meeting__actions">
        {!consultation.paid && (
          <Button size="sm" icon="receipt" onClick={() => onPay(consultation)}>
            Оплатить
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={() => onCancel(consultation.id)}>
          Отменить запись
        </Button>
      </div>
    </article>
  )
}

export const UpcomingMeetings = () => {
  const upcoming = useBookingStore(selectUpcoming)
  const cancel = useBookingStore((state) => state.cancel)
  const markPaid = useBookingStore((state) => state.markPaid)
  const [paying, setPaying] = useState<Consultation | null>(null)

  const cancelWithConfirm = (id: string) => {
    if (!window.confirm('Отменить запись на консультацию?')) return
    cancel(id)
  }

  const completePayment = () => {
    if (!paying) return
    markPaid(paying.id)
    setPaying(null)
  }

  return (
    <section className="account-section">
      <h2 className="section-title">Предстоящие встречи</h2>
      {upcoming.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="Пока нет записей"
          text="Выберите специалиста и удобное время — запись занимает пару минут."
          action={
            <Link to="/booking" className="btn btn--primary btn--md">
              Записаться на консультацию
            </Link>
          }
        />
      ) : (
        <div className="account-section__list">
          {upcoming.map((consultation) => (
            <MeetingCard
              key={consultation.id}
              consultation={consultation}
              onPay={setPaying}
              onCancel={cancelWithConfirm}
            />
          ))}
        </div>
      )}
      <PaymentModal
        consultation={paying}
        onClose={() => setPaying(null)}
        onPay={completePayment}
      />
    </section>
  )
}
