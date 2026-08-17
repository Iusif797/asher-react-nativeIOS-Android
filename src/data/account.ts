import type { ChatMessage } from '@/lib/types'
import { atTime } from '@/lib/dates'

export const GUEST_NAME = 'Гость'

export const ADMIN_CHAT_SEED: ChatMessage[] = [
  {
    id: 'adm-welcome',
    author: 'admin',
    text: 'Здравствуйте! Это чат с администратором ASHER. Поможем с записью, оплатой и любыми вопросами о консультациях — просто напишите.',
    atISO: atTime(new Date(), 9).toISOString(),
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
