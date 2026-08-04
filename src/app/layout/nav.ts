import type { IconName } from '@/components/ui/Icon'

export interface NavItem {
  to: string
  label: string
  icon: IconName
}

export const CLIENT_NAV: NavItem[] = [
  { to: '/', label: 'Сегодня', icon: 'sun' },
  { to: '/roadmap', label: 'Мой маршрут', icon: 'route' },
  { to: '/booking', label: 'Запись', icon: 'calendar' },
  { to: '/matching', label: 'Подбор психолога', icon: 'heart' },
  { to: '/diary', label: 'Дневники', icon: 'journal' },
  { to: '/homework', label: 'Задания', icon: 'tasks' },
  { to: '/library', label: 'Библиотека', icon: 'library' },
  { to: '/programs', label: 'Программы', icon: 'graduation' },
  { to: '/assistant', label: 'Помощник', icon: 'sparkle' },
  { to: '/account', label: 'Кабинет', icon: 'user' },
]

export const CLIENT_NAV_MOBILE: NavItem[] = [
  { to: '/', label: 'Сегодня', icon: 'sun' },
  { to: '/roadmap', label: 'Маршрут', icon: 'route' },
  { to: '/booking', label: 'Запись', icon: 'calendar' },
  { to: '/diary', label: 'Дневники', icon: 'journal' },
  { to: '/account', label: 'Кабинет', icon: 'user' },
]

export const THERAPIST_NAV: NavItem[] = [
  { to: '/therapist', label: 'Кабинет специалиста', icon: 'briefcase' },
  { to: '/b2b', label: 'Корпоративная программа', icon: 'users' },
]
