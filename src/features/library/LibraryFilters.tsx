import { Icon } from '@/components/ui/Icon'
import type { LibraryKind } from '@/lib/types'
import { LIBRARY_KIND_META, LIBRARY_KIND_ORDER } from './libraryKinds'

interface LibraryFiltersProps {
  situations: string[]
  activeSituation: string | null
  activeKind: LibraryKind | null
  onSituationChange: (situation: string | null) => void
  onKindChange: (kind: LibraryKind | null) => void
}

const chipClass = (base: string, isActive: boolean): string =>
  isActive ? `${base} ${base}--active` : base

export const LibraryFilters = ({
  situations,
  activeSituation,
  activeKind,
  onSituationChange,
  onKindChange,
}: LibraryFiltersProps) => (
  <div className="library-filters">
    <div className="library-situations" role="group" aria-label="Жизненные ситуации">
      <button
        type="button"
        className={chipClass('library-situation-chip', activeSituation === null)}
        aria-pressed={activeSituation === null}
        onClick={() => onSituationChange(null)}
      >
        Все
      </button>
      {situations.map((situation) => (
        <button
          key={situation}
          type="button"
          className={chipClass('library-situation-chip', activeSituation === situation)}
          aria-pressed={activeSituation === situation}
          onClick={() => onSituationChange(situation)}
        >
          {situation}
        </button>
      ))}
    </div>
    <div className="library-kinds" role="group" aria-label="Формат материала">
      <button
        type="button"
        className={chipClass('library-kind-chip', activeKind === null)}
        aria-pressed={activeKind === null}
        onClick={() => onKindChange(null)}
      >
        Все
      </button>
      {LIBRARY_KIND_ORDER.map((kind) => (
        <button
          key={kind}
          type="button"
          className={chipClass('library-kind-chip', activeKind === kind)}
          aria-pressed={activeKind === kind}
          onClick={() => onKindChange(kind)}
        >
          <Icon name={LIBRARY_KIND_META[kind].icon} size={14} strokeWidth={2} />
          {LIBRARY_KIND_META[kind].label}
        </button>
      ))}
    </div>
  </div>
)
