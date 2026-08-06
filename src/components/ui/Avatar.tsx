interface AvatarProps {
  name: string
  hue: number
  size?: number
}

const BRAND_HUE_ORIGIN = 205
const BRAND_HUE_SPAN = 55

const initials = (name: string): string =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')

const brandHue = (hue: number): number =>
  BRAND_HUE_ORIGIN + ((((hue % 360) + 360) % 360) / 360) * BRAND_HUE_SPAN

export const Avatar = ({ name, hue, size = 48 }: AvatarProps) => {
  const tone = brandHue(hue)
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: `oklch(93% 0.028 ${tone})`,
        color: `oklch(38% 0.06 ${tone})`,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}
