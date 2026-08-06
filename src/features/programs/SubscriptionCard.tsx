import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { SUBSCRIPTION_PERKS, SUBSCRIPTION_PRICE } from '@/data/catalog'
import { formatPrice } from '@/lib/format'
import { useAppStore } from '@/stores/appStore'

export const SubscriptionCard = () => {
  const subscriptionActive = useAppStore((state) => state.subscriptionActive)
  const activateSubscription = useAppStore((state) => state.activateSubscription)

  return (
    <section className="card programs-subscription">
      <header className="programs-subscription-head">
        <div>
          <p className="page-kicker">Подписка</p>
          <h2>ASHER+</h2>
        </div>
        {subscriptionActive && (
          <Tag tone="premium" icon="star">
            Подписка активна
          </Tag>
        )}
      </header>
      <ul className="programs-perks">
        {SUBSCRIPTION_PERKS.map((perk) => (
          <li key={perk}>
            <span className="programs-perk-check">
              <Icon name="check" size={13} strokeWidth={2.4} />
            </span>
            {perk}
          </li>
        ))}
      </ul>
      <footer className="programs-subscription-foot">
        <p className="programs-price">
          <strong>{formatPrice(SUBSCRIPTION_PRICE)}</strong>
          <span>в месяц</span>
        </p>
        {!subscriptionActive && (
          <Button variant="deep" size="lg" onClick={activateSubscription}>
            Оформить подписку
          </Button>
        )}
      </footer>
    </section>
  )
}
