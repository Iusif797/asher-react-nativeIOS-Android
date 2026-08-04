import { Link } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

export const RoadmapCta = () => (
  <section className="card roadmap-cta" aria-label="Следующий шаг">
    <h2>Маршрут живёт вместе с вами</h2>
    <p>
      Обсудите план с психологом: скорректируете темп, добавите нужные форматы
      и уберёте лишнее.
    </p>
    <div className="roadmap-cta-actions">
      <Link to="/booking" className="btn btn--primary btn--lg roadmap-cta-btn">
        Обсудить маршрут с психологом
        <Icon name="arrowRight" size={17} />
      </Link>
      <Link to="/matching" className="btn btn--outline btn--lg roadmap-cta-btn">
        Пройти подбор заново
      </Link>
    </div>
  </section>
)
