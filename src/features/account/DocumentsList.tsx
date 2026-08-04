import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { DOCUMENTS } from '@/data/account'

export const DocumentsList = () => (
  <section className="account-section">
    <h2 className="section-title">Документы и чеки</h2>
    <div className="account-docs card">
      {DOCUMENTS.map((doc) => {
        const isReceipt = doc.id.includes('receipt')
        return (
          <div key={doc.id} className="account-doc">
            <span className="account-doc__icon">
              <Icon name={isReceipt ? 'receipt' : 'fileText'} size={18} strokeWidth={1.6} />
            </span>
            <div className="account-doc__body">
              <p className="account-doc__title">{doc.title}</p>
              <p className="account-doc__meta">
                {doc.date} · {doc.size}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon="download"
              className="account-doc__download"
              title="Скачать (демо)"
              aria-label={`Скачать: ${doc.title}`}
            />
          </div>
        )
      })}
    </div>
  </section>
)
