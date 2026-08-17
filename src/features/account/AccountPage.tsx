import { Link } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { GUEST_NAME } from '@/data/account'
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
  const isSignedIn = status === 'signedIn'
  const displayName = fullName ?? GUEST_NAME
  return (
    <div className="account-profile card">
      <Avatar name={displayName} hue={200} size={56} />
      <div className="account-profile__info">
        <div className="account-profile__heading">
          <h2 className="account-profile__name">{displayName}</h2>
          {subscriptionActive && (
            <Tag tone="premium" icon="sparkle">
              ASHER+
            </Tag>
          )}
        </div>
        <p className="account-profile__note">
          {isSignedIn ? 'Аккаунт ASHER' : 'Гостевой режим — записи хранятся только на этом устройстве'}
        </p>
      </div>
      <div className="account-profile__action">
        <Button
          variant="outline"
          size="sm"
          icon={isSignedIn ? 'arrowLeft' : undefined}
          iconAfter={isSignedIn ? undefined : 'arrowRight'}
          onClick={() => void signOut()}
        >
          {isSignedIn ? 'Выйти' : 'Войти в аккаунт'}
        </Button>
      </div>
    </div>
  )
}

const DangerZone = () => {
  const status = useAuthStore((s) => s.status)
  const deleteAccount = useAuthStore((s) => s.deleteAccount)
  if (status !== 'signedIn') return null
  const confirmDeletion = async () => {
    const approved = window.confirm(
      'Удалить аккаунт навсегда? Записи, дневники и прогресс будут стёрты без возможности восстановления.',
    )
    if (!approved) return
    await deleteAccount()
  }
  return (
    <div className="account-danger">
      <button className="account-danger__link" onClick={() => void confirmDeletion()}>
        Удалить аккаунт и все данные
      </button>
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
    <DangerZone />
  </section>
)
