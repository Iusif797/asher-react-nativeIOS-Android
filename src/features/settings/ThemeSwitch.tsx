import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useThemeStore, type Theme } from '@/stores/themeStore'

export const ThemeSwitch = () => {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  return (
    <SegmentedControl<Theme>
      ariaLabel="Оформление"
      value={theme}
      onChange={setTheme}
      options={[
        { value: 'light', label: 'Светлая' },
        { value: 'dark', label: 'Тёмная' },
      ]}
    />
  )
}
