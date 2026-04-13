'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: [
      { name: 'About', href: '#about' },
      { name: 'Our Work', href: '#work' },
      { name: 'Process', href: '#process' },
      { name: 'Careers', href: '#careers' },
    ],
    Services: [
      { name: 'Software Development', href: '#services' },
      { name: 'Mobile Apps', href: '#services' },
      { name: 'AI Systems', href: '#services' },
      { name: 'Product Design', href: '#services' },
    ],
    Connect: [
      { name: 'Email', href: 'mailto:hello@asaaselabs.com' },
      { name: 'LinkedIn', href: '#' },
      { name: 'Twitter/X', href: '#' },
    ],
  }

  return (
    <footer className="bg-dark border-t border-gray-800 relative overflow-hidden">
      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="text-[20rem] font-bold text-white leading-none">
          Asaase
        </div>
      </div>

      <div className="section-container py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary text-2xl">⚡</span>
              <div className="text-xl font-bold text-white">Asaase Labs</div>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Building Africa's next generation of digital solutions through innovative engineering and design.
            </p>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-sm text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Asaase Labs. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
