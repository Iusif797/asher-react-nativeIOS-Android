import type { IconName } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import type { SessionFormat } from '@/lib/types'

const FORMAT_VIEW: Record<SessionFormat, { icon: IconName; label: string }> = {
  online: { icon: 'video', label: 'Онлайн' },
  inperson: { icon: 'mapPin', label: 'Очно' },
}

interface FormatTagProps {
  format: SessionFormat
}

export const FormatTag = ({ format }: FormatTagProps) => (
  <Tag icon={FORMAT_VIEW[format].icon}>{FORMAT_VIEW[format].label}</Tag>
)
