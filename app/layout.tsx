import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import ScrollControls from '@/components/ScrollControls'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.asaaselabs.tech'),
  title: {
    default: 'AsaaseLabs | Engineering Digital Solutions That Matter',
    template: '%s | AsaaseLabs',
  },
  description:
    'AsaaseLabs builds custom software, cloud infrastructure, AI systems, and product design solutions for startups and growing businesses.',
  keywords: [
    'custom software development',
    'cloud infrastructure services',
    'AI and machine learning solutions',
    'product design agency',
    'web and mobile app development',
    'Ghana tech company',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.asaaselabs.tech',
    siteName: 'AsaaseLabs',
    title: 'AsaaseLabs | Engineering Digital Solutions That Matter',
    description:
      'AsaaseLabs builds custom software, cloud infrastructure, AI systems, and product design solutions for startups and growing businesses.',
    images: [
      {
        url: '/asaase5.png',
        width: 1200,
        height: 630,
        alt: 'AsaaseLabs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AsaaseLabs | Engineering Digital Solutions That Matter',
    description:
      'AsaaseLabs builds custom software, cloud infrastructure, AI systems, and product design solutions for startups and growing businesses.',
    images: ['/asaase5.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <ScrollControls />
        </AuthProvider>
      </body>
    </html>
  )
}
