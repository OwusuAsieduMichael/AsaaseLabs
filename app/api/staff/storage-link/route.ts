import { NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase/admin'
import { createSupabaseRouteHandlerClient } from '@/lib/supabase/route-handler'
import { isStaffEmail } from '@/lib/staff'

export const runtime = 'nodejs'

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
  const bucket = searchParams.get('bucket')?.trim() || ''
  const path = searchParams.get('path')?.trim() || ''
  const download = searchParams.get('download') === 'true'
  const filename = searchParams.get('filename')?.trim() || undefined
  if (!bucket || !path) {
    return NextResponse.json({ error: 'Missing bucket/path' }, { status: 400 })
  }

  const { data, error } = await admin.storage.from(bucket).createSignedUrl(path, 60 * 5, {
    download: download ? filename || true : undefined,
  })
  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: 'Could not create file link' }, { status: 500 })
  }

  return NextResponse.json({ url: data.signedUrl })
}
