import { Link } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { USER_NAME } from '@/data/account'
import { useAppStore } from '@/stores/appStore'
import { useAuthStore } from '@/stores/authStore'
import { AdminChat } from './AdminChat'
import { DocumentsList } from './DocumentsList'
import { HistoryList } from './HistoryList'
import { UpcomingMeetings } from './UpcomingMeetings'
import './account.css'

const ProfileCard = () => {
  const subscriptionActive = useAppStore((state) => state.subscriptionActive)
  const status = useAuthStore((s) => s.status)
  const fullName = useAuthStore((s) => s.fullName)
  const signOut = useAuthStore((s) => s.signOut)
  const displayName = fullName ?? USER_NAME
  return (
    <div className="account-profile card">
      <Avatar name={displayName} hue={200} size={64} />
      <div className="account-profile__info">
        <h2 className="account-profile__name">{displayName}</h2>
        <p className="account-profile__note">
          {status === 'signedIn' ? 'Аккаунт ASHER' : 'Гостевой режим — записи хранятся только на этом устройстве'}
        </p>
      </div>
      {subscriptionActive && (
        <Tag tone="premium" icon="sparkle">
          ASHER+
        </Tag>
      )}
      <Button variant="ghost" size="sm" icon="arrowLeft" onClick={() => void signOut()}>
        {status === 'signedIn' ? 'Выйти' : 'Войти в аккаунт'}
      </Button>
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
