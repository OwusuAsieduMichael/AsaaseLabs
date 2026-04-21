'use client'

export default function ScrollControls() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  return (
    <div className="fixed right-4 md:right-6 bottom-6 z-40 flex flex-col gap-3">
      <button
        type="button"
        onClick={scrollToTop}
        className="h-11 w-11 rounded-full bg-primary text-white shadow-lg hover:bg-primary-light transition-colors flex items-center justify-center"
        aria-label="Scroll to top"
        title="Top"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={scrollToBottom}
        className="h-11 w-11 rounded-full bg-dark-lighter border border-gray-700 text-white shadow-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
        aria-label="Scroll to bottom"
        title="Bottom"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}
