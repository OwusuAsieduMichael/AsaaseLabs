'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

export const AUTH_VERIFY_EMAIL = 'VERIFY_EMAIL'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  authReady: boolean
  login: (email: string, password: string) => Promise<string | null>
  signup: (name: string, email: string, password: string, company?: string) => Promise<string | null>
  logout: () => Promise<void>
  openAuthModal: () => void
  closeAuthModal: () => void
  isAuthModalOpen: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function mapUser(u: SupabaseUser | null): User | null {
  if (!u?.email) return null
  const meta = u.user_metadata as { full_name?: string }
  const fromMeta =
    typeof meta?.full_name === 'string' && meta.full_name.trim() ? meta.full_name.trim() : ''
  const name = fromMeta || u.email.split('@')[0] || 'User'
  return { id: u.id, email: u.email, name }
}

function friendlyMessage(msg: string) {
  const m = msg.toLowerCase()
  if (m.includes('invalid login') || m.includes('invalid credentials')) {
    return 'Invalid email or password.'
  }
  if (m.includes('email not confirmed')) {
    return 'Please confirm your email before signing in.'
  }
  if (m.includes('user already registered')) {
    return 'An account with this email already exists.'
  }
  return msg.length > 160 ? 'Something went wrong. Try again.' : msg
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authReady, setAuthReady] = useState(false)

  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowserClient()
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true)
      return
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapUser(session?.user ?? null))
    })

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser(mapUser(session?.user ?? null))
      })
      .finally(() => setAuthReady(true))

    return () => subscription.unsubscribe()
  }, [supabase])

  const login = useCallback(
    async (email: string, password: string) => {
      if (!supabase) return 'Sign-in is not configured yet.'
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (error) return friendlyMessage(error.message)
      return null
    },
    [supabase]
  )

  const signup = useCallback(
    async (name: string, email: string, password: string, company?: string) => {
      if (!supabase) return 'Sign-up is not configured yet.'
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
            company: (company || '').trim(),
          },
        },
      })
      if (error) return friendlyMessage(error.message)
      if (data.user && !data.session) return AUTH_VERIFY_EMAIL
      return null
    },
    [supabase]
  )

  const logout = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }, [supabase])

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), [])
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      authReady,
      login,
      signup,
      logout,
      openAuthModal,
      closeAuthModal,
      isAuthModalOpen,
    }),
    [user, isAuthModalOpen, authReady, login, signup, logout, openAuthModal, closeAuthModal]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
