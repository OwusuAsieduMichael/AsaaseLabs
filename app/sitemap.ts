import type { MetadataRoute } from 'next'
import { getInsightsBlogSlugs } from './insights/blog/data'

const BASE_URL = 'https://www.asaaselabs.tech'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/get-started',
    '/what-we-do',
    '/insights',
    '/insights/blog',
    '/insights/resources',
    '/careers',
    '/careers/apply',
    '/privacy-policy',
    '/terms-of-service',
    '/services/custom-software',
    '/services/cloud-infrastructure',
    '/services/ai-ml',
    '/services/product-design',
    '/products/careerlens',
    '/products/kasabridge',
    '/products/goxpress',
  ]

  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))

  const blogEntries: MetadataRoute.Sitemap = getInsightsBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/insights/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, ...blogEntries]
}
