import { NextResponse } from 'next/server'
import {
  createSupabaseAdmin,
  getJobAttachmentBucket,
  getResumeBucket,
} from '@/lib/supabase/admin'
import { createSupabaseRouteHandlerClient } from '@/lib/supabase/route-handler'
import { isStaffEmail } from '@/lib/staff'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_LIMIT = 100

async function requireStaff() {
  const supabase = createSupabaseRouteHandlerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user?.email || !isStaffEmail(user.email)) {
    return null
  }
  return user
}

export async function GET(request: Request) {
  const user = await requireStaff()
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let admin
  try {
    admin = createSupabaseAdmin()
  } catch {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const limitRaw = searchParams.get('limit')
  const deleted = searchParams.get('deleted') === 'true'
  const limit = Math.min(MAX_LIMIT, Math.max(1, limitRaw ? parseInt(limitRaw, 10) || 50 : 50))

  const baseSelect =
    'id, created_at, first_name, last_name, email, phone, position, location, linkedin_url, portfolio_url, experience, availability, cover_letter, cover_letter_file_name, cover_letter_storage_path, cover_letter_file_type, cover_letter_file_size_bytes, resume_file_name, resume_storage_path, resume_file_type, resume_file_size_bytes, status, source, deleted_at, deleted_by'
  const query = deleted
    ? admin.from('job_applications').select(baseSelect).not('deleted_at', 'is', null).order('deleted_at', { ascending: false }).limit(limit)
    : admin.from('job_applications').select(baseSelect).is('deleted_at', null).order('created_at', { ascending: false }).limit(limit)
  const { data: rows, error } = await query

  if (error) {
    console.error('staff job_applications list:', error)
    return NextResponse.json({ error: 'Could not load applications' }, { status: 500 })
  }

  return NextResponse.json({
    rows: rows ?? [],
    resumeBucket: getResumeBucket(),
    attachmentBucket: getJobAttachmentBucket(),
  })
}

export async function DELETE(request: Request) {
  const user = await requireStaff()
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let admin
  try {
    admin = createSupabaseAdmin()
  } catch {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const permanent = searchParams.get('permanent') === 'true'

  if (!permanent) {
    const { data: softRows, error: softError } = await admin
      .from('job_applications')
      .update({ deleted_at: new Date().toISOString(), deleted_by: user.email })
      .is('deleted_at', null)
      .select('id')
    if (softError) {
      console.error('staff job_applications clear active:', softError)
      return NextResponse.json({ error: 'Could not clear applications' }, { status: 500 })
    }
    return NextResponse.json({ success: true, mode: 'soft', affectedCount: softRows?.length ?? 0 })
  }

  const { data: deletedRows, error } = await admin
    .from('job_applications')
    .delete()
    .not('deleted_at', 'is', null)
    .select('id, resume_storage_path, cover_letter_storage_path')
  if (error) {
    console.error('staff job_applications clear trash:', error)
    return NextResponse.json({ error: 'Could not clear trash' }, { status: 500 })
  }

  const resumePaths = (deletedRows ?? [])
    .map((r) => r.resume_storage_path)
    .filter((v): v is string => typeof v === 'string' && v.length > 0)
  if (resumePaths.length > 0) {
    await admin.storage.from(getResumeBucket()).remove(resumePaths)
  }
  const coverLetterPaths = (deletedRows ?? [])
    .map((r) => r.cover_letter_storage_path)
    .filter((v): v is string => typeof v === 'string' && v.length > 0)
  if (coverLetterPaths.length > 0) {
    await admin.storage.from(getJobAttachmentBucket()).remove(coverLetterPaths)
  }

  return NextResponse.json({ success: true, mode: 'permanent', affectedCount: deletedRows?.length ?? 0 })
}
