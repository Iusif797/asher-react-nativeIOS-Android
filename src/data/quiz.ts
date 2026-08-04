import type { DirectionId, QuizQuestion, SessionFormat } from '@/lib/types'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-topic',
    question: 'Что беспокоит больше всего?',
    options: [
      { value: 'anxiety', label: 'Тревога, стресс, напряжение' },
      { value: 'relationships', label: 'Отношения с партнёром' },
      { value: 'burnout', label: 'Усталость, апатия, выгорание' },
      { value: 'family', label: 'Семья и дети' },
      { value: 'selfesteem', label: 'Неуверенность в себе' },
      { value: 'addictions', label: 'Зависимость — своя или близкого' },
      { value: 'crisis', label: 'Тяжёлое событие или утрата' },
      { value: 'career', label: 'Работа, бизнес, карьера' },
      { value: 'growth', label: 'Хочу разобраться в себе' },
    ],
  },
  {
    id: 'q-duration',
    question: 'Как давно это продолжается?',
    options: [
      { value: 'recent', label: 'Меньше месяца' },
      { value: 'months', label: 'Несколько месяцев' },
      { value: 'year', label: 'Около года' },
      { value: 'years', label: 'Несколько лет' },
    ],
  },
  {
    id: 'q-impact',
    question: 'Насколько это влияет на повседневную жизнь?',
    options: [
      { value: 'light', label: 'Скорее фоном, жить не мешает' },
      { value: 'medium', label: 'Заметно мешает в отдельных сферах' },
      { value: 'strong', label: 'Сильно влияет почти на всё' },
    ],
  },
  {
    id: 'q-gender',
    question: 'С кем вам будет комфортнее работать?',
    options: [
      { value: 'female', label: 'С женщиной' },
      { value: 'male', label: 'С мужчиной' },
      { value: 'any', label: 'Не имеет значения' },
    ],
  },
  {
    id: 'q-format',
    question: 'Какой формат встреч удобнее?',
    options: [
      { value: 'online', label: 'Онлайн' },
      { value: 'inperson', label: 'Очно в центре' },
      { value: 'any', label: 'Любой' },
    ],
  },
  {
    id: 'q-experience',
    question: 'Есть ли у вас опыт терапии?',
    options: [
      { value: 'none', label: 'Нет, это первый раз' },
      { value: 'some', label: 'Было несколько встреч' },
      { value: 'regular', label: 'Да, работал(а) с психологом' },
    ],
  },
  {
    id: 'q-language',
    question: 'На каком языке удобнее общаться?',
    options: [
      { value: 'Русский', label: 'Русский' },
      { value: 'Азербайджанский', label: 'Азербайджанский' },
      { value: 'Английский', label: 'Английский' },
    ],
  },
  {
    id: 'q-budget',
    question: 'Какой бюджет на одну сессию комфортен?',
    options: [
      { value: '70', label: 'До 70 ₼' },
      { value: '90', label: 'До 90 ₼' },
      { value: '999', label: 'Бюджет не главное' },
    ],
  },
  {
    id: 'q-pace',
    question: 'Какой стиль работы вам ближе?',
    options: [
      { value: 'structured', label: 'Структурный: техники, задания, план' },
      { value: 'gentle', label: 'Мягкий: разговор в своём темпе' },
      { value: 'any', label: 'Доверюсь специалисту' },
    ],
  },
  {
    id: 'q-urgency',
    question: 'Когда хотели бы начать?',
    options: [
      { value: 'asap', label: 'Как можно скорее' },
      { value: 'week', label: 'На этой неделе' },
      { value: 'later', label: 'Пока просто выбираю' },
    ],
  },
]

export interface QuizAnswers {
  [questionId: string]: string
}

const FEMALE_IDS = ['sp-leyla', 'sp-aysel', 'sp-anna', 'sp-nigar']

export interface MatchScore {
  specialistId: string
  score: number
  reasons: string[]
}

export const scoreSpecialists = (
  answers: QuizAnswers,
  specialists: {
    id: string
    directions: DirectionId[]
    formats: SessionFormat[]
    languages: string[]
    price: number
    experienceYears: number
  }[],
): MatchScore[] =>
  specialists
    .map((sp) => {
      const reasons: string[] = []
      let score = 0
      const topic = answers['q-topic'] as DirectionId | undefined
      if (topic && sp.directions.includes(topic)) {
        score += 50
        reasons.push('Специализируется на вашем запросе')
      }
      const format = answers['q-format']
      if (format && format !== 'any' && sp.formats.includes(format as SessionFormat)) {
        score += 15
        reasons.push(format === 'online' ? 'Работает онлайн' : 'Принимает очно в центре')
      }
      const gender = answers['q-gender']
      if (gender === 'female' && FEMALE_IDS.includes(sp.id)) {
        score += 12
        reasons.push('Психолог-женщина, как вы хотели')
      }
      if (gender === 'male' && !FEMALE_IDS.includes(sp.id)) {
        score += 12
        reasons.push('Психолог-мужчина, как вы хотели')
      }
      const language = answers['q-language']
      if (language && sp.languages.includes(language)) {
        score += 10
        reasons.push(`Консультирует на языке: ${language.toLowerCase()}`)
      }
      const budget = Number(answers['q-budget'] ?? 999)
      if (sp.price <= budget) {
        score += 8
        reasons.push('Стоимость в рамках вашего бюджета')
      }
      if (answers['q-experience'] === 'none' && sp.experienceYears >= 10) {
        score += 6
        reasons.push('Большой опыт — бережно введёт в терапию')
      }
      if (answers['q-impact'] === 'strong' && sp.experienceYears >= 12) {
        score += 6
        reasons.push('Опыт работы со сложными состояниями')
      }
      return { specialistId: sp.id, score, reasons }
    })
    .sort((a, b) => b.score - a.score)
