import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI and Machine Learning Services',
  description:
    'Implement practical AI and machine learning systems that automate workflows and improve decisions with AsaaseLabs.',
  alternates: {
    canonical: '/services/ai-ml',
  },
  openGraph: {
    title: 'AI and Machine Learning Services | AsaaseLabs',
    description:
      'Implement practical AI and machine learning systems that automate workflows and improve decisions with AsaaseLabs.',
    url: 'https://www.asaaselabs.tech/services/ai-ml',
  },
}

export default function AIMLLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
