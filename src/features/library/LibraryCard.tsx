import type { LibraryItem } from '@/lib/types'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { directionTitle } from '@/data/directions'
import { LIBRARY_KIND_META } from './libraryKinds'

interface LibraryCardProps {
  item: LibraryItem
  compact?: boolean
}

export const LibraryCard = ({ item, compact = false }: LibraryCardProps) => {
  const kindMeta = LIBRARY_KIND_META[item.kind]
  const cardClass = compact ? 'library-card library-card--compact card' : 'library-card card'

  return (
    <article className={cardClass}>
      <div className="library-card-top">
        <span className={`library-card-kind library-card-kind--${item.kind}`}>
          <Icon name={kindMeta.icon} size={compact ? 16 : 18} strokeWidth={1.6} />
        </span>
        <span className="library-card-situation">{item.situation}</span>
      </div>
      <h4>{item.title}</h4>
      <p className="library-card-excerpt">{item.excerpt}</p>
      <div className="library-card-meta">
        <Tag icon="clock">{item.minutes} мин</Tag>
        {!compact && <Tag tone="accent">{directionTitle(item.directionId)}</Tag>}
      </div>
    </article>
  )
}
