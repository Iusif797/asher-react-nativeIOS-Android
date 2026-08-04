import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/Progress'
import { COURSES } from '@/data/catalog'
import { formatPrice, pluralize } from '@/lib/format'
import type { Course } from '@/lib/types'

const COURSE_PRICE = 45

const CourseFoot = ({ course }: { course: Course }) => {
  if (course.owned) {
    return (
      <Button variant="soft" size="sm" icon="play">
        Продолжить
      </Button>
    )
  }
  return (
    <>
      <span className="programs-course-price">{formatPrice(COURSE_PRICE)}</span>
      <Button variant="outline" size="sm" disabled title="Демо">
        Купить курс
      </Button>
    </>
  )
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
