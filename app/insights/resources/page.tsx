'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type MouseEvent } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'
import { INSIGHTS_RESOURCES } from './data'

function startPdfDownload(url: string) {
  document.querySelectorAll('iframe[data-pdf-download]').forEach((el) => el.remove())

  const iframe = document.createElement('iframe')
  iframe.dataset.pdfDownload = '1'
  iframe.setAttribute('hidden', '')
  iframe.setAttribute('aria-hidden', 'true')
  iframe.setAttribute('tabindex', '-1')
  iframe.style.cssText =
    'position:fixed;width:0;height:0;border:0;clip:rect(0,0,0,0);visibility:hidden;pointer-events:none'
  iframe.src = url
  document.body.appendChild(iframe)

  window.setTimeout(() => {
    try {
      iframe.remove()
    } catch {
      try {
        document.body.removeChild(iframe)
      } catch {
        /* already detached */
      }
    }
  }, 5 * 60 * 1000)
}

export default function InsightsResourcesPage() {
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-dark animate-fade-in-soft">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: 'url(/insight.jpg)' }}
        />
        <div className="absolute inset-0 bg-dark/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="section-container relative z-10 max-w-4xl animate-slide-in-soft">
          <PageBackNav fallbackHref="/insights" fallbackLabel="Insights" className="mb-6" />
          <span className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary text-sm font-bold tracking-wide">RESOURCE LIBRARY</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-5">
            Browse All Resources
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Download practical guides and templates to support your engineering and design workflows.
          </p>
        </div>
      </section>

      <section className="section-spacing pt-8">
        <div className="section-container">
          <div className="mb-8 rounded-2xl border border-primary/30 bg-primary/10 px-6 py-4 animate-fade-up-soft">
            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
              We are continuously curating additional high-value resources. More guides and templates will be published here soon.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSIGHTS_RESOURCES.map((resource, index) => (
              <article
                key={resource.id}
                className="card p-6 text-center group hover-lift border-t-4 border-purple-500 animate-fade-up-soft"
                style={{ animationDelay: `${120 + index * 80}ms` }}
              >
                <div className="relative h-40 w-full mb-4 overflow-hidden rounded-xl bg-gray-900 ring-1 ring-gray-800">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wide">
                  {resource.type}
                </div>
                <h2 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {resource.title}
                </h2>
                <p className="text-sm text-gray-300 mb-4">{resource.description}</p>
                <a
                  href={resource.downloadLink}
                  download={resource.downloadFileName}
                  aria-busy={downloadingId === resource.id}
                  className={`group/readmore relative z-20 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 ease-out ${
                    downloadingId === resource.id
                      ? 'text-gray-400 cursor-wait pointer-events-none'
                      : 'text-primary hover:text-primary-light hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.35)]'
                  }`}
                  onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    if (downloadingId === resource.id) return
                    const id = resource.id
                    setDownloadingId(id)
                    startPdfDownload(resource.downloadLink)
                    window.setTimeout(() => {
                      setDownloadingId((cur) => (cur === id ? null : cur))
                    }, 800)
                  }}
                >
                  {downloadingId === resource.id ? (
                    <>
                      <span className="inline-block size-3.5 shrink-0 animate-spin rounded-full border-2 border-gray-500 border-t-primary" />
                      Starting...
                    </>
                  ) : (
                    <>
                      <span className="relative">
                        Download PDF
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary-light transition-transform duration-300 ease-out group-hover/readmore:scale-x-100" />
                      </span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 ease-out group-hover/readmore:translate-x-1 group-hover/readmore:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </>
                  )}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/insights#resources"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Insights
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
