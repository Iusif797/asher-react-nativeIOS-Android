import { Icon } from '@/components/ui/Icon'
import type { ChatMessage } from './useAssistantChat'

const AssistantMark = ({ ghost }: { ghost: boolean }) => (
  <span
    className={ghost ? 'assistant-avatar assistant-avatar--ghost' : 'assistant-avatar'}
    aria-hidden="true"
  >
    <Icon name="sparkle" size={15} />
  </span>
)

interface MessageBubbleProps {
  message: ChatMessage
  withMark: boolean
}

export const MessageBubble = ({ message, withMark }: MessageBubbleProps) => {
  if (message.author === 'user') {
    return (
      <div className="assistant-row assistant-row--user">
        <p className="assistant-bubble assistant-bubble--user">{message.text}</p>
      </div>
    )
  }
  return (
    <div className="assistant-row">
      <AssistantMark ghost={!withMark} />
      <p className="assistant-bubble">{message.text}</p>
    </div>
  )
}

export const TypingIndicator = ({ withMark }: { withMark: boolean }) => (
  <div className="assistant-row" role="status" aria-label="Помощник печатает">
    <AssistantMark ghost={!withMark} />
    <span className="assistant-typing">
      <span />
      <span />
      <span />
    </span>
  </div>
)
