'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dark"></div>
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        <div className="absolute inset-0 hero-overlay"></div>
      </div>
      
      <div className="section-container relative z-10 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-2 text-sm font-medium text-gray-400 mb-8"
          >
            Pioneering Digital Transformation in Africa
          </motion.div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
            Building Africa's Next
            <br />
            Generation of
            <br />
            <span className="gradient-accent">Digital Solutions</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto text-balance leading-relaxed">
            We engineer scalable, high-performance software and digital infrastructure that empowers African enterprises to compete globally.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <motion.a
              href="#contact"
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
              href="#work"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary"
            >
              View Our Work
            </motion.a>
          </div>

          {/* Trusted By */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pt-12"
          >
            <p className="text-sm text-gray-500 mb-8 uppercase tracking-wider">Trusted by Innovative Companies</p>
            <div className="flex items-center justify-center gap-12 opacity-40 grayscale">
              {/* Placeholder for company logos */}
              <div className="text-2xl font-bold text-gray-600">AWS</div>
              <div className="text-2xl font-bold text-gray-600">Google</div>
              <div className="text-2xl font-bold text-gray-600">Microsoft</div>
              <div className="text-2xl font-bold text-gray-600">Stripe</div>
              <div className="text-2xl font-bold text-gray-600">GitHub</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a href="#about" className="text-gray-600 hover:text-gray-400 transition-colors" aria-label="Scroll to content">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
