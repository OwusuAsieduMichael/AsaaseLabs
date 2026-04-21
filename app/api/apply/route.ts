import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { createSupabaseAdmin, getResumeBucket } from '@/lib/supabase/admin'
import { buildJobApplicationEmail, sendTeamEmail } from '@/lib/email/notify'

const MAX_RESUME_BYTES = 10 * 1024 * 1024

function str(fd: FormData, key: string, max: number) {
  const v = fd.get(key)
  if (v == null || typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

function safeFileName(name: string) {
  const n = name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 180)
  return n || 'resume.pdf'
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

    if (!firstName || !lastName || !email || !position) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
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
    const bucket = getResumeBucket()
    const fileName = safeFileName(resume.name)
    const objectPath = `${id}/${fileName}`

    const buffer = Buffer.from(await resume.arrayBuffer())
    const { error: uploadError } = await supabase.storage.from(bucket).upload(objectPath, buffer, {
      contentType: resume.type || 'application/octet-stream',
      upsert: false,
    })

    if (uploadError) {
      console.error('Resume upload failed:', uploadError)
      return NextResponse.json(
        {
          success: false,
          message:
            'Could not upload resume. Ensure the Storage bucket exists (see SUPABASE_RESUME_BUCKET) and allows uploads with the service role.',
        },
        { status: 500 }
      )
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
      resume_storage_path: objectPath,
      source: 'website',
    })

    if (insertError) {
      await supabase.storage.from(bucket).remove([objectPath])
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
    })
    sendTeamEmail({ subject, html, replyTo: email }).then((r) => {
      if (!r.sent) console.warn('[email] job application notification:', r.reason)
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
