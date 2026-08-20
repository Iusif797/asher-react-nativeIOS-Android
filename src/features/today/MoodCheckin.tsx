import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EmotionPicker } from '@/features/mood/EmotionPicker'
import { MoodScale } from '@/features/mood/MoodScale'
import { moodSummary, moodTone, toggleEmotion } from '@/features/mood/moodModel'
import { useMoodStore, selectTodayEntry } from '@/stores/moodStore'

export const MoodCheckin = () => {
  const todayEntry = useMoodStore(selectTodayEntry)
  const upsertToday = useMoodStore((s) => s.upsertToday)
  const [score, setScore] = useState(0)
  const [emotions, setEmotions] = useState<string[]>([])

  if (todayEntry) {
    return (
      <article className="today-mood today-mood--done" data-mood-tone={moodTone(todayEntry.score)}>
        <motion.div
          className="today-mood__badge"
          initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 17 }}
        >
          <Icon name="check" size={22} strokeWidth={2.2} />
        </motion.div>
        <div>
          <p className="today-mood__overline">Отмечено сегодня</p>
          <h3 className="today-mood__done-title">
            {todayEntry.score}/10 — {moodSummary(todayEntry.score)}
          </h3>
        </div>
        {todayEntry.emotions.length > 0 && (
          <div className="mood-emotions__list">
            {todayEntry.emotions.map((emotion) => (
              <span className="chip" key={emotion}>
                {emotion}
              </span>
            ))}
          </div>
        )}
        <Link className="today__card-link" to="/diary">
          Смотреть график настроения
          <Icon name="arrowRight" size={15} strokeWidth={2} />
        </Link>
      </article>
    )
  }

  return (
    <article className="today-mood" data-mood-tone={moodTone(score)}>
      <div className="today-mood__head">
        <h2 className="today-mood__question">Как вы себя чувствуете сегодня?</h2>
        <p className="today-mood__readout" data-empty={score === 0 || undefined}>
          {score === 0 ? 'Отметьте состояние по шкале' : `${score} из 10 — ${moodSummary(score)}`}
        </p>
      </div>
      <MoodScale score={score} onSelect={setScore} />
      <EmotionPicker
        selected={emotions}
        onToggle={(emotion) => setEmotions(toggleEmotion(emotions, emotion))}
      />
      <Button
        size="lg"
        disabled={score === 0}
        onClick={() => upsertToday(score, emotions)}
        icon="check"
      >
        Сохранить
      </Button>
    </article>
  )
}
