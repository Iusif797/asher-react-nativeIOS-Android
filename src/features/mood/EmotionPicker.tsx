import { EMOTIONS } from '@/data/wellbeing'
import { MAX_EMOTIONS } from './moodModel'
import './mood.css'

interface EmotionPickerProps {
  selected: string[]
  onToggle: (emotion: string) => void
}

export const EmotionPicker = ({ selected, onToggle }: EmotionPickerProps) => {
  const limitReached = selected.length >= MAX_EMOTIONS

  return (
    <div className="mood-emotions">
      <div className="mood-emotions__head">
        <p className="mood-emotions__label">Что вы чувствуете</p>
        <span className="mood-emotions__counter" data-full={limitReached || undefined}>
          {selected.length} из {MAX_EMOTIONS}
        </span>
      </div>
      <div className="mood-emotions__list">
        {EMOTIONS.map((emotion) => {
          const active = selected.includes(emotion)
          return (
            <button
              key={emotion}
              type="button"
              className={active ? 'chip mood-emotions__chip--active' : 'chip'}
              aria-pressed={active}
              disabled={!active && limitReached}
              onClick={() => onToggle(emotion)}
            >
              {emotion}
            </button>
          )
        })}
      </div>
    </div>
  )
}
