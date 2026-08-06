import { Icon } from '@/components/ui/Icon'
import { useThemeStore } from '@/stores/themeStore'

interface ThemeToggleButtonProps {
  className: string
}

export const ThemeToggleButton = ({ className }: ThemeToggleButtonProps) => {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const isDark = theme === 'dark'

  return (
    <button
      className={className}
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={18} />
    </button>
  )
}
