import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ASSISTANT_INTRO,
  ASSISTANT_OPTIONS,
  assistantOptionById,
  type AssistantOption,
} from '@/data/assistant'

export interface ChatMessage {
  id: number
  author: 'assistant' | 'user'
  text: string
}

type ChipMode = 'all' | 'followUps' | 'hidden'

const REPLY_LINE_DELAY_MS = 420

const INTRO_MESSAGES: ChatMessage[] = ASSISTANT_INTRO.map((text, index) => ({
  id: index,
  author: 'assistant',
  text,
}))

export const useAssistantChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INTRO_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const [chipMode, setChipMode] = useState<ChipMode>('all')
  const [doneOptionId, setDoneOptionId] = useState<string | null>(null)
  const nextIdRef = useRef(INTRO_MESSAGES.length)
  const timersRef = useRef<number[]>([])

  useEffect(() => () => timersRef.current.forEach(window.clearTimeout), [])

  const appendMessage = (author: ChatMessage['author'], text: string) => {
    const id = nextIdRef.current
    nextIdRef.current += 1
    setMessages((current) => [...current, { id, author, text }])
  }

  const deliverReplyLine = (option: AssistantOption, index: number) => {
    appendMessage('assistant', option.reply[index])
    if (index < option.reply.length - 1) return
    setIsTyping(false)
    setDoneOptionId(option.id)
    setChipMode('followUps')
  }

  const selectOption = (option: AssistantOption) => {
    if (isTyping) return
    appendMessage('user', option.label)
    setChipMode('hidden')
    setDoneOptionId(null)
    setIsTyping(true)
    option.reply.forEach((_, index) => {
      const timer = window.setTimeout(
        () => deliverReplyLine(option, index),
        REPLY_LINE_DELAY_MS * (index + 1),
      )
      timersRef.current = [...timersRef.current, timer]
    })
  }

  const resetOptions = () => {
    setDoneOptionId(null)
    setChipMode('all')
  }

  const chips = useMemo(() => {
    if (chipMode === 'hidden') return []
    if (chipMode === 'all') return ASSISTANT_OPTIONS
    const followUpIds = doneOptionId
      ? (assistantOptionById(doneOptionId)?.followUps ?? [])
      : []
    return followUpIds
      .map(assistantOptionById)
      .filter((option): option is AssistantOption => option !== undefined)
  }, [chipMode, doneOptionId])

  return {
    messages,
    isTyping,
    doneOptionId,
    chips,
    showResetChip: chipMode === 'followUps',
    selectOption,
    resetOptions,
  }
}
