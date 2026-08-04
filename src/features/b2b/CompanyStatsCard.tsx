import { Icon, type IconName } from '@/components/ui/Icon'
import { ProgressRing } from '@/components/ui/Progress'
import { Tag } from '@/components/ui/Tag'
import { B2B_STATS } from '@/data/account'

const STAT_ITEMS: { icon: IconName; value: number; label: string }[] = [
  { icon: 'users', value: B2B_STATS.employeesCovered, label: 'Сотрудников подключено' },
  { icon: 'calendar', value: B2B_STATS.sessionsThisMonth, label: 'Сессий в этом месяце' },
  { icon: 'graduation', value: B2B_STATS.modulesCompleted, label: 'Модулей пройдено' },
]

export const CompanyStatsCard = () => (
  <div className="card b2b-company">
    <header className="b2b-company-head">
      <div>
        <p className="b2b-company-label">Компания</p>
        <h2>{B2B_STATS.company}</h2>
      </div>
      <Tag tone="accent" icon="briefcase">
        Корпоративный доступ
      </Tag>
    </header>
    <div className="b2b-company-grid">
      <div className="b2b-participation">
        <ProgressRing
          value={B2B_STATS.participationRate}
          label={`${B2B_STATS.participationRate}%`}
          sublabel="участие"
        />
        <div>
          <p className="b2b-participation-title">Участие в программе</p>
          <p className="b2b-participation-hint">сотрудников активны в этом месяце</p>
        </div>
      </div>
      {STAT_ITEMS.map((stat) => (
        <div key={stat.label} className="b2b-stat">
          <span className="b2b-stat-icon">
            <Icon name={stat.icon} size={18} />
          </span>
          <strong>{stat.value}</strong>
          <span className="b2b-stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  </div>
)
