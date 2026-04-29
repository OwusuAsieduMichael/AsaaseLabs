import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { createSupabaseAdmin, getProjectInquiryBucket } from '@/lib/supabase/admin'
import { userFacingMessageForSupabaseError } from '@/lib/supabase/errors'
import { buildProjectInquiryEmail, sendTeamEmail } from '@/lib/email/notify'

export const dynamic = 'force-dynamic'

const MAX_DESCRIPTION_FILE_BYTES = 10 * 1024 * 1024

function str(fd: FormData, key: string, max: number) {
  const v = fd.get(key)
  if (v == null || typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

function safeFileName(name: string) {
  const n = name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 180)
  return n || 'project-description.pdf'
}

async function ensureBucket(supabase: ReturnType<typeof createSupabaseAdmin>, bucket: string) {
  const { data, error } = await supabase.storage.getBucket(bucket)
  if (!error && data?.id) return { ok: true as const }

  const { error: createError } = await supabase.storage.createBucket(bucket, {
    public: false,
    fileSizeLimit: `${MAX_DESCRIPTION_FILE_BYTES}`,
  })
  if (createError && !/already exists/i.test(createError.message || '')) {
    return { ok: false as const, error: createError }
  }
  return { ok: true as const }
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
    const formData = await request.formData()

    const fullName = str(formData, 'name', 200)
    const email = str(formData, 'email', 254)
    const phone = str(formData, 'phone', 60)
    const company = str(formData, 'company', 200)
    const projectType = str(formData, 'projectType', 120)
    const description = str(formData, 'description', 20000)
    const budget = str(formData, 'budget', 120)
    const timeline = str(formData, 'timeline', 120)
    const descriptionFile = formData.get('descriptionFile')
    let descriptionFilePath: string | null = null
    let descriptionFileName = ''
    let descriptionFileType = ''
    let descriptionFileSize = 0
    const id = randomUUID()
    const bucket = getProjectInquiryBucket()
    const hasDescriptionFile =
      descriptionFile && typeof descriptionFile !== 'string' && descriptionFile.size > 0
    const termsAcceptedRaw = formData.get('termsAccepted')
    const termsAccepted =
      typeof termsAcceptedRaw === 'string' && termsAcceptedRaw.toLowerCase() === 'true'

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, message: 'Please provide your name and email.' },
        { status: 400 }
      )
    }
    if (!description && !hasDescriptionFile) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide project description text or upload a project description file.',
        },
        { status: 400 }
      )
    }
    if (!termsAccepted) {
      return NextResponse.json(
        { success: false, message: 'Please accept the Terms of Service and Privacy Policy to continue.' },
        { status: 400 }
      )
    }
    if (hasDescriptionFile && descriptionFile.size > MAX_DESCRIPTION_FILE_BYTES) {
      return NextResponse.json(
        { success: false, message: 'Project description file is too large (max 10 MB).' },
        { status: 400 }
      )
    }

    if (hasDescriptionFile) {
      const bucketReady = await ensureBucket(supabase, bucket)
      if (!bucketReady.ok) {
        console.error('project_inquiries bucket setup failed:', bucketReady.error)
        return NextResponse.json(
          {
            success: false,
            message: 'Could not prepare project file storage. Please try again shortly.',
          },
          { status: 500 }
        )
      }
      descriptionFileName = safeFileName(descriptionFile.name)
      descriptionFilePath = `${id}/project-description-${descriptionFileName}`
      descriptionFileType = descriptionFile.type || 'application/octet-stream'
      descriptionFileSize = descriptionFile.size
      const buffer = Buffer.from(await descriptionFile.arrayBuffer())
      const { error: uploadError } = await supabase.storage.from(bucket).upload(descriptionFilePath, buffer, {
        contentType: descriptionFileType,
        upsert: false,
      })
      if (uploadError) {
        console.error('project_inquiries description file upload failed:', uploadError)
        return NextResponse.json(
          { success: false, message: 'Could not upload project description file. Please try another file.' },
          { status: 500 }
        )
      }
    }

    const { error } = await supabase.from('project_inquiries').insert({
      id,
      full_name: fullName,
      email,
      phone: phone || null,
      company: company || null,
      project_type: projectType || null,
      description: description || null,
      description_file_name: descriptionFileName || null,
      description_file_path: descriptionFilePath,
      description_file_type: descriptionFileType || null,
      description_file_size_bytes: descriptionFileSize || null,
      budget: budget || null,
      timeline: timeline || null,
      source: 'get-started',
    })

    if (error) {
      if (descriptionFilePath) {
        await supabase.storage.from(bucket).remove([descriptionFilePath])
      }
      console.error('project_inquiries insert failed:', error)
      const specific = userFacingMessageForSupabaseError(error)
      const dev =
        process.env.NODE_ENV === 'development'
          ? [error.message, error.code, error.details].filter(Boolean).join(', ')
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
      descriptionFileName,
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
