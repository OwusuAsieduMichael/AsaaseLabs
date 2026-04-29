'use client'

import { useAuth } from '@/app/context/AuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'
import ConfirmActionModal from '@/components/ConfirmActionModal'
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
  description_file_name: string | null
  description_file_path: string | null
  description_file_type: string | null
  description_file_size_bytes: number | null
  budget: string | null
  timeline: string | null
  status: string
  source: string | null
  deleted_at: string | null
  deleted_by: string | null
}

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'closed', 'spam'] as const

function fileBadgeLabel(type: string | null, name: string | null) {
  const mime = (type || '').toLowerCase()
  const ext = (name?.split('.').pop() || '').toUpperCase()
  if (mime.includes('pdf') || ext === 'PDF') return 'PDF'
  if (mime.includes('word') || ext === 'DOC' || ext === 'DOCX') return ext || 'DOC'
  if (mime.includes('markdown') || ext === 'MD') return 'MD'
  if (mime.includes('plain') || ext === 'TXT') return 'TXT'
  if (ext) return ext
  return 'FILE'
}

export default function TeamInquiriesPage() {
  const { isAuthenticated, authReady } = useAuth()
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [fileBucket, setFileBucket] = useState('project-inquiries')
  const [isClearing, setIsClearing] = useState(false)
  const [showDeleted, setShowDeleted] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmTitle, setConfirmTitle] = useState('')
  const [confirmDescription, setConfirmDescription] = useState('')
  const [confirmLabel, setConfirmLabel] = useState('Confirm')
  const [confirmBusy, setConfirmBusy] = useState(false)
  const [pendingAction, setPendingAction] = useState<null | (() => Promise<void>)>(null)

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
    const listRes = await fetch(`/api/staff/project-inquiries?limit=100&deleted=${showDeleted}`, {
      credentials: 'same-origin',
    })
    if (!listRes.ok) {
      setError('Could not load inquiries.')
      setRows([])
      setLoading(false)
      return
    }
    const data = (await listRes.json()) as { rows?: Row[]; fileBucket?: string }
    setRows(Array.isArray(data.rows) ? data.rows : [])
    if (data.fileBucket) setFileBucket(data.fileBucket)
    setLoading(false)
  }, [showDeleted])

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

  const openConfirm = (title: string, description: string, label: string, action: () => Promise<void>) => {
    setConfirmTitle(title)
    setConfirmDescription(description)
    setConfirmLabel(label)
    setPendingAction(() => action)
    setConfirmOpen(true)
  }

  const handleConfirm = async () => {
    if (!pendingAction) return
    setConfirmBusy(true)
    await pendingAction()
    setConfirmBusy(false)
    setConfirmOpen(false)
    setPendingAction(null)
  }

  const moveToBin = async (id: string) => {
    const res = await fetch(`/api/staff/project-inquiries/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
    if (!res.ok) {
      setError('Could not move inquiry to recycle bin.')
      return
    }
    setRows((prev) => prev.filter((r) => r.id !== id))
    setError(null)
  }

  const restoreRow = async (id: string) => {
    const res = await fetch(`/api/staff/project-inquiries/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ action: 'restore' }),
    })
    if (!res.ok) {
      setError('Could not restore inquiry.')
      return
    }
    setRows((prev) => prev.filter((r) => r.id !== id))
    setError(null)
  }

  const deletePermanently = async (id: string) => {
    const res = await fetch(`/api/staff/project-inquiries/${id}?permanent=true`, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
    if (!res.ok) {
      setError('Could not permanently delete inquiry.')
      return
    }
    setRows((prev) => prev.filter((r) => r.id !== id))
    setError(null)
  }

  const clearAll = async () => {
    setIsClearing(true)
    const endpoint = showDeleted
      ? '/api/staff/project-inquiries?permanent=true'
      : '/api/staff/project-inquiries'
    const res = await fetch(endpoint, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
    setIsClearing(false)
    if (!res.ok) {
      setError(showDeleted ? 'Could not empty recycle bin.' : 'Could not move inquiries to recycle bin.')
      return
    }
    setRows([])
    setError(null)
  }

  const openStorageFile = async (path: string) => {
    const fileTab = window.open('', '_blank')
    if (!fileTab) {
      setError('Popup blocked. Please allow popups for this site and try again.')
      return
    }
    fileTab.document.write('<p style="font-family: sans-serif; padding: 20px;">Opening file...</p>')
    const res = await fetch(
      `/api/staff/storage-link?bucket=${encodeURIComponent(fileBucket)}&path=${encodeURIComponent(path)}`,
      { credentials: 'same-origin' }
    )
    const data = (await res.json()) as { url?: string; error?: string }
    if (!res.ok || !data.url) {
      fileTab.close()
      setError(data.error || 'Could not open file.')
      return
    }
    fileTab.location.href = data.url
  }

  const downloadStorageFile = async (path: string, filename: string) => {
    const res = await fetch(
      `/api/staff/storage-link?bucket=${encodeURIComponent(fileBucket)}&path=${encodeURIComponent(path)}&download=true&filename=${encodeURIComponent(filename)}`,
      { credentials: 'same-origin' }
    )
    const data = (await res.json()) as { url?: string; error?: string }
    if (!res.ok || !data.url) {
      setError(data.error || 'Could not download file.')
      return
    }
    const link = document.createElement('a')
    link.href = data.url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
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
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {showDeleted ? 'Project inquiries: Recycle Bin' : 'Project inquiries'}
            </h1>
            <p className="text-gray-400 text-sm">
              {showDeleted
                ? 'Soft-deleted inquiries are kept here until permanently removed.'
                : 'Submissions from Get Started. Email notifications are separate; this is your in-app log.'}
            </p>
          </div>
          <a href="/team/applications" className="text-sm font-semibold text-primary hover:underline">
            View job applications
          </a>
          <button
            type="button"
            onClick={() => setShowDeleted((v) => !v)}
            className="text-xs font-semibold rounded-md border border-gray-600 px-3 py-1.5 text-gray-200 hover:border-primary hover:text-primary"
          >
            {showDeleted ? 'Back to active' : 'Open recycle bin'}
          </button>
          <button
            type="button"
            onClick={() =>
              openConfirm(
                showDeleted ? 'Empty recycle bin?' : 'Move all inquiries to recycle bin?',
                showDeleted
                  ? 'This permanently deletes all inquiries currently in the recycle bin.'
                  : 'All active inquiries will be moved to recycle bin. You can still restore them later.',
                showDeleted ? 'Empty bin' : 'Move all',
                clearAll
              )
            }
            disabled={isClearing || rows.length === 0}
            className="text-xs font-semibold rounded-md border border-red-500/40 px-3 py-1.5 text-red-300 hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isClearing ? 'Processing...' : showDeleted ? 'Empty bin' : 'Move all to bin'}
          </button>
        </div>

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
                <th className="px-4 py-3 font-semibold">Description File</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
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
                  <td className="px-4 py-3 max-w-[140px] truncate">{row.project_type ?? 'N/A'}</td>
                  <td className="px-4 py-3 max-w-[120px] truncate">{row.budget ?? 'N/A'}</td>
                  <td className="px-4 py-3">
                    {showDeleted ? (
                      <span className="text-xs text-gray-400">{row.status}</span>
                    ) : (
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
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate text-xs" title={row.description ?? ''}>
                    {row.description ?? 'N/A'}
                  </td>
                  <td className="px-4 py-3 max-w-[220px] text-xs">
                    {row.description_file_name && row.description_file_path ? (
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => openStorageFile(row.description_file_path!)}
                          className="text-primary hover:underline truncate max-w-[200px] text-left"
                          title={row.description_file_name}
                        >
                          {row.description_file_name}
                        </button>
                        <p className="text-gray-500">
                          {row.description_file_type || 'Unknown type'}
                          {row.description_file_size_bytes ? ` • ${Math.round(row.description_file_size_bytes / 1024)} KB` : ''}
                        </p>
                        <span className="inline-flex items-center rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          {fileBadgeLabel(row.description_file_type, row.description_file_name)}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            downloadStorageFile(row.description_file_path!, row.description_file_name!)
                          }
                          className="inline-flex items-center rounded-md border border-gray-600 px-2 py-0.5 text-[10px] font-semibold text-gray-300 hover:border-primary hover:text-primary transition-colors"
                        >
                          Download
                        </button>
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {showDeleted ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openConfirm(
                              'Restore inquiry?',
                              'This inquiry will return to the active inbox.',
                              'Restore',
                              async () => restoreRow(row.id)
                            )
                          }
                          className="text-xs font-semibold rounded-md border border-primary/40 px-2.5 py-1 text-primary hover:bg-primary/10"
                        >
                          Restore
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            openConfirm(
                              'Delete permanently?',
                              'This inquiry and any attached files will be permanently removed.',
                              'Delete permanently',
                              async () => deletePermanently(row.id)
                            )
                          }
                          className="text-xs font-semibold rounded-md border border-red-500/40 px-2.5 py-1 text-red-300 hover:bg-red-500/10"
                        >
                          Delete forever
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          openConfirm(
                            'Move inquiry to recycle bin?',
                            'This inquiry will be removed from active notifications and can be restored later.',
                            'Move to bin',
                            async () => moveToBin(row.id)
                          )
                        }
                        className="text-xs font-semibold rounded-md border border-red-500/40 px-2.5 py-1 text-red-300 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    )}
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
      <ConfirmActionModal
        isOpen={confirmOpen}
        title={confirmTitle}
        description={confirmDescription}
        confirmLabel={confirmLabel}
        isLoading={confirmBusy}
        onClose={() => {
          if (!confirmBusy) {
            setConfirmOpen(false)
            setPendingAction(null)
          }
        }}
        onConfirm={handleConfirm}
      />
      <Footer />
    </main>
  )
}
