import { ROADMAP_ADVICE } from '@/data/roadmap'
import { Icon, type IconName } from '@/components/ui/Icon'

interface AdviceCard {
  adviceKey: keyof typeof ROADMAP_ADVICE
  icon: IconName
  title: string
}

const ADVICE_CARDS: AdviceCard[] = [
  { adviceKey: 'start', icon: 'leaf', title: 'С чего начать' },
  { adviceKey: 'return', icon: 'calendar', title: 'Когда вернуться к специалисту' },
  { adviceKey: 'track', icon: 'journal', title: 'Как отслеживать прогресс' },
]

export const AdviceGrid = () => (
  <section className="roadmap-section" aria-label="Как двигаться">
    <h2 className="section-title">Как двигаться</h2>
    <div className="roadmap-advice">
      {ADVICE_CARDS.map(({ adviceKey, icon, title }) => (
        <article key={adviceKey} className="card roadmap-advice-card">
          <span className="roadmap-advice-icon">
            <Icon name={icon} />
          </span>
          <h3>{title}</h3>
          <p>{ROADMAP_ADVICE[adviceKey]}</p>
        </article>
      ))}
    </div>
  </section>
)
