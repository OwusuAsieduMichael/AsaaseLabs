'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: [
      { name: 'About', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Products', href: '#products' },
      { name: 'Process', href: '#process' },
    ],
    Products: [
      { name: 'CareerLens', href: '#products' },
      { name: 'KasaBridge', href: '#products' },
      { name: 'GoXpress', href: '#products' },
      { name: 'Lamla FrontDesk', href: '#products' },
    ],
    Connect: [
      { name: 'LinkedIn', href: '#' },
      { name: 'Twitter', href: '#' },
      { name: 'GitHub', href: '#' },
      { name: 'Contact', href: '#contact' },
    ],
  }

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xl font-bold text-gray-900 mb-4">Asaase Labs</div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Engineering digital solutions that matter. Transforming ideas into scalable products.
            </p>
            <div className="flex gap-3">
              {['LinkedIn', 'Twitter', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all text-xs font-medium"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
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
              <h3 className="font-semibold text-sm text-gray-900 mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
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
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {currentYear} Asaase Labs. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
