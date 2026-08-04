import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { DIRECTIONS } from '@/data/directions'
import { SPECIALISTS, specialistById } from '@/data/specialists'
import type { Specialist } from '@/lib/types'
import { pluralize } from '@/lib/format'
import { BookingModal } from './BookingModal'
import { SpecialistCard } from './SpecialistCard'
import './booking.css'

type FormatFilter = 'all' | 'online' | 'inperson'

const LANGUAGES = ['Русский', 'Азербайджанский', 'Английский']

export const BookingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [direction, setDirection] = useState('all')
  const [format, setFormat] = useState<FormatFilter>('all')
  const [language, setLanguage] = useState('all')
  const [picked, setPicked] = useState<Specialist | null>(null)

  useEffect(() => {
    const preselected = searchParams.get('specialist')
    if (!preselected) return
    const specialist = specialistById(preselected)
    if (specialist) setPicked(specialist)
  }, [searchParams])

  const closeModal = () => {
    setPicked(null)
    if (searchParams.get('specialist')) setSearchParams({}, { replace: true })
  }

  const filtered = SPECIALISTS.filter((s) => {
    if (direction !== 'all' && !s.directions.some((d) => d === direction)) return false
    if (format !== 'all' && !s.formats.includes(format)) return false
    if (language !== 'all' && !s.languages.includes(language)) return false
    return true
  })

  return (
    <section className="booking">
      <header>
        <p className="page-kicker">Запись</p>
        <h1 className="page-title">Выберите своего специалиста</h1>
        <p className="page-lead">
          Никаких скрытых условий: свободное время, формат, стоимость, опыт,
          направления работы, языки и отзывы — всё видно сразу.
        </p>
      </header>
      <div className="booking-filters">
        <div className="booking-filters__scroll" role="group" aria-label="Направление">
          {[{ id: 'all', title: 'Все направления' }, ...DIRECTIONS].map((d) => (
            <button
              key={d.id}
              className={
                d.id === direction
                  ? 'chip booking-filters__chip--active'
                  : 'chip'
              }
              aria-pressed={d.id === direction}
              onClick={() => setDirection(d.id)}
            >
              {d.title}
            </button>
          ))}
        </div>
        <div className="booking-filters__row">
          <SegmentedControl<FormatFilter>
            ariaLabel="Формат"
            value={format}
            onChange={setFormat}
            options={[
              { value: 'all', label: 'Все' },
              { value: 'online', label: 'Онлайн' },
              { value: 'inperson', label: 'Очно' },
            ]}
          />
          <div className="booking-filters__scroll" role="group" aria-label="Язык">
            {['all', ...LANGUAGES].map((lang) => (
              <button
                key={lang}
                className={
                  lang === language ? 'chip booking-filters__chip--active' : 'chip'
                }
                aria-pressed={lang === language}
                onClick={() => setLanguage(lang)}
              >
                {lang === 'all' ? 'Любой язык' : lang}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="booking-count">
        Найдено: {pluralize(filtered.length, 'специалист', 'специалиста', 'специалистов')}
      </p>
      <div className="booking-list">
        {filtered.map((specialist) => (
          <SpecialistCard key={specialist.id} specialist={specialist} onPick={setPicked} />
        ))}
      </div>
      <BookingModal specialist={picked} onClose={closeModal} />
    </section>
  )
}
