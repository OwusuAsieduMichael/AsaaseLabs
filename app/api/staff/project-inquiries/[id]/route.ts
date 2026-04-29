import { NextResponse } from 'next/server'
import { createSupabaseAdmin, getProjectInquiryBucket } from '@/lib/supabase/admin'
import { createSupabaseRouteHandlerClient } from '@/lib/supabase/route-handler'
import { isStaffEmail } from '@/lib/staff'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ALLOWED_STATUS = new Set(['new', 'contacted', 'qualified', 'closed', 'spam'])

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

  let body: { status?: string }
  try {
    body = (await request.json()) as { status?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const status = body.status?.trim()
  if (!status || !ALLOWED_STATUS.has(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  let admin
  try {
    admin = createSupabaseAdmin()
  } catch {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 })
  }

  const { data, error } = await admin
    .from('project_inquiries')
    .update({ status })
    .eq('id', id)
    .select('id, status')
    .single()

  if (error) {
    console.error('staff project_inquiries patch:', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
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
    .from('project_inquiries')
    .update({ deleted_at: null, deleted_by: null })
    .eq('id', id)
    .select('id')
    .single()

  if (error) {
    console.error('staff project_inquiries restore:', error)
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
    .from('project_inquiries')
    .select('id, description_file_path')
    .eq('id', id)
    .single()

  if (findError || !row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const permanent = new URL(request.url).searchParams.get('permanent') === 'true'
  if (!permanent) {
    const { error: softDeleteError } = await admin
      .from('project_inquiries')
      .update({ deleted_at: new Date().toISOString(), deleted_by: user.email })
      .eq('id', id)
    if (softDeleteError) {
      console.error('staff project_inquiries soft delete:', softDeleteError)
      return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    }
    return NextResponse.json({ success: true, id, mode: 'soft' })
  }

  const { error: deleteError } = await admin.from('project_inquiries').delete().eq('id', id)
  if (deleteError) {
    console.error('staff project_inquiries permanent delete:', deleteError)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }

  if (row.description_file_path) {
    await admin.storage.from(getProjectInquiryBucket()).remove([row.description_file_path])
  }

  return NextResponse.json({ success: true, id, mode: 'permanent' })
}
