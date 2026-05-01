/**
 * Public site origin for Supabase auth redirects (email confirmation, magic links).
 * Production: set NEXT_PUBLIC_SITE_URL to your canonical URL (e.g. https://www.asaaselabs.tech).
 * When unset in the browser, falls back to window.location.origin for local dev and Vercel previews.
 */
export function getPublicSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '') ?? ''
  if (fromEnv) return fromEnv
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return ''
}

export function getAuthCallbackUrl(): string {
  const base = getPublicSiteUrl()
  if (!base) return ''
  return `${base}/auth/callback`
}
