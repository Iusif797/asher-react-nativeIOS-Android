import { Link } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

interface DirectionSymptomsProps {
  symptoms: string[]
}

export const DirectionSymptoms = ({ symptoms }: DirectionSymptomsProps) => (
  <section className="direction-section" aria-labelledby="direction-symptoms-title">
    <h2 id="direction-symptoms-title" className="direction-section-title">
      Возможно, вы узнаете себя
    </h2>
    <div className="direction-symptoms card">
      <ul className="direction-symptoms-list">
        {symptoms.map((symptom) => (
          <li key={symptom}>
            <span className="direction-check">
              <Icon name="check" size={14} strokeWidth={2.4} />
            </span>
            {symptom}
          </li>
        ))}
      </ul>
      <p className="direction-symptoms-note">
        Если вы узнали себя в нескольких пунктах — с этим можно работать.
      </p>
    </div>
  </section>
)

interface DirectionOutcomesProps {
  outcomes: string[]
}

export const DirectionOutcomes = ({ outcomes }: DirectionOutcomesProps) => (
  <section className="direction-section" aria-labelledby="direction-outcomes-title">
    <h2 id="direction-outcomes-title" className="direction-section-title">
      Что может измениться
    </h2>
    <ul className="direction-outcomes">
      {outcomes.map((outcome) => (
        <li key={outcome} className="direction-outcome card">
          <span className="direction-leaf">
            <Icon name="leaf" size={16} />
          </span>
          {outcome}
        </li>
      ))}
    </ul>
  </section>
)

export const DirectionCta = () => (
  <div className="direction-cta card">
    <div>
      <h3>Начните с одной встречи</h3>
      <p>Подберём специалиста под ваш запрос — бережно и без спешки.</p>
    </div>
    <div className="direction-cta-actions">
      <Link to="/matching" className="btn btn--primary btn--md">
        Подобрать специалиста
      </Link>
      <Link to="/booking" className="btn btn--outline btn--md">
        Посмотреть всех
      </Link>
    </div>
  </div>
)
