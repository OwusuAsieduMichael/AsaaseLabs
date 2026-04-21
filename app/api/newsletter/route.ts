import { NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase/admin'

function normalizeEmail(v: unknown) {
  if (v == null || typeof v !== 'string') return ''
  return v.trim().toLowerCase().slice(0, 254)
}

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

export async function POST(request: Request) {
  let supabase
  try {
    supabase = createSupabaseAdmin()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server is not configured for newsletter yet.' },
      { status: 503 }
    )
  }

  try {
    const body = (await request.json()) as Record<string, unknown>
    const email = normalizeEmail(body.email)

    if (!email || !emailOk(email)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 })
    }

    const { error } = await supabase.from('newsletter_subscribers').upsert(
      { email, status: 'active', source: 'insights' },
      { onConflict: 'email', ignoreDuplicates: false }
    )

    if (error) {
      console.error('newsletter_subscribers upsert failed:', error)
      return NextResponse.json(
        { success: false, message: 'Could not subscribe right now. Try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Subscribed.' })
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 })
  }
}
