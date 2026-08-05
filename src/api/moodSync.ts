import { supabase } from '@/lib/supabase'
import type { MoodEntry } from '@/lib/types'

interface MoodRow {
  entry_date: string
  score: number
  emotions: string[]
  note: string | null
}

export const pushMoodEntry = async (entry: MoodEntry): Promise<void> => {
  if (!supabase) return
  const { data } = await supabase.auth.getUser()
  const userId = data.user?.id
  if (!userId) return
  await supabase.from('mood_entries').upsert(
    {
      client_id: userId,
      entry_date: entry.date,
      score: entry.score,
      emotions: entry.emotions,
      note: entry.note ?? null,
    },
    { onConflict: 'client_id,entry_date' },
  )
}

export const pullMoodEntries = async (): Promise<MoodEntry[]> => {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('mood_entries')
    .select('entry_date, score, emotions, note')
    .order('entry_date')
  if (error || !data) return []
  return (data as MoodRow[]).map((row) => ({
    date: row.entry_date,
    score: row.score,
    emotions: row.emotions,
    note: row.note ?? undefined,
  }))
}
