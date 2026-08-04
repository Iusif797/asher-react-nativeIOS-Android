import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { formatDayTime } from '@/lib/dates'
import { useThoughtsStore } from '@/stores/thoughtsStore'

export const ThoughtsTab = () => {
  const entries = useThoughtsStore((s) => s.entries)
  const addEntry = useThoughtsStore((s) => s.addEntry)
  const toggleDiscussed = useThoughtsStore((s) => s.toggleDiscussed)
  const removeEntry = useThoughtsStore((s) => s.removeEntry)
  const [situation, setSituation] = useState('')
  const [thought, setThought] = useState('')

  const canSave = situation.trim().length > 0 && thought.trim().length > 0

  const save = () => {
    if (!canSave) return
    addEntry(situation.trim(), thought.trim())
    setSituation('')
    setThought('')
  }

  return (
    <div className="diary-thoughts">
      <article className="card diary-form">
        <p className="section-title">Записать мысль</p>
        <label className="diary-field">
          <span>Ситуация</span>
          <input
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Например: завтра важная встреча"
          />
        </label>
        <label className="diary-field">
          <span>Мысль дословно</span>
          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="«Кажется, всё пойдёт плохо...»"
            rows={3}
          />
        </label>
        <Button disabled={!canSave} onClick={save} icon="edit">
          Сохранить
        </Button>
      </article>
      <div className="diary-thoughts__list">
        {entries.map((entry) => (
          <article className="card diary-thought" key={entry.id}>
            <p className="diary-thought__date">{formatDayTime(entry.createdAtISO)}</p>
            <h4>{entry.situation}</h4>
            <p className="diary-thought__text">«{entry.thought}»</p>
            <div className="diary-thought__actions">
              <button
                className={
                  entry.discussed
                    ? 'diary-discuss diary-discuss--active'
                    : 'diary-discuss'
                }
                aria-pressed={entry.discussed}
                onClick={() => toggleDiscussed(entry.id)}
              >
                <Icon name="check" size={14} strokeWidth={2.2} />
                Обсудить с психологом
              </button>
              {entry.discussed && <Tag tone="accent">в списке на сессию</Tag>}
              <button
                className="diary-remove"
                aria-label="Удалить запись"
                onClick={() => removeEntry(entry.id)}
              >
                <Icon name="trash" size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="diary-note">
        Мысль, записанная дословно, теряет часть своей силы. Позже эти записи
        можно разобрать вместе с психологом.
      </p>
    </div>
  )
}
