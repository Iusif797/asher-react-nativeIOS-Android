import { NavLink, useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useAppStore, type AppMode } from '@/stores/appStore'
import { ThemeSwitch } from '@/features/settings/ThemeSwitch'
import { CLIENT_NAV, THERAPIST_NAV } from './nav'
import emblem from '@/assets/emblem.png'

export const Sidebar = () => {
  const mode = useAppStore((s) => s.mode)
  const setMode = useAppStore((s) => s.setMode)
  const subscriptionActive = useAppStore((s) => s.subscriptionActive)
  const navigate = useNavigate()
  const nav = mode === 'client' ? CLIENT_NAV : THERAPIST_NAV

  const switchMode = (next: AppMode) => {
    setMode(next)
    navigate(next === 'client' ? '/' : '/therapist')
  }

  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar__brand">
        <img className="brand-emblem brand-emblem--lg" src={emblem} alt="Логотип ASHER" width="44" height="44" />
        <span className="sidebar__brand-text">
          <span className="sidebar__logo">ASHER</span>
          <span className="sidebar__tagline">психологическое благополучие</span>
        </span>
      </NavLink>
      <nav className="sidebar__nav" aria-label="Основная навигация">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
            }
          >
            <Icon name={item.icon} size={19} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar__foot">
        {mode === 'client' && (
          <NavLink to="/programs" className="sidebar__sub">
            <Icon name={subscriptionActive ? 'shield' : 'star'} size={15} />
            {subscriptionActive ? 'Подписка активна' : 'Подключить подписку'}
          </NavLink>
        )}
        <SegmentedControl<AppMode>
          ariaLabel="Режим приложения"
          value={mode}
          onChange={switchMode}
          options={[
            { value: 'client', label: 'Клиент' },
            { value: 'therapist', label: 'Психолог' },
          ]}
        />
        <ThemeSwitch />
      </div>
    </aside>
  )
}
