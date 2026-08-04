import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

interface QuizIntroProps {
  onStart: () => void
}

export const QuizIntro = ({ onStart }: QuizIntroProps) => (
  <div className="matching-intro">
    <div className="matching-intro__halo">
      <Icon name="sparkle" size={30} strokeWidth={1.5} />
    </div>
    <p className="page-kicker">Подбор</p>
    <h1 className="page-title">Найдём вашего психолога</h1>
    <p className="page-lead">
      Это не длинная анкета — всего 10 простых вопросов, около 2 минут.
      Система предложит специалистов и объяснит, почему подходят именно они.
    </p>
    <div className="matching-intro__meta">
      <span className="chip">
        <Icon name="tasks" size={14} strokeWidth={2} />
        10 вопросов
      </span>
      <span className="chip">
        <Icon name="clock" size={14} strokeWidth={2} />
        Около 2 минут
      </span>
      <span className="chip">
        <Icon name="users" size={14} strokeWidth={2} />
        Топ-3 специалиста
      </span>
    </div>
    <div className="matching-intro__actions">
      <Button size="lg" iconAfter="arrowRight" onClick={onStart}>
        Начать
      </Button>
      <Link className="matching-intro__secondary" to="/booking">
        Посмотреть всех специалистов
        <Icon name="chevronRight" size={15} strokeWidth={2} />
      </Link>
    </div>
  </div>
)
