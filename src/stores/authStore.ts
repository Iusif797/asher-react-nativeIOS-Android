import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { pullMoodEntries } from '@/api/moodSync'
import { useMoodStore } from './moodStore'

export type AuthStatus = 'loading' | 'guest' | 'signedOut' | 'signedIn'

interface AuthState {
  status: AuthStatus
  userId: string | null
  fullName: string | null
  pending: boolean
  error: string | null
  init: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signUp: (fullName: string, email: string, password: string) => Promise<void>
  continueAsGuest: () => void
  signOut: () => Promise<void>
}

const GUEST_KEY = 'asher:guest'

const translateError = (message: string): string => {
  if (message.includes('Invalid login credentials')) return 'Неверный email или пароль.'
  if (message.includes('already registered')) return 'Этот email уже зарегистрирован — попробуйте войти.'
  if (message.includes('at least 6 characters')) return 'Пароль должен быть не короче 6 символов.'
  if (message.includes('valid email')) return 'Похоже, в email опечатка.'
  if (message.includes('not confirmed')) return 'Подтвердите email по ссылке из письма.'
  return 'Не получилось. Проверьте данные и попробуйте ещё раз.'
}

const loadFullName = async (userId: string): Promise<string | null> => {
  if (!supabase) return null
  const { data } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', userId)
    .maybeSingle()
  return data?.full_name ?? null
}

export const useAuthStore = create<AuthState>()((set) => {
  const enterSession = async (userId: string) => {
    localStorage.removeItem(GUEST_KEY)
    const fullName = await loadFullName(userId)
    set({ status: 'signedIn', userId, fullName, pending: false, error: null })
    const remote = await pullMoodEntries()
    useMoodStore.getState().mergeRemote(remote)
  }

  return {
    status: 'loading',
    userId: null,
    fullName: null,
    pending: false,
    error: null,
    init: async () => {
      if (!supabase) {
        set({ status: 'guest' })
        return
      }
      const { data } = await supabase.auth.getSession()
      const userId = data.session?.user.id
      if (userId) {
        await enterSession(userId)
        return
      }
      set({ status: localStorage.getItem(GUEST_KEY) ? 'guest' : 'signedOut' })
    },
    signIn: async (email, password) => {
      if (!supabase) return
      set({ pending: true, error: null })
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error || !data.session) {
        set({ pending: false, error: translateError(error?.message ?? '') })
        return
      }
      await enterSession(data.session.user.id)
    },
    signUp: async (fullName, email, password) => {
      if (!supabase) return
      set({ pending: true, error: null })
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
      if (error) {
        set({ pending: false, error: translateError(error.message) })
        return
      }
      if (!data.session) {
        set({
          pending: false,
          error: 'Мы отправили письмо — подтвердите email и войдите.',
        })
        return
      }
      await enterSession(data.session.user.id)
    },
    continueAsGuest: () => {
      localStorage.setItem(GUEST_KEY, '1')
      set({ status: 'guest', userId: null, fullName: null, error: null })
    },
    signOut: async () => {
      await supabase?.auth.signOut()
      localStorage.removeItem(GUEST_KEY)
      set({ status: 'signedOut', userId: null, fullName: null, error: null })
    },
  }
})
