import { NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase/admin'
import { createSupabaseRouteHandlerClient } from '@/lib/supabase/route-handler'
import { isStaffEmail } from '@/lib/staff'

export const runtime = 'nodejs'

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
