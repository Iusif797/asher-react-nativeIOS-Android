import { specialistById } from '@/data/specialists'
import { formatDay } from '@/lib/dates'
import { formatPrice } from '@/lib/format'
import { selectHistory, useBookingStore } from '@/stores/bookingStore'
import { FormatTag } from './FormatTag'

export const HistoryList = () => {
  const history = useBookingStore(selectHistory)

  return (
    <section className="account-section">
      <h2 className="section-title">История консультаций</h2>
      {history.length === 0 ? (
        <p className="account-section__empty card">Завершённых консультаций пока нет.</p>
      ) : (
        <div className="account-section__list">
          {history.map((consultation) => {
            const specialist = specialistById(consultation.specialistId)
            return (
              <article key={consultation.id} className="account-history card">
                <div className="account-history__main">
                  <h4 className="account-history__topic">{consultation.topic}</h4>
                  <p className="account-history__meta">
                    {specialist ? `${specialist.name} · ` : ''}
                    {formatDay(consultation.dateISO)}
                  </p>
                </div>
                <div className="account-history__side">
                  <FormatTag format={consultation.format} />
                  <span className="account-history__price">
                    {formatPrice(consultation.price)}
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
