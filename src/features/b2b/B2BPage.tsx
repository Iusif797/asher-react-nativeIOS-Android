import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'
import { B2B_STATS } from '@/data/account'
import { CompanyStatsCard } from './CompanyStatsCard'
import './b2b.css'

const INCLUDED_SERVICES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'chat',
    title: 'Консультации психологов',
    text: 'Индивидуальные сессии с проверенными специалистами — онлайн или очно.',
  },
  {
    icon: 'play',
    title: 'Обучающие модули',
    text: 'Короткие курсы о стрессе, границах и коммуникации в командах.',
  },
  {
    icon: 'library',
    title: 'Библиотека и программы',
    text: 'Материалы и пошаговые программы самопомощи на каждый день.',
  },
]

export const B2BPage = () => {
  const [isRequested, setIsRequested] = useState(false)

  return (
    <section>
      <p className="page-kicker">ASHER для команд</p>
      <h1 className="page-title">Забота о людях — сильная бизнес-стратегия</h1>
      <p className="page-lead">
        Каждый сотрудник получает полный доступ к приложению: психологи, программы и материалы —
        без ограничений.
      </p>
      <div className="b2b-stack">
        <CompanyStatsCard />
        <section className="b2b-section">
          <h2 className="section-title">Популярные темы обращений</h2>
          <div className="b2b-topics">
            {B2B_STATS.topRequests.map((topic) => (
              <span key={topic} className="chip">
                {topic}
              </span>
            ))}
          </div>
        </section>
        <div className="card b2b-privacy">
          <span className="b2b-privacy-icon">
            <Icon name="shield" size={24} />
          </span>
          <div>
            <h3>Приватность — по умолчанию</h3>
            <p>
              Работодатель видит только агрегированную статистику участия. Содержание обращений,
              записи и данные сотрудников не раскрываются никогда.
            </p>
          </div>
        </div>
        <section className="b2b-section">
          <h2 className="section-title">Что входит в программу</h2>
          <div className="b2b-services">
            {INCLUDED_SERVICES.map((service) => (
              <article key={service.title} className="card b2b-service">
                <span className="b2b-service-icon">
                  <Icon name={service.icon} size={20} />
                </span>
                <h4>{service.title}</h4>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="card b2b-cta">
          {isRequested ? (
            <div className="b2b-cta-sent">
              <span className="b2b-cta-check">
                <Icon name="check" size={22} strokeWidth={2.2} />
              </span>
              <p>Заявка отправлена — вернёмся в течение дня</p>
            </div>
          ) : (
            <>
              <div>
                <h3>Подключить команду</h3>
                <p>Расскажем об условиях и рассчитаем программу под размер компании.</p>
              </div>
              <Button variant="deep" size="lg" onClick={() => setIsRequested(true)}>
                Запросить предложение
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
