import type { ComponentProps } from 'react'
import type { Tag } from '@/components/ui/Tag'

type TagTone = NonNullable<ComponentProps<typeof Tag>['tone']>

const TONE_BY_KIND: Record<string, TagTone> = {
  'Техника': 'accent',
  'Упражнение': 'deep',
  'Рефлексия': 'premium',
  'Материал': 'neutral',
}

export const templateKindTone = (kind: string): TagTone =>
  TONE_BY_KIND[kind] ?? 'neutral'
