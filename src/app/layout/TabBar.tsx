import { NavLink } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { useAppStore } from '@/stores/appStore'
import { CLIENT_NAV_MOBILE, THERAPIST_NAV } from './nav'

export const TabBar = () => {
  const mode = useAppStore((s) => s.mode)
  const nav = mode === 'client' ? CLIENT_NAV_MOBILE : THERAPIST_NAV

  return (
    <nav className="tabbar" aria-label="Нижняя навигация">
      {nav.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            isActive ? 'tabbar__item tabbar__item--active' : 'tabbar__item'
          }
        >
          <Icon name={item.icon} size={21} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
