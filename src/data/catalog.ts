import type { Course, GroupEvent } from '@/lib/types'
import { addDays, atTime } from '@/lib/dates'

export const GROUPS: GroupEvent[] = [
  {
    id: 'grp-anxiety',
    title: 'Группа поддержки «Спокойствие внутри»',
    leader: 'Лейла Мамедова',
    dateISO: atTime(addDays(new Date(), 3), 19).toISOString(),
    seatsLeft: 4,
    format: 'online',
  },
  {
    id: 'grp-parents',
    title: 'Родительский клуб: подростки без войны',
    leader: 'Нигяр Сафарова',
    dateISO: atTime(addDays(new Date(), 5), 18, 30).toISOString(),
    seatsLeft: 7,
    format: 'inperson',
  },
  {
    id: 'grp-burnout',
    title: 'Терапевтическая группа «Возвращение энергии»',
    leader: 'Марат Исмаилов',
    dateISO: atTime(addDays(new Date(), 8), 19).toISOString(),
    seatsLeft: 2,
    format: 'online',
  },
]

export const COURSES: Course[] = [
  {
    id: 'crs-boundaries',
    title: 'Личные границы: говорить «нет» без вины',
    lessons: 8,
    hours: 4,
    owned: true,
    progress: 62,
  },
  {
    id: 'crs-emotions',
    title: 'Азбука эмоций: понимать, что я чувствую',
    lessons: 10,
    hours: 5,
    owned: true,
    progress: 20,
  },
  {
    id: 'crs-couples',
    title: 'Диалог в паре: слышать и быть услышанным',
    lessons: 12,
    hours: 6,
    owned: false,
    progress: 0,
  },
]

export const SUBSCRIPTION_PERKS = [
  'Полная библиотека материалов, видео и аудио-практик',
  'Ежемесячные живые вебинары с психологами центра',
  'Новые упражнения и практики каждую неделю',
  'Закрытые эфиры «вопрос — ответ»',
]

export const SUBSCRIPTION_PRICE = 25
