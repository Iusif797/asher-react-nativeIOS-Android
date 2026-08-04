const PATHS: Record<string, string[]> = {
  sun: [
    'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
    'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  ],
  route: ['M9 3 4 5v16l5-2 6 2 5-2V3l-5 2-6-2z', 'M9 3v16', 'M15 5v16'],
  calendar: ['M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v12a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5z', 'M3 10h18', 'M8 2.5V6M16 2.5V6'],
  journal: ['M12 6c-2-1.5-4.5-2-8-2v14c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2V4c-3.5 0-6 .5-8 2z', 'M12 6v14'],
  tasks: ['M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z', 'M8 12.5l2.7 2.7L16 9'],
  library: ['M4 4h4v16H4z', 'M10 4h4v16h-4z', 'M16.4 4.8l3.9 1-3.7 14.4-3.9-1z'],
  sparkle: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z', 'M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z'],
  user: ['M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z', 'M4 21c0-4 3.6-6 8-6s8 2 8 6'],
  users: ['M9 4.5A3.5 3.5 0 1 1 9 11.5 3.5 3.5 0 0 1 9 4.5z', 'M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5', 'M15.5 4.8a3.5 3.5 0 0 1 0 6.4', 'M17.5 14.7c2.3.7 4 2.4 4 5.3'],
  heart: ['M12 20s-7-4.3-9.3-8.6C1.1 8.4 3 5 6.4 5c2 0 3.7 1.2 4.6 3 .9-1.8 2.6-3 4.6-3 3.4 0 5.3 3.4 3.7 6.4C19 15.7 12 20 12 20z'],
  moon: ['M20 13.5A8 8 0 0 1 10.5 4 7.5 7.5 0 1 0 20 13.5z'],
  arrowRight: ['M4 12h16', 'M13 5l7 7-7 7'],
  arrowLeft: ['M20 12H4', 'M11 5l-7 7 7 7'],
  plus: ['M12 5v14M5 12h14'],
  close: ['M6 6l12 12M18 6L6 18'],
  chevronDown: ['M6 9l6 6 6-6'],
  chevronRight: ['M9 6l6 6-6 6'],
  star: ['M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.7l5.9-.9z'],
  clock: ['M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z', 'M12 7v5l3.5 2'],
  video: ['M2.5 9A3 3 0 0 1 5.5 6h7a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3z', 'M15.5 12l6-3.5v7z'],
  mapPin: ['M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z', 'M12 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z'],
  receipt: ['M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21z', 'M9 8h6M9 12h6'],
  shield: ['M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z', 'M9 12l2 2 4-4.5'],
  briefcase: ['M3 11a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z', 'M9 8V6a3 3 0 0 1 3-3 3 3 0 0 1 3 3v2', 'M3 13h18'],
  leaf: ['M5 19C5 9 12 4 20 4c0 8-5 15-15 15z', 'M5 19c3-6 7-9 11-11'],
  check: ['M5 13l4 4L19 7'],
  send: ['M22 2L11 13', 'M22 2l-7 20-4-9-9-4z'],
  play: ['M8 5.5v13l11-6.5z'],
  headphones: ['M4 18v-5a8 8 0 0 1 16 0v5', 'M4 14.5h1A1.5 1.5 0 0 1 6.5 16v2.5A1.5 1.5 0 0 1 5 20H4z', 'M20 14.5h-1a1.5 1.5 0 0 0-1.5 1.5v2.5a1.5 1.5 0 0 0 1.5 1.5h1z'],
  fileText: ['M6 3h9l4 4v14H6z', 'M9 11h6M9 15h6'],
  chat: ['M21 12a8 8 0 0 1-8 8c-1.5 0-3-.4-4.2-1L3 20l1.2-5A8 8 0 1 1 21 12z'],
  download: ['M12 4v10', 'M7 10l5 5 5-5', 'M5 20h14'],
  edit: ['M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z'],
  trash: ['M4 7h16', 'M9 7V5h6v2', 'M6 7l1 14h10l1-14'],
  bell: ['M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z', 'M10 19a2 2 0 0 0 4 0'],
  graduation: ['M2 9l10-5 10 5-10 5z', 'M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5'],
  location: ['M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z', 'M12 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z'],
}

export type IconName = keyof typeof PATHS

interface IconProps {
  name: IconName
  size?: number
  strokeWidth?: number
  className?: string
}

export const Icon = ({ name, size = 20, strokeWidth = 1.7, className }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {PATHS[name].map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
)
