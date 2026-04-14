'use client'

import { useAuth } from '@/app/context/AuthContext'
import { ReactNode } from 'react'

interface ProtectedActionProps {
  children: ReactNode
  fallback?: ReactNode
  onUnauthorized?: () => void
}

export default function ProtectedAction({ children, fallback, onUnauthorized }: ProtectedActionProps) {
  const { isAuthenticated, openAuthModal } = useAuth()

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      e.stopPropagation()
      if (onUnauthorized) {
        onUnauthorized()
      } else {
        openAuthModal()
      }
    }
  }

  if (!isAuthenticated && fallback) {
    return <div onClick={handleClick}>{fallback}</div>
  }

  return <div onClick={handleClick}>{children}</div>
}
