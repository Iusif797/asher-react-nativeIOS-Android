import type { ClientCard } from '@/lib/types'
import { addDays, atTime } from '@/lib/dates'

export const THERAPIST_NAME = 'Лейла Мамедова'

export const CLIENT_CARDS: ClientCard[] = [
  {
    id: 'cl-yusif',
    name: 'Юсиф М.',
    request: 'Тревога и внутреннее напряжение',
    sessionsCount: 3,
    lastVisit: '5 дней назад',
    note: 'Хорошая динамика по дневнику настроения. На сессии 4 — когнитивные техники, проверка мыслей фактами. Обсудить запись из дневника про презентацию.',
    homeworkDone: 2,
    homeworkTotal: 4,
    moodTrend: 'up',
  },
  {
    id: 'cl-kamran',
    name: 'Кямран А.',
    request: 'Выгорание, потеря мотивации',
    sessionsCount: 7,
    lastVisit: '2 дня назад',
    note: 'Вернулся к спорту, сон стабилизировался. Риск: снова берёт переработки. Держать фокус на границах рабочего времени.',
    homeworkDone: 5,
    homeworkTotal: 6,
    moodTrend: 'up',
  },
  {
    id: 'cl-sevda',
    name: 'Севда Г.',
    request: 'Отношения, страх близости',
    sessionsCount: 12,
    lastVisit: 'неделю назад',
    note: 'Плато последние 3 сессии. Предложить пересмотреть цели работы, возможно — парная консультация с Дмитрием.',
    homeworkDone: 3,
    homeworkTotal: 5,
    moodTrend: 'flat',
  },
  {
    id: 'cl-orhan',
    name: 'Орхан Б.',
    request: 'Паническе атаки',
    sessionsCount: 2,
    lastVisit: 'вчера',
    note: 'Начало работы. Психообразование по циклу паники дано. Наблюдать частоту эпизодов, дневник — ежедневно.',
    homeworkDone: 1,
    homeworkTotal: 2,
    moodTrend: 'down',
  },
]

export const THERAPIST_SCHEDULE = [
  { id: 'ts-1', client: 'Орхан Б.', dateISO: atTime(new Date(), 15).toISOString(), format: 'online' as const },
  { id: 'ts-2', client: 'Кямран А.', dateISO: atTime(new Date(), 17).toISOString(), format: 'inperson' as const },
  { id: 'ts-3', client: 'Юсиф М.', dateISO: atTime(addDays(new Date(), 2), 17).toISOString(), format: 'online' as const },
  { id: 'ts-4', client: 'Севда Г.', dateISO: atTime(addDays(new Date(), 3), 12).toISOString(), format: 'inperson' as const },
]

export const HOMEWORK_TEMPLATES = [
  { id: 'tpl-breath', title: 'Дыхание 4-7-8', kind: 'Техника' },
  { id: 'tpl-triggers', title: 'Карта триггеров', kind: 'Упражнение' },
  { id: 'tpl-facts', title: 'Проверка мыслей фактами', kind: 'Упражнение' },
  { id: 'tpl-values', title: 'Колесо ценностей', kind: 'Рефлексия' },
  { id: 'tpl-sleep', title: 'Протокол гигиены сна', kind: 'Материал' },
]
