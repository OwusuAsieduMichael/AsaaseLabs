'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: [
      { name: 'What we do', href: '/what-we-do' },
      { name: 'About', href: '/#about' },
      { name: 'Our Work', href: '/#products' },
      { name: 'Process', href: '/#process' },
      { name: 'Careers', href: '/careers' },
    ],
    Services: [
      { name: 'Software Development', href: '/services/custom-software' },
      { name: 'Mobile Apps', href: '/#services' },
      { name: 'AI Systems', href: '/services/ai-ml' },
      { name: 'Product Design', href: '/services/product-design' },
    ],
    Connect: [
      {
        name: 'Email',
        href: 'https://mail.google.com/mail/?view=cm&fs=1&to=hello%40asaaselabs.tech&su=Contact%20AsaaseLabs',
      },
      { name: 'WhatsApp', href: 'https://wa.me/233246259166' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/michaelowusuasiedu/' },
    ],
  }

  return (
    <footer className="bg-dark border-t border-gray-800 relative overflow-hidden">
      {/* Large background text with continuous scroll animation */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden opacity-5 pointer-events-none">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap"
        >
          <div className="text-[20rem] font-bold text-white leading-none pr-20">
            AsaaseLabs
          </div>
          <div className="text-[20rem] font-bold text-white leading-none pr-20">
            AsaaseLabs
          </div>
          <div className="text-[20rem] font-bold text-white leading-none pr-20">
            AsaaseLabs
          </div>
        </motion.div>
      </div>

      <div className="section-container py-16 relative z-10">
        <div className="grid gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4 -ml-2">
              <Image
                src="/asaase5.png"
                alt=""
                width={320}
                height={320}
                className="h-24 w-auto object-contain object-left shrink-0"
              />
              <div className="text-2xl font-bold tracking-tight">
                <span className="text-white">Asaase</span>
                <span className="text-primary">Labs</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Building Africa's next generation of digital solutions through innovative engineering and design.
            </p>
          </motion.div>

          {/* Horizontal dropdown links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-20"
          >
            <div className="flex items-center justify-start md:justify-center gap-3 sm:gap-4 overflow-x-auto pb-2">
              {Object.entries(footerLinks).map(([category, links], index) => (
                <details
                  key={category}
                  className="group relative min-w-[112px] sm:min-w-[126px]"
                >
                  <summary
                    className="list-none cursor-pointer rounded-xl border border-gray-700 bg-dark-lighter/70 px-3 py-2 text-center text-xs sm:text-sm font-semibold text-white hover:border-primary/70 transition-colors"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {category}
                      <svg
                        className="w-3.5 h-3.5 text-gray-400 transition-transform group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>

                  <ul className="absolute left-0 mt-2 w-52 rounded-xl border border-gray-700 bg-dark-card/95 backdrop-blur-md p-3 space-y-2 shadow-2xl hidden group-open:block">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="block rounded-lg px-2.5 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-dark-lighter transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} AsaaseLabs. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
