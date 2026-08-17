import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Consultation, SessionFormat } from '@/lib/types'
import { specialistById } from '@/data/specialists'

const DEMO_SEED_IDS = new Set(['cons-1', 'cons-2', 'cons-3', 'cons-4'])

interface BookingState {
  consultations: Consultation[]
  book: (specialistId: string, slotISO: string, format: SessionFormat) => void
  cancel: (id: string) => void
  markPaid: (id: string) => void
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      consultations: [],
      book: (specialistId, slotISO, format) =>
        set((state) => {
          const specialist = specialistById(specialistId)
          if (!specialist) return state
          const consultation: Consultation = {
            id: `cons-${Date.now()}`,
            specialistId,
            dateISO: slotISO,
            format,
            status: 'upcoming',
            price: specialist.price,
            paid: false,
            topic: 'Консультация',
          }
          return { consultations: [consultation, ...state.consultations] }
        }),
      cancel: (id) =>
        set((state) => ({
          consultations: state.consultations.filter((c) => c.id !== id),
        })),
      markPaid: (id) =>
        set((state) => ({
          consultations: state.consultations.map((c) =>
            c.id === id ? { ...c, paid: true } : c,
          ),
        })),
    }),
    {
      name: 'asher:bookings',
      version: 3,
      migrate: (persistedState) => {
        const state = persistedState as { consultations?: Consultation[] }
        const real = (state.consultations ?? [])
          .filter((consultation) => !DEMO_SEED_IDS.has(consultation.id))
          .map((consultation) => {
            const specialist = specialistById(consultation.specialistId)
            if (!specialist) return null
            return { ...consultation, price: specialist.price }
          })
          .filter((consultation): consultation is Consultation => consultation !== null)
        return { consultations: real }
      },
    },
  ),
)

export const selectUpcoming = (state: BookingState): Consultation[] =>
  state.consultations
    .filter((c) => c.status === 'upcoming')
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO))

export const selectHistory = (state: BookingState): Consultation[] =>
  state.consultations
    .filter((c) => c.status === 'done')
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
