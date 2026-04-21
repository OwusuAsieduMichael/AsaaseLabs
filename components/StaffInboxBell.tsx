'use client'

import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext'
import { useCallback, useEffect, useRef, useState } from 'react'

type SessionRes = { staff: boolean; newInquiryCount: number; newApplicationCount?: number }

export default function StaffInboxBell() {
  const { isAuthenticated, authReady } = useAuth()
  const [staff, setStaff] = useState(false)
  const [count, setCount] = useState(0)
  const [newInquiryCount, setNewInquiryCount] = useState(0)
  const [newApplicationCount, setNewApplicationCount] = useState(0)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setStaff(false)
      setCount(0)
      return
    }
    try {
      const r = await fetch('/api/staff/session', { credentials: 'same-origin' })
      const d = (await r.json()) as SessionRes
      setStaff(!!d.staff)
      const inquiryCount = typeof d.newInquiryCount === 'number' ? d.newInquiryCount : 0
      const applicationCount =
        typeof d.newApplicationCount === 'number' ? d.newApplicationCount : 0
      setNewInquiryCount(inquiryCount)
      setNewApplicationCount(applicationCount)
      setCount(inquiryCount + applicationCount)
    } catch {
      setStaff(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!authReady) return
    void refresh()
    const id = window.setInterval(refresh, 120_000)
    return () => window.clearInterval(id)
  }, [authReady, refresh])

  useEffect(() => {
    if (!open) return
    function onDocMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [open])

  if (!isAuthenticated || !staff) return null

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-gray-700 text-gray-300 hover:border-primary/60 hover:bg-dark-lighter hover:text-white transition-all"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Team inbox"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-[60] mt-2 w-[min(100vw-2rem,22rem)] rounded-xl border border-gray-200 bg-white py-2 shadow-xl"
          style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
        >
          <div className="border-b border-gray-100 px-4 py-2">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Team Inbox</p>
            <p className="text-xs text-gray-500">
              {newInquiryCount} new inquiries, {newApplicationCount} new applications
            </p>
          </div>
          <div className="border-t border-gray-100 px-3 py-2">
            <Link
              href="/team/applications"
              onClick={() => setOpen(false)}
              className="mb-2 block rounded-lg border border-primary/30 px-3 py-2 text-center text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
            >
              View job applications
            </Link>
            <Link
              href="/team/inquiries"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-white hover:bg-primary-light transition-colors"
            >
              View inquiries
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
