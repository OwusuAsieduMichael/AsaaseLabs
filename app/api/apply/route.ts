import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import {
  createSupabaseAdmin,
  getJobAttachmentBucket,
  getResumeBucket,
} from '@/lib/supabase/admin'
import {
  buildApplicationReceivedEmail,
  buildJobApplicationEmail,
  sendApplicantEmail,
  sendTeamEmail,
} from '@/lib/email/notify'

const MAX_RESUME_BYTES = 10 * 1024 * 1024
const MAX_COVER_LETTER_FILE_BYTES = 10 * 1024 * 1024

function str(fd: FormData, key: string, max: number) {
  const v = fd.get(key)
  if (v == null || typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

function safeFileName(name: string) {
  const n = name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 180)
  return n || 'resume.pdf'
}

async function ensureBucket(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  bucket: string,
  fileSizeLimit: number
) {
  const { data, error } = await supabase.storage.getBucket(bucket)
  if (!error && data?.id) {
    return { ok: true as const }
  }

  const { error: createError } = await supabase.storage.createBucket(bucket, {
    public: false,
    fileSizeLimit: `${fileSizeLimit}`,
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
      { success: false, message: 'Server is not configured for applications yet.' },
      { status: 503 }
    )
  }

  try {
    const formData = await request.formData()

    const firstName = str(formData, 'firstName', 120)
    const lastName = str(formData, 'lastName', 120)
    const email = str(formData, 'email', 254)
    const phone = str(formData, 'phone', 60)
    const position = str(formData, 'position', 120)
    const location = str(formData, 'location', 200)
    const linkedIn = str(formData, 'linkedIn', 500)
    const portfolio = str(formData, 'portfolio', 500)
    const experience = str(formData, 'experience', 80)
    const availability = str(formData, 'availability', 120)
    const coverLetter = str(formData, 'coverLetter', 20000)
    const coverLetterFile = formData.get('coverLetterFile')
    const termsAcceptedRaw = formData.get('termsAccepted')
    const termsAccepted =
      typeof termsAcceptedRaw === 'string' && termsAcceptedRaw.toLowerCase() === 'true'

    if (!firstName || !lastName || !email || !position) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }
    if (!coverLetter && (!coverLetterFile || typeof coverLetterFile === 'string' || coverLetterFile.size === 0)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide a cover letter text or upload a cover letter file.',
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

    const resume = formData.get('resume')
    if (!resume || typeof resume === 'string' || resume.size === 0) {
      return NextResponse.json(
        { success: false, message: 'Please attach your resume.' },
        { status: 400 }
      )
    }
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { success: false, message: 'Resume file is too large (max 10 MB).' },
        { status: 400 }
      )
    }

    const id = randomUUID()
    const resumeBucket = getResumeBucket()
    const attachmentBucket = getJobAttachmentBucket()
    const resumeFileName = safeFileName(resume.name)
    const resumePath = `${id}/${resumeFileName}`

    const resumeBucketReady = await ensureBucket(supabase, resumeBucket, MAX_RESUME_BYTES)
    if (!resumeBucketReady.ok) {
      console.error('Resume bucket setup failed:', resumeBucketReady.error)
      return NextResponse.json(
        {
          success: false,
          message:
            'Could not prepare resume storage. Please try again shortly, or contact support if the issue persists.',
        },
        { status: 500 }
      )
    }
    const attachmentBucketReady = await ensureBucket(
      supabase,
      attachmentBucket,
      MAX_COVER_LETTER_FILE_BYTES
    )
    if (!attachmentBucketReady.ok) {
      console.error('Attachment bucket setup failed:', attachmentBucketReady.error)
      return NextResponse.json(
        {
          success: false,
          message:
            'Could not prepare attachment storage. Please try again shortly, or contact support if the issue persists.',
        },
        { status: 500 }
      )
    }

    const resumeType = resume.type || 'application/octet-stream'
    const resumeBuffer = Buffer.from(await resume.arrayBuffer())
    const { error: resumeUploadError } = await supabase.storage.from(resumeBucket).upload(resumePath, resumeBuffer, {
      contentType: resumeType,
      upsert: false,
    })

    if (resumeUploadError) {
      console.error('Resume upload failed:', resumeUploadError)
      return NextResponse.json(
        {
          success: false,
          message:
            'Could not upload resume. Ensure the Storage bucket exists (see SUPABASE_RESUME_BUCKET) and allows uploads with the service role.',
        },
        { status: 500 }
      )
    }

    let coverLetterFilePath: string | null = null
    let coverLetterFileName = ''
    let coverLetterFileType = ''
    let coverLetterFileSize = 0
    if (coverLetterFile && typeof coverLetterFile !== 'string' && coverLetterFile.size > 0) {
      if (coverLetterFile.size > MAX_COVER_LETTER_FILE_BYTES) {
        await supabase.storage.from(resumeBucket).remove([resumePath])
        return NextResponse.json(
          { success: false, message: 'Cover letter file is too large (max 10 MB).' },
          { status: 400 }
        )
      }
      coverLetterFileName = safeFileName(coverLetterFile.name)
      coverLetterFilePath = `${id}/cover-letter-${coverLetterFileName}`
      coverLetterFileType = coverLetterFile.type || 'application/octet-stream'
      coverLetterFileSize = coverLetterFile.size
      const coverLetterBuffer = Buffer.from(await coverLetterFile.arrayBuffer())
      const { error: coverUploadError } = await supabase
        .storage
        .from(attachmentBucket)
        .upload(coverLetterFilePath, coverLetterBuffer, {
          contentType: coverLetterFileType,
          upsert: false,
        })
      if (coverUploadError) {
        await supabase.storage.from(resumeBucket).remove([resumePath])
        console.error('Cover letter file upload failed:', coverUploadError)
        return NextResponse.json(
          {
            success: false,
            message: 'Could not upload cover letter file. Please retry with another file.',
          },
          { status: 500 }
        )
      }
    }

    const { error: insertError } = await supabase.from('job_applications').insert({
      id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      position,
      location: location || null,
      linkedin_url: linkedIn || null,
      portfolio_url: portfolio || null,
      experience: experience || null,
      availability: availability || null,
      cover_letter: coverLetter || null,
      resume_file_name: resume.name.slice(0, 300),
      resume_storage_path: resumePath,
      resume_file_type: resumeType,
      resume_file_size_bytes: resume.size,
      cover_letter_file_name: coverLetterFileName || null,
      cover_letter_storage_path: coverLetterFilePath,
      cover_letter_file_type: coverLetterFileType || null,
      cover_letter_file_size_bytes: coverLetterFileSize || null,
      source: 'website',
    })

    if (insertError) {
      await supabase.storage.from(resumeBucket).remove([resumePath])
      if (coverLetterFilePath) {
        await supabase.storage.from(attachmentBucket).remove([coverLetterFilePath])
      }
      console.error('job_applications insert failed:', insertError)
      return NextResponse.json(
        { success: false, message: 'Could not save application. Try again later.' },
        { status: 500 }
      )
    }

    const coverPreview = coverLetter.slice(0, 2500)
    const { subject, html } = buildJobApplicationEmail({
      firstName,
      lastName,
      email,
      phone,
      position,
      location,
      linkedIn,
      portfolio,
      experience,
      availability,
      coverLetterPreview: coverPreview,
      resumeFileName: resume.name.slice(0, 300),
      resumeFileType: resumeType,
      coverLetterFileName,
    })
    sendTeamEmail({ subject, html, replyTo: email }).then((r) => {
      if (!r.sent) console.warn('[email] job application notification:', r.reason)
    })
    const applicantEmail = buildApplicationReceivedEmail({ firstName, position })
    sendApplicantEmail({ to: email, subject: applicantEmail.subject, html: applicantEmail.html }).then((r) => {
      if (!r.sent) console.warn('[email] application receipt email:', r.reason)
    })

    return NextResponse.json({ success: true, message: 'Application submitted successfully.' })
  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit application.' },
      { status: 500 }
    )
  }
}
