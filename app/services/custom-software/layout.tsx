import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Software Development Services',
  description:
    'Build secure, scalable web and mobile applications with AsaaseLabs custom software development services.',
  alternates: {
    canonical: '/services/custom-software',
  },
  openGraph: {
    title: 'Custom Software Development Services | AsaaseLabs',
    description:
      'Build secure, scalable web and mobile applications with AsaaseLabs custom software development services.',
    url: 'https://www.asaaselabs.tech/services/custom-software',
  },
}

export default function CustomSoftwareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
