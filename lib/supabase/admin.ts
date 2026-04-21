import { createClient } from '@supabase/supabase-js'
import { trimEnvValue } from '@/lib/supabase/env-server'

/**
 * Server-only Supabase client (service role). Bypasses RLS.
 * Use only in Route Handlers / Server Actions — never import from client components.
 */
export function createSupabaseAdmin() {
  const url = trimEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const key = trimEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY)
  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function getResumeBucket() {
  return process.env.SUPABASE_RESUME_BUCKET?.trim() || 'resumes'
}

export function getJobAttachmentBucket() {
  return process.env.SUPABASE_JOB_ATTACHMENT_BUCKET?.trim() || 'job-attachments'
}

export function getProjectInquiryBucket() {
  return process.env.SUPABASE_PROJECT_INQUIRY_BUCKET?.trim() || 'project-inquiries'
}
