import type { RoadmapStage, RoadmapStatus } from '@/lib/types'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'

interface StageStatusMeta {
  label: string
  tone: 'accent' | 'deep' | 'neutral'
}

const STATUS_META: Record<RoadmapStatus, StageStatusMeta> = {
  done: { label: 'Пройден', tone: 'accent' },
  active: { label: 'Сейчас', tone: 'deep' },
  locked: { label: 'Впереди', tone: 'neutral' },
}

interface StageChecklistProps {
  items: RoadmapStage['items']
}

const StageChecklist = ({ items }: StageChecklistProps) => (
  <ul className="roadmap-checklist">
    {items.map((item) => (
      <li
        key={item.label}
        className={item.done ? 'roadmap-item roadmap-item--done' : 'roadmap-item'}
      >
        <span className="roadmap-item-mark">
          {item.done && <Icon name="check" size={11} strokeWidth={2.6} />}
        </span>
        <span className="roadmap-item-label">{item.label}</span>
      </li>
    ))}
  </ul>
)

interface StageCardProps {
  stage: RoadmapStage
}

export const StageCard = ({ stage }: StageCardProps) => {
  const meta = STATUS_META[stage.status]
  return (
    <li className={`roadmap-stage roadmap-stage--${stage.status}`}>
      <span className="roadmap-dot" aria-hidden="true">
        {stage.status === 'done' && <Icon name="check" size={13} strokeWidth={2.4} />}
      </span>
      <article className="card roadmap-stage-card">
        <header className="roadmap-stage-head">
          <h3>{stage.title}</h3>
          <Tag tone={meta.tone}>{meta.label}</Tag>
        </header>
        <p className="roadmap-stage-desc">{stage.description}</p>
        <StageChecklist items={stage.items} />
      </article>
    </li>
  )
}
