import { useState } from 'react'
import { QUIZ_QUESTIONS, type QuizAnswers } from '@/data/quiz'
import { QuizIntro } from './QuizIntro'
import { QuizStep } from './QuizStep'
import { MatchResults } from './MatchResults'
import './matching.css'

type MatchingStage = 'intro' | 'quiz' | 'results'

export const MatchingPage = () => {
  const [stage, setStage] = useState<MatchingStage>('intro')
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})

  const startQuiz = () => {
    setAnswers({})
    setStepIndex(0)
    setStage('quiz')
  }

  const answerCurrent = (value: string) => {
    const question = QUIZ_QUESTIONS[stepIndex]
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
    if (stepIndex === QUIZ_QUESTIONS.length - 1) {
      setStage('results')
      return
    }
    setStepIndex(stepIndex + 1)
  }

  const stepBack = () => {
    if (stepIndex === 0) {
      setStage('intro')
      return
    }
    setStepIndex(stepIndex - 1)
  }

  const currentQuestion = QUIZ_QUESTIONS[stepIndex]

  return (
    <section className="page matching">
      {stage === 'intro' && <QuizIntro onStart={startQuiz} />}
      {stage === 'quiz' && (
        <QuizStep
          question={currentQuestion}
          stepIndex={stepIndex}
          total={QUIZ_QUESTIONS.length}
          selectedValue={answers[currentQuestion.id]}
          onSelect={answerCurrent}
          onBack={stepBack}
        />
      )}
      {stage === 'results' && (
        <MatchResults answers={answers} onRestart={startQuiz} />
      )}
    </section>
  )
}
