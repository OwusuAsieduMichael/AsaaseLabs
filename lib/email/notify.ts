import { Resend } from 'resend'

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function displayBudgetRange(code: string) {
  switch (code.trim()) {
    case '350-500':
      return '$350 to $500'
    case '550-1000':
      return '$550 to $1,000'
    case '2000-plus':
      return '$2,000+'
    case 'negotiations':
      return 'Negotiations, client prefers to discuss budget / call'
    default:
      return code
  }
}

function displayTimeline(code: string) {
  const labels: Record<string, string> = {
    urgent: 'Urgent (1 to 2 months)',
    standard: 'Standard (3 to 4 months)',
    flexible: 'Flexible (5+ months)',
  }
  return labels[code.trim()] || code
}

function displayProjectType(code: string) {
  const labels: Record<string, string> = {
    'web-application': 'Web Application',
    'mobile-app': 'Mobile Application',
    'ai-ml': 'AI & Machine Learning',
    'cloud-infrastructure': 'Cloud Infrastructure',
    'product-design': 'Product Design',
    consulting: 'Technical Consulting',
    other: 'Other',
  }
  return labels[code.trim()] || code
}

function parseRecipients(raw: string) {
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
}

export type NotifyResult = { sent: true; id?: string } | { sent: false; reason: string }

async function sendEmail(params: {
  to: string[]
  subject: string
  html: string
  replyTo?: string
}): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.EMAIL_FROM?.trim() || 'AsaaseLabs <onboarding@resend.dev>'
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY is not set; skipping notification email.')
    return { sent: false, reason: 'missing_api_key' }
  }
  if (!params.to.length) {
    return { sent: false, reason: 'missing_recipient' }
  }

  try {
    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from,
      to: params.to,
      subject: params.subject,
      html: params.html,
      ...(params.replyTo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params.replyTo)
        ? { replyTo: params.replyTo }
        : {}),
    })
    if (error) {
      console.error('[email] Resend API error:', error)
      return { sent: false, reason: 'resend_error' }
    }
    return { sent: true, id: data?.id }
  } catch (e) {
    console.error('[email] send failed:', e)
    return { sent: false, reason: 'exception' }
  }
}

/**
 * Sends a plain HTML email to the team inbox via Resend.
 * If env is not configured, logs and returns without throwing (forms still succeed).
 */
export async function sendTeamEmail(params: {
  subject: string
  html: string
  /** When set, “Reply” in the mail client goes to the submitter. */
  replyTo?: string
}): Promise<NotifyResult> {
  const toRaw = process.env.NOTIFY_EMAIL?.trim()

  if (!toRaw) {
    console.warn('[email] NOTIFY_EMAIL is not set; skipping notification email.')
    return { sent: false, reason: 'missing_recipient' }
  }

  const to = parseRecipients(toRaw)
  if (to.length === 0) {
    console.warn('[email] NOTIFY_EMAIL has no valid addresses; skipping.')
    return { sent: false, reason: 'invalid_recipients' }
  }

  return sendEmail({
    to,
    subject: params.subject,
    html: params.html,
    replyTo: params.replyTo,
  })
}

export async function sendApplicantEmail(params: {
  to: string
  subject: string
  html: string
}): Promise<NotifyResult> {
  const target = params.to.trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target)) {
    return { sent: false, reason: 'invalid_recipients' }
  }
  return sendEmail({ to: [target], subject: params.subject, html: params.html })
}

export function buildProjectInquiryEmail(payload: {
  fullName: string
  email: string
  phone: string
  company: string
  projectType: string
  description: string
  descriptionFileName?: string
  budget: string
  timeline: string
}) {
  const e = escapeHtml
  const rows = [
    ['Name', payload.fullName],
    ['Email', payload.email],
    ['Phone', payload.phone],
    ['Company', payload.company],
    ['Project type', displayProjectType(payload.projectType)],
    ['Budget', displayBudgetRange(payload.budget)],
    ['Timeline', displayTimeline(payload.timeline)],
    ['Description', payload.description],
    ['Project description file', payload.descriptionFileName ?? ''],
  ]
    .filter(([, v]) => v.trim().length > 0)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;width:140px;background:#f9fafb;">${e(k)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${e(v)}</td></tr>`
    )
    .join('')

  const html = `
<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111827;">
  <h2 style="margin:0 0 16px;">New project inquiry</h2>
  <p style="margin:0 0 16px;color:#4b5563;">Someone submitted the Get Started form on the website.</p>
  <table style="border-collapse:collapse;width:100%;max-width:640px;">${rows}</table>
  <p style="margin-top:20px;font-size:13px;color:#6b7280;">Reply directly to this thread using the applicant’s email: <a href="mailto:${e(payload.email)}">${e(payload.email)}</a></p>
</body></html>`

  return { subject: `[AsaaseLabs] Project inquiry: ${payload.fullName}`, html }
}

