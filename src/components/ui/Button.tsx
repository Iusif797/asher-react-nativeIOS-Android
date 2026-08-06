import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

type ButtonVariant = 'primary' | 'deep' | 'soft' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconName
  iconAfter?: IconName
  children?: ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconAfter,
  children,
  className,
  ...rest
}: ButtonProps) => (
  <button
    className={['btn', `btn--${variant}`, `btn--${size}`, className]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {icon && <Icon name={icon} size={size === 'sm' ? 15 : 17} />}
    {children}
    {iconAfter && <Icon name={iconAfter} size={size === 'sm' ? 15 : 17} />}
  </button>
)
