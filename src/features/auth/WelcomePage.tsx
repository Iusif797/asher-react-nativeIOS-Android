import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useAuthStore } from '@/stores/authStore'
import { CrisisOverlay } from '@/features/crisis/CrisisOverlay'
import emblem from '@/assets/emblem.png'
import './auth.css'

type AuthMode = 'signin' | 'signup'

export const WelcomePage = () => {
  const signIn = useAuthStore((s) => s.signIn)
  const signUp = useAuthStore((s) => s.signUp)
  const continueAsGuest = useAuthStore((s) => s.continueAsGuest)
  const pending = useAuthStore((s) => s.pending)
  const error = useAuthStore((s) => s.error)
  const [mode, setMode] = useState<AuthMode>('signin')
  const [crisisOpen, setCrisisOpen] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const canSubmit =
    email.trim().length > 3 &&
    password.length >= 6 &&
    (mode === 'signin' || fullName.trim().length > 1)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!canSubmit || pending) return
    if (mode === 'signin') {
      void signIn(email.trim(), password)
      return
    }
    void signUp(fullName.trim(), email.trim(), password)
  }

  return (
    <div className="welcome">
      <div className="welcome__panel">
        <img
          className="brand-emblem welcome__emblem"
          src={emblem}
          alt="Логотип ASHER"
          width="76"
          height="76"
        />
        <p className="welcome__brand">ASHER</p>
        <h1 className="welcome__title">Пространство вашего психологического благополучия</h1>
        <p className="welcome__lead">
          Консультации, дневники, программы и личная дорожная карта изменений —
          в одном спокойном месте.
        </p>
        <SegmentedControl<AuthMode>
          ariaLabel="Вход или регистрация"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'signin', label: 'Вход' },
            { value: 'signup', label: 'Регистрация' },
          ]}
        />
        <form className="welcome__form" onSubmit={submit}>
          {mode === 'signup' && (
            <label className="welcome__field">
              <span>Как к вам обращаться</span>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Имя"
                autoComplete="name"
              />
            </label>
          )}
          <label className="welcome__field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
            />
          </label>
          <label className="welcome__field">
            <span>Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Минимум 6 символов"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </label>
          {error && <p className="welcome__error">{error}</p>}
          <Button size="lg" disabled={!canSubmit || pending} iconAfter="arrowRight">
            {pending
              ? 'Секунду...'
              : mode === 'signin'
                ? 'Войти'
                : 'Создать аккаунт'}
          </Button>
        </form>
        <button className="welcome__guest" onClick={continueAsGuest}>
          Посмотреть без аккаунта
          <Icon name="chevronRight" size={15} strokeWidth={2} />
        </button>
        <button className="crisis-trigger" onClick={() => setCrisisOpen(true)}>
          <Icon name="bell" size={15} strokeWidth={2} />
          Нужна срочная помощь
        </button>
        <p className="welcome__note">
          Ваши записи видите только вы: доступ защищён на уровне базы данных.
        </p>
      </div>
      {crisisOpen && <CrisisOverlay onClose={() => setCrisisOpen(false)} />}
    </div>
  )
}
