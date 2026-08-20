import { MOOD_SCALE } from './moodModel'
import './mood.css'

interface MoodScaleProps {
  score: number
  onSelect: (score: number) => void
}

export const MoodScale = ({ score, onSelect }: MoodScaleProps) => (
  <div className="mood-scale">
    <div className="mood-scale__track" role="group" aria-label="Оценка состояния от 1 до 10">
      {MOOD_SCALE.map((value) => (
        <button
          key={value}
          type="button"
          className="mood-scale__step"
          data-filled={score >= value || undefined}
          data-active={score === value || undefined}
          aria-pressed={score === value}
          aria-label={`Оценка ${value} из 10`}
          onClick={() => onSelect(value)}
        >
          {value}
        </button>
      ))}
    </div>
    <p className="mood-scale__legend">
      <span>Тяжело</span>
      <span>Хорошо</span>
    </p>
  </div>
)
