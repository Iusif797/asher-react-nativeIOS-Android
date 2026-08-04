import './catalog.css'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { PROGRAMS } from '@/data/programs'
import { pluralize } from '@/lib/format'
import { useProgramStore } from '@/stores/programStore'
import { CoursesSection } from './CoursesSection'
import { GroupsSection } from './GroupsSection'
import { SubscriptionCard } from './SubscriptionCard'

const UpcomingPrograms = () => {
  const enrolledId = useProgramStore((state) => state.enrolledId)
  const upcoming = PROGRAMS.filter((program) => program.id !== enrolledId)

  if (upcoming.length === 0) return null

  return (
    <section className="programs-section">
      <h2 className="section-title">Другие программы</h2>
      <div className="programs-grid">
        {upcoming.map((program) => (
          <article key={program.id} className="card programs-card">
            <div className="programs-card-tags">
              <Tag tone="warm">Скоро</Tag>
            </div>
            <h3>{program.title}</h3>
            <p className="programs-card-text">{program.subtitle}</p>
            <p className="programs-meta">
              <Icon name="calendar" size={15} />
              <span>{pluralize(program.durationDays, 'день', 'дня', 'дней')}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export const Catalog = () => (
  <>
    <UpcomingPrograms />
    <GroupsSection />
    <CoursesSection />
    <SubscriptionCard />
  </>
)
