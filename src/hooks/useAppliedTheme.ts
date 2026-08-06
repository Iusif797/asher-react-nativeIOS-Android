import { useEffect } from 'react'
import { useThemeStore, type Theme } from '@/stores/themeStore'

const BROWSER_UI_COLOR: Record<Theme, string> = {
  light: '#fafcfe',
  dark: '#131a24',
}

export const useAppliedTheme = (): void => {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', BROWSER_UI_COLOR[theme])
  }, [theme])
}
