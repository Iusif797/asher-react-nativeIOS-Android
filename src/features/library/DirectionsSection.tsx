import { Link } from 'react-router-dom'
import { DIRECTIONS } from '@/data/directions'
import { Icon } from '@/components/ui/Icon'

export const DirectionsSection = () => (
  <section className="library-directions" aria-labelledby="library-directions-title">
    <h2 id="library-directions-title" className="library-directions-title">
      Направления работы ASHER
    </h2>
    <div className="library-directions-grid">
      {DIRECTIONS.map((direction) => (
        <Link
          key={direction.id}
          to={`/library/${direction.id}`}
          className="library-direction-card card"
        >
          <div className="library-direction-head">
            <h3>{direction.title}</h3>
            <span className="library-direction-arrow">
              <Icon name="arrowRight" size={16} />
            </span>
          </div>
          <p className="library-direction-short">{direction.short}</p>
          <p className="library-direction-quote">«{direction.quote}»</p>
        </Link>
      ))}
    </div>
  </section>
)
