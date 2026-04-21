'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState, type MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'
import { INSIGHTS_BLOG_SUMMARIES } from './blog/summaries'
import { INSIGHTS_RESOURCES } from './resources/data'

/** Triggers file download in the background so this page never navigates away. */
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

export default function InsightsPage() {
  const router = useRouter()
  const [downloadingId, setDownloadingId] = useState<number | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterBusy, setNewsletterBusy] = useState(false)
  const [newsletterFeedback, setNewsletterFeedback] = useState<{ ok: boolean; text: string } | null>(null)

  useEffect(() => {
    INSIGHTS_BLOG_SUMMARIES.forEach((post) => {
      router.prefetch(`/insights/blog/${post.slug}`)
    })
  }, [router])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterFeedback(null)
    setNewsletterBusy(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      })
      const data = (await res.json()) as { success?: boolean; message?: string }
      if (!res.ok || !data.success) {
        setNewsletterFeedback({ ok: false, text: data.message || 'Could not subscribe.' })
        return
      }
      setNewsletterFeedback({ ok: true, text: "Thanks — you're on the list." })
      setNewsletterEmail('')
    } catch {
      setNewsletterFeedback({ ok: false, text: 'Network error. Try again in a moment.' })
    } finally {
      setNewsletterBusy(false)
    }
  }

  const caseStudies = [
    {
      id: 1,
      title: 'CareerLens: AI-Powered Career Intelligence',
      client: 'Internal Product',
      challenge: 'Job seekers struggle to optimize their resumes for specific positions',
      solution: 'Built an AI platform that analyzes resumes against job descriptions',
      results: '75% development complete, targeting 10,000+ users',
      image: '/background2.jpg',
      tags: ['AI/ML', 'NLP', 'Career Tech']
    },
    {
      id: 2,
      title: 'KasaBridge: Breaking Language Barriers',
      client: 'Internal Product',
      challenge: 'Communication gaps between English and Ghanaian languages',
      solution: 'Developed AI-powered multilingual translation platform',
      results: '65% complete, supporting multiple local languages',
      image: '/background3.jpg',
      tags: ['AI/ML', 'Translation', 'Speech Recognition']
    },
    {
      id: 3,
      title: 'GoXpress: Smart Logistics Platform',
      client: 'Internal Product',
      challenge: 'Inefficient delivery and logistics management',
      solution: 'Created real-time tracking and route optimization system',
      results: '60% complete, optimizing delivery operations',
      image: '/background5.jpg',
      tags: ['Logistics', 'Real-time', 'Optimization']
    }
  ]

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: 'url(/insight.jpg)' }}
        />
        <div className="absolute inset-0 bg-dark/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 pattern-dots opacity-20" />
        
        <div className="section-container relative z-10">
          <PageBackNav fallbackHref="/" fallbackLabel="Home" align="center" className="mb-8" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
              <span className="text-primary text-sm font-bold tracking-wide">KNOWLEDGE HUB</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
              Insights & Resources
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our latest thoughts on technology, innovation, and digital transformation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Latest Articles</h2>
            <p className="text-lg text-gray-300">Insights and perspectives from our team</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INSIGHTS_BLOG_SUMMARIES.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card overflow-hidden group hover-lift rounded-2xl"
              >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 transition-colors">
                      <Link
                        href={`/insights/blog/${post.slug}`}
                        prefetch
                        className="hover:text-primary transition-colors duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-dark-lighter text-gray-400 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                      <span className="text-sm text-gray-400">{post.author}</span>
                      <Link
                        href={`/insights/blog/${post.slug}`}
                        prefetch
                        className="group/readmore text-primary text-sm font-semibold inline-flex items-center gap-1.5 transition-all duration-300 ease-out hover:text-primary-light hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded"
                      >
                        <span className="relative">
                          Read more
                          <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary-light transition-transform duration-300 ease-out group-hover/readmore:scale-x-100" />
                        </span>
                        <svg className="w-4 h-4 transition-transform duration-300 ease-out group-hover/readmore:translate-x-1 group-hover/readmore:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/insights/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all"
            >
              View All Articles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="section-spacing relative">
        <div className="absolute inset-0 pattern-grid opacity-20" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Case Studies</h2>
            <p className="text-lg text-gray-300">Real-world success stories and project highlights</p>
          </motion.div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card overflow-hidden group cursor-pointer hover-lift"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${study.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark/50" />
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-6">{study.client}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-sm font-bold text-primary mb-1">Challenge</h4>
                        <p className="text-gray-300 text-sm">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-primary mb-1">Solution</h4>
                        <p className="text-gray-300 text-sm">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-primary mb-1">Results</h4>
                        <p className="text-gray-300 text-sm">{study.results}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/insights/case-studies"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-gray-700 hover:border-primary hover:bg-primary/10 transition-all"
            >
              View All Case Studies
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Free Resources</h2>
            <p className="text-lg text-gray-300">Tools, templates, and guides to accelerate your projects</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSIGHTS_RESOURCES.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center group hover-lift border-t-4 border-purple-500"
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
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  {resource.description}
                </p>
                <a
                  href={resource.downloadLink}
                  download={resource.downloadFileName}
                  aria-busy={downloadingId === resource.id}
                  className={`relative z-20 inline-flex items-center gap-2 text-sm font-semibold transition-all ${
                    downloadingId === resource.id
                      ? 'text-gray-400 cursor-wait pointer-events-none gap-2'
                      : 'text-primary hover:gap-3'
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
                      Starting…
                    </>
                  ) : (
                    <>
                      Download PDF
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </>
                  )}
                </a>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/insights/resources"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-gray-700 hover:border-primary hover:bg-primary/10 transition-all"
            >
              Browse All Resources
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-spacing relative">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-12 text-center bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Stay Updated</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest insights, case studies, and resources delivered to your inbox
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <input
                type="email"
                name="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                disabled={newsletterBusy}
                className="flex-1 px-6 py-4 bg-dark border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={newsletterBusy}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all disabled:opacity-60 shrink-0"
              >
                {newsletterBusy ? '…' : 'Subscribe'}
              </button>
            </form>
            {newsletterFeedback && (
              <p
                className={`mt-4 text-sm ${newsletterFeedback.ok ? 'text-green-400' : 'text-red-300'}`}
                role="status"
              >
                {newsletterFeedback.text}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
