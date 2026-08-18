import { Icon } from '@/components/ui/Icon'
import { CrisisHelp } from './CrisisHelp'

interface CrisisOverlayProps {
  onClose: () => void
}

export const CrisisOverlay = ({ onClose }: CrisisOverlayProps) => (
  <div className="crisis-overlay" role="dialog" aria-label="Срочная помощь">
    <div className="crisis-overlay__inner">
      <header className="crisis-overlay__head">
        <h1 className="page-title">Срочная помощь</h1>
        <button className="crisis-overlay__close" onClick={onClose} aria-label="Закрыть">
          <Icon name="close" size={18} strokeWidth={2} />
        </button>
      </header>
      <CrisisHelp />
    </div>
  </div>
)
