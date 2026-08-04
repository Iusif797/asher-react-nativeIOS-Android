import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { CLIENT_CARDS, THERAPIST_NAME, THERAPIST_SCHEDULE } from '@/data/therapist'
import { toDateKey, todayKey } from '@/lib/dates'
import { pluralize } from '@/lib/format'
import { AssignTaskModal, type AssignTarget } from './AssignTaskModal'
import { ClientCards } from './ClientCards'
import { ScheduleList } from './ScheduleList'
import { TemplateList } from './TemplateList'
import './therapist.css'

type TherapistTab = 'schedule' | 'clients' | 'templates'

const TAB_OPTIONS: { value: TherapistTab; label: string }[] = [
  { value: 'schedule', label: 'Расписание' },
  { value: 'clients', label: 'Клиенты' },
  { value: 'templates', label: 'Шаблоны заданий' },
]

const BASE_ASSIGNED_COUNT = CLIENT_CARDS.reduce(
  (sum, card) => sum + card.homeworkTotal,
  0,
)

const MEETINGS_TODAY = THERAPIST_SCHEDULE.filter(
  (slot) => toDateKey(new Date(slot.dateISO)) === todayKey(),
).length

export const TherapistPage = () => {
  const [tab, setTab] = useState<TherapistTab>('schedule')
  const [assignTarget, setAssignTarget] = useState<AssignTarget | null>(null)
  const [assignedExtra, setAssignedExtra] = useState(0)

  const assignedTotal = BASE_ASSIGNED_COUNT + assignedExtra

  return (
    <section>
      <p className="page-kicker">Режим специалиста</p>
      <h1 className="page-title">Добрый день, {THERAPIST_NAME}</h1>
      <p className="page-lead">
        Расписание, карточки клиентов и назначение заданий — в одном месте.
      </p>
      <div className="therapist-stats">
        <span className="chip">
          <Icon name="users" size={14} />
          {pluralize(CLIENT_CARDS.length, 'клиент', 'клиента', 'клиентов')}
        </span>
        <span className="chip">
          <Icon name="calendar" size={14} />
          {pluralize(MEETINGS_TODAY, 'встреча', 'встречи', 'встреч')} сегодня
        </span>
        <span className="chip">
          <Icon name="tasks" size={14} />
          {pluralize(assignedTotal, 'задание назначено', 'задания назначено', 'заданий назначено')}
        </span>
      </div>
      <div className="therapist-tabs">
        <SegmentedControl
          options={TAB_OPTIONS}
          value={tab}
          onChange={setTab}
          ariaLabel="Разделы кабинета специалиста"
        />
      </div>
      {tab === 'schedule' && <ScheduleList onOpenClient={() => setTab('clients')} />}
      {tab === 'clients' && (
        <ClientCards onAssign={(clientId) => setAssignTarget({ kind: 'client', clientId })} />
      )}
      {tab === 'templates' && (
        <TemplateList onUse={(templateId) => setAssignTarget({ kind: 'template', templateId })} />
      )}
      {assignTarget && (
        <AssignTaskModal
          target={assignTarget}
          onClose={() => setAssignTarget(null)}
          onAssigned={() => setAssignedExtra((count) => count + 1)}
        />
      )}
    </section>
  )
}
