/** Card-only fields — safe to import from client components (no full article body). */
export type InsightsBlogSummary = {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  author: string
  tags: string[]
}

export const INSIGHTS_BLOG_SUMMARIES: InsightsBlogSummary[] = [
  {
    id: 1,
    slug: 'ai-in-african-tech',
    title: 'The Future of AI in African Tech',
    excerpt:
      'Exploring how artificial intelligence is transforming the African technology landscape and creating new opportunities for innovation.',
    category: 'AI & Machine Learning',
    date: 'April 10, 2026',
    readTime: '5 min read',
    image: '/hero-big.jpg',
    author: 'Michael Owusu Asiedu',
    tags: ['AI', 'Africa', 'Innovation'],
  },
  {
    id: 2,
    slug: 'scalable-cloud-infrastructure',
    title: 'Building Scalable Cloud Infrastructure',
    excerpt:
      'Best practices for designing and implementing cloud architectures that grow with your business needs.',
    category: 'Cloud Computing',
    date: 'April 8, 2026',
    readTime: '7 min read',
    image: '/hero-big2.jpg',
    author: 'AsaaseLabs Team',
    tags: ['Cloud', 'DevOps', 'Architecture'],
  },
  {
    id: 3,
    slug: 'ui-ux-design-modern-apps',
    title: 'UI/UX Design Principles for Modern Apps',
    excerpt:
      "Essential design principles that create intuitive and engaging user experiences in today's digital products.",
    category: 'Design',
    date: 'April 5, 2026',
    readTime: '6 min read',
    image: '/hero-big3.jpg',
    author: 'AsaaseLabs Team',
    tags: ['Design', 'UX', 'UI'],
  },
]
