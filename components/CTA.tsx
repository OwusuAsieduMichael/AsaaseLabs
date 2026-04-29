'use client'

import { motion } from 'framer-motion'

const EMAIL = 'hello@asaaselabs.tech'
const MAILTO =
  'https://mail.google.com/mail/?view=cm&fs=1&to=hello%40asaaselabs.tech&su=Project%20Inquiry%20from%20AsaaseLabs%20Website'
export default function CTA() {
  return (
    <section id="contact" className="section-spacing relative overflow-hidden">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background4.jpg)' }}
        />
        <div className="absolute inset-0 bg-[#0F172A]/85" />
      </div>
      
      <div className="section-container relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
              Let's Build Something Great
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto text-balance font-medium">
              Ready to transform your vision into reality? Partner with us to create solutions that drive real impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center sm:flex-row sm:items-stretch gap-3 justify-center mb-16">
              <motion.a
                href="/get-started"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex w-[min(80vw,18rem)] items-center justify-center gap-2 sm:w-auto"
              >
                Start Your Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
              <motion.a
                href="/#services"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary inline-flex w-[min(80vw,18rem)] items-center justify-center sm:w-auto"
              >
                Explore Services
              </motion.a>
            </div>

            {/* Contact Info */}
            <div className="relative z-20 scroll-rail md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0 md:snap-none">
              {[
                { label: 'Email', value: EMAIL, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', link: MAILTO },
                { label: 'Phone', value: '+233 55 977 6547', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', link: 'tel:+233559776547' },
                { label: 'WhatsApp', value: '+233 24 625 9166', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', link: 'https://wa.me/233246259166' },
                { label: 'Location', value: 'Kumasi, Ghana', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', link: 'https://maps.google.com/?q=Kumasi,Ghana' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="scroll-rail-item"
                >
                  <a
                    href={item.link}
                    target={
                      item.link.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      item.link.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="card scroll-rail-card p-3 sm:p-4 text-center border-t-4 border-blue-500 hover:border-blue-400 bg-gradient-to-b from-blue-500/10 to-transparent hover:from-blue-500/15 transition-all block h-full cursor-pointer md:p-6"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-white mb-1 tracking-tight">{item.label}</div>
                    <div className="text-sm text-gray-300 font-medium">{item.value}</div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
