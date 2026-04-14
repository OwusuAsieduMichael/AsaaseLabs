'use client'

import { motion } from 'framer-motion'

export default function Testimonials() {
  return (
    <section className="section-spacing bg-dark">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            Building trust through exceptional delivery and lasting partnerships
          </p>

          <div className="card p-12">
            <div className="text-gray-500 text-sm mb-4">Coming Soon</div>
            <p className="text-gray-400 italic">
              Testimonials from satisfied clients will be showcased here as we continue 
              to deliver exceptional solutions and build lasting partnerships.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
