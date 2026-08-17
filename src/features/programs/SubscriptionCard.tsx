import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { SUBSCRIPTION_PERKS } from '@/data/catalog'
import { useAppStore } from '@/stores/appStore'

export const SubscriptionCard = () => {
  const subscriptionActive = useAppStore((state) => state.subscriptionActive)

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
        {!subscriptionActive && (
          <Tag tone="neutral" icon="sparkle">
            Оформление скоро появится в приложении
          </Tag>
        )}
      </footer>
    </section>
  )
}
