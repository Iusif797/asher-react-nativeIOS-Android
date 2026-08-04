import { useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Modal } from '@/components/ui/Modal'
import { Tag } from '@/components/ui/Tag'
import { CLIENT_CARDS, HOMEWORK_TEMPLATES } from '@/data/therapist'
import { templateKindTone } from './templateTone'

export type AssignTarget =
  | { kind: 'client'; clientId: string }
  | { kind: 'template'; templateId: string }

interface AssignOptionProps {
  selected: boolean
  title: string
  subtitle?: string
  trailing?: ReactNode
  onSelect: () => void
}

const AssignOption = ({ selected, title, subtitle, trailing, onSelect }: AssignOptionProps) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    className={selected ? 'therapist-option therapist-option--selected' : 'therapist-option'}
    onClick={onSelect}
  >
    <span className="therapist-option-dot" />
    <span className="therapist-option-text">
      <span className="therapist-option-title">{title}</span>
      {subtitle && <span className="therapist-option-subtitle">{subtitle}</span>}
    </span>
    {trailing}
  </button>
)

interface PickerProps {
  value: string | null
  onSelect: (id: string) => void
}

const ClientPicker = ({ value, onSelect }: PickerProps) => (
  <div className="therapist-assign-group" role="radiogroup" aria-label="Клиент">
    <p className="therapist-assign-label">Клиент</p>
    {CLIENT_CARDS.map((client) => (
      <AssignOption
        key={client.id}
        selected={client.id === value}
        title={client.name}
        subtitle={client.request}
        onSelect={() => onSelect(client.id)}
      />
    ))}
  </div>
)

const TemplatePicker = ({ value, onSelect }: PickerProps) => (
  <div className="therapist-assign-group" role="radiogroup" aria-label="Шаблон задания">
    <p className="therapist-assign-label">Шаблон задания</p>
    {HOMEWORK_TEMPLATES.map((template) => (
      <AssignOption
        key={template.id}
        selected={template.id === value}
        title={template.title}
        trailing={<Tag tone={templateKindTone(template.kind)}>{template.kind}</Tag>}
        onSelect={() => onSelect(template.id)}
      />
    ))}
  </div>
)

const AssignSuccess = ({ onClose }: { onClose: () => void }) => (
  <div className="therapist-assign-success">
    <span className="therapist-assign-check">
      <Icon name="check" size={26} strokeWidth={2.2} />
    </span>
    <h3>Задание назначено</h3>
    <p>Клиент получит уведомление</p>
    <Button className="therapist-assign-done" variant="soft" onClick={onClose}>
      Готово
    </Button>
  </div>
)

interface AssignTaskModalProps {
  target: AssignTarget
  onClose: () => void
  onAssigned: () => void
}

export const AssignTaskModal = ({ target, onClose, onAssigned }: AssignTaskModalProps) => {
  const [clientId, setClientId] = useState<string | null>(
    target.kind === 'client' ? target.clientId : null,
  )
  const [templateId, setTemplateId] = useState<string | null>(
    target.kind === 'template' ? target.templateId : null,
  )
  const [isAssigned, setIsAssigned] = useState(false)

  const fixedClient =
    target.kind === 'client'
      ? CLIENT_CARDS.find((client) => client.id === target.clientId)
      : undefined

  const assign = () => {
    if (!clientId || !templateId) return
    setIsAssigned(true)
    onAssigned()
  }

  return (
    <Modal open title="Назначить задание" onClose={onClose}>
      {isAssigned ? (
        <AssignSuccess onClose={onClose} />
      ) : (
        <div className="therapist-assign">
          {fixedClient ? (
            <div className="therapist-assign-group">
              <p className="therapist-assign-label">Клиент</p>
              <span className="chip therapist-assign-client">
                <Icon name="user" size={14} />
                {fixedClient.name}
              </span>
            </div>
          ) : (
            <ClientPicker value={clientId} onSelect={setClientId} />
          )}
          <TemplatePicker value={templateId} onSelect={setTemplateId} />
          <div className="therapist-assign-actions">
            <Button icon="send" disabled={!clientId || !templateId} onClick={assign}>
              Назначить
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
