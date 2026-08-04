import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Modal } from '@/components/ui/Modal'
import { specialistById } from '@/data/specialists'
import { formatDayTime } from '@/lib/dates'
import { formatPrice } from '@/lib/format'
import type { Consultation } from '@/lib/types'

interface PaymentModalProps {
  consultation: Consultation | null
  onClose: () => void
  onPay: () => void
}

export const PaymentModal = ({ consultation, onClose, onPay }: PaymentModalProps) => {
  if (!consultation) return null
  const specialist = specialistById(consultation.specialistId)
  return (
    <Modal open title="Онлайн-оплата" onClose={onClose}>
      <div className="account-payment">
        <div>
          <p className="account-payment__label">К оплате</p>
          <p className="account-payment__amount">{formatPrice(consultation.price)}</p>
          <p className="account-payment__topic">
            {consultation.topic}
            {specialist ? ` · ${specialist.name}` : ''}
          </p>
        </div>
        <dl className="account-payment__rows">
          <div>
            <dt>Дата и время</dt>
            <dd>{formatDayTime(consultation.dateISO)}</dd>
          </div>
          <div>
            <dt>Способ оплаты</dt>
            <dd>Карта **** 4212</dd>
          </div>
          <div>
            <dt>Получатель</dt>
            <dd>ASHER Wellbeing</dd>
          </div>
        </dl>
        <Button icon="check" onClick={onPay}>
          Оплатить (демо)
        </Button>
        <p className="account-payment__hint">
          <Icon name="shield" size={14} strokeWidth={2} />
          Демо-режим: настоящие списания не происходят
        </p>
      </div>
    </Modal>
  )
}
