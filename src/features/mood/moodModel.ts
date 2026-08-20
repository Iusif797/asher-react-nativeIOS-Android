export type MoodTone = 'low' | 'mid' | 'high'

export const MOOD_SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

export const MAX_EMOTIONS = 3

export const moodTone = (score: number): MoodTone => {
  if (score <= 0) return 'mid'
  if (score <= 3) return 'low'
  if (score <= 6) return 'mid'
  return 'high'
}

const MOOD_SUMMARY: ReadonlyArray<{ upTo: number; label: string }> = [
  { upTo: 2, label: 'Очень тяжело' },
  { upTo: 4, label: 'Тяжеловато' },
  { upTo: 6, label: 'Ровно' },
  { upTo: 8, label: 'Хорошо' },
  { upTo: 10, label: 'Отлично' },
]

export const moodSummary = (score: number): string =>
  MOOD_SUMMARY.find((step) => score <= step.upTo)?.label ?? 'Ровно'

export const toggleEmotion = (selected: string[], emotion: string): string[] => {
  if (selected.includes(emotion)) return selected.filter((item) => item !== emotion)
  if (selected.length >= MAX_EMOTIONS) return selected
  return [...selected, emotion]
}
