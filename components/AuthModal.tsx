'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth, AUTH_VERIFY_EMAIL } from '@/app/context/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'signup'
}

const inputClass =
  'w-full px-3 py-2.5 text-sm bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent'

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mounted, setMounted] = useState(false)
  const { login, signup } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) setMode(initialMode)
  }, [isOpen, initialMode])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setInfo('')
    setIsLoading(true)

    try {
      if (mode === 'signup') {
        if (formData.password.length < 6) {
          setError('Use at least 6 characters for your password.')
          setIsLoading(false)
          return
        }

        const signupErr = await signup(formData.name, formData.email, formData.password, '')
        if (signupErr === null) {
          onClose()
          setFormData({ name: '', email: '', password: '' })
        } else if (signupErr === AUTH_VERIFY_EMAIL) {
          setInfo('Confirm your email, then sign in.')
          setFormData((prev) => ({ ...prev, password: '' }))
        } else {
          setError(signupErr)
        }
      } else {
        const loginErr = await login(formData.email, formData.password)
        if (loginErr === null) {
          onClose()
          setFormData({ name: '', email: '', password: '' })
        } else {
          setError(loginErr)
        }
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
    setInfo('')
  }

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="auth-modal-layer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden"
        >
          <div className="flex min-h-[100dvh] min-h-screen w-full items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.15 }}
              className="relative z-[1] w-full max-w-sm bg-dark-card border border-gray-800 rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-dark-lighter border border-gray-700 hover:border-gray-600 flex items-center justify-center transition-colors z-10"
                aria-label="Close"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="px-6 pt-6 pb-4 border-b border-gray-800/80">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">AsaaseLabs</p>
                <h2 id="auth-modal-title" className="text-lg font-semibold text-white">
                  {mode === 'login' ? 'Sign in' : 'Create an account'}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {mode === 'login' ? 'Use the email and password for your account.' : 'Quick setup: name, email, and password.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-3">
                {mode === 'signup' && (
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1">
                      Full name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    className={inputClass}
                    placeholder="••••••••"
                  />
                </div>

                {info && (
                  <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2">
                    <p className="text-xs text-emerald-400">{info}</p>
                  </div>
                )}

                {error && (
                  <div className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2">
                    <p className="text-xs text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (mode === 'login' ? 'Signing in…' : 'Creating account…') : mode === 'login' ? 'Sign in' : 'Create account'}
                </button>

                <p className="text-center text-xs text-gray-500 pt-1">
                  {mode === 'login' ? (
                    <>
                      No account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('signup')
                          setError('')
                          setInfo('')
                        }}
                        className="text-primary font-medium hover:underline"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login')
                          setError('')
                          setInfo('')
                        }}
                        className="text-primary font-medium hover:underline"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  return createPortal(modal, document.body)
}
