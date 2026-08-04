import { Link } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Icon, type IconName } from '@/components/ui/Icon'
import { ProgressRing } from '@/components/ui/Progress'
import { Tag } from '@/components/ui/Tag'
import { USER_NAME } from '@/data/account'
import { programById } from '@/data/programs'
import { ROADMAP_STAGES } from '@/data/roadmap'
import { specialistById } from '@/data/specialists'
import { formatDay, formatDayTime, formatWeekday, greetingByHour } from '@/lib/dates'
import { selectUpcoming, useBookingStore } from '@/stores/bookingStore'
import { selectHomeworkProgress, useHomeworkStore } from '@/stores/homeworkStore'
import { selectCurrentDay, useProgramStore } from '@/stores/programStore'
import { MoodCheckin } from './MoodCheckin'
import './today.css'

const roadmapProgress = () => {
  const items = ROADMAP_STAGES.flatMap((stage) => stage.items)
  return Math.round((items.filter((i) => i.done).length / items.length) * 100)
}

interface QuickLink {
  to: string
  icon: IconName
  title: string
  meta: string
}

export const TodayPage = () => {
  const upcoming = useBookingStore(selectUpcoming)[0]
  const specialist = upcoming ? specialistById(upcoming.specialistId) : undefined
  const currentDay = useProgramStore(selectCurrentDay)
  const day = programById('prog-anxiety-30')?.days.find((d) => d.day === currentDay)
  const homework = useHomeworkStore(selectHomeworkProgress)
  const nowISO = new Date().toISOString()
  const activeStage = ROADMAP_STAGES.find((s) => s.status === 'active')
  const progress = roadmapProgress()

  const quickLinks: QuickLink[] = [
    { to: '/homework', icon: 'tasks', title: 'Задания', meta: `${homework.done} из ${homework.total}` },
    { to: '/library', icon: 'library', title: 'Библиотека', meta: 'По ситуациям' },
    { to: '/assistant', icon: 'sparkle', title: 'Помощник', meta: 'Всегда рядом' },
    { to: '/matching', icon: 'heart', title: 'Подбор', meta: '10 вопросов' },
  ]

  return (
    <section className="today">
      <header className="today__head">
        <p className="page-kicker">
          {formatWeekday(nowISO)}, {formatDay(nowISO)}
        </p>
        <h1 className="today__title">
          {greetingByHour(new Date().getHours())}, {USER_NAME}
        </h1>
        <p className="page-lead">Ваше пространство психологического благополучия.</p>
      </header>
      <div className="today__grid">
        <MoodCheckin />
        <article className="card today-session">
          <p className="section-title">Ближайшая встреча</p>
          {upcoming && specialist ? (
            <>
              <div className="today-session__person">
                <Avatar name={specialist.name} hue={specialist.hue} size={46} />
                <div>
                  <h4>{specialist.name}</h4>
                  <p>{specialist.role}</p>
                </div>
              </div>
              <p className="today-session__when">{formatDayTime(upcoming.dateISO)}</p>
              <Tag tone="accent" icon={upcoming.format === 'online' ? 'video' : 'mapPin'}>
                {upcoming.format === 'online' ? 'Онлайн' : 'Очно в центре'}
              </Tag>
              <Link className="today__card-link" to="/account">
                Перейти в кабинет
                <Icon name="arrowRight" size={15} strokeWidth={2} />
              </Link>
            </>
          ) : (
            <>
              <p className="today-session__empty">Запланированных встреч пока нет.</p>
              <Link className="today__card-link" to="/booking">
                Записаться к психологу
                <Icon name="arrowRight" size={15} strokeWidth={2} />
              </Link>
            </>
          )}
        </article>
        <article className="card today-program">
          <div className="today-program__label">
            <p className="section-title">Сегодня в программе</p>
            <Tag tone="warm">День {currentDay} из 30</Tag>
          </div>
          {day && (
            <>
              <h3>{day.title}</h3>
              <p className="today-program__exercise">{day.exercise}</p>
            </>
          )}
          <Link className="today__card-link" to="/programs">
            Открыть программу
            <Icon name="arrowRight" size={15} strokeWidth={2} />
          </Link>
        </article>
        <Link className="card today-roadmap" to="/roadmap">
          <ProgressRing value={progress} size={92} label={`${progress}%`} sublabel="пути" />
          <div className="today-roadmap__text">
            <p className="section-title">Персональная дорожная карта</p>
            <p>Сейчас: {activeStage?.title.toLowerCase() ?? 'движение по маршруту'}</p>
            <span className="today__card-link">
              Смотреть маршрут
              <Icon name="arrowRight" size={15} strokeWidth={2} />
            </span>
          </div>
        </Link>
      </div>
      <div className="today__quick">
        {quickLinks.map((link) => (
          <Link className="card today-quick" to={link.to} key={link.to}>
            <span className="today-quick__icon">
              <Icon name={link.icon} size={20} />
            </span>
            <span className="today-quick__title">{link.title}</span>
            <span className="today-quick__meta">{link.meta}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
