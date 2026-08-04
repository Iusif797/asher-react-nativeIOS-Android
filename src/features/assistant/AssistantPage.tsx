import { Icon } from '@/components/ui/Icon'
import { ChatThread } from './ChatThread'
import { useAssistantChat } from './useAssistantChat'
import './assistant.css'

export const AssistantPage = () => {
  const chat = useAssistantChat()

  return (
    <section className="assistant">
      <header>
        <p className="page-kicker">ASHER</p>
        <h1 className="page-title">Помощник</h1>
        <p className="page-lead">
          Поможет сформулировать запрос, сориентироваться в выборе специалиста и
          разобраться с заданиями — в вашем темпе.
        </p>
      </header>
      <div className="assistant-disclaimer" role="note">
        <Icon name="shield" size={18} />
        <p>
          Помощник не ставит диагнозов и не заменяет специалиста. В сложной
          ситуации — запишитесь к психологу.
        </p>
      </div>
      <div className="card assistant-chat">
        <ChatThread
          messages={chat.messages}
          isTyping={chat.isTyping}
          doneOptionId={chat.doneOptionId}
          chips={chat.chips}
          showResetChip={chat.showResetChip}
          onSelectOption={chat.selectOption}
          onResetOptions={chat.resetOptions}
        />
        <div className="assistant-composer" title="В демо доступны готовые сценарии">
          <input
            type="text"
            placeholder="Написать сообщение..."
            disabled
            aria-label="Сообщение помощнику"
          />
          <button
            type="button"
            className="assistant-send"
            disabled
            aria-label="Отправить сообщение"
          >
            <Icon name="send" size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
