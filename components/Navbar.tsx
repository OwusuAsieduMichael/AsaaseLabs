'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AuthModal from './AuthModal'
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
      href: '#services',
      dropdown: [
        { name: 'Custom Software', href: '#services' },
        { name: 'Cloud Infrastructure', href: '#services' },
        { name: 'Product Design', href: '#services' },
        { name: 'AI & Machine Learning', href: '#services' },
      ]
    },
    { 
      name: 'Our Work', 
      href: '#work',
      dropdown: [
        { name: 'CareerLens', href: '#products' },
        { name: 'KasaBridge', href: '#products' },
        { name: 'GoXpress', href: '#products' },
        { name: 'Lamla FrontDesk', href: '#products' },
      ]
    },
    { 
      name: 'About Us', 
      href: '#about',
      dropdown: [
        { name: 'Our Story', href: '#about' },
        { name: 'Mission & Vision', href: '#about' },
        { name: 'Our Process', href: '#process' },
        { name: 'Why Choose Us', href: '#about' },
      ]
    },
    { 
      name: 'Insights', 
      href: '#insights',
      dropdown: [
        { name: 'Blog', href: '#insights' },
        { name: 'Case Studies', href: '#insights' },
        { name: 'Resources', href: '#insights' },
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
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight"
          >
            <span className="text-primary text-2xl">⚡</span>
            <span><span className="text-white">Asaase</span><span className="text-primary">Labs</span></span>
          </motion.a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white rounded-lg hover:bg-dark-lighter transition-all duration-200 flex items-center gap-1"
                >
                  {link.name}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white border-2 border-gray-700 rounded-xl hover:border-gray-600 hover:bg-dark-lighter transition-all"
                  >
                    <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{user?.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-light transition-colors duration-200"
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
                  className="px-5 py-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup')
                    setAuthModalOpen(true)
                  }}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-200 hover:text-white border-2 border-gray-700 rounded-xl hover:border-gray-600 hover:bg-dark-lighter transition-all"
                >
                  Sign Up
                </button>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-light transition-colors duration-200"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-gray-800"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <a
                      href={link.href}
                      className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-lighter rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                    {link.dropdown && (
                      <div className="pl-4 space-y-1">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-dark-lighter rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    setAuthMode('login')
                    setAuthModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-lighter rounded-lg transition-colors text-left w-full"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup')
                    setAuthModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="block px-4 py-3 bg-primary text-white text-sm font-medium rounded-lg text-center mt-2"
                >
                  Sign Up
                </button>
                <a
                  href="#contact"
                  className="block px-4 py-3 bg-primary text-white text-sm font-medium rounded-lg text-center mt-2"
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
