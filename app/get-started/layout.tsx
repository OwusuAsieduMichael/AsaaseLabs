import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start Your Project',
  description:
    'Share your project goals with AsaaseLabs and get a tailored proposal for custom software, cloud, AI, or product design services.',
  alternates: {
    canonical: '/get-started',
  },
  openGraph: {
    title: 'Start Your Project | AsaaseLabs',
    description:
      'Share your project goals with AsaaseLabs and get a tailored proposal for custom software, cloud, AI, or product design services.',
    url: 'https://www.asaaselabs.tech/get-started',
  },
}

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
