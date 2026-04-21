/**
 * Staff allowlist (server-only). Set `STAFF_EMAILS` in env — comma-separated, case-insensitive.
 */
export function getStaffEmails(): string[] {
  return (process.env.STAFF_EMAILS ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
}

export function isStaffEmail(email: string | null | undefined): boolean {
  if (!email) return false
  const normalized = email.trim().toLowerCase()
  return getStaffEmails().includes(normalized)
}
