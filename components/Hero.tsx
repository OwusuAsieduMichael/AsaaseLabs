'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Array of hero background images
  const heroImages = [
    '/hero-big.jpg',
    '/hero-big2.jpg',
    '/hero-big3.jpg',
  ]

  // Auto-rotate images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      )
    }, 8000) // 8 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section className="relative min-h-[62svh] sm:min-h-[78svh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Image slideshow with swipe effect */}
        {heroImages.map((image, index) => (
          <motion.div
            key={image}
            initial={{ x: '100%' }}
            animate={{
              x: currentImageIndex === index ? '0%' : currentImageIndex > index ? '-100%' : '100%',
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={image}
              alt=""
              className={`h-full w-full ${
                index === 1 ? 'object-cover object-center' : 'object-contain'
              }`}
              draggable={false}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-dark/80"></div>
        <div className="absolute inset-0 pattern-grid opacity-10"></div>
        
        {/* Navigation Arrows for Images */}
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark/60 backdrop-blur-sm border-2 border-gray-600 hover:border-primary hover:bg-dark/80 items-center justify-center transition-all group"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark/60 backdrop-blur-sm border-2 border-gray-600 hover:border-primary hover:bg-dark/80 items-center justify-center transition-all group"
          aria-label="Next image"
        >
          <svg className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Image indicators */}
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-20 px-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentImageIndex === index 
                  ? 'bg-primary w-8' 
                  : 'bg-gray-600 w-8 hover:bg-gray-500'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="section-container relative z-10 min-w-0 text-center pt-24 pb-14 sm:py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="min-w-0"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex max-w-full items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full mb-6 sm:mb-8 backdrop-blur-sm text-center"
          >
            <span className="w-2 h-2 shrink-0 bg-primary rounded-full animate-pulse"></span>
            <span className="text-balance leading-snug">
              Pioneering Digital Transformation in Africa
            </span>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-[1.85rem] sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-balance leading-[1.12] sm:leading-[1.05] tracking-tight break-words px-0.5">
            Building Africa's Next
            <br />
            Generation of
            <br />
            <span className="gradient-accent">Digital Solutions</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-[0.95rem] sm:text-lg md:text-xl text-gray-300 mb-10 sm:mb-12 max-w-3xl mx-auto text-balance leading-relaxed font-medium px-0.5">
            We engineer scalable, high-performance software and digital infrastructure that empowers African enterprises to compete globally.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.a
              href="/get-started"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Start a Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
            <motion.a
              href="#products"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary"
            >
              View Our Work
            </motion.a>
          </div>

          {/* Scroll down arrow, more visible */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:block mt-6 mb-12"
          >
            <a 
              href="#about" 
              className="inline-flex flex-col items-center gap-2 text-gray-300 hover:text-primary transition-colors group"
              aria-label="Scroll to content"
            >
              <span className="text-sm font-semibold">Scroll Down</span>
              <div className="w-10 h-10 rounded-full border-2 border-gray-600 group-hover:border-primary flex items-center justify-center transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </a>
          </motion.div>

          {/* Trusted By */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pt-12"
          >
            <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 uppercase tracking-wider px-2">
              Trusted by Innovative Companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10 md:gap-x-12 opacity-40 grayscale max-w-full px-1">
              {/* Placeholder for company logos, wrap on narrow screens */}
              <div className="text-base sm:text-xl md:text-2xl font-bold text-gray-600 whitespace-nowrap">AWS</div>
              <div className="text-base sm:text-xl md:text-2xl font-bold text-gray-600 whitespace-nowrap">Google</div>
              <div className="text-base sm:text-xl md:text-2xl font-bold text-gray-600 whitespace-nowrap">Microsoft</div>
              <div className="text-base sm:text-xl md:text-2xl font-bold text-gray-600 whitespace-nowrap">Stripe</div>
              <div className="text-base sm:text-xl md:text-2xl font-bold text-gray-600 whitespace-nowrap">GitHub</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
