interface AvatarProps {
  name: string
  hue: number
  size?: number
}

const initials = (name: string): string =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')

export const Avatar = ({ name, hue, size = 48 }: AvatarProps) => (
  <div
    className="avatar"
    style={{
      width: size,
      height: size,
      fontSize: size * 0.34,
      background: `oklch(90% 0.045 ${hue})`,
      color: `oklch(36% 0.07 ${hue})`,
    }}
    aria-hidden="true"
  >
    {initials(name)}
  </div>
)
