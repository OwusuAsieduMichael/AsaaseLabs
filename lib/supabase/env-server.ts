/**
 * Trim env values (common copy/paste issues). Strips matching outer quotes once.
 */
export function trimEnvValue(value: string | undefined): string {
  if (value == null) return ''
  let s = value.trim()
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim()
  }
  return s
}
