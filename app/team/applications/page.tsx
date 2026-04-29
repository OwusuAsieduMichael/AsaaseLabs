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
  first_name: string
  last_name: string
  email: string
  phone: string | null
  position: string | null
  location: string | null
  experience: string | null
  availability: string | null
  cover_letter: string | null
  cover_letter_file_name: string | null
  cover_letter_storage_path: string | null
  cover_letter_file_type: string | null
  cover_letter_file_size_bytes: number | null
  resume_file_name: string | null
  resume_storage_path: string | null
  resume_file_type: string | null
  resume_file_size_bytes: number | null
  status: string
  source: string | null
  deleted_at: string | null
  deleted_by: string | null
}

const STATUS_OPTIONS = ['new', 'shortlisted', 'interview', 'hired', 'rejected'] as const

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

export default function TeamApplicationsPage() {
  const { isAuthenticated, authReady } = useAuth()
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [resumeBucket, setResumeBucket] = useState('resumes')
  const [attachmentBucket, setAttachmentBucket] = useState('job-attachments')
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
    const listRes = await fetch(`/api/staff/job-applications?limit=100&deleted=${showDeleted}`, {
      credentials: 'same-origin',
    })
    if (!listRes.ok) {
      setError('Could not load job applications.')
      setRows([])
      setLoading(false)
      return
    }
    const data = (await listRes.json()) as {
      rows?: Row[]
      resumeBucket?: string
      attachmentBucket?: string
    }
    setRows(Array.isArray(data.rows) ? data.rows : [])
    if (data.resumeBucket) setResumeBucket(data.resumeBucket)
    if (data.attachmentBucket) setAttachmentBucket(data.attachmentBucket)
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
    const r = await fetch(`/api/staff/job-applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ status, note: notes[id] || '', notifyCandidate: true }),
    })
    if (!r.ok) {
      setError('Could not update application status.')
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
    const r = await fetch(`/api/staff/job-applications/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
    if (!r.ok) {
      setError('Could not move application to recycle bin.')
      return
    }
    setRows((prev) => prev.filter((row) => row.id !== id))
    setError(null)
  }

  const restoreRow = async (id: string) => {
    const r = await fetch(`/api/staff/job-applications/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ action: 'restore' }),
    })
    if (!r.ok) {
      setError('Could not restore application.')
      return
    }
    setRows((prev) => prev.filter((row) => row.id !== id))
    setError(null)
  }

  const deletePermanently = async (id: string) => {
    const r = await fetch(`/api/staff/job-applications/${id}?permanent=true`, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
    if (!r.ok) {
      setError('Could not permanently delete application.')
      return
    }
    setRows((prev) => prev.filter((row) => row.id !== id))
    setError(null)
  }

  const clearAll = async () => {
    setIsClearing(true)
    const endpoint = showDeleted
      ? '/api/staff/job-applications?permanent=true'
      : '/api/staff/job-applications'
    const r = await fetch(endpoint, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
    setIsClearing(false)
    if (!r.ok) {
      setError(showDeleted ? 'Could not empty recycle bin.' : 'Could not move applications to recycle bin.')
      return
    }
    setRows([])
    setError(null)
  }

  const openStorageFile = async (bucket: string, path: string) => {
    const fileTab = window.open('', '_blank')
    if (!fileTab) {
      setError('Popup blocked. Please allow popups for this site and try again.')
      return
    }
    fileTab.document.write('<p style="font-family: sans-serif; padding: 20px;">Opening file...</p>')
    const r = await fetch(
      `/api/staff/storage-link?bucket=${encodeURIComponent(bucket)}&path=${encodeURIComponent(path)}`,
      { credentials: 'same-origin' }
    )
    const data = (await r.json()) as { url?: string; error?: string }
    if (!r.ok || !data.url) {
      fileTab.close()
      setError(data.error || 'Could not open file.')
      return
    }
    fileTab.location.href = data.url
  }

  const downloadStorageFile = async (bucket: string, path: string, filename: string) => {
    const r = await fetch(
      `/api/staff/storage-link?bucket=${encodeURIComponent(bucket)}&path=${encodeURIComponent(path)}&download=true&filename=${encodeURIComponent(filename)}`,
      { credentials: 'same-origin' }
    )
    const data = (await r.json()) as { url?: string; error?: string }
    if (!r.ok || !data.url) {
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
        <div className="section-container pt-32 pb-24 text-center text-gray-400">Loading...</div>
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
          <p className="text-gray-400 mb-6">Sign in with a team account to view job applications.</p>
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
              {showDeleted ? 'Job applications: Recycle Bin' : 'Job applications'}
            </h1>
            <p className="text-gray-400 text-sm">
              {showDeleted
                ? 'Soft-deleted applications are held here until permanently removed.'
                : 'Manage applicant stages. Changing status sends a candidate update email.'}
            </p>
          </div>
          <a href="/team/inquiries" className="text-sm font-semibold text-primary hover:underline">
            View project inquiries
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
                showDeleted ? 'Empty recycle bin?' : 'Move all applications to recycle bin?',
                showDeleted
                  ? 'This permanently deletes all applications currently in the recycle bin.'
                  : 'All active applications will be moved to recycle bin. You can restore them later.',
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
                <th className="px-4 py-3 font-semibold">Applicant</th>
                <th className="px-4 py-3 font-semibold">Position</th>
                <th className="px-4 py-3 font-semibold">Experience</th>
                <th className="px-4 py-3 font-semibold">Resume</th>
                <th className="px-4 py-3 font-semibold">Cover Letter</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Update Note</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-800/80 last:border-0 text-gray-300">
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 min-w-[220px]">
                    <p className="font-medium text-white">{`${row.first_name ?? ''} ${row.last_name ?? ''}`.trim()}</p>
                    <a href={`mailto:${row.email}`} className="text-xs text-primary hover:underline">
                      {row.email}
                    </a>
                    {row.phone && <p className="text-xs text-gray-500 mt-1">{row.phone}</p>}
                  </td>
                  <td className="px-4 py-3 max-w-[180px] truncate">{row.position ?? 'N/A'}</td>
                  <td className="px-4 py-3 max-w-[120px] truncate">{row.experience ?? 'N/A'}</td>
                  <td className="px-4 py-3 max-w-[220px] text-xs">
                    {row.resume_file_name ? (
                      <div className="space-y-1">
                        {row.resume_storage_path ? (
                          <button
                            type="button"
                            onClick={() => openStorageFile(resumeBucket, row.resume_storage_path!)}
                            className="text-primary hover:underline truncate max-w-[200px] text-left"
                            title={row.resume_file_name}
                          >
                            {row.resume_file_name}
                          </button>
                        ) : (
                          <span className="truncate max-w-[200px] block" title={row.resume_file_name}>
                            {row.resume_file_name}
                          </span>
                        )}
                        <p className="text-gray-500">
                          {row.resume_file_type || 'Unknown type'}
                          {row.resume_file_size_bytes ? ` • ${Math.round(row.resume_file_size_bytes / 1024)} KB` : ''}
                        </p>
                        <span className="inline-flex items-center rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          {fileBadgeLabel(row.resume_file_type, row.resume_file_name)}
                        </span>
                        {row.resume_storage_path && (
                          <button
                            type="button"
                            onClick={() =>
                              downloadStorageFile(
                                resumeBucket,
                                row.resume_storage_path!,
                                row.resume_file_name || 'resume'
                              )
                            }
                            className="inline-flex items-center rounded-md border border-gray-600 px-2 py-0.5 text-[10px] font-semibold text-gray-300 hover:border-primary hover:text-primary transition-colors"
                          >
                            Download
                          </button>
                        )}
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-[260px] text-xs">
                    <div className="space-y-1">
                      <p className="truncate" title={row.cover_letter ?? ''}>
                        {row.cover_letter || 'N/A'}
                      </p>
                      {row.cover_letter_file_name && row.cover_letter_storage_path && (
                        <>
                          <button
                            type="button"
                            onClick={() => openStorageFile(attachmentBucket, row.cover_letter_storage_path!)}
                            className="text-primary hover:underline truncate max-w-[240px] text-left"
                            title={row.cover_letter_file_name}
                          >
                            {row.cover_letter_file_name}
                          </button>
                          <p className="text-gray-500">
                            {row.cover_letter_file_type || 'Unknown type'}
                            {row.cover_letter_file_size_bytes
                              ? ` • ${Math.round(row.cover_letter_file_size_bytes / 1024)} KB`
                              : ''}
                          </p>
                          <span className="inline-flex items-center rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                            {fileBadgeLabel(row.cover_letter_file_type, row.cover_letter_file_name)}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              downloadStorageFile(
                                attachmentBucket,
                                row.cover_letter_storage_path!,
                                row.cover_letter_file_name || 'cover-letter'
                              )
                            }
                            className="inline-flex items-center rounded-md border border-gray-600 px-2 py-0.5 text-[10px] font-semibold text-gray-300 hover:border-primary hover:text-primary transition-colors"
                          >
                            Download
                          </button>
                        </>
                      )}
                    </div>
                  </td>
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
                  <td className="px-4 py-3 min-w-[220px]">
                    <textarea
                      rows={2}
                      value={notes[row.id] ?? ''}
                      onChange={(e) =>
                        setNotes((prev) => ({ ...prev, [row.id]: e.target.value.slice(0, 5000) }))
                      }
                      className="w-full rounded-lg border border-gray-700 bg-dark-lighter px-2 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Optional note included in applicant update email"
                    />
                  </td>
                  <td className="px-4 py-3">
                    {showDeleted ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openConfirm(
                              'Restore application?',
                              'This application will return to the active inbox.',
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
                              'This application and all attached files will be permanently removed.',
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
                            'Move application to recycle bin?',
                            'This application will be removed from active notifications and can be restored later.',
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
            <p className="px-4 py-8 text-center text-gray-500 text-sm">No applications yet.</p>
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
