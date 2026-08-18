import { Icon } from '@/components/ui/Icon'
import { CRISIS_CONTACTS, GROUNDING_STEPS, type CrisisContact } from '@/data/crisis'
import './crisis.css'

const ContactCard = ({ contact }: { contact: CrisisContact }) => (
  <a
    className={contact.isEmergency ? 'crisis-contact crisis-contact--urgent' : 'crisis-contact'}
    href={`tel:${contact.dial}`}
  >
    <span className="crisis-contact__icon">
      <Icon name="bell" size={20} strokeWidth={1.8} />
    </span>
    <span className="crisis-contact__body">
      <span className="crisis-contact__title">{contact.title}</span>
      <strong className="crisis-contact__phone">{contact.phone}</strong>
      <span className="crisis-contact__note">{contact.note}</span>
    </span>
    <Icon name="chevronRight" size={18} strokeWidth={2} />
  </a>
)

export const CrisisHelp = () => (
  <div className="crisis">
    <p className="crisis__lead">
      Если прямо сейчас тяжело — вы не обязаны справляться в одиночку. Позвоните: на
      линиях круглосуточно отвечают живые люди, звонок бесплатный и анонимный.
    </p>
    <div className="crisis__contacts">
      {CRISIS_CONTACTS.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
    <section className="crisis__grounding card">
      <h2 className="section-title">Пока ждёте ответа</h2>
      <ol className="crisis__steps">
        {GROUNDING_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
    <p className="crisis__disclaimer">
      ASHER не заменяет экстренную и медицинскую помощь. При угрозе жизни звоните 112.
    </p>
  </div>
)
