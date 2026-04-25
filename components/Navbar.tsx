'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import AuthModal from './AuthModal'
import StaffInboxBell from './StaffInboxBell'
import { useAuth } from '@/app/context/AuthContext'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { 
      name: 'Home', 
      href: '/',
    },
    { 
      name: 'Services', 
      href: '/#services',
      dropdown: [
        { name: 'Custom Software', href: '/services/custom-software' },
        { name: 'Cloud Infrastructure', href: '/services/cloud-infrastructure' },
        { name: 'Product Design', href: '/services/product-design' },
        { name: 'AI & Machine Learning', href: '/services/ai-ml' },
      ]
    },
    { 
      name: 'Our Work', 
      href: '/#products',
      dropdown: [
        { name: 'CareerLens', href: '/#products' },
        { name: 'KasaBridge', href: '/#products' },
        { name: 'GoXpress', href: '/#products' },
        { name: 'Lamla FrontDesk', href: '/#products' },
      ]
    },
    { 
      name: 'About Us', 
      href: '/#about',
      dropdown: [
        { name: 'What we do', href: '/what-we-do' },
        { name: 'Our Story', href: '/#about' },
        { name: 'Mission & Vision', href: '/#about' },
        { name: 'Our Process', href: '/#process' },
        { name: 'Why Choose Us', href: '/#why-choose-us' },
      ]
    },
    { 
      name: 'Insights', 
      href: '/insights',
      dropdown: [
        { name: 'Blog', href: '/insights#blog' },
        { name: 'Case Studies', href: '/insights#case-studies' },
        { name: 'Resources', href: '/insights#resources' },
      ]
    },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto min-w-0 px-3 sm:px-4 md:px-6">
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0 h-[4.25rem] sm:h-20 md:h-24">
          {/* Logo */}
          <motion.a
            href="/"
            aria-label="Asaase Labs home"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex min-w-0 shrink items-center gap-1.5 sm:gap-2 md:gap-3 -ml-0.5 sm:-ml-2 md:-ml-3"
          >
            <Image
              src="/asaase5.png"
              alt=""
              width={320}
              height={320}
              className="h-10 w-auto sm:h-[4.5rem] md:h-[5.5rem] object-contain object-left shrink-0"
              priority
            />
            <span
              className={`min-w-0 font-bold tracking-tight truncate sm:whitespace-nowrap ${
                isAuthenticated ? 'text-base sm:text-xl md:text-2xl' : 'text-lg sm:text-2xl md:text-3xl'
              }`}
            >
              <span className="text-white">Asaase</span>
              <span className="text-primary">Labs</span>
            </span>
          </motion.a>
          
          {/* Desktop Navigation — centered flex band so tabs do not wrap */}
          <div className="hidden md:flex flex-1 min-w-0 justify-center items-center gap-0 px-1 lg:px-2">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative shrink-0"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="px-2 lg:px-3 py-2 text-xs lg:text-sm font-semibold text-gray-300 hover:text-white rounded-lg hover:bg-dark-lighter transition-all duration-200 flex items-center gap-0.5 whitespace-nowrap"
                >
                  {link.name}
                  {link.dropdown && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === link.name && link.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl overflow-hidden"
                      style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)' }}
                    >
                      <div className="py-2">
                        {link.dropdown.map((item, index) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200"
                          >
                            <span>{item.name}</span>
                            <svg 
                              className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Buttons — compact + inset from center so nav keeps space */}
          <div className="hidden md:flex shrink-0 items-center gap-1.5 lg:gap-2 pl-2 lg:pl-5 ml-auto">
            {isAuthenticated ? (
              <>
                <StaffInboxBell />
                <div className="relative">
                  <button
                    type="button"
                    title={user?.name}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex max-w-[9rem] lg:max-w-[11rem] items-center gap-1.5 rounded-xl border-2 border-gray-700 px-2 py-2 text-xs font-semibold text-gray-300 hover:border-gray-600 hover:bg-dark-lighter hover:text-white transition-all"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="min-w-0 flex-1 truncate text-left">{user?.name}</span>
                    <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl overflow-hidden"
                        style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)' }}
                      >
                        <div className="py-2">
                          <div className="px-5 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                          </div>
                          <button
                            onClick={() => {
                              logout()
                              setUserMenuOpen(false)
                            }}
                            className="w-full text-left px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-all"
                          >
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <motion.a
                  href="/#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-light lg:px-5 lg:py-2.5 lg:text-sm"
                  style={{ boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)' }}
                >
                  Contact Us
                </motion.a>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthMode('login')
                    setAuthModalOpen(true)
                  }}
                  className="whitespace-nowrap px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white lg:px-4 lg:text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup')
                    setAuthModalOpen(true)
                  }}
                  className="whitespace-nowrap rounded-xl border-2 border-gray-700 px-3 py-2 text-xs font-semibold text-gray-200 hover:border-gray-600 hover:bg-dark-lighter hover:text-white lg:px-4 lg:text-sm"
                >
                  Sign Up
                </button>
                <motion.a
                  href="/#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-light lg:px-5 lg:py-2.5 lg:text-sm"
                  style={{ boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)' }}
                >
                  Contact Us
                </motion.a>
              </>
            )}
          </div>

          {/* Auth Modal */}
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            initialMode={authMode}
          />

          {/* Mobile: staff inbox + menu */}
          <div className="flex items-center gap-1 md:hidden">
            {isAuthenticated && <StaffInboxBell />}
            <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-gray-700/70 bg-dark/95 backdrop-blur-xl rounded-b-2xl shadow-2xl"
            >
              <div className="py-4 px-2 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <a
                      href={link.href}
                      className="block px-4 py-3.5 text-base font-semibold text-gray-100 hover:text-white hover:bg-dark-lighter rounded-xl transition-colors border border-transparent hover:border-gray-700/70"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                    {link.dropdown && (
                      <div className="pl-4 space-y-1.5">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-lighter rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isAuthenticated ? (
                  <>
                    <a
                      href="/team/inquiries"
                      className="block px-4 py-3.5 text-base font-semibold text-gray-100 hover:text-white hover:bg-dark-lighter rounded-xl transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Team inquiries
                    </a>
                    <a
                      href="/team/applications"
                      className="block px-4 py-3.5 text-base font-semibold text-gray-100 hover:text-white hover:bg-dark-lighter rounded-xl transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Job applications
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full px-4 py-3.5 text-left text-base font-semibold text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                <button
                  onClick={() => {
                    setAuthMode('login')
                    setAuthModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="block px-4 py-3.5 text-base font-semibold text-gray-100 hover:text-white hover:bg-dark-lighter rounded-xl transition-colors text-left w-full"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup')
                    setAuthModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="block px-4 py-3.5 bg-primary text-white text-base font-semibold rounded-xl text-center mt-2"
                >
                  Sign Up
                </button>
                  </>
                )}
                <a
                  href="/#contact"
                  className="block px-4 py-3.5 bg-primary text-white text-base font-semibold rounded-xl text-center mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
