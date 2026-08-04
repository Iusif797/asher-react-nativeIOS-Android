import type { ComponentProps } from 'react'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/Progress'
import { Tag } from '@/components/ui/Tag'
import { CLIENT_CARDS } from '@/data/therapist'
import { formatSessions } from '@/lib/format'
import type { ClientCard } from '@/lib/types'

type TagTone = NonNullable<ComponentProps<typeof Tag>['tone']>

const TREND_TAGS: Record<ClientCard['moodTrend'], { tone: TagTone; label: string }> = {
  up: { tone: 'accent', label: 'динамика +' },
  flat: { tone: 'neutral', label: 'плато' },
  down: { tone: 'danger', label: 'требует внимания' },
}

const homeworkProgress = (card: ClientCard): number =>
  card.homeworkTotal > 0 ? (card.homeworkDone / card.homeworkTotal) * 100 : 0

interface ClientCardsProps {
  onAssign: (clientId: string) => void
}

export const ClientCards = ({ onAssign }: ClientCardsProps) => (
  <div className="therapist-clients">
    {CLIENT_CARDS.map((client) => {
      const trend = TREND_TAGS[client.moodTrend]
      return (
        <article key={client.id} className="card therapist-client">
          <header className="therapist-client-head">
            <h4>{client.name}</h4>
            <Tag tone={trend.tone}>{trend.label}</Tag>
          </header>
          <p className="therapist-client-request">{client.request}</p>
          <p className="therapist-client-meta">
            {formatSessions(client.sessionsCount)} · был(а) {client.lastVisit}
          </p>
          <blockquote className="therapist-client-note">{client.note}</blockquote>
          <div className="therapist-client-homework">
            <div className="therapist-client-homework-row">
              <span>Домашние задания</span>
              <strong>
                {client.homeworkDone}/{client.homeworkTotal}
              </strong>
            </div>
            <ProgressBar value={homeworkProgress(client)} />
          </div>
          <Button
            className="therapist-client-assign"
            variant="soft"
            size="sm"
            icon="plus"
            onClick={() => onAssign(client.id)}
          >
            Назначить задание
          </Button>
        </article>
      )
    })}
  </div>
)
