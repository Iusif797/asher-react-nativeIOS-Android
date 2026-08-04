import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ProgressBar } from '@/components/ui/Progress'
import type { QuizQuestion } from '@/lib/types'

interface QuizStepProps {
  question: QuizQuestion
  stepIndex: number
  total: number
  selectedValue?: string
  onSelect: (value: string) => void
  onBack: () => void
}

export const QuizStep = ({
  question,
  stepIndex,
  total,
  selectedValue,
  onSelect,
  onBack,
}: QuizStepProps) => (
  <div className="matching-quiz">
    <div className="matching-quiz__meter">
      <span className="matching-quiz__count">
        Вопрос {stepIndex + 1} из {total}
      </span>
      <ProgressBar value={((stepIndex + 1) / total) * 100} />
    </div>
    <div className="matching-quiz__body" key={question.id}>
      <h2 className="matching-quiz__question">{question.question}</h2>
      <div className="matching-quiz__options" role="group" aria-label={question.question}>
        {question.options.map((option) => {
          const isSelected = option.value === selectedValue
          return (
            <button
              key={option.value}
              type="button"
              className={
                isSelected
                  ? 'matching-option matching-option--selected'
                  : 'matching-option'
              }
              aria-pressed={isSelected}
              onClick={() => onSelect(option.value)}
            >
              <span>{option.label}</span>
              <span className="matching-option__mark">
                <Icon name={isSelected ? 'check' : 'arrowRight'} size={16} strokeWidth={2} />
              </span>
            </button>
          )
        })}
      </div>
    </div>
    <Button
      className="matching-quiz__back"
      variant="ghost"
      icon="arrowLeft"
      onClick={onBack}
    >
      Назад
    </Button>
  </div>
)
