import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { directionTitle } from '@/data/directions'
import type { Specialist } from '@/lib/types'
import { formatPrice, formatYears } from '@/lib/format'

interface SpecialistCardProps {
  specialist: Specialist
  onPick: (specialist: Specialist) => void
}

export const SpecialistCard = ({ specialist, onPick }: SpecialistCardProps) => (
  <article className="card booking-card">
    <header className="booking-card__head">
      <Avatar name={specialist.name} hue={specialist.hue} size={56} />
      <div className="booking-card__person">
        <h4>{specialist.name}</h4>
        <p>{specialist.role}</p>
        <p className="booking-card__rating">
          <Icon name="star" size={14} strokeWidth={2} />
          {specialist.rating.toFixed(1)} · {specialist.reviewsCount} отзывов
        </p>
      </div>
      <div className="booking-card__price">
        <strong>{formatPrice(specialist.price)}</strong>
        <span>за сессию</span>
      </div>
    </header>
    <p className="booking-card__about">{specialist.about}</p>
    <div className="booking-card__tags">
      {specialist.directions.map((d) => (
        <Tag tone="accent" key={d}>
          {directionTitle(d)}
        </Tag>
      ))}
      {specialist.formats.includes('online') && (
        <Tag tone="neutral" icon="video">
          Онлайн
        </Tag>
      )}
      {specialist.formats.includes('inperson') && (
        <Tag tone="neutral" icon="mapPin">
          Очно
        </Tag>
      )}
    </div>
    <footer className="booking-card__foot">
      <span className="booking-card__meta">
        Опыт {formatYears(specialist.experienceYears)} · {specialist.languages.join(', ')}
      </span>
      <Button onClick={() => onPick(specialist)} iconAfter="arrowRight">
        Выбрать время
      </Button>
    </footer>
  </article>
)
