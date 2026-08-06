import { NavLink, useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { useAppStore } from '@/stores/appStore'
import { ThemeToggleButton } from '@/features/settings/ThemeToggleButton'
import emblem from '@/assets/emblem.png'

export const MobileHeader = () => {
  const mode = useAppStore((s) => s.mode)
  const setMode = useAppStore((s) => s.setMode)
  const navigate = useNavigate()

  const toggleMode = () => {
    const next = mode === 'client' ? 'therapist' : 'client'
    setMode(next)
    navigate(next === 'client' ? '/' : '/therapist')
  }

  return (
    <header className="mobile-header">
      <NavLink to="/" className="mobile-header__logo">
        <img className="brand-emblem" src={emblem} alt="Логотип ASHER" width="34" height="34" />
        ASHER
      </NavLink>
      <div className="mobile-header__actions">
        <ThemeToggleButton className="mobile-header__btn" />
        <NavLink to="/assistant" className="mobile-header__btn" aria-label="Помощник">
          <Icon name="sparkle" size={18} />
        </NavLink>
        <button
          className="mobile-header__btn"
          onClick={toggleMode}
          aria-label="Переключить режим"
        >
          <Icon name={mode === 'client' ? 'briefcase' : 'user'} size={18} />
        </button>
      </div>
    </header>
  )
}
