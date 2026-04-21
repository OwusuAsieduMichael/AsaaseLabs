'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Align = 'start' | 'center'

interface PageBackNavProps {
  /** When there is no in-app referrer, navigate here (e.g. `/careers`, `/insights`). */
  fallbackHref: string
  /** Shown next to the arrow for the direct link (e.g. "Careers", "Home"). */
  fallbackLabel: string
  align?: Align
  className?: string
}

/**
 * **Back** uses the browser history stack (works with in-app client navigations).
 * The text link always jumps to `fallbackHref` when the user prefers a fixed destination.
 */
export default function PageBackNav({
  fallbackHref,
  fallbackLabel,
  align = 'start',
  className = '',
}: PageBackNavProps) {
  const router = useRouter()

  function goBack() {
    router.back()
  }

  const alignClass = align === 'center' ? 'justify-center' : 'justify-start'

  return (
    <nav
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-sm ${alignClass} ${className}`}
      aria-label="Page navigation"
    >
      <button
        type="button"
        onClick={goBack}
        className="inline-flex items-center gap-2 rounded-lg px-2 py-1 -ml-2 font-semibold text-primary hover:bg-primary/10 hover:text-primary-light transition-colors"
      >
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <span className="text-gray-600 select-none" aria-hidden>
        ·
      </span>
      <Link href={fallbackHref} className="text-gray-400 hover:text-white transition-colors">
        {fallbackLabel}
      </Link>
    </nav>
  )
}
