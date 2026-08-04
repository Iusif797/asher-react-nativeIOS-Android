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
  rating: number
  reviews_count: number
  about: string
}

const UUID_TO_LOCAL_ID: Record<string, string> = {
  '11111111-0000-4000-8000-000000000001': 'sp-leyla',
  '11111111-0000-4000-8000-000000000002': 'sp-dmitry',
  '11111111-0000-4000-8000-000000000003': 'sp-aysel',
  '11111111-0000-4000-8000-000000000004': 'sp-rustam',
  '11111111-0000-4000-8000-000000000005': 'sp-anna',
  '11111111-0000-4000-8000-000000000006': 'sp-elvin',
  '11111111-0000-4000-8000-000000000007': 'sp-nigar',
  '11111111-0000-4000-8000-000000000008': 'sp-marat',
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
    experienceYears: row.experience_years,
    price: Number(row.price),
    formats: row.formats,
    directions: row.direction_ids,
    languages: row.languages,
    rating: Number(row.rating),
    reviewsCount: row.reviews_count,
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
