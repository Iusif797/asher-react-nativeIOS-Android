import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { GROUPS } from '@/data/catalog'
import { formatDayTime } from '@/lib/dates'
import { pluralize } from '@/lib/format'
import type { SessionFormat } from '@/lib/types'

const LOW_SEATS_THRESHOLD = 2

const formatLabel = (format: SessionFormat): string =>
  format === 'online' ? 'Онлайн' : 'Очно'

export const GroupsSection = () => {
  const [joinedIds, setJoinedIds] = useState<string[]>([])

  const join = (groupId: string) => setJoinedIds((prev) => [...prev, groupId])

  return (
    <section className="programs-section">
      <h2 className="section-title">Группы</h2>
      <div className="programs-grid programs-grid--three">
        {GROUPS.map((group) => {
          const joined = joinedIds.includes(group.id)
          return (
            <article key={group.id} className="card programs-card">
              <div className="programs-card-tags">
                <Tag icon={group.format === 'online' ? 'video' : 'mapPin'}>
                  {formatLabel(group.format)}
                </Tag>
                <Tag tone={group.seatsLeft <= LOW_SEATS_THRESHOLD ? 'danger' : 'neutral'}>
                  Осталось {pluralize(group.seatsLeft, 'место', 'места', 'мест')}
                </Tag>
              </div>
              <h3>{group.title}</h3>
              <p className="programs-meta">
                <Icon name="user" size={15} />
                <span>{group.leader}</span>
              </p>
              <p className="programs-meta">
                <Icon name="calendar" size={15} />
                <span>{formatDayTime(group.dateISO)}</span>
              </p>
              <div className="programs-card-foot">
                {joined && (
                  <Tag tone="accent" icon="check">
                    Вы записаны
                  </Tag>
                )}
                <Button size="sm" disabled={joined} onClick={() => join(group.id)}>
                  Записаться
                </Button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
