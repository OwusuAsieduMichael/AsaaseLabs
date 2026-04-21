import { NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase/admin'
import { createSupabaseRouteHandlerClient } from '@/lib/supabase/route-handler'
import { isStaffEmail } from '@/lib/staff'

export const runtime = 'nodejs'

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
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, limitRaw ? parseInt(limitRaw, 10) || 50 : 50)
  )

  const { data: rows, error } = await admin
    .from('project_inquiries')
    .select(
      'id, created_at, full_name, email, phone, company, project_type, description, budget, timeline, status, source'
    )
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('staff project_inquiries list:', error)
    return NextResponse.json({ error: 'Could not load inquiries' }, { status: 500 })
  }

  return NextResponse.json({ rows: rows ?? [] })
}
