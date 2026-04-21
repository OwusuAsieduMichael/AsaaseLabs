'use client'

import { useAuth } from '@/app/context/AuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'
import { useCallback, useEffect, useState } from 'react'

type Row = {
  id: string
  created_at: string
  full_name: string
  email: string
  phone: string | null
  company: string | null
  project_type: string | null
  description: string | null
  budget: string | null
  timeline: string | null
  status: string
  source: string | null
}

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'closed', 'spam'] as const

export default function TeamInquiriesPage() {
  const { isAuthenticated, authReady } = useAuth()
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setError(null)
    const sessionRes = await fetch('/api/staff/session', { credentials: 'same-origin' })
    const session = (await sessionRes.json()) as { staff?: boolean }
    if (!session.staff) {
      setAllowed(false)
      setRows([])
      setLoading(false)
      return
    }
    setAllowed(true)
    const listRes = await fetch('/api/staff/project-inquiries?limit=100', { credentials: 'same-origin' })
    if (!listRes.ok) {
      setError('Could not load inquiries.')
      setRows([])
      setLoading(false)
      return
    }
    const data = (await listRes.json()) as { rows?: Row[] }
    setRows(Array.isArray(data.rows) ? data.rows : [])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!authReady) return
    if (!isAuthenticated) {
      setAllowed(false)
      setLoading(false)
      return
    }
    void load()
  }, [authReady, isAuthenticated, load])

  const updateStatus = async (id: string, status: string) => {
    const r = await fetch(`/api/staff/project-inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ status }),
    })
    if (!r.ok) {
      setError('Could not update status.')
      return
    }
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)))
    setError(null)
  }

  if (!authReady || loading) {
    return (
      <main className="min-h-screen bg-dark">
        <Navbar />
        <div className="section-container pt-32 pb-24 text-center text-gray-400">Loading…</div>
        <Footer />
      </main>
    )
  }

  if (!isAuthenticated || allowed === false) {
    return (
      <main className="min-h-screen bg-dark">
        <Navbar />
        <div className="section-container pt-32 pb-24 max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-3">Restricted</h1>
          <p className="text-gray-400 mb-6">Sign in with a team account to view project inquiries.</p>
          <a href="/" className="text-primary font-semibold hover:underline">
            Back to home
          </a>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      <div className="section-container pt-28 pb-16">
        <PageBackNav fallbackHref="/" fallbackLabel="Home" className="mb-6" />
        <h1 className="text-3xl font-bold text-white mb-2">Project inquiries</h1>
        <p className="text-gray-400 text-sm mb-8">
          Submissions from Get Started. Email notifications are separate; this is your in-app log.
        </p>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-dark-card">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Budget</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-800/80 last:border-0 text-gray-300">
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{row.full_name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${row.email}`} className="text-primary hover:underline">
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 max-w-[140px] truncate">{row.project_type ?? '—'}</td>
                  <td className="px-4 py-3 max-w-[120px] truncate">{row.budget ?? '—'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={row.status}
                      onChange={(e) => updateStatus(row.id, e.target.value)}
                      className="rounded-lg border border-gray-700 bg-dark-lighter px-2 py-1.5 text-xs text-white focus:ring-2 focus:ring-primary"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate text-xs" title={row.description ?? ''}>
                    {row.description ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <p className="px-4 py-8 text-center text-gray-500 text-sm">No inquiries yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
