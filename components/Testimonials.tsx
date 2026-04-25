'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Michael Owusu Asiedu',
    role: 'CEO, AsaaseLabs',
    image: '/testimonial1.jpg',
    text: 'AsaaseLabs transformed our vision into reality with exceptional precision. Their team delivered a scalable solution that exceeded our expectations and drove significant business growth.'
  },
  {
    id: 2,
    name: 'Mensah Isaac Nana Sam',
    role: 'CEO/Founder - SmartHive Labs',
    image: '/dhope.jpg',
    text: 'Asaase Labs is one of the rare tech partners you can truly trust to handle everything from design workflows to full-scale development and seamless collaboration.'
  },
  {
    id: 3,
    name: 'Theophilus Amankwaah',
    role: 'Founder, AmassTechHub',
    image: '/testimonial3.jpg',
    text: 'The product design and development process was seamless. AsaaseLabs understood our needs perfectly and delivered a beautiful, user-friendly solution that our customers love.'
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleDotClick = (index: number) => {
    setCurrentIndex(index * 3)
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3)
  const totalDots = Math.ceil(testimonials.length / 3)

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dark blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#0f1535] to-[#0a0e27]" />
      
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glowing orbital effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative w-[90%] max-w-6xl aspect-[2/1]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          {/* Outer orbital ring */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" 
               style={{ 
                 borderRadius: '50%',
                 boxShadow: '0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 40px rgba(59, 130, 246, 0.1)'
               }} 
          />
          
          {/* Glowing orbs on orbit */}
          <motion.div
            className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-blue-400"
            style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-3 h-3 -ml-1.5 -mb-1.5 rounded-full bg-purple-400"
            style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)' }}
          />
        </motion.div>
      </div>

      <div className="relative section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Client Testimonials
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Building trust through exceptional delivery and lasting partnerships
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative z-10 scroll-rail md:grid md:grid-cols-3 md:gap-8 mb-12 md:overflow-visible md:pb-0 md:snap-none">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group scroll-rail-item"
            >
              {/* Card with glassmorphism effect */}
              <div className="relative scroll-rail-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 sm:p-4 h-full hover:bg-white/10 transition-all duration-300 md:p-8"
                   style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                
                {/* Sparkle effect on hover */}
                <div className="absolute -top-1 -right-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="text-yellow-300 text-2xl"
                  >
                    ✨
                  </motion.div>
                </div>

                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-md opacity-50" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-20 h-20 rounded-full object-cover border-4 border-white/20"
                    />
                  </div>
                </div>

                {/* Name and Role */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-blue-400">
                    {testimonial.role}
                  </p>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 text-center leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Quote decoration */}
                <div className="absolute top-6 left-6 text-6xl text-blue-500/20 font-serif leading-none">
                  "
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="hidden md:flex justify-center gap-3">
          {[...Array(totalDots)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
                Math.floor(currentIndex / 3) === index
                  ? 'w-8 h-3 bg-blue-500'
                  : 'w-3 h-3 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial set ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
