'use client'

import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section id="contact" className="section-spacing bg-gray-50">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Let's Build Something Great
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto text-balance">
              Ready to transform your vision into reality? Partner with us to create solutions that drive real impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.a
                href="mailto:hello@asaaselabs.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Start Your Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary"
              >
                Explore Services
              </motion.a>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'Email', value: 'hello@asaaselabs.com' },
                { label: 'Location', value: 'Accra, Ghana' },
                { label: 'Partnerships', value: 'Open to collaborations' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="card p-6 text-center"
                >
                  <div className="text-sm font-semibold text-gray-900 mb-1">{item.label}</div>
                  <div className="text-sm text-gray-600">{item.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
