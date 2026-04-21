'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Services() {
  const services = [
    {
      title: 'Custom Software',
      description: 'Bespoke web and mobile applications built with modern stacks to solve complex operational challenges.',
      link: '/services/custom-software',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Scalable, secure, and resilient cloud architectures designed for high-availability enterprise workloads.',
      link: '/services/cloud-infrastructure',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent automation, predictive analytics, and AI integrations that turn data into practical business outcomes.',
      link: '/services/ai-ml',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3v2.25M14.25 3v2.25M4.5 9.75h15M6.75 6.75h10.5a2.25 2.25 0 012.25 2.25v8.25a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 17.25V9a2.25 2.25 0 012.25-2.25zm2.25 6.75h.008v.008H9v-.008zm3 0h.008v.008H12v-.008zm3 0h.008v.008H15v-.008z" />
        </svg>
      ),
    },
    {
      title: 'Product Design',
      description: 'User-centric UI/UX design that ensures intuitive experiences and higher engagement rates.',
      link: '/services/product-design',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
  ]

  return (
    <section id="services" className="section-spacing relative overflow-hidden">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background3.jpg)' }}
        />
        <div className="absolute inset-0 bg-[#0F172A]/85" />
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30 z-0"></div>
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
            Core Capabilities
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-medium">
            End-to-end digital product engineering tailored for scale and performance.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 md:p-7 group cursor-pointer border-l-4 border-blue-500 hover:border-blue-400 bg-gradient-to-br from-blue-500/10 to-transparent hover:from-blue-500/15 transition-all"
            >
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-white tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-5 leading-relaxed font-medium">
                {service.description}
              </p>
              
              {/* Learn more link */}
              <Link
                href={service.link}
                className="flex items-center text-sm font-semibold text-blue-400 group-hover:gap-2 transition-all"
              >
                Learn more
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
