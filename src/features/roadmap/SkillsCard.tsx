import { ROADMAP_SKILLS } from '@/data/roadmap'
import { ProgressBar } from '@/components/ui/Progress'

export const SkillsCard = () => (
  <section className="roadmap-section" aria-label="Навыки в работе">
    <div className="roadmap-section-head">
      <h2 className="section-title">Навыки в работе</h2>
      <p className="roadmap-section-sub">
        Оценки обновляются вместе с психологом после сессий
      </p>
    </div>
    <div className="card roadmap-skills">
      {ROADMAP_SKILLS.map(({ skill, level }) => (
        <div key={skill} className="roadmap-skill">
          <div className="roadmap-skill-head">
            <span>{skill}</span>
            <strong>{level}%</strong>
          </div>
          <ProgressBar value={level} />
        </div>
      ))}
    </div>
  </section>
)
