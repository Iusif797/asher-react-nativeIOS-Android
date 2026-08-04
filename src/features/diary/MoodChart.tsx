import type { MoodEntry } from '@/lib/types'

interface MoodChartProps {
  entries: MoodEntry[]
}

const WIDTH = 640
const HEIGHT = 230
const PAD_X = 34
const PAD_TOP = 16
const PAD_BOTTOM = 34

const xAt = (index: number, total: number): number =>
  PAD_X + (index * (WIDTH - PAD_X * 2)) / Math.max(1, total - 1)

const yAt = (score: number): number =>
  PAD_TOP + ((10 - score) * (HEIGHT - PAD_TOP - PAD_BOTTOM)) / 9

const smoothPath = (points: [number, number][]): string =>
  points.reduce((path, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`
    const [prevX, prevY] = points[i - 1]
    const midX = (prevX + x) / 2
    return `${path} C ${midX} ${prevY}, ${midX} ${y}, ${x} ${y}`
  }, '')

const dateLabel = (date: string): string => {
  const [, month, day] = date.split('-')
  return `${Number(day)}.${Number(month)}`
}

export const MoodChart = ({ entries }: MoodChartProps) => {
  const recent = entries.slice(-14)
  if (recent.length < 2) return null

  const points: [number, number][] = recent.map((entry, i) => [
    xAt(i, recent.length),
    yAt(entry.score),
  ])
  const line = smoothPath(points)
  const area = `${line} L ${points[points.length - 1][0]} ${HEIGHT - PAD_BOTTOM} L ${points[0][0]} ${HEIGHT - PAD_BOTTOM} Z`
  const labelStep = Math.ceil(recent.length / 5)

  return (
    <svg
      className="diary-chart"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="График настроения за последние две недели"
    >
      <defs>
        <linearGradient id="mood-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[2, 4, 6, 8, 10].map((score) => (
        <g key={score}>
          <line
            className="diary-chart__grid"
            x1={PAD_X}
            x2={WIDTH - PAD_X}
            y1={yAt(score)}
            y2={yAt(score)}
          />
          <text className="diary-chart__axis" x={PAD_X - 10} y={yAt(score) + 3}>
            {score}
          </text>
        </g>
      ))}
      <path className="diary-chart__area" d={area} fill="url(#mood-fill)" />
      <path className="diary-chart__line" d={line} />
      {points.map(([x, y], i) => (
        <circle className="diary-chart__dot" key={recent[i].date} cx={x} cy={y} r="3.5" />
      ))}
      {recent.map((entry, i) =>
        i % labelStep === 0 || i === recent.length - 1 ? (
          <text
            className="diary-chart__axis"
            key={entry.date}
            x={points[i][0]}
            y={HEIGHT - 12}
            textAnchor="middle"
          >
            {dateLabel(entry.date)}
          </text>
        ) : null,
      )}
    </svg>
  )
}
