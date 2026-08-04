import { useMemo, useState } from 'react'
import { LIBRARY, librarySituations } from '@/data/library'
import type { LibraryKind } from '@/lib/types'
import { EmptyState } from '@/components/ui/EmptyState'
import { LibraryFilters } from './LibraryFilters'
import { LibraryCard } from './LibraryCard'
import { DirectionsSection } from './DirectionsSection'
import './library.css'

export const LibraryPage = () => {
  const [situation, setSituation] = useState<string | null>(null)
  const [kind, setKind] = useState<LibraryKind | null>(null)

  const items = useMemo(
    () =>
      LIBRARY.filter(
        (item) =>
          (situation === null || item.situation === situation) &&
          (kind === null || item.kind === kind),
      ),
    [situation, kind],
  )

  return (
    <section className="page">
      <header>
        <p className="page-kicker">Библиотека знаний</p>
        <h1 className="page-title">Материалы по вашим ситуациям</h1>
        <p className="page-lead">
          Не просто статьи — короткие тексты, видео, аудио и практики,
          структурированные по жизненным ситуациям.
        </p>
      </header>
      <LibraryFilters
        situations={librarySituations()}
        activeSituation={situation}
        activeKind={kind}
        onSituationChange={setSituation}
        onKindChange={setKind}
      />
      {items.length === 0 ? (
        <div className="library-empty">
          <EmptyState
            icon="library"
            title="Ничего не нашлось"
            text="По выбранным фильтрам материалов пока нет. Попробуйте другую ситуацию или формат."
          />
        </div>
      ) : (
        <div className="library-grid">
          {items.map((item) => (
            <LibraryCard key={item.id} item={item} />
          ))}
        </div>
      )}
      <DirectionsSection />
    </section>
  )
}
