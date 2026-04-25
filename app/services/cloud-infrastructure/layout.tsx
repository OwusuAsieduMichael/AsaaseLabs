import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cloud Infrastructure Services',
  description:
    'Design and deploy resilient cloud infrastructure with secure architecture, automation, and monitoring by AsaaseLabs.',
  alternates: {
    canonical: '/services/cloud-infrastructure',
  },
  openGraph: {
    title: 'Cloud Infrastructure Services | AsaaseLabs',
    description:
      'Design and deploy resilient cloud infrastructure with secure architecture, automation, and monitoring by AsaaseLabs.',
    url: 'https://www.asaaselabs.tech/services/cloud-infrastructure',
  },
}

export default function CloudInfrastructureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
