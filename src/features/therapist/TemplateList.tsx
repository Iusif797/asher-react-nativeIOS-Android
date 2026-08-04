import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { HOMEWORK_TEMPLATES } from '@/data/therapist'
import { templateKindTone } from './templateTone'

interface TemplateListProps {
  onUse: (templateId: string) => void
}

export const TemplateList = ({ onUse }: TemplateListProps) => (
  <ul className="card therapist-templates">
    {HOMEWORK_TEMPLATES.map((template) => (
      <li key={template.id} className="therapist-template">
        <span className="therapist-template-title">{template.title}</span>
        <Tag tone={templateKindTone(template.kind)}>{template.kind}</Tag>
        <Button
          className="therapist-template-use"
          variant="ghost"
          size="sm"
          iconAfter="arrowRight"
          onClick={() => onUse(template.id)}
        >
          Использовать
        </Button>
      </li>
    ))}
  </ul>
)
