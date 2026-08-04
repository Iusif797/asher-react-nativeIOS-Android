import type { IconName } from '@/components/ui/Icon'
import type { LibraryKind } from '@/lib/types'

export interface LibraryKindMeta {
  label: string
  icon: IconName
}

export const LIBRARY_KIND_META: Record<LibraryKind, LibraryKindMeta> = {
  text: { label: 'Текст', icon: 'fileText' },
  video: { label: 'Видео', icon: 'play' },
  audio: { label: 'Аудио', icon: 'headphones' },
  practice: { label: 'Практика', icon: 'leaf' },
}

export const LIBRARY_KIND_ORDER: LibraryKind[] = ['text', 'video', 'audio', 'practice']
