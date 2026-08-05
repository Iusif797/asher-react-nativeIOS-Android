import { motion } from 'motion/react'

interface ProgressBarProps {
  value: number
  tone?: 'accent' | 'warm'
}

export const ProgressBar = ({ value, tone = 'accent' }: ProgressBarProps) => (
  <div
    className={`progress progress--${tone}`}
    role="progressbar"
    aria-valuenow={Math.round(value)}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    <div className="progress__fill" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
  </div>
)

interface ProgressRingProps {
  value: number
  size?: number
  label?: string
  sublabel?: string
}

export const ProgressRing = ({ value, size = 96, label, sublabel }: ProgressRingProps) => {
  const stroke = 7
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="ring__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          className="ring__fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - clamped / 100) }}
          transition={{ type: 'spring', stiffness: 55, damping: 18 }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring__center">
        {label && <strong>{label}</strong>}
        {sublabel && <span>{sublabel}</span>}
      </div>
    </div>
  )
}
