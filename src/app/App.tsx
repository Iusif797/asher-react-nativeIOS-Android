import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { useAuthStore } from '@/stores/authStore'
import { WelcomePage } from '@/features/auth/WelcomePage'
import { AppShell } from './layout/AppShell'
import { TodayPage } from '@/features/today/TodayPage'
import { RoadmapPage } from '@/features/roadmap/RoadmapPage'
import { BookingPage } from '@/features/booking/BookingPage'
import { MatchingPage } from '@/features/matching/MatchingPage'
import { DiaryPage } from '@/features/diary/DiaryPage'
import { HomeworkPage } from '@/features/homework/HomeworkPage'
import { LibraryPage } from '@/features/library/LibraryPage'
import { DirectionPage } from '@/features/library/DirectionPage'
import { ProgramsPage } from '@/features/programs/ProgramsPage'
import { AssistantPage } from '@/features/assistant/AssistantPage'
import { AccountPage } from '@/features/account/AccountPage'
import { TherapistPage } from '@/features/therapist/TherapistPage'
import { B2BPage } from '@/features/b2b/B2BPage'

export const App = () => {
  const status = useAuthStore((s) => s.status)
  const init = useAuthStore((s) => s.init)

  useEffect(() => {
    void init()
  }, [init])

  const content =
    status === 'loading' ? null : status === 'signedOut' ? <WelcomePage /> : <AppRoutes />

  return <MotionConfig reducedMotion="user">{content}</MotionConfig>
}

const AppRoutes = () => (
  <Routes>
    <Route element={<AppShell />}>
      <Route index element={<TodayPage />} />
      <Route path="/roadmap" element={<RoadmapPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/matching" element={<MatchingPage />} />
      <Route path="/diary" element={<DiaryPage />} />
      <Route path="/homework" element={<HomeworkPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/:directionId" element={<DirectionPage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/assistant" element={<AssistantPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/therapist" element={<TherapistPage />} />
      <Route path="/b2b" element={<B2BPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
)
