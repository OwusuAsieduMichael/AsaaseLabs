import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'
import { INSIGHTS_BLOG_SUMMARIES } from './summaries'

export const metadata: Metadata = {
  title: 'All Articles | AsaaseLabs Insights',
  description: 'Browse all AsaaseLabs articles on AI, cloud, and product design.',
  alternates: {
    canonical: '/insights/blog',
  },
  openGraph: {
    title: 'All Articles | AsaaseLabs Insights',
    description: 'Browse all AsaaseLabs articles on AI, cloud, and product design.',
    url: 'https://www.asaaselabs.tech/insights/blog',
  },
}

export default function InsightsBlogIndexPage() {
  return (
    <main className="min-h-screen bg-dark">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: 'url(/insight.jpg)' }}
        />
        <div className="absolute inset-0 bg-dark/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="section-container relative z-10 max-w-4xl">
          <PageBackNav fallbackHref="/insights" fallbackLabel="Insights" className="mb-6" />
          <span className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary text-sm font-bold tracking-wide">ARTICLE ARCHIVE</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-5">
            All Articles
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Explore our latest writing on AI in Africa, scalable cloud systems, and modern UX.
          </p>
        </div>
      </section>

      <section className="section-spacing pt-8">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INSIGHTS_BLOG_SUMMARIES.map((post) => (
              <article key={post.id} className="card overflow-hidden group hover-lift rounded-2xl">
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
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

                  <h2 className="text-xl font-bold text-white mb-3 leading-tight">
                    <Link
                      href={`/insights/blog/${post.slug}`}
                      className="hover:text-primary transition-colors duration-300"
                    >
                      {post.title}
                    </Link>
                  </h2>

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
                      className="group/readmore text-primary text-sm font-semibold inline-flex items-center gap-1.5 transition-all duration-300 ease-out hover:text-primary-light hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.35)]"
                    >
                      <span className="relative">
                        Read more
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary-light transition-transform duration-300 ease-out group-hover/readmore:scale-x-100" />
                      </span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 ease-out group-hover/readmore:translate-x-1 group-hover/readmore:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/insights#blog"
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
