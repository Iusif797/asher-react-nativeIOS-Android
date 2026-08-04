import { ROADMAP_REQUEST, ROADMAP_STAGES } from '@/data/roadmap'
import { ProgressRing } from '@/components/ui/Progress'
import { Icon } from '@/components/ui/Icon'
import type { RoadmapStage } from '@/lib/types'
import { StageCard } from './StageCard'
import { SkillsCard } from './SkillsCard'
import { AdviceGrid } from './AdviceGrid'
import { RoadmapCta } from './RoadmapCta'
import './roadmap.css'

interface RoadmapProgress {
  done: number
  total: number
  percent: number
}

const countRoadmapProgress = (stages: RoadmapStage[]): RoadmapProgress => {
  const items = stages.flatMap((stage) => stage.items)
  if (items.length === 0) return { done: 0, total: 0, percent: 0 }
  const done = items.filter((item) => item.done).length
  return { done, total: items.length, percent: Math.round((done / items.length) * 100) }
}

interface RoadmapHeroProps {
  progress: RoadmapProgress
}

const RoadmapHero = ({ progress }: RoadmapHeroProps) => (
  <header className="card roadmap-hero">
    <div>
      <p className="page-kicker">Ваш маршрут</p>
      <h1 className="page-title">Персональная дорожная карта</h1>
      <p className="page-lead">
        Это не диагноз, а индивидуальный план движения: он собран под ваш
        запрос и меняется вместе с вами.
      </p>
      <span className="chip roadmap-hero-request">
        <Icon name="route" size={14} strokeWidth={2} />
        Запрос: {ROADMAP_REQUEST}
      </span>
    </div>
    <div className="roadmap-hero-ring">
      <ProgressRing
        value={progress.percent}
        size={124}
        label={`${progress.percent}%`}
        sublabel="пройдено"
      />
      <p className="roadmap-hero-note">
        {progress.done} из {progress.total} шагов позади
      </p>
    </div>
  </header>
)

export const RoadmapPage = () => {
  const progress = countRoadmapProgress(ROADMAP_STAGES)
  return (
    <section className="page roadmap">
      <RoadmapHero progress={progress} />
      <section className="roadmap-section" aria-label="Этапы маршрута">
        <h2 className="section-title">Этапы маршрута</h2>
        <ol className="roadmap-timeline">
          {ROADMAP_STAGES.map((stage) => (
            <StageCard key={stage.id} stage={stage} />
          ))}
        </ol>
      </section>
      <SkillsCard />
      <AdviceGrid />
      <RoadmapCta />
    </section>
  )
}
