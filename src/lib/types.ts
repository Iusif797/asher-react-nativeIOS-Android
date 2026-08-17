export type DirectionId =
  | 'anxiety'
  | 'relationships'
  | 'selfesteem'
  | 'burnout'
  | 'family'
  | 'addictions'
  | 'crisis'
  | 'growth'
  | 'career'

export type SessionFormat = 'online' | 'inperson'

export interface Direction {
  id: DirectionId
  title: string
  short: string
  quote: string
  symptoms: string[]
  about: string
  outcomes: string[]
}

export interface Specialist {
  id: string
  name: string
  role: string
  experienceYears?: number
  price: number
  formats: SessionFormat[]
  directions: DirectionId[]
  languages: string[]
  about: string
  hue: number
}

export type ConsultationStatus = 'upcoming' | 'done'

export interface Consultation {
  id: string
  specialistId: string
  dateISO: string
  format: SessionFormat
  status: ConsultationStatus
  price: number
  paid: boolean
  topic: string
}

export type HomeworkKind = 'exercise' | 'reflection' | 'technique' | 'material'

export interface HomeworkTask {
  id: string
  title: string
  kind: HomeworkKind
  description: string
  assignedBy: string
  done: boolean
}

export type LibraryKind = 'text' | 'video' | 'audio' | 'practice'

export interface LibraryItem {
  id: string
  situation: string
  title: string
  kind: LibraryKind
  minutes: number
  directionId: DirectionId
  excerpt: string
}

export interface ProgramDay {
  day: number
  title: string
  theory: string
  exercise: string
}

export interface Program {
  id: string
  title: string
  subtitle: string
  durationDays: number
  days: ProgramDay[]
}

export interface GroupEvent {
  id: string
  title: string
  leader: string
  dateISO: string
  seatsLeft: number
  format: SessionFormat
}

export interface Course {
  id: string
  title: string
  lessons: number
  hours: number
  owned: boolean
  progress: number
}

export type RoadmapStatus = 'done' | 'active' | 'locked'

export interface RoadmapStage {
  id: string
  title: string
  description: string
  status: RoadmapStatus
  items: { label: string; done: boolean }[]
}

export interface MoodEntry {
  date: string
  score: number
  emotions: string[]
  note?: string
}

export interface ThoughtEntry {
  id: string
  createdAtISO: string
  situation: string
  thought: string
  discussed: boolean
}

export interface ChatMessage {
  id: string
  author: 'user' | 'assistant' | 'admin'
  text: string
  atISO: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: { value: string; label: string }[]
}

export interface ClientCard {
  id: string
  name: string
  request: string
  sessionsCount: number
  lastVisit: string
  note: string
  homeworkDone: number
  homeworkTotal: number
  moodTrend: 'up' | 'flat' | 'down'
}
