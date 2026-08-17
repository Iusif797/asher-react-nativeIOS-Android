import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/Progress'
import { Tag } from '@/components/ui/Tag'
import { COURSES } from '@/data/catalog'
import { pluralize } from '@/lib/format'
import type { Course } from '@/lib/types'

const CourseFoot = ({ course }: { course: Course }) => {
  if (course.owned) {
    return (
      <Button variant="soft" size="sm" icon="play">
        Продолжить
      </Button>
    )
  }
  return <Tag tone="neutral">Скоро в продаже</Tag>
}

export const CoursesSection = () => (
  <section className="programs-section">
    <h2 className="section-title">Мои курсы</h2>
    <div className="programs-grid programs-grid--three">
      {COURSES.map((course) => (
        <article key={course.id} className="card programs-card">
          <h3>{course.title}</h3>
          <p className="programs-meta">
            {pluralize(course.lessons, 'урок', 'урока', 'уроков')} ·{' '}
            {pluralize(course.hours, 'час', 'часа', 'часов')}
          </p>
          {course.owned && (
            <div className="programs-course-progress">
              <div className="programs-progress-row">
                <span>Пройдено</span>
                <span>{course.progress}%</span>
              </div>
              <ProgressBar value={course.progress} />
            </div>
          )}
          <div className="programs-card-foot">
            <CourseFoot course={course} />
          </div>
        </article>
      ))}
    </div>
  </section>
)
