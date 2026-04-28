'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useAuth } from '@/app/context/AuthContext'
import AuthModal from './AuthModal'
import { useState } from 'react'

export default function Founder() {
  const { isAuthenticated } = useAuth()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (!isAuthenticated) {
      e.preventDefault()
      setShowAuthPrompt(true)
    }
  }

  const handleAuthChoice = (mode: 'login' | 'signup') => {
    setShowAuthPrompt(false)
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <>
      {/* Auth Prompt Modal */}
      <AnimatePresence>
        {showAuthPrompt && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthPrompt(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Prompt Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-dark-card border border-gray-800 rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowAuthPrompt(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-lighter border border-gray-700 hover:border-gray-600 flex items-center justify-center transition-all"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>

                {/* Message */}
                <h3 className="text-xl font-bold text-white text-center mb-3">
                  Authentication Required
                </h3>
                <p className="text-gray-300 text-center mb-6">
                  You need to sign up or log in to access the founder's social links and connect with us.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleAuthChoice('signup')}
                    className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-all duration-200 active:scale-95"
                    style={{ boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)' }}
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => handleAuthChoice('login')}
                    className="w-full px-6 py-3 bg-transparent text-gray-200 border-2 border-gray-700 rounded-xl font-semibold hover:bg-dark-lighter hover:border-gray-600 transition-all duration-200 active:scale-95"
                  >
                    Log In
                  </button>
                </div>

                {/* Additional Info */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  Create an account to unlock exclusive access
                </p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    <section className="section-spacing relative overflow-hidden">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background9.jpg)' }}
        />
        <div className="absolute inset-0 bg-[#0F172A]/85" />
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30 z-0"></div>
      
      <div className="section-container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
              <span className="text-primary text-sm font-bold tracking-wide">LEADERSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
              Meet Our Founder
            </h2>
          </motion.div>

          {/* Founder Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden border-l-4 border-blue-500 rounded-2xl"
            style={{ minHeight: '540px', backgroundColor: '#4a5568' }}
          >
            {/* Background Image */}
            <div className="absolute inset-0" style={{ backgroundColor: '#4a5568' }}>
              <div className="absolute inset-0" style={{
                maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0) 75%)',
                WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0) 75%)',
                filter: 'brightness(0.9) contrast(1.05) saturate(0.95)'
              }}>
                <Image
                  src="/founder.jpeg"
                  alt="Michael Owusu Asiedu, Founder & CEO"
                  fill
                  className="object-contain object-right"
                  priority
                />
              </div>
              {/* Subtle bottom gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a5568]/60 via-transparent to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex min-h-[540px] flex-col justify-end p-5 sm:p-8 md:min-h-[600px] md:p-12">
              <div className="max-w-3xl">
                {/* Name & Title with glow effect */}
                <div className="mb-6">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight" style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(59, 130, 246, 0.3)' }}>
                    Michael Owusu Asiedu
                  </h3>
                  <p className="text-lg sm:text-xl text-primary font-semibold" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
                    Founder & CEO
                  </p>
                </div>

                {/* Quote Icon with glow */}
                <div className="mb-4">
                  <svg className="w-9 h-9 sm:w-12 sm:h-12 text-primary/40" fill="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' }}>
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                {/* Statement with backdrop */}
                <blockquote className="mb-8">
                  <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed font-medium mb-4" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.8)' }}>
                    "At AsaaseLabs, we believe that Africa's digital transformation is not just about adopting technology, it's about creating solutions that are deeply rooted in our unique challenges and opportunities."
                  </p>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.8)' }}>
                    Our mission is to build world-class digital products that empower African businesses to compete globally while solving local problems. Every line of code we write, every system we architect, is driven by the vision of a technologically empowered Africa.
                  </p>
                </blockquote>

                {/* Social Links & Credentials */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  {/* Social Links with glow effect */}
                  <div className="flex gap-2.5 sm:gap-3">
                    <a
                      href="https://www.linkedin.com/in/michaelowusuasiedu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleSocialClick(e, 'https://www.linkedin.com/in/michaelowusuasiedu/')}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-dark/80 backdrop-blur-sm border-2 border-gray-600 hover:border-primary hover:bg-primary/20 flex items-center justify-center transition-all group"
                      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)' }}
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a
                      href="https://github.com/OwusuAsieduMichael"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleSocialClick(e, 'https://github.com/OwusuAsieduMichael')}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-dark/80 backdrop-blur-sm border-2 border-gray-600 hover:border-primary hover:bg-primary/20 flex items-center justify-center transition-all group"
                      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)' }}
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href="mailto:owusuasiedumichael9@gmail.com"
                      onClick={(e) => handleSocialClick(e, 'mailto:owusuasiedumichael9@gmail.com')}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-dark/80 backdrop-blur-sm border-2 border-gray-600 hover:border-primary hover:bg-primary/20 flex items-center justify-center transition-all group"
                      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)' }}
                      aria-label="Email"
                    >
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>

                  <div className="hidden md:block w-px h-12 bg-gray-600"></div>

                  {/* Quick Stats */}
                  <div className="flex w-full justify-between gap-4 sm:w-auto sm:justify-start sm:gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>10+</div>
                      <div className="text-xs text-gray-300 font-semibold" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)' }}>Years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>50+</div>
                      <div className="text-xs text-gray-300 font-semibold" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)' }}>Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>17</div>
                      <div className="text-xs text-gray-300 font-semibold" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)' }}>Products</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  )
}
