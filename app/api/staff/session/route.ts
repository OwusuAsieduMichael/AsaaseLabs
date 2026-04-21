import { NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase/admin'
import { createSupabaseRouteHandlerClient } from '@/lib/supabase/route-handler'
import { isStaffEmail } from '@/lib/staff'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const supabase = createSupabaseRouteHandlerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.email || !isStaffEmail(user.email)) {
      return NextResponse.json({ staff: false, newInquiryCount: 0, newApplicationCount: 0 })
    }

    let newInquiryCount = 0
    let newApplicationCount = 0
    try {
      const admin = createSupabaseAdmin()
      const { count, error } = await admin
        .from('project_inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new')
        .is('deleted_at', null)
      if (!error && typeof count === 'number') newInquiryCount = count
      const { count: appCount, error: appError } = await admin
        .from('job_applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new')
        .is('deleted_at', null)
      if (!appError && typeof appCount === 'number') newApplicationCount = appCount
    } catch {
      /* admin not configured */
    }

    return NextResponse.json({ staff: true, newInquiryCount, newApplicationCount })
  } catch {
    return NextResponse.json({ staff: false, newInquiryCount: 0, newApplicationCount: 0 })
  }
}
