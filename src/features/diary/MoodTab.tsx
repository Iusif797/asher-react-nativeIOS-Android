import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { EMOTIONS } from '@/data/wellbeing'
import { selectTodayEntry, useMoodStore } from '@/stores/moodStore'
import { MoodChart } from './MoodChart'

const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const MAX_EMOTIONS = 3

const frequentEmotions = (emotionLists: string[][]): [string, number][] => {
  const counts = emotionLists.flat().reduce<Record<string, number>>(
    (acc, emotion) => ({ ...acc, [emotion]: (acc[emotion] ?? 0) + 1 }),
    {},
  )
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
}

export const MoodTab = () => {
  const entries = useMoodStore((s) => s.entries)
  const todayEntry = useMoodStore(selectTodayEntry)
  const upsertToday = useMoodStore((s) => s.upsertToday)
  const [editing, setEditing] = useState(false)
  const [score, setScore] = useState(todayEntry?.score ?? 0)
  const [emotions, setEmotions] = useState<string[]>(todayEntry?.emotions ?? [])

  const recent = entries.slice(-14)
  const average = recent.reduce((sum, e) => sum + e.score, 0) / Math.max(1, recent.length)
  const best = recent.reduce((a, b) => (b.score >= a.score ? b : a), recent[0])

  const toggleEmotion = (emotion: string) => {
    if (emotions.includes(emotion)) {
      setEmotions(emotions.filter((e) => e !== emotion))
      return
    }
    if (emotions.length >= MAX_EMOTIONS) return
    setEmotions([...emotions, emotion])
  }

  const save = () => {
    upsertToday(score, emotions)
    setEditing(false)
  }

  const showForm = editing || !todayEntry

  return (
    <div className="diary-mood">
      <article className="card diary-checkin">
        {showForm ? (
          <>
            <p className="section-title">Как вы себя чувствуете сегодня?</p>
            <div className="diary-checkin__scale" role="group" aria-label="Оценка от 1 до 10">
              {SCALE.map((value) => (
                <button
                  key={value}
                  className={
                    value === score
                      ? 'diary-score diary-score--active'
                      : 'diary-score'
                  }
                  aria-pressed={value === score}
                  onClick={() => setScore(value)}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="diary-checkin__emotions">
              {EMOTIONS.map((emotion) => (
                <button
                  key={emotion}
                  className={
                    emotions.includes(emotion) ? 'chip diary-chip--active' : 'chip'
                  }
                  aria-pressed={emotions.includes(emotion)}
                  onClick={() => toggleEmotion(emotion)}
                >
                  {emotion}
                </button>
              ))}
            </div>
            <Button disabled={score === 0} onClick={save} icon="check">
              Сохранить
            </Button>
          </>
        ) : (
          <div className="diary-checkin__done">
            <div>
              <p className="section-title">Сегодня: {todayEntry?.score}/10</p>
              <div className="diary-checkin__emotions">
                {todayEntry?.emotions.map((emotion) => (
                  <span className="chip" key={emotion}>
                    {emotion}
                  </span>
                ))}
              </div>
            </div>
            <Button variant="soft" size="sm" icon="edit" onClick={() => setEditing(true)}>
              Изменить
            </Button>
          </div>
        )}
      </article>
      <article className="card diary-chart-card">
        <p className="section-title">Последние две недели</p>
        <MoodChart entries={entries} />
        <div className="diary-insights">
          <span className="chip">Средний балл: {average.toFixed(1)}</span>
          {best && <span className="chip">Лучший день: {best.score}/10</span>}
          {frequentEmotions(recent.map((e) => e.emotions)).map(([emotion, count]) => (
            <span className="chip" key={emotion}>
              {emotion} · {count}
            </span>
          ))}
        </div>
      </article>
      <p className="diary-note">
        Приложение не делает медицинских выводов — оно помогает замечать
        закономерности между событиями и самочувствием.
      </p>
    </div>
  )
}
