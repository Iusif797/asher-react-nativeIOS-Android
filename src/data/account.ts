import type { ChatMessage, Consultation } from '@/lib/types'
import { addDays, atTime } from '@/lib/dates'

export const USER_NAME = 'Юсиф'

export const SEED_CONSULTATIONS: Consultation[] = [
  {
    id: 'cons-4',
    specialistId: 'sp-lyudmila',
    dateISO: atTime(addDays(new Date(), 2), 17).toISOString(),
    format: 'online',
    status: 'upcoming',
    price: 4500,
    paid: true,
    topic: 'Работа с тревогой, сессия 4',
  },
  {
    id: 'cons-3',
    specialistId: 'sp-lyudmila',
    dateISO: atTime(addDays(new Date(), -5), 17).toISOString(),
    format: 'online',
    status: 'done',
    price: 4500,
    paid: true,
    topic: 'Работа с тревогой, сессия 3',
  },
  {
    id: 'cons-2',
    specialistId: 'sp-lyudmila',
    dateISO: atTime(addDays(new Date(), -12), 17).toISOString(),
    format: 'inperson',
    status: 'done',
    price: 4500,
    paid: true,
    topic: 'Работа с тревогой, сессия 2',
  },
  {
    id: 'cons-1',
    specialistId: 'sp-lyudmila',
    dateISO: atTime(addDays(new Date(), -19), 15).toISOString(),
    format: 'inperson',
    status: 'done',
    price: 4500,
    paid: true,
    topic: 'Первичная консультация',
  },
]

export const DOCUMENTS = [
  { id: 'doc-contract', title: 'Договор оказания услуг', date: '12.07.2026', size: '218 КБ' },
  { id: 'doc-consent', title: 'Согласие на обработку данных', date: '12.07.2026', size: '84 КБ' },
  { id: 'doc-receipt-3', title: 'Чек — консультация от 30.07', date: '30.07.2026', size: '46 КБ' },
  { id: 'doc-receipt-2', title: 'Чек — консультация от 23.07', date: '23.07.2026', size: '46 КБ' },
]

export const ADMIN_CHAT_SEED: ChatMessage[] = [
  {
    id: 'adm-1',
    author: 'admin',
    text: 'Здравствуйте, Юсиф! Напоминаем о консультации с Людмилой Казаковой. Ссылка на видеовстречу придёт за 15 минут до начала.',
    atISO: atTime(addDays(new Date(), -1), 12, 40).toISOString(),
  },
  {
    id: 'adm-2',
    author: 'user',
    text: 'Спасибо! Подскажите, можно ли перенести следующую сессию на час позже?',
    atISO: atTime(addDays(new Date(), -1), 13, 5).toISOString(),
  },
  {
    id: 'adm-3',
    author: 'admin',
    text: 'Конечно, у Людмилы свободно 18:00 в тот же день. Перенесла вашу запись, подтверждение уже в разделе «Кабинет».',
    atISO: atTime(addDays(new Date(), -1), 13, 12).toISOString(),
  },
]

export const B2B_STATS = {
  company: 'SoftIT Enterprise',
  employeesCovered: 48,
  participationRate: 71,
  sessionsThisMonth: 36,
  modulesCompleted: 118,
  topRequests: ['Стресс и нагрузка', 'Баланс работы и жизни', 'Командные коммуникации'],
}
