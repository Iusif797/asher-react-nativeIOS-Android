import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EMOTIONS } from '@/data/wellbeing'
import { useMoodStore, selectTodayEntry } from '@/stores/moodStore'

const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const MAX_EMOTIONS = 3

export const MoodCheckin = () => {
  const todayEntry = useMoodStore(selectTodayEntry)
  const upsertToday = useMoodStore((s) => s.upsertToday)
  const [score, setScore] = useState(0)
  const [emotions, setEmotions] = useState<string[]>([])

  const toggleEmotion = (emotion: string) => {
    if (emotions.includes(emotion)) {
      setEmotions(emotions.filter((e) => e !== emotion))
      return
    }
    if (emotions.length >= MAX_EMOTIONS) return
    setEmotions([...emotions, emotion])
  }

  if (todayEntry) {
    return (
      <article className="card today-mood today-mood--done">
        <div className="today-mood__badge">
          <Icon name="check" size={22} strokeWidth={2.2} />
        </div>
        <h3>Настроение отмечено: {todayEntry.score}/10</h3>
        <div className="today-mood__emotions">
          {todayEntry.emotions.map((emotion) => (
            <span className="chip" key={emotion}>
              {emotion}
            </span>
          ))}
        </div>
        <Link className="today-mood__link" to="/diary">
          Смотреть график настроения
          <Icon name="arrowRight" size={15} strokeWidth={2} />
        </Link>
      </article>
    )
  }

  return (
    <article className="card today-mood">
      <p className="section-title">Как вы себя чувствуете сегодня?</p>
      <div className="today-mood__scale" role="group" aria-label="Оценка от 1 до 10">
        {SCALE.map((value) => (
          <button
            key={value}
            className={
              value === score
                ? 'today-mood__score today-mood__score--active'
                : 'today-mood__score'
            }
            aria-pressed={value === score}
            onClick={() => setScore(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="today-mood__emotions">
        {EMOTIONS.map((emotion) => {
          const active = emotions.includes(emotion)
          return (
            <button
              key={emotion}
              className={active ? 'chip today-mood__chip--active' : 'chip'}
              aria-pressed={active}
              onClick={() => toggleEmotion(emotion)}
            >
              {emotion}
            </button>
          )
        })}
      </div>
      <Button
        disabled={score === 0}
        onClick={() => upsertToday(score, emotions)}
        icon="check"
      >
        Сохранить
      </Button>
    </article>
  )
}
