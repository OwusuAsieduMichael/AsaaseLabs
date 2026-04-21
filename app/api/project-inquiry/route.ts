import { NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase/admin'
import { userFacingMessageForSupabaseError } from '@/lib/supabase/errors'
import { buildProjectInquiryEmail, sendTeamEmail } from '@/lib/email/notify'

function str(v: unknown, max: number) {
  if (v == null || typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

export async function POST(request: Request) {
  let supabase
  try {
    supabase = createSupabaseAdmin()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server is not configured for inquiries yet.' },
      { status: 503 }
    )
  }

  try {
    const body = (await request.json()) as Record<string, unknown>

    const fullName = str(body.name, 200)
    const email = str(body.email, 254)
    const phone = str(body.phone, 60)
    const company = str(body.company, 200)
    const projectType = str(body.projectType, 120)
    const description = str(body.description, 20000)
    const budget = str(body.budget, 120)
    const timeline = str(body.timeline, 120)

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, message: 'Please provide your name and email.' },
        { status: 400 }
      )
    }

    const { error } = await supabase.from('project_inquiries').insert({
      full_name: fullName,
      email,
      phone: phone || null,
      company: company || null,
      project_type: projectType || null,
      description: description || null,
      budget: budget || null,
      timeline: timeline || null,
      source: 'get-started',
    })

    if (error) {
      console.error('project_inquiries insert failed:', error)
      const specific = userFacingMessageForSupabaseError(error)
      const dev =
        process.env.NODE_ENV === 'development'
          ? [error.message, error.code, error.details].filter(Boolean).join(' — ')
          : ''
      return NextResponse.json(
        {
          success: false,
          message: specific ?? 'Could not save your request. Try again later.',
          ...(dev ? { devHint: dev } : {}),
        },
        { status: 500 }
      )
    }

    const { subject, html } = buildProjectInquiryEmail({
      fullName,
      email,
      phone,
      company,
      projectType,
      description,
      budget,
      timeline,
    })
    sendTeamEmail({ subject, html, replyTo: email }).then((r) => {
      if (!r.sent) console.warn('[email] project inquiry notification:', r.reason)
    })

    return NextResponse.json({ success: true, message: 'Inquiry received.' })
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 })
  }
}
