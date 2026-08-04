const MONTHS_GEN = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

const WEEKDAYS_SHORT = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export const toDateKey = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export const todayKey = (): string => toDateKey(new Date())

export const addDays = (date: Date, days: number): Date => {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export const atTime = (date: Date, hours: number, minutes = 0): Date => {
  const next = new Date(date)
  next.setHours(hours, minutes, 0, 0)
  return next
}

export const formatDay = (iso: string): string => {
  const d = new Date(iso)
  return `${d.getDate()} ${MONTHS_GEN[d.getMonth()]}`
}

export const formatWeekday = (iso: string): string =>
  WEEKDAYS_SHORT[new Date(iso).getDay()]

export const formatTime = (iso: string): string => {
  const d = new Date(iso)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export const formatDayTime = (iso: string): string =>
  `${formatDay(iso)}, ${formatTime(iso)}`

export const daysBetween = (fromKey: string, toKey: string): number => {
  const from = new Date(`${fromKey}T00:00:00`)
  const to = new Date(`${toKey}T00:00:00`)
  return Math.round((to.getTime() - from.getTime()) / 86400000)
}

export const greetingByHour = (hour: number): string => {
  if (hour < 5) return 'Доброй ночи'
  if (hour < 12) return 'Доброе утро'
  if (hour < 18) return 'Добрый день'
  return 'Добрый вечер'
}
