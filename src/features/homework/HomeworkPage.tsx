import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/ui/EmptyState'
import { Icon, type IconName } from '@/components/ui/Icon'
import { ProgressRing } from '@/components/ui/Progress'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { Tag } from '@/components/ui/Tag'
import type { HomeworkKind } from '@/lib/types'
import { selectHomeworkProgress, useHomeworkStore } from '@/stores/homeworkStore'
import './homework.css'

type HomeworkFilter = 'all' | 'active' | 'done'

const KIND_META: Record<HomeworkKind, { label: string; icon: IconName; tone: 'accent' | 'deep' | 'premium' }> = {
  exercise: { label: 'Упражнение', icon: 'tasks', tone: 'accent' },
  reflection: { label: 'Размышление', icon: 'journal', tone: 'deep' },
  technique: { label: 'Техника', icon: 'leaf', tone: 'accent' },
  material: { label: 'Материал', icon: 'fileText', tone: 'premium' },
}

const STEPS = [
  { icon: 'chat' as IconName, text: 'После консультации психолог отправляет задание' },
  { icon: 'check' as IconName, text: 'Вы выполняете и отмечаете его в приложении' },
  { icon: 'route' as IconName, text: 'Специалист видит прогресс и опирается на него в работе' },
]

export const HomeworkPage = () => {
  const tasks = useHomeworkStore((s) => s.tasks)
  const toggleTask = useHomeworkStore((s) => s.toggleTask)
  const progress = useHomeworkStore(selectHomeworkProgress)
  const [filter, setFilter] = useState<HomeworkFilter>('all')

  const visible = tasks.filter((task) => {
    if (filter === 'active') return !task.done
    if (filter === 'done') return task.done
    return true
  })

  return (
    <section className="homework">
      <header>
        <p className="page-kicker">Домашние задания</p>
        <h1 className="page-title">Практика между сессиями</h1>
        <p className="page-lead">
          Навык закрепляется не на консультации, а в повседневной жизни. Ваш
          психолог видит, что получилось, и опирается на это в работе.
        </p>
      </header>
      <article className="card homework-progress">
        <ProgressRing
          value={(progress.done / Math.max(1, progress.total)) * 100}
          size={92}
          label={`${progress.done}/${progress.total}`}
          sublabel="выполнено"
        />
        <div>
          <p className="section-title">Задания от {tasks[0]?.assignedBy}</p>
          <p className="homework-progress__hint">
            Отмечайте выполненное — прогресс синхронизируется с кабинетом специалиста.
          </p>
        </div>
      </article>
      <div className="homework-filter">
        <SegmentedControl<HomeworkFilter>
          ariaLabel="Фильтр заданий"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'Все' },
            { value: 'active', label: 'Активные' },
            { value: 'done', label: 'Выполненные' },
          ]}
        />
      </div>
      <div className="homework-list">
        {visible.map((task) => {
          const meta = KIND_META[task.kind]
          return (
            <article
              className={task.done ? 'card homework-task homework-task--done' : 'card homework-task'}
              key={task.id}
            >
              <span className={`homework-task__icon homework-task__icon--${meta.tone}`}>
                <Icon name={meta.icon} size={20} />
              </span>
              <div className="homework-task__body">
                <div className="homework-task__meta">
                  <Tag tone={meta.tone}>{meta.label}</Tag>
                  <span>от {task.assignedBy}</span>
                </div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                {task.kind === 'material' && (
                  <Link className="homework-task__link" to="/library">
                    Открыть в библиотеке
                    <Icon name="arrowRight" size={14} strokeWidth={2} />
                  </Link>
                )}
              </div>
              <button
                className={
                  task.done
                    ? 'homework-check homework-check--done'
                    : 'homework-check'
                }
                aria-pressed={task.done}
                aria-label={task.done ? 'Снять отметку' : 'Отметить выполненным'}
                onClick={() => toggleTask(task.id)}
              >
                <Icon name="check" size={20} strokeWidth={2.4} />
              </button>
            </article>
          )
        })}
        {visible.length === 0 && (
          <EmptyState
            icon="tasks"
            title="Здесь пока пусто"
            text="Задания появятся после консультации с психологом."
          />
        )}
      </div>
      <article className="card homework-how">
        <p className="section-title">Как это работает</p>
        <div className="homework-how__steps">
          {STEPS.map((step, index) => (
            <div className="homework-how__step" key={step.text}>
              <span className="homework-how__num">{index + 1}</span>
              <Icon name={step.icon} size={18} />
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
