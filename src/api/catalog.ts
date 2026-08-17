import { supabase } from '@/lib/supabase'
import type { DirectionId, SessionFormat, Specialist } from '@/lib/types'
import { SPECIALISTS } from '@/data/specialists'

interface SpecialistRow {
  id: string
  display_name: string
  role_title: string
  experience_years: number
  price: number
  formats: SessionFormat[]
  direction_ids: DirectionId[]
  languages: string[]
  about: string
}

const UUID_TO_LOCAL_ID: Record<string, string> = {
  '33333333-0000-4000-8000-000000000001': 'sp-lyudmila',
  '33333333-0000-4000-8000-000000000002': 'sp-teona',
  '33333333-0000-4000-8000-000000000003': 'sp-natalya',
}

const hueFrom = (id: string): number =>
  [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360

const toSpecialist = (row: SpecialistRow): Specialist => {
  const localId = UUID_TO_LOCAL_ID[row.id] ?? row.id
  const local = SPECIALISTS.find((s) => s.id === localId)
  return {
    id: localId,
    name: row.display_name,
    role: row.role_title,
    experienceYears: row.experience_years > 0 ? row.experience_years : undefined,
    price: Number(row.price),
    formats: row.formats,
    directions: row.direction_ids,
    languages: row.languages,
    about: row.about,
    hue: local?.hue ?? hueFrom(row.id),
  }
}

export interface CatalogResult {
  specialists: Specialist[]
  isLive: boolean
}

export const fetchSpecialists = async (): Promise<CatalogResult> => {
  if (!supabase) return { specialists: SPECIALISTS, isLive: false }
  const { data, error } = await supabase
    .from('specialists')
    .select('*')
    .eq('is_active', true)
    .order('display_name')
  if (error || !data || data.length === 0)
    return { specialists: SPECIALISTS, isLive: false }
  return { specialists: (data as SpecialistRow[]).map(toSpecialist), isLive: true }
}
