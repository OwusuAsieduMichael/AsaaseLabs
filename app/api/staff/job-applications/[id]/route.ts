import { NextResponse } from 'next/server'
import {
  createSupabaseAdmin,
  getJobAttachmentBucket,
  getResumeBucket,
} from '@/lib/supabase/admin'
import { createSupabaseRouteHandlerClient } from '@/lib/supabase/route-handler'
import { isStaffEmail } from '@/lib/staff'
import { buildApplicationStatusEmail, sendApplicantEmail } from '@/lib/email/notify'

export const runtime = 'nodejs'

const ALLOWED_STATUS = new Set(['new', 'shortlisted', 'interview', 'hired', 'rejected', 'reviewing'])

async function requireStaff() {
  const supabase = createSupabaseRouteHandlerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user?.email || !isStaffEmail(user.email)) return null
  return user
}

type Params = { params: { id: string } }

export async function PATCH(request: Request, { params }: Params) {
  const user = await requireStaff()
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const id = params.id?.trim()
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  let body: { status?: string; note?: string; notifyCandidate?: boolean }
  try {
    body = (await request.json()) as { status?: string; note?: string; notifyCandidate?: boolean }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const status = body.status?.trim()
  if (!status || !ALLOWED_STATUS.has(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 5000) : ''
  const notifyCandidate = body.notifyCandidate !== false

  let admin
  try {
    admin = createSupabaseAdmin()
  } catch {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 })
  }

  const { data, error } = await admin
    .from('job_applications')
    .update({
      status,
      status_note: note || null,
      status_updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('id, status, first_name, position, email')
    .single()

  if (error) {
    console.error('staff job_applications patch:', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  if (notifyCandidate) {
    const { subject, html } = buildApplicationStatusEmail({
      firstName: data.first_name || '',
      position: data.position || '',
      status: status as 'new' | 'shortlisted' | 'interview' | 'hired' | 'rejected' | 'reviewing',
      note,
    })
    sendApplicantEmail({ to: data.email || '', subject, html }).then((r) => {
      if (!r.sent) console.warn('[email] application status email:', r.reason)
    })
    await admin
      .from('job_applications')
      .update({ candidate_notified_at: new Date().toISOString() })
      .eq('id', id)
  }

  return NextResponse.json({ row: data })
}

export async function POST(request: Request, { params }: Params) {
  const user = await requireStaff()
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const id = params.id?.trim()
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  let body: { action?: string }
  try {
    body = (await request.json()) as { action?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  if (body.action !== 'restore') {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  let admin
  try {
    admin = createSupabaseAdmin()
  } catch {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 })
  }

  const { data, error } = await admin
    .from('job_applications')
    .update({ deleted_at: null, deleted_by: null })
    .eq('id', id)
    .select('id')
    .single()
  if (error) {
    console.error('staff job_applications restore:', error)
    return NextResponse.json({ error: 'Restore failed' }, { status: 500 })
  }

  return NextResponse.json({ row: data })
}

export async function DELETE(request: Request, { params }: Params) {
  const user = await requireStaff()
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const id = params.id?.trim()
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  let admin
  try {
    admin = createSupabaseAdmin()
  } catch {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 })
  }

  const { data: row, error: findError } = await admin
    .from('job_applications')
    .select('id, resume_storage_path, cover_letter_storage_path')
    .eq('id', id)
    .single()
  if (findError || !row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const permanent = new URL(request.url).searchParams.get('permanent') === 'true'
  if (!permanent) {
    const { error: softDeleteError } = await admin
      .from('job_applications')
      .update({ deleted_at: new Date().toISOString(), deleted_by: user.email })
      .eq('id', id)
    if (softDeleteError) {
      console.error('staff job_applications soft delete:', softDeleteError)
      return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    }
    return NextResponse.json({ success: true, id, mode: 'soft' })
  }

  const { error: deleteError } = await admin.from('job_applications').delete().eq('id', id)
  if (deleteError) {
    console.error('staff job_applications permanent delete:', deleteError)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }

  if (row.resume_storage_path) {
    await admin.storage.from(getResumeBucket()).remove([row.resume_storage_path])
  }
  if (row.cover_letter_storage_path) {
    await admin.storage.from(getJobAttachmentBucket()).remove([row.cover_letter_storage_path])
  }

  return NextResponse.json({ success: true, id, mode: 'permanent' })
}
