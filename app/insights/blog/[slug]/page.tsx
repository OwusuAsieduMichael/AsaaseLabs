import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'
import { getInsightsBlogPost, getInsightsBlogSlugs } from '../data'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return getInsightsBlogSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getInsightsBlogPost(params.slug)
  if (!post) return { title: 'Article | AsaaseLabs' }
  const articleUrl = `https://www.asaaselabs.tech/insights/blog/${post.slug}`
  return {
    title: `${post.title} | AsaaseLabs Insights`,
    description: post.excerpt,
    alternates: {
      canonical: `/insights/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | AsaaseLabs Insights`,
      description: post.excerpt,
      url: articleUrl,
      type: 'article',
    },
  }
}

export default function InsightsBlogArticlePage({ params }: Props) {
  const post = getInsightsBlogPost(params.slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />

      <article className="animate-fade-in-soft">
        <header className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: 'url(/insight.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/90 to-dark" />
          <div className="section-container relative z-10 max-w-3xl animate-slide-in-soft">
            <PageBackNav fallbackHref="/insights#blog" fallbackLabel="Latest articles" className="mb-8" />
            <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span>{post.author}</span>
              <span aria-hidden>•</span>
              <span>{post.date}</span>
              <span aria-hidden>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <div className="section-container py-12 md:py-16 max-w-3xl animate-fade-in">
          <div className="max-w-none text-lg">
            {post.sections.map((section, index) => (
              <section
                key={section.heading}
                className="mb-12 last:mb-0 animate-fade-up-soft"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p key={`${section.heading}-${i}`} className="text-gray-300 leading-relaxed mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-gray-800 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-dark-lighter text-gray-400 text-sm rounded-lg border border-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/insights#blog" className="btn-primary inline-flex items-center gap-2">
              More articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
