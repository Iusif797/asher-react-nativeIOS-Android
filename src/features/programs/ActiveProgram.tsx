import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { ProgressRing } from '@/components/ui/Progress'
import { programById } from '@/data/programs'
import { selectCurrentDay, useProgramStore } from '@/stores/programStore'
import { DayContent } from './DayContent'
import { DayGrid } from './DayGrid'

export const ActiveProgram = () => {
  const enrolledId = useProgramStore((state) => state.enrolledId)
  const completedDays = useProgramStore((state) => state.completedDays)
  const toggleDay = useProgramStore((state) => state.toggleDay)
  const currentDay = useProgramStore(selectCurrentDay)
  const [openedDay, setOpenedDay] = useState<number | null>(null)

  const program = enrolledId ? programById(enrolledId) : undefined
  if (!program) return null

  const todayContent = program.days.find((day) => day.day === currentDay)
  const openedContent = program.days.find((day) => day.day === openedDay)
  const doneCount = completedDays.length

  return (
    <section className="card programs-active">
      <header className="programs-active-head">
        <div className="programs-active-intro">
          <h2>{program.title}</h2>
          <p>{program.subtitle}</p>
        </div>
        <ProgressRing
          value={(doneCount / program.durationDays) * 100}
          label={`${doneCount}/${program.durationDays}`}
          sublabel="дней"
        />
      </header>
      {todayContent && (
        <div className="programs-day">
          <h3>{`День ${todayContent.day} — ${todayContent.title}`}</h3>
          <DayContent
            day={todayContent}
            done={completedDays.includes(todayContent.day)}
            onToggle={() => toggleDay(todayContent.day)}
          />
        </div>
      )}
      <DayGrid
        days={program.days}
        completedDays={completedDays}
        currentDay={currentDay}
        onOpen={setOpenedDay}
      />
      <Modal
        open={Boolean(openedContent)}
        title={openedContent ? `День ${openedContent.day}` : ''}
        onClose={() => setOpenedDay(null)}
      >
        {openedContent && (
          <div className="programs-modal-day">
            <h3>{openedContent.title}</h3>
            <DayContent
              day={openedContent}
              done={completedDays.includes(openedContent.day)}
              onToggle={() => toggleDay(openedContent.day)}
            />
          </div>
        )}
      </Modal>
    </section>
  )
}
