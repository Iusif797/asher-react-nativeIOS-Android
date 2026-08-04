import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

interface EmptyStateProps {
  icon: IconName
  title: string
  text: string
  action?: ReactNode
}

export const EmptyState = ({ icon, title, text, action }: EmptyStateProps) => (
  <div className="empty card">
    <div className="empty__icon">
      <Icon name={icon} size={26} strokeWidth={1.5} />
    </div>
    <h4>{title}</h4>
    <p>{text}</p>
    {action}
  </div>
)
