import { Link, Navigate, useParams } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { directionById } from '@/data/directions'
import { LIBRARY } from '@/data/library'
import { LibraryCard } from './LibraryCard'
import { DirectionCta, DirectionOutcomes, DirectionSymptoms } from './DirectionSections'
import './library.css'

export const DirectionPage = () => {
  const { directionId } = useParams()
  const direction = directionId ? directionById(directionId) : undefined

  if (!direction) return <Navigate to="/library" replace />

  const materials = LIBRARY.filter((item) => item.directionId === direction.id)

  return (
    <section className="page">
      <Link to="/library" className="btn btn--ghost btn--sm direction-back">
        <Icon name="arrowLeft" size={15} />
        Библиотека
      </Link>
      <div className="direction-hero">
        <header>
          <p className="page-kicker">Направление</p>
          <h1 className="page-title">{direction.title}</h1>
          <p className="page-lead">{direction.short}</p>
        </header>
        <figure className="direction-quote-card">
          <blockquote>{direction.quote}</blockquote>
        </figure>
      </div>
      <DirectionSymptoms symptoms={direction.symptoms} />
      <p className="direction-about">{direction.about}</p>
      <DirectionOutcomes outcomes={direction.outcomes} />
      <DirectionCta />
      {materials.length > 0 && (
        <section className="direction-section" aria-labelledby="direction-materials-title">
          <h2 id="direction-materials-title" className="direction-section-title">
            Материалы по теме
          </h2>
          <div className="direction-materials">
            {materials.map((item) => (
              <LibraryCard key={item.id} item={item} compact />
            ))}
          </div>
        </section>
      )}
    </section>
  )
}
