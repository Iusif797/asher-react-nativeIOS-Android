import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
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
          {({ isActive }) => (
            <>
              <span className="tabbar__icon">
                {isActive && (
                  <motion.span
                    className="tabbar__pill"
                    layoutId="tabbar-pill"
                    transition={{ type: 'spring', stiffness: 430, damping: 33 }}
                  />
                )}
                <Icon name={item.icon} size={21} />
              </span>
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
