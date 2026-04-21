import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import ScrollControls from '@/components/ScrollControls'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AsaaseLabs | Engineering Digital Solutions That Matter',
  description: 'African-based technology innovation lab specializing in software development, mobile applications, AI systems, and product design.',
  keywords: 'software development, mobile apps, AI systems, product design, African tech, innovation lab',
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
