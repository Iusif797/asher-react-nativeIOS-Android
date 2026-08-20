import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'
import './styles/global.css'
import './components/ui/ui.css'
import { App } from './app/App'

const WEB_SPLASH_MIN_VISIBLE_MS = 900
const NATIVE_SPLASH_SETTLE_MS = 120

const splashElement = () => document.getElementById('splash')

const afterFirstPaint = (run: () => void) => {
  requestAnimationFrame(() => requestAnimationFrame(run))
}

const fadeOutWebSplash = () => {
  const splash = splashElement()
  if (!splash) return
  splash.classList.add('splash--hidden')
  splash.addEventListener('transitionend', () => splash.remove(), { once: true })
}

const handOverFromNativeSplash = () => {
  splashElement()?.remove()
  afterFirstPaint(() => {
    window.setTimeout(() => {
      void SplashScreen.hide({ fadeOutDuration: 320 }).catch(() => undefined)
    }, NATIVE_SPLASH_SETTLE_MS)
  })
}

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
  if (Capacitor.isNativePlatform()) {
    handOverFromNativeSplash()
  } else {
    window.setTimeout(fadeOutWebSplash, WEB_SPLASH_MIN_VISIBLE_MS)
  }
}
