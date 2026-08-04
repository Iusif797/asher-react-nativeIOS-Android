import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { ADMIN_CHAT_SEED } from '@/data/account'
import { formatTime } from '@/lib/dates'
import type { ChatMessage } from '@/lib/types'

const REPLY_DELAY_MS = 900
const AUTO_REPLY =
  'Спасибо! Администратор ответит в ближайшее время — обычно в течение 15 минут.'

const ChatBubble = ({ message }: { message: ChatMessage }) => {
  const isAdmin = message.author === 'admin'
  const modifier = isAdmin ? 'account-chat__bubble--admin' : 'account-chat__bubble--user'
  return (
    <div className={`account-chat__bubble ${modifier}`}>
      {isAdmin && <p className="account-chat__author">Администратор ASHER</p>}
      <p>{message.text}</p>
      <span className="account-chat__time">{formatTime(message.atISO)}</span>
    </div>
  )
}

export const AdminChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(ADMIN_CHAT_SEED)
  const [draft, setDraft] = useState('')
  const replyTimerRef = useRef<number | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [messages])

  useEffect(
    () => () => {
      if (replyTimerRef.current !== null) window.clearTimeout(replyTimerRef.current)
    },
    [],
  )

  const scheduleAutoReply = () => {
    if (replyTimerRef.current !== null) window.clearTimeout(replyTimerRef.current)
    replyTimerRef.current = window.setTimeout(() => {
      const reply: ChatMessage = {
        id: `msg-admin-${Date.now()}`,
        author: 'admin',
        text: AUTO_REPLY,
        atISO: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, reply])
    }, REPLY_DELAY_MS)
  }

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    const outgoing: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      author: 'user',
      text,
      atISO: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, outgoing])
    setDraft('')
    scheduleAutoReply()
  }

  return (
    <section className="account-section">
      <h2 className="section-title">Чат с администратором</h2>
      <div className="account-chat card">
        <div className="account-chat__scroll" ref={scrollRef}>
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>
        <form className="account-chat__composer" onSubmit={submitMessage}>
          <input
            className="account-chat__input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Напишите сообщение…"
            aria-label="Сообщение администратору"
          />
          <Button
            type="submit"
            icon="send"
            className="account-chat__send"
            aria-label="Отправить сообщение"
          />
        </form>
      </div>
    </section>
  )
}
