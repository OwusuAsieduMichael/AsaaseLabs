import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Completes email confirmation / OAuth PKCE: Supabase redirects here with ?code=...
 * Session cookies are attached to the redirect response (required in App Router).
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const nextPath = url.searchParams.get('next')?.trim() || '/'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnon) {
    return NextResponse.redirect(new URL('/?error=auth_config', url.origin))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=auth_missing_code', url.origin))
  }

  const safeNext = nextPath.startsWith('/') && !nextPath.startsWith('//') ? nextPath : '/'
  let redirectResponse = NextResponse.redirect(new URL(safeNext, url.origin))

  const supabase = createServerClient(supabaseUrl, supabaseAnon, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          redirectResponse.cookies.set(name, value, options)
        })
      },
    },
  })

  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    return NextResponse.redirect(new URL('/?error=auth_exchange', url.origin))
  }

  return redirectResponse
}
