import { Link } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { SPECIALISTS, specialistById } from '@/data/specialists'
import { scoreSpecialists, type QuizAnswers } from '@/data/quiz'
import { formatPrice, formatYears } from '@/lib/format'

interface MatchResultsProps {
  answers: QuizAnswers
  onRestart: () => void
}

const TOP_MATCH_PERCENT = 93

export const MatchResults = ({ answers, onRestart }: MatchResultsProps) => {
  const matches = scoreSpecialists(answers, SPECIALISTS)
    .filter((m) => m.score > 0)
    .slice(0, 3)
  const topScore = matches[0]?.score ?? 1

  return (
    <div className="matching-results">
      <p className="page-kicker">Результат подбора</p>
      <h1 className="page-title">Мы подобрали для вас</h1>
      <p className="page-lead">
        Это не случайный список: рядом с каждым специалистом — объяснение,
        почему он подходит именно под ваш запрос.
      </p>
      <div className="matching-results__list">
        {matches.map((match) => {
          const specialist = specialistById(match.specialistId)
          if (!specialist) return null
          const percent = Math.round((match.score / topScore) * TOP_MATCH_PERCENT)
          return (
            <article className="card matching-result" key={specialist.id}>
              <header className="matching-result__head">
                <Avatar name={specialist.name} hue={specialist.hue} size={56} />
                <div className="matching-result__person">
                  <h4>{specialist.name}</h4>
                  <p>{specialist.role}</p>
                  <p className="matching-result__meta">
                    Опыт {formatYears(specialist.experienceYears)} ·{' '}
                    {formatPrice(specialist.price)} за сессию
                  </p>
                </div>
                <Tag tone="deep">Совпадение {percent}%</Tag>
              </header>
              <div className="matching-result__reasons">
                <p className="matching-result__why">Почему именно этот специалист:</p>
                <ul>
                  {match.reasons.map((reason) => (
                    <li key={reason}>
                      <Icon name="check" size={15} strokeWidth={2.2} />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to={`/booking?specialist=${specialist.id}`}>
                <Button iconAfter="arrowRight">Выбрать время</Button>
              </Link>
            </article>
          )
        })}
      </div>
      <Button variant="ghost" icon="arrowLeft" onClick={onRestart}>
        Пройти заново
      </Button>
    </div>
  )
}
