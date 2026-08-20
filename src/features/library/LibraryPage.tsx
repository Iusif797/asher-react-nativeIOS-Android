import { useMemo, useState } from 'react'
import { LIBRARY, librarySituations } from '@/data/library'
import type { LibraryItem, LibraryKind } from '@/lib/types'
import { EmptyState } from '@/components/ui/EmptyState'
import { LibraryFilters } from './LibraryFilters'
import { LibraryCard } from './LibraryCard'
import { DirectionsSection } from './DirectionsSection'
import './library.css'

const MIN_GROUP_SIZE = 2

type SituationGroup = [string, LibraryItem[]]

const groupBySituation = (items: LibraryItem[]): Array<[string, LibraryItem[]]> =>
  items.reduce<Array<[string, LibraryItem[]]>>((groups, item) => {
    const group = groups.find(([situation]) => situation === item.situation)
    if (!group) return [...groups, [item.situation, [item]]]
    return groups.map((entry) =>
      entry === group ? [entry[0], [...entry[1], item]] : entry,
    )
  }, [])

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

  const groups = useMemo<SituationGroup[]>(
    () => (situation === null ? groupBySituation(items) : []),
    [items, situation],
  )
  const mainGroups = groups.filter(([, group]) => group.length >= MIN_GROUP_SIZE)
  const looseItems = groups
    .filter(([, group]) => group.length < MIN_GROUP_SIZE)
    .flatMap(([, group]) => group)

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
      ) : situation !== null ? (
        <div className="library-grid library-grid--flat">
          {items.map((item) => (
            <LibraryCard key={item.id} item={item} showSituation={false} />
          ))}
        </div>
      ) : (
        <div className="library-groups">
          {mainGroups.map(([groupSituation, groupItems]) => (
            <section className="library-group" key={groupSituation}>
              <div className="library-group-head">
                <h2 className="library-group-title">{groupSituation}</h2>
                <span className="library-group-count">{groupItems.length}</span>
              </div>
              <div className="library-grid">
                {groupItems.map((item) => (
                  <LibraryCard key={item.id} item={item} showSituation={false} />
                ))}
              </div>
            </section>
          ))}
          {looseItems.length > 0 && (
            <section className="library-group">
              <div className="library-group-head">
                <h2 className="library-group-title">Другие ситуации</h2>
                <span className="library-group-count">{looseItems.length}</span>
              </div>
              <div className="library-grid">
                {looseItems.map((item) => (
                  <LibraryCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
      <DirectionsSection />
    </section>
  )
}
