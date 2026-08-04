import { Link } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { USER_NAME } from '@/data/account'
import { useAppStore } from '@/stores/appStore'
import { AdminChat } from './AdminChat'
import { DocumentsList } from './DocumentsList'
import { HistoryList } from './HistoryList'
import { UpcomingMeetings } from './UpcomingMeetings'
import './account.css'

const ProfileCard = () => {
  const subscriptionActive = useAppStore((state) => state.subscriptionActive)
  return (
    <div className="account-profile card">
      <Avatar name={USER_NAME} hue={200} size={64} />
      <div className="account-profile__info">
        <h2 className="account-profile__name">{USER_NAME}</h2>
        <p className="account-profile__note">Клиент ASHER · с июля 2026</p>
      </div>
      {subscriptionActive && (
        <Tag tone="gold" icon="sparkle">
          ASHER+
        </Tag>
      )}
    </div>
  )
}

const TeamsCard = () => (
  <div className="account-teams card">
    <span className="account-teams__icon">
      <Icon name="briefcase" size={20} strokeWidth={1.6} />
    </span>
    <h3 className="account-teams__title">ASHER для команд</h3>
    <p className="account-teams__text">
      Ваша компания может подключить корпоративную программу поддержки
    </p>
    <Link to="/b2b" className="btn btn--outline btn--sm">
      Узнать подробнее
      <Icon name="arrowRight" size={15} />
    </Link>
  </div>
)

export const AccountPage = () => (
  <section className="page account">
    <header>
      <p className="page-kicker">ASHER</p>
      <h1 className="page-title">Кабинет</h1>
      <p className="page-lead">
        Встречи, документы и связь с командой заботы — в одном спокойном месте.
      </p>
    </header>
    <ProfileCard />
    <div className="account-grid">
      <div className="account-column">
        <UpcomingMeetings />
        <HistoryList />
      </div>
      <div className="account-column">
        <DocumentsList />
        <AdminChat />
        <TeamsCard />
      </div>
    </div>
  </section>
)
