import type { HomeworkTask, MoodEntry, ThoughtEntry } from '@/lib/types'
import { addDays, atTime, toDateKey } from '@/lib/dates'

export const EMOTIONS = [
  'Спокойствие',
  'Радость',
  'Благодарность',
  'Интерес',
  'Усталость',
  'Тревога',
  'Грусть',
  'Раздражение',
  'Одиночество',
  'Надежда',
] as const

export const SEED_HOMEWORK: HomeworkTask[] = [
  {
    id: 'hw-breath',
    title: 'Дыхание 4-7-8 утром и вечером',
    kind: 'technique',
    description:
      'Три цикла: вдох на 4 счёта, задержка на 7, выдох на 8. Лучше сидя, с закрытыми глазами. Отметьте, как меняется состояние.',
    assignedBy: 'Людмила Казакова',
    done: true,
  },
  {
    id: 'hw-triggers',
    title: 'Карта триггеров тревоги',
    kind: 'exercise',
    description:
      'В течение недели записывайте ситуации, в которых тревога усиливалась: что происходило, о чём подумали, что почувствовали в теле.',
    assignedBy: 'Людмила Казакова',
    done: true,
  },
  {
    id: 'hw-reflect',
    title: 'Вопрос для размышления',
    kind: 'reflection',
    description:
      'Что для вас значит «жить спокойно»? Опишите один обычный день такой жизни — от утра до вечера. Обсудим на следующей сессии.',
    assignedBy: 'Людмила Казакова',
    done: false,
  },
  {
    id: 'hw-material',
    title: 'Материал: «Тревога — сигнализация, которая заела»',
    kind: 'material',
    description:
      'Прочитайте статью в библиотеке (раздел «Постоянно тревожусь») и отметьте два тезиса, которые отозвались сильнее всего.',
    assignedBy: 'Людмила Казакова',
    done: false,
  },
]

const MOOD_PATTERN = [4, 5, 4, 6, 5, 7, 6, 5, 7, 8, 6, 7, 8, 7]

const MOOD_EMOTIONS: string[][] = [
  ['Тревога', 'Усталость'],
  ['Тревога', 'Надежда'],
  ['Усталость', 'Раздражение'],
  ['Спокойствие', 'Интерес'],
  ['Тревога', 'Грусть'],
  ['Радость', 'Спокойствие'],
  ['Интерес', 'Усталость'],
  ['Тревога', 'Одиночество'],
  ['Спокойствие', 'Надежда'],
  ['Радость', 'Благодарность'],
  ['Усталость', 'Тревога'],
  ['Спокойствие', 'Интерес'],
  ['Радость', 'Спокойствие'],
  ['Спокойствие', 'Благодарность'],
]

export const seedMoodEntries = (): MoodEntry[] =>
  MOOD_PATTERN.map((score, index) => ({
    date: toDateKey(addDays(new Date(), index - MOOD_PATTERN.length)),
    score,
    emotions: MOOD_EMOTIONS[index],
  }))

export const SEED_THOUGHTS: ThoughtEntry[] = [
  {
    id: 'th-1',
    createdAtISO: atTime(addDays(new Date(), -3), 22, 40).toISOString(),
    situation: 'Завтра презентация проекта заказчику',
    thought: 'Кажется, всё пойдёт плохо. Я забуду слова, и все поймут, что я некомпетентен.',
    discussed: true,
  },
  {
    id: 'th-2',
    createdAtISO: atTime(addDays(new Date(), -1), 23, 15).toISOString(),
    situation: 'Коллега не ответил на сообщение весь день',
    thought: 'Наверное, я его чем-то обидел. Всегда всё порчу в отношениях с людьми.',
    discussed: false,
  },
]
