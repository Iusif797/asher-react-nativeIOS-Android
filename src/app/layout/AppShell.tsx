import { useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Sidebar } from './Sidebar'
import { MobileHeader } from './MobileHeader'
import { TabBar } from './TabBar'
import './shell.css'

export const AppShell = () => {
  const { pathname } = useLocation()
  const outlet = useOutlet()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="shell">
      <Sidebar />
      <MobileHeader />
      <main className="shell__content">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="shell__page"
            key={pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.14, ease: 'easeIn' } }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <TabBar />
    </div>
  )
}
