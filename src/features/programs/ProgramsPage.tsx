import './programs.css'
import { ActiveProgram } from './ActiveProgram'
import { Catalog } from './Catalog'

export const ProgramsPage = () => (
  <section className="page programs-page">
    <header>
      <p className="page-kicker">Программы и курсы</p>
      <h1 className="page-title">Система, а не разовые усилия</h1>
    </header>
    <ActiveProgram />
    <Catalog />
  </section>
)
