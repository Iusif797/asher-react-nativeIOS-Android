import { useState } from 'react'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { MoodTab } from './MoodTab'
import { ThoughtsTab } from './ThoughtsTab'
import './diary.css'

type DiaryTab = 'mood' | 'thoughts'

export const DiaryPage = () => {
  const [tab, setTab] = useState<DiaryTab>('mood')

  return (
    <section className="diary">
      <header>
        <p className="page-kicker">Дневники</p>
        <h1 className="page-title">Замечать — уже половина работы</h1>
        <p className="page-lead">
          Оценка настроения и запись тревожных мыслей помогают увидеть связь
          между событиями и самочувствием.
        </p>
      </header>
      <div className="diary__tabs">
        <SegmentedControl<DiaryTab>
          ariaLabel="Разделы дневника"
          value={tab}
          onChange={setTab}
          options={[
            { value: 'mood', label: 'Настроение' },
            { value: 'thoughts', label: 'Мысли' },
          ]}
        />
      </div>
      <div key={tab} className="diary__panel">
        {tab === 'mood' ? <MoodTab /> : <ThoughtsTab />}
      </div>
    </section>
  )
}
