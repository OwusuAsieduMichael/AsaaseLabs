import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights and Resources',
  description:
    'Read AsaaseLabs insights on AI, cloud infrastructure, product design, and digital product engineering.',
  alternates: {
    canonical: '/insights',
  },
  openGraph: {
    title: 'Insights and Resources | AsaaseLabs',
    description:
      'Read AsaaseLabs insights on AI, cloud infrastructure, product design, and digital product engineering.',
    url: 'https://www.asaaselabs.tech/insights',
  },
}

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
