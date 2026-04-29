import { INSIGHTS_BLOG_SUMMARIES } from './summaries'

export type BlogSection = {
  heading: string
  paragraphs: string[]
}

export type InsightsBlogPost = (typeof INSIGHTS_BLOG_SUMMARIES)[number] & {
  sections: BlogSection[]
}

const SECTIONS_BY_SLUG: Record<string, BlogSection[]> = {
  'ai-in-african-tech': [
    {
      heading: 'Why Africa is a defining frontier for AI',
      paragraphs: [
        'Across the continent, founders, researchers, and policymakers are asking the same question: how can artificial intelligence solve real problems at scale in finance, agriculture, health, education, and logistics, without copying models that were built for entirely different markets?',
        'The answer is not to import a playbook wholesale. It is to combine world-class engineering with local context: languages, infrastructure constraints, regulatory realities, and the speed at which mobile-first users adopt new tools.',
      ],
    },
    {
      heading: 'Where adoption is accelerating today',
      paragraphs: [
        'Credit scoring and fraud detection are helping responsible lenders reach underbanked customers. Agritech platforms use satellite and sensor data to guide smallholders on irrigation and inputs. Contact centres augment agents with speech and text models tuned for regional accents and code-switching.',
        'In each case, the winning teams invest in data quality, evaluation, and human oversight, not just model size. They ship smaller, reliable systems that improve month over month.',
      ],
    },
    {
      heading: 'What builders should prioritise next',
      paragraphs: [
        'Start with a narrow use case with measurable outcomes, document your data lineage, and design for failure modes that affect vulnerable users disproportionately.',
        'At AsaaseLabs we believe the next chapter of African tech is responsible AI: transparent, efficient, and grounded in the communities it serves. If you are building in this space, we would love to hear what you are learning in production.',
      ],
    },
  ],
  'scalable-cloud-infrastructure': [
    {
      heading: 'Scale is a property of the system, not the server size',
      paragraphs: [
        'When traffic spikes, the teams that stay online have already separated state from compute, automated their deployments, and defined clear budgets for latency and cost.',
        'Scalable cloud infrastructure means you can add capacity horizontally, roll back safely, and observe what changed when something breaks.',
      ],
    },
    {
      heading: 'Core patterns that pay off early',
      paragraphs: [
        'Use infrastructure as code so every environment is reproducible. Put static and edge-friendly assets on a CDN. Cache deliberately at the API boundary, not randomly inside services.',
        'Adopt a phased approach to Kubernetes or serverless: prove the operational model on a single service before moving the entire estate.',
      ],
    },
    {
      heading: 'Reliability without heroics',
      paragraphs: [
        'Runbooks, on-call rotations, and blameless postmortems turn incidents into learning. Pair them with synthetic checks and user-journey tests so you detect regressions before customers do.',
        'Whether you are on AWS, GCP, or Azure, the goal is the same: boring, predictable releases and fast recovery when the unexpected happens.',
      ],
    },
  ],
  'ui-ux-design-modern-apps': [
    {
      heading: 'Clarity beats cleverness',
      paragraphs: [
        'Users rarely admire your interface, they complete a task and move on. Strong typography, predictable navigation, and consistent spacing reduce cognitive load more than decorative motion ever will.',
        'Start from jobs-to-be-done: what is the user trying to finish in under two minutes on a patchy connection?',
      ],
    },
    {
      heading: 'Inclusive design is good design',
      paragraphs: [
        'Contrast, focus states, and readable tap targets are not optional polish. They widen your audience and improve satisfaction for everyone.',
        'Test with real devices and assistive technologies early; retrofitting accessibility after launch is slower and more expensive.',
      ],
    },
    {
      heading: 'Measure what matters',
      paragraphs: [
        'Pair qualitative research with funnel and performance metrics. If a beautiful screen slows Largest Contentful Paint, you are trading brand trust for aesthetics.',
        'Modern product teams iterate in tight loops: prototype, ship behind a flag, learn, refine. That rhythm is the heart of great UX.',
      ],
    },
  ],
}

export function getInsightsBlogPost(slug: string): InsightsBlogPost | undefined {
  const summary = INSIGHTS_BLOG_SUMMARIES.find((p) => p.slug === slug)
  const sections = SECTIONS_BY_SLUG[slug]
  if (!summary || !sections) return undefined
  return { ...summary, sections }
}

export function getInsightsBlogSlugs(): string[] {
  return INSIGHTS_BLOG_SUMMARIES.map((p) => p.slug)
}