export function buildJobApplicationEmail(payload: {
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  location: string
  linkedIn: string
  portfolio: string
  experience: string
  availability: string
  coverLetterPreview: string
  resumeFileName: string
  resumeFileType?: string
  coverLetterFileName?: string
}) {
  const e = escapeHtml
  const rows = [
    ['Name', `${payload.firstName} ${payload.lastName}`.trim()],
    ['Email', payload.email],
    ['Phone', payload.phone],
    ['Position', payload.position],
    ['Location', payload.location],
    ['LinkedIn', payload.linkedIn],
    ['Portfolio', payload.portfolio],
    ['Experience', payload.experience],
    ['Availability', payload.availability],
    ['Resume file', payload.resumeFileName],
    ['Resume type', payload.resumeFileType ?? ''],
    ['Cover letter (preview)', payload.coverLetterPreview],
    ['Cover letter file', payload.coverLetterFileName ?? ''],
  ]
    .filter(([, v]) => v.trim().length > 0)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;width:140px;background:#f9fafb;">${e(k)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${e(v)}</td></tr>`
    )
    .join('')

  const html = `
<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111827;">
  <h2 style="margin:0 0 16px;">New job application</h2>
  <p style="margin:0 0 16px;color:#4b5563;">Details are stored in Supabase (job_applications + resume in Storage).</p>
  <table style="border-collapse:collapse;width:100%;max-width:640px;">${rows}</table>
  <p style="margin-top:20px;font-size:13px;color:#6b7280;">Reply to applicant: <a href="mailto:${e(payload.email)}">${e(payload.email)}</a></p>
</body></html>`

  return {
    subject: `[AsaaseLabs] Job application: ${payload.position} (${payload.firstName} ${payload.lastName})`,
    html,
  }
}

export function buildApplicationReceivedEmail(payload: {
  firstName: string
  position: string
}) {
  const e = escapeHtml
  const firstName = payload.firstName.trim() || 'there'
  const position = payload.position.trim()
  const html = `
<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.6;color:#111827;">
  <h2 style="margin:0 0 16px;">Application received</h2>
  <p style="margin:0 0 12px;">Hi ${e(firstName)},</p>
  <p style="margin:0 0 12px;">
    Thanks for applying to AsaaseLabs${position ? ` for the <strong>${e(position)}</strong> role` : ''}. We have received your application and our team will review it.
  </p>
  <p style="margin:0 0 12px;">If your profile matches the role requirements, we will contact you with next steps.</p>
  <p style="margin:0;">Regards,<br/>AsaaseLabs Recruitment Team</p>
</body></html>`
  return {
    subject: '[AsaaseLabs] We received your application',
    html,
  }
}

type ApplicationStatus = 'new' | 'shortlisted' | 'interview' | 'hired' | 'rejected' | 'reviewing'

function statusLabel(status: ApplicationStatus) {
  const labels: Record<ApplicationStatus, string> = {
    new: 'new',
    reviewing: 'under review',
    shortlisted: 'shortlisted',
    interview: 'interview stage',
    hired: 'selected',
    rejected: 'not selected',
  }
  return labels[status]
}

export function buildApplicationStatusEmail(payload: {
  firstName: string
  position: string
  status: ApplicationStatus
  note?: string
}) {
  const e = escapeHtml
  const firstName = payload.firstName.trim() || 'there'
  const positionText = payload.position.trim()
  const statusText = statusLabel(payload.status)
  const note = payload.note?.trim()
  const html = `
<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.6;color:#111827;">
  <h2 style="margin:0 0 16px;">Application status update</h2>
  <p style="margin:0 0 12px;">Hi ${e(firstName)},</p>
  <p style="margin:0 0 12px;">
    Your application${positionText ? ` for the <strong>${e(positionText)}</strong> role` : ''} is now <strong>${e(statusText)}</strong>.
  </p>
  ${
    note
      ? `<p style="margin:0 0 12px;white-space:pre-wrap;">${e(note)}</p>`
      : '<p style="margin:0 0 12px;">Thank you for your interest in joining AsaaseLabs.</p>'
  }
  <p style="margin:0;">Regards,<br/>AsaaseLabs Recruitment Team</p>
</body></html>`
  return {
    subject: `[AsaaseLabs] Application update${positionText ? `: ${positionText}` : ''}`,
    html,
  }
}

export { escapeHtml }
