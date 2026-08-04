import type { Specialist } from '@/lib/types'
import { addDays, atTime } from '@/lib/dates'

export const SPECIALISTS: Specialist[] = [
  {
    id: 'sp-leyla',
    name: 'Лейла Мамедова',
    role: 'Клинический психолог, КПТ-терапевт',
    experienceYears: 12,
    price: 80,
    formats: ['online', 'inperson'],
    directions: ['anxiety', 'burnout', 'selfesteem'],
    languages: ['Русский', 'Азербайджанский'],
    rating: 4.9,
    reviewsCount: 127,
    about:
      'Работаю с тревожными состояниями и выгоранием в когнитивно-поведенческом подходе. Помогаю вернуть ощущение контроля через понятные, проверенные техники.',
    hue: 165,
  },
  {
    id: 'sp-dmitry',
    name: 'Дмитрий Волков',
    role: 'Семейный психолог',
    experienceYears: 15,
    price: 90,
    formats: ['online', 'inperson'],
    directions: ['family', 'relationships'],
    languages: ['Русский'],
    rating: 4.8,
    reviewsCount: 98,
    about:
      'Пятнадцать лет работаю с парами и семьями. Верю, что почти любой конфликт — это непрожитый разговор, которому нужно помочь состояться.',
    hue: 45,
  },
  {
    id: 'sp-aysel',
    name: 'Айсель Гусейнова',
    role: 'Психолог-консультант',
    experienceYears: 8,
    price: 60,
    formats: ['online'],
    directions: ['selfesteem', 'growth', 'relationships'],
    languages: ['Русский', 'Азербайджанский', 'Английский'],
    rating: 4.9,
    reviewsCount: 84,
    about:
      'Сопровождаю людей в периоды перемен: новые роли, решения, поиск себя. Бережно и структурно, с опорой на ваши ценности.',
    hue: 300,
  },
  {
    id: 'sp-rustam',
    name: 'Рустам Алиев',
    role: 'Психолог, специалист по зависимостям',
    experienceYears: 17,
    price: 85,
    formats: ['online', 'inperson'],
    directions: ['addictions', 'family'],
    languages: ['Русский', 'Азербайджанский'],
    rating: 4.7,
    reviewsCount: 65,
    about:
      'Работаю с химическими и поведенческими зависимостями, а также с родственниками. Без осуждения, с причинами, а не только последствиями.',
    hue: 210,
  },
  {
    id: 'sp-anna',
    name: 'Анна Керимова',
    role: 'Кризисный психолог, травматерапевт',
    experienceYears: 11,
    price: 85,
    formats: ['online', 'inperson'],
    directions: ['crisis', 'anxiety'],
    languages: ['Русский', 'Английский'],
    rating: 5.0,
    reviewsCount: 73,
    about:
      'Помогаю проживать утраты и последствия тяжёлых событий. Работаю в подходах EMDR и соматической терапии — бережно и в вашем темпе.',
    hue: 15,
  },
  {
    id: 'sp-elvin',
    name: 'Эльвин Багиров',
    role: 'Бизнес-психолог, executive-коуч',
    experienceYears: 14,
    price: 120,
    formats: ['online'],
    directions: ['career', 'burnout', 'growth'],
    languages: ['Русский', 'Азербайджанский', 'Английский'],
    rating: 4.8,
    reviewsCount: 56,
    about:
      'Сопровождаю руководителей и предпринимателей: нагрузка, решения, выгорание на фоне успеха. Конфиденциально и по делу.',
    hue: 260,
  },
  {
    id: 'sp-nigar',
    name: 'Нигяр Сафарова',
    role: 'Детский и подростковый психолог',
    experienceYears: 9,
    price: 70,
    formats: ['online', 'inperson'],
    directions: ['family', 'selfesteem'],
    languages: ['Русский', 'Азербайджанский'],
    rating: 4.9,
    reviewsCount: 91,
    about:
      'Работаю с подростками и родителями. Помогаю вернуть контакт в семье, когда кажется, что вы говорите на разных языках.',
    hue: 120,
  },
  {
    id: 'sp-marat',
    name: 'Марат Исмаилов',
    role: 'Психотерапевт, гештальт-подход',
    experienceYears: 10,
    price: 75,
    formats: ['online'],
    directions: ['relationships', 'burnout', 'growth'],
    languages: ['Русский'],
    rating: 4.7,
    reviewsCount: 62,
    about:
      'Помогаю замечать, как вы строите отношения с людьми и с собой, и находить в них больше свободы и живости.',
    hue: 85,
  },
]

const SLOT_HOURS = [10, 12, 15, 17, 19]

export const slotsFor = (specialist: Specialist): string[] => {
  const seed = specialist.id.length + specialist.experienceYears
  return [1, 2, 3, 4, 6].flatMap((offset, dayIdx) => {
    const day = addDays(new Date(), offset)
    return SLOT_HOURS.filter((_, hourIdx) => (seed + offset + hourIdx * 3 + dayIdx) % 3 !== 0)
      .slice(0, 3)
      .map((hour) => atTime(day, hour).toISOString())
  })
}

export const specialistById = (id: string): Specialist | undefined =>
  SPECIALISTS.find((s) => s.id === id)
