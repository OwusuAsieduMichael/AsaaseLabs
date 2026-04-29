import { NextResponse } from 'next/server'
import { createSupabaseAdmin, getProjectInquiryBucket } from '@/lib/supabase/admin'
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
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, limitRaw ? parseInt(limitRaw, 10) || 50 : 50)
  )

  const baseSelect =
    'id, created_at, full_name, email, phone, company, project_type, description, description_file_name, description_file_path, description_file_type, description_file_size_bytes, budget, timeline, status, source, deleted_at, deleted_by'

  const query = deleted
    ? admin.from('project_inquiries').select(baseSelect).not('deleted_at', 'is', null).order('deleted_at', { ascending: false }).limit(limit)
    : admin.from('project_inquiries').select(baseSelect).is('deleted_at', null).order('created_at', { ascending: false }).limit(limit)

  const { data: rows, error } = await query
  if (error) {
    console.error('staff project_inquiries list:', error)
    return NextResponse.json({ error: 'Could not load inquiries' }, { status: 500 })
  }

  return NextResponse.json({ rows: rows ?? [], fileBucket: getProjectInquiryBucket() })
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
      .from('project_inquiries')
      .update({ deleted_at: new Date().toISOString(), deleted_by: user.email })
      .is('deleted_at', null)
      .select('id')
    if (softError) {
      console.error('staff project_inquiries clear active:', softError)
      return NextResponse.json({ error: 'Could not clear inquiries' }, { status: 500 })
    }
    return NextResponse.json({ success: true, mode: 'soft', affectedCount: softRows?.length ?? 0 })
  }

  const { data: deletedRows, error } = await admin
    .from('project_inquiries')
    .delete()
    .not('deleted_at', 'is', null)
    .select('id, description_file_path')
  if (error) {
    console.error('staff project_inquiries clear trash:', error)
    return NextResponse.json({ error: 'Could not clear trash' }, { status: 500 })
  }

  const filePaths = (deletedRows ?? [])
    .map((r) => r.description_file_path)
    .filter((v): v is string => typeof v === 'string' && v.length > 0)
  if (filePaths.length > 0) {
    await admin.storage.from(getProjectInquiryBucket()).remove(filePaths)
  }

  return NextResponse.json({ success: true, mode: 'permanent', affectedCount: deletedRows?.length ?? 0 })
}
