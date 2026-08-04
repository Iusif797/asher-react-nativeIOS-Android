import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileHeader } from './MobileHeader'
import { TabBar } from './TabBar'
import './shell.css'

export const AppShell = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="shell">
      <Sidebar />
      <MobileHeader />
      <main className="shell__content">
        <div className="shell__page page" key={pathname}>
          <Outlet />
        </div>
      </main>
      <TabBar />
    </div>
  )
}
