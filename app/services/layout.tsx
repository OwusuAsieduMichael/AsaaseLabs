import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Engineering Services',
  description:
    'Explore AsaaseLabs services in custom software development, cloud infrastructure, AI and machine learning, and product design.',
  alternates: {
    canonical: '/services/custom-software',
  },
  openGraph: {
    title: 'Software Engineering Services | AsaaseLabs',
    description:
      'Explore AsaaseLabs services in custom software development, cloud infrastructure, AI and machine learning, and product design.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
