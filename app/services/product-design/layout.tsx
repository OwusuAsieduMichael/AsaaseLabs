import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Design and UI UX Services',
  description:
    'Create intuitive digital products with user research, UX strategy, and interface design services from AsaaseLabs.',
  alternates: {
    canonical: '/services/product-design',
  },
  openGraph: {
    title: 'Product Design and UI UX Services | AsaaseLabs',
    description:
      'Create intuitive digital products with user research, UX strategy, and interface design services from AsaaseLabs.',
    url: 'https://www.asaaselabs.tech/services/product-design',
  },
}

export default function ProductDesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
