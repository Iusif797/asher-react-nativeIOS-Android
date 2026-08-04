import type { LibraryItem } from '@/lib/types'

export const LIBRARY: LibraryItem[] = [
  {
    id: 'lib-sleep',
    situation: 'Не могу уснуть',
    title: 'Почему мозг не выключается ночью',
    kind: 'text',
    minutes: 6,
    directionId: 'anxiety',
    excerpt:
      'Перед сном психика впервые за день остаётся без задач — и достаёт всё отложенное. Разбираем технику «выгрузки мыслей» и правило 20 минут.',
  },
  {
    id: 'lib-sleep-audio',
    situation: 'Не могу уснуть',
    title: 'Аудио-практика: тело тяжелеет',
    kind: 'audio',
    minutes: 12,
    directionId: 'anxiety',
    excerpt:
      'Двенадцатиминутная практика прогрессивной мышечной релаксации для вечера. Голос ведёт от стоп к макушке.',
  },
  {
    id: 'lib-worry',
    situation: 'Постоянно тревожусь',
    title: 'Тревога: сигнализация, которая заела',
    kind: 'text',
    minutes: 8,
    directionId: 'anxiety',
    excerpt:
      'Тревога — исправная система защиты с неправильной настройкой чувствительности. Что её поддерживает и почему «просто успокойся» не работает.',
  },
  {
    id: 'lib-worry-practice',
    situation: 'Постоянно тревожусь',
    title: 'Практика «5-4-3-2-1» за 3 минуты',
    kind: 'practice',
    minutes: 3,
    directionId: 'anxiety',
    excerpt:
      'Пять предметов, которые видите. Четыре звука. Три ощущения. Быстрое заземление, когда тревога накрывает волной.',
  },
  {
    id: 'lib-teen',
    situation: 'Конфликт с подростком',
    title: 'Подросток хлопает дверью: что за этим стоит',
    kind: 'text',
    minutes: 9,
    directionId: 'family',
    excerpt:
      'Сепарация — не бунт против вас, а работа взросления. Как оставаться взрослым рядом с бурей и не терять контакт.',
  },
  {
    id: 'lib-teen-video',
    situation: 'Конфликт с подростком',
    title: 'Видео: три фразы, которые закрывают диалог',
    kind: 'video',
    minutes: 7,
    directionId: 'family',
    excerpt:
      'Разбор типичных родительских реплик, которые звучат как забота, а слышатся как контроль — и чем их заменить.',
  },
  {
    id: 'lib-burnout',
    situation: 'Выгораю на работе',
    title: 'Выгорание ≠ усталость: как отличить',
    kind: 'text',
    minutes: 7,
    directionId: 'burnout',
    excerpt:
      'Усталость проходит после отдыха. Выгорание — нет. Три стадии истощения и почему отпуск не лечит третью.',
  },
  {
    id: 'lib-burnout-practice',
    situation: 'Выгораю на работе',
    title: 'Аудит энергии: неделя в четырёх колонках',
    kind: 'practice',
    minutes: 15,
    directionId: 'burnout',
    excerpt:
      'Практика для поиска утечек: что наполняет, что опустошает, что делаете из страха, а что — из смысла.',
  },
  {
    id: 'lib-fight',
    situation: 'Ссоримся с партнёром',
    title: 'Анатомия ссоры: 4 всадника Готтмана',
    kind: 'text',
    minutes: 8,
    directionId: 'relationships',
    excerpt:
      'Критика, презрение, оборона, молчание — паттерны, которые предсказывают разрыв. Как заметить их у себя первым.',
  },
  {
    id: 'lib-fight-video',
    situation: 'Ссоримся с партнёром',
    title: 'Видео: пауза 20 минут, которая спасает разговор',
    kind: 'video',
    minutes: 6,
    directionId: 'relationships',
    excerpt:
      'Физиология затопления: почему в ссоре вы «не слышите» друг друга буквально, и как правильно брать тайм-аут.',
  },
  {
    id: 'lib-noself',
    situation: 'Не верю в себя',
    title: 'Внутренний критик: голос, который врёт',
    kind: 'text',
    minutes: 7,
    directionId: 'selfesteem',
    excerpt:
      'Откуда берётся ощущение «я недостаточно хорош» и почему критик всегда говорит одними и теми же словами.',
  },
  {
    id: 'lib-noself-practice',
    situation: 'Не верю в себя',
    title: 'Дневник фактов: 10 минут против обесценивания',
    kind: 'practice',
    minutes: 10,
    directionId: 'selfesteem',
    excerpt:
      'Простая вечерняя практика: три факта дня, которые критик хотел бы стереть. Через месяц — другой взгляд на себя.',
  },
  {
    id: 'lib-loss',
    situation: 'Переживаю утрату',
    title: 'Горе не по этапам: как это бывает на самом деле',
    kind: 'text',
    minutes: 10,
    directionId: 'crisis',
    excerpt:
      'Мифы о «пяти стадиях», волны горевания и почему «держаться» — худший совет. Что действительно помогает проживать.',
  },
  {
    id: 'lib-phone',
    situation: 'Залипаю в телефоне',
    title: 'Дофаминовая петля: почему рука сама тянется',
    kind: 'text',
    minutes: 6,
    directionId: 'addictions',
    excerpt:
      'Лента устроена как игровой автомат. Как работает переменное подкрепление и с чего начать возвращать себе время.',
  },
  {
    id: 'lib-decision',
    situation: 'Не могу принять решение',
    title: 'Практика: решение через ценности, а не страхи',
    kind: 'practice',
    minutes: 12,
    directionId: 'growth',
    excerpt:
      'Матрица из четырёх вопросов, которая отделяет «чего я боюсь» от «что мне важно». Для больших развилок.',
  },
  {
    id: 'lib-boss',
    situation: 'Устал руководить',
    title: 'Одиночество руководителя',
    kind: 'text',
    minutes: 8,
    directionId: 'career',
    excerpt:
      'Чем выше позиция, тем меньше людей, с кем можно быть неуверенным. Почему это истощает и где брать опору.',
  },
]

export const librarySituations = (): string[] => [
  ...new Set(LIBRARY.map((item) => item.situation)),
]
