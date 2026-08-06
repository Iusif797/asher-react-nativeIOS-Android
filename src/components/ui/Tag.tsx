import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

type TagTone = 'neutral' | 'accent' | 'deep' | 'premium' | 'danger'

interface TagProps {
  tone?: TagTone
  icon?: IconName
  children: ReactNode
}

export const Tag = ({ tone = 'neutral', icon, children }: TagProps) => (
  <span className={`tag tag--${tone}`}>
    {icon && <Icon name={icon} size={13} strokeWidth={2} />}
    {children}
  </span>
)
