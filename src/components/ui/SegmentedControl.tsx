interface SegmentedOption<T extends string> {
  value: T
  label: string
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel: string
}

export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedControlProps<T>) => (
  <div className="segmented" role="tablist" aria-label={ariaLabel}>
    {options.map((option) => (
      <button
        key={option.value}
        role="tab"
        aria-selected={option.value === value}
        className={option.value === value ? 'segmented__item segmented__item--active' : 'segmented__item'}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
)
