import { useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Icon } from './Icon'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  wide?: boolean
}

export const Modal = ({ open, title, onClose, children, wide }: ModalProps) => {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            className="modal__backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.22 }}
          />
          <motion.div
            className={wide ? 'modal__panel modal__panel--wide' : 'modal__panel'}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32, transition: { duration: 0.16, ease: 'easeIn' } }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          >
            <header className="modal__head">
              <h4>{title}</h4>
              <button className="modal__close" onClick={onClose} aria-label="Закрыть">
                <Icon name="close" size={18} />
              </button>
            </header>
            <div className="modal__body">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
