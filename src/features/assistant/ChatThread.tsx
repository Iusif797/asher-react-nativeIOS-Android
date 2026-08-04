import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import type { AssistantOption } from '@/data/assistant'
import { MessageBubble, TypingIndicator } from './MessageBubble'
import type { ChatMessage } from './useAssistantChat'

interface OptionRoute {
  label: string
  to: string
}

const OPTION_ROUTES: Record<string, OptionRoute> = {
  'opt-match': { label: 'Перейти к подбору', to: '/matching' },
  'opt-book': { label: 'Открыть запись', to: '/booking' },
  'opt-homework': { label: 'Мои задания', to: '/homework' },
  'opt-diary': { label: 'Открыть дневники', to: '/diary' },
}

interface ChatThreadProps {
  messages: ChatMessage[]
  isTyping: boolean
  doneOptionId: string | null
  chips: AssistantOption[]
  showResetChip: boolean
  onSelectOption: (option: AssistantOption) => void
  onResetOptions: () => void
}

export const ChatThread = ({
  messages,
  isTyping,
  doneOptionId,
  chips,
  showResetChip,
  onSelectOption,
  onResetOptions,
}: ChatThreadProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return
    node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' })
  }, [messages.length, isTyping, chips.length])

  const route = doneOptionId ? OPTION_ROUTES[doneOptionId] : undefined
  const lastAuthor = messages[messages.length - 1]?.author

  return (
    <div ref={scrollRef} className="assistant-thread">
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          withMark={messages[index - 1]?.author !== 'assistant'}
        />
      ))}
      {isTyping && <TypingIndicator withMark={lastAuthor !== 'assistant'} />}
      {route && !isTyping && (
        <div className="assistant-action">
          <Button
            variant="soft"
            size="sm"
            iconAfter="arrowRight"
            onClick={() => navigate(route.to)}
          >
            {route.label}
          </Button>
        </div>
      )}
      {chips.length > 0 && (
        <div className="assistant-chips">
          {chips.map((option) => (
            <button
              key={option.id}
              type="button"
              className="assistant-chip"
              onClick={() => onSelectOption(option)}
            >
              {option.label}
            </button>
          ))}
          {showResetChip && (
            <button
              type="button"
              className="assistant-chip assistant-chip--muted"
              onClick={onResetOptions}
            >
              Другой вопрос
            </button>
          )}
        </div>
      )}
    </div>
  )
}
