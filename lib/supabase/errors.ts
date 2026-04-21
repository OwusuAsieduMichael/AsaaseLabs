/** Maps common PostgREST / Supabase auth errors to a safe, actionable user message. */
export function userFacingMessageForSupabaseError(error: {
  message?: string
  code?: string
}): string | null {
  const m = (error.message ?? '').toLowerCase()

  if (
    m.includes('invalid api key') ||
    m.includes('jwt expired') ||
    m.includes('invalid jwt')
  ) {
    return (
      'Saving failed because the Supabase service key is wrong or does not match this project. ' +
      'In Supabase: Settings → API → copy the service_role key (not the anon key). ' +
      'Put it in .env.local as SUPABASE_SERVICE_ROLE_KEY (same project as NEXT_PUBLIC_SUPABASE_URL), then restart npm run dev.'
    )
  }

  if (m.includes('relation') && m.includes('does not exist')) {
    return (
      'The database table for this form is missing. Run your Supabase SQL migration that creates project_inquiries (see supabase/migrations), then try again.'
    )
  }

  return null
}
