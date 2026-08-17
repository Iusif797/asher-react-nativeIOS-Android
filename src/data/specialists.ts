import type { Specialist } from '@/lib/types'
import { addDays, atTime } from '@/lib/dates'

export const SPECIALISTS: Specialist[] = [
  {
    id: 'sp-lyudmila',
    name: 'Людмила Казакова',
    role: 'Клинический психолог, семейный психолог',
    experienceYears: 18,
    price: 4500,
    formats: ['online', 'inperson'],
    directions: ['anxiety', 'addictions', 'family'],
    languages: ['Русский'],
    about:
      'Помогаю справляться с тревожными состояниями, семейными кризисами и зависимым поведением, опираясь на клинический опыт и научно обоснованные методы. Работаю очно в Москве и онлайн по всему миру.',
    hue: 210,
  },
  {
    id: 'sp-teona',
    name: 'Теона Хаметова',
    role: 'Клинический психолог, регрессолог, системные расстановки',
    price: 4500,
    formats: ['online', 'inperson'],
    directions: ['anxiety', 'relationships', 'selfesteem', 'burnout', 'family'],
    languages: ['Русский'],
    about:
      'Сочетаю клинический подход, современные психологические методы и внимательное отношение к жизненной истории каждого человека. Консультирую взрослых, подростков и семьи — очно в Баку и онлайн.',
    hue: 300,
  },
  {
    id: 'sp-natalya',
    name: 'Наталья Катречко',
    role: 'Клинический психолог, психотерапевтическое консультирование',
    price: 4500,
    formats: ['online', 'inperson'],
    directions: ['anxiety', 'crisis', 'relationships', 'growth'],
    languages: ['Русский'],
    about:
      'Встреча с клиентом — это всегда встреча с чем-то важным для человека. Сочетаю клинический подход, современные психотерапевтические методы и внимание к индивидуальной истории. Работаю очно в Москве и онлайн.',
    hue: 165,
  },
]

const SLOT_HOURS = [10, 12, 15, 17, 19]

export const slotsFor = (specialist: Specialist): string[] => {
  const seed = specialist.id.length + (specialist.experienceYears ?? 7)
  return [1, 2, 3, 4, 6].flatMap((offset, dayIdx) => {
    const day = addDays(new Date(), offset)
    return SLOT_HOURS.filter((_, hourIdx) => (seed + offset + hourIdx * 3 + dayIdx) % 3 !== 0)
      .slice(0, 3)
      .map((hour) => atTime(day, hour).toISOString())
  })
}

export const specialistById = (id: string): Specialist | undefined =>
  SPECIALISTS.find((s) => s.id === id)
