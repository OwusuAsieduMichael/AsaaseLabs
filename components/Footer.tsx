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
          <div className="text-[9rem] sm:text-[14rem] lg:text-[20rem] font-bold text-white leading-none pr-20">
            AsaaseLabs
          </div>
          <div className="text-[9rem] sm:text-[14rem] lg:text-[20rem] font-bold text-white leading-none pr-20">
            AsaaseLabs
          </div>
          <div className="text-[9rem] sm:text-[14rem] lg:text-[20rem] font-bold text-white leading-none pr-20">
            AsaaseLabs
          </div>
        </motion.div>
      </div>

      <div className="section-container py-16 relative z-10">
        <div className="grid gap-10 mb-12 lg:grid-cols-[1.05fr_1.35fr] lg:items-start lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 -ml-1 sm:-ml-2">
              <Image
                src="/asaase5.png"
                alt=""
                width={320}
                height={320}
                className="h-16 sm:h-20 md:h-24 w-auto object-contain object-left shrink-0"
              />
              <div className="text-xl sm:text-2xl font-bold tracking-tight">
                <span className="text-white">Asaase</span>
                <span className="text-primary">Labs</span>
              </div>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-100 font-sans font-medium tracking-normal mb-6 leading-relaxed max-w-md">
              Building Africa&apos;s next generation of digital solutions
              <br />
              through innovative engineering and design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:justify-self-stretch lg:w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="text-white font-semibold mb-4">{category}</h4>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs sm:text-sm text-gray-500">
            © {currentYear} AsaaseLabs. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
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
