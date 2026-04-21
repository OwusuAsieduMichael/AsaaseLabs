'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'

export default function ProductDesign() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const heroImages = ['/hero-big.jpg', '/hero-big2.jpg', '/hero-big3.jpg']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((image, index) => (
            <motion.div
              key={image}
              initial={{ x: '100%' }}
              animate={{ x: currentImageIndex === index ? '0%' : currentImageIndex > index ? '-100%' : '100%' }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="absolute inset-0 bg-dark/80"></div>
          <div className="absolute inset-0 pattern-grid opacity-10"></div>
        </div>
        <div className="section-container relative z-10">
          <PageBackNav fallbackHref="/#services" fallbackLabel="Services" align="center" className="mb-8" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-primary text-sm font-bold tracking-wide">SERVICE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Product Design
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              User-centric UI/UX design that ensures intuitive experiences and higher engagement rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#approach"
                className="btn-secondary"
              >
                Learn Our Approach
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/background5.jpg)' }}
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
        </div>
        <div className="absolute inset-0 pattern-grid opacity-30 z-0"></div>

      <section className="section-spacing relative z-10">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                What is Product Design?
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Product design is the process of creating digital products that are not only visually appealing but also intuitive, accessible, and aligned with user needs. We combine user research, interface design, and interaction patterns to craft experiences that users love.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our design approach focuses on solving real user problems while achieving your business objectives, resulting in products that drive engagement and conversion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {[
                { title: 'Who is it for?', desc: 'Businesses launching new products or improving existing digital experiences' },
                { title: 'Key Benefits', desc: 'Higher user satisfaction, increased conversions, reduced development costs, and competitive advantage' },
                { title: 'Applications', desc: 'Web apps, mobile apps, SaaS platforms, e-commerce sites, and enterprise software' },
              ].map((item, index) => (
                <div key={index} className="card p-6 border-l-4 border-blue-500">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-spacing relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              What's Included
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive design services from research to final handoff
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
                title: 'User Research',
                desc: 'In-depth research to understand your users, their needs, and pain points'
              },
              {
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                title: 'Information Architecture',
                desc: 'Organize content and features for optimal user flow and navigation'
              },
              {
                icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z',
                title: 'Wireframing',
                desc: 'Low-fidelity layouts to establish structure and functionality'
              },
              {
                icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
                title: 'UI Design',
                desc: 'High-fidelity visual designs with modern aesthetics and brand alignment'
              },
              {
                icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
                title: 'Interactive Prototypes',
                desc: 'Clickable prototypes to test and validate design decisions'
              },
              {
                icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
                title: 'Usability Testing',
                desc: 'Test designs with real users to identify and fix issues early'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover-lift border-l-4 border-blue-500 hover:border-blue-400 bg-gradient-to-br from-blue-500/10 to-transparent hover:from-blue-500/15 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="section-spacing relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Our Design Process
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A user-centered approach that delivers designs people love to use
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: '01',
                title: 'Discovery & Research',
                desc: 'We start by understanding your users, business goals, and competitive landscape through interviews, surveys, and analytics review.',
                duration: '1-3 weeks'
              },
              {
                step: '02',
                title: 'Define & Strategize',
                desc: 'Synthesize research findings into user personas, journey maps, and design requirements that guide the entire project.',
                duration: '1-2 weeks'
              },
              {
                step: '03',
                title: 'Ideate & Wireframe',
                desc: 'Generate multiple design concepts and create wireframes to establish information architecture and user flows.',
                duration: '1-3 weeks'
              },
              {
                step: '04',
                title: 'Design & Prototype',
                desc: 'Create high-fidelity designs with your brand identity and build interactive prototypes for testing and validation.',
                duration: '2-4 weeks'
              },
              {
                step: '05',
                title: 'Test & Iterate',
                desc: 'Conduct usability testing with real users, gather feedback, and refine designs based on insights.',
                duration: '1-3 weeks'
              },
              {
                step: '06',
                title: 'Handoff & Support',
                desc: 'Deliver design files, style guides, and component libraries. Provide ongoing support during development.',
                duration: 'Ongoing'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8 border-l-4 border-blue-500 hover:border-blue-400 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl font-bold text-gray-800">{item.step}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <span className="text-sm text-primary font-semibold">{item.duration}</span>
                    </div>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Design Tools & Deliverables
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We use industry-standard tools and provide comprehensive design assets
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Design Tools',
                technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Adobe Photoshop', 'Adobe After Effects', 'Adobe Audition'],
                icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
              },
              {
                category: 'Research Tools',
                technologies: ['UserTesting', 'Hotjar', 'Google Analytics', 'Maze'],
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              },
              {
                category: 'Deliverables',
                technologies: ['Design Files', 'Style Guides', 'Component Library', 'Prototypes'],
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              },
            ].map((stack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8 border-l-4 border-blue-500 hover:border-blue-400 bg-gradient-to-br from-blue-500/10 to-transparent hover:from-blue-500/15 transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stack.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{stack.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark text-gray-300 text-sm font-medium rounded-lg border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'How long does a design project take?',
                a: 'Most design projects take 2-5 weeks depending on scope and complexity. We provide a detailed timeline after understanding your requirements.'
              },
              {
                q: 'Do you design for both web and mobile?',
                a: 'Yes, we design for all platforms including web applications, iOS, Android, and responsive websites with platform-specific best practices.'
              },
              {
                q: 'Can you work with our existing brand guidelines?',
                a: 'Absolutely. We can work within your existing brand guidelines or help you establish new ones if needed.'
              },
              {
                q: 'Do you conduct user research?',
                a: 'Yes, user research is a core part of our process. We conduct interviews, surveys, usability testing, and analytics review to inform design decisions.'
              },
              {
                q: 'What if we need changes after the design is complete?',
                a: 'We include revision rounds in our process. After delivery, we also offer ongoing design support and iteration services.'
              },
              {
                q: 'Will the designs be ready for development?',
                a: 'Yes, we provide developer-ready designs with detailed specifications, style guides, and component libraries for smooth handoff.'
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="card p-6"
              >
                <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Related Services
            </h2>
            <p className="text-gray-300">
              Complement your product design with these services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Custom Software',
                desc: 'Bring your designs to life with custom development',
                link: '/services/custom-software'
              },
              {
                title: 'Cloud Infrastructure',
                desc: 'Host your designed products on scalable cloud infrastructure',
                link: '/services/cloud-infrastructure'
              },
              {
                title: 'AI & Machine Learning',
                desc: 'Enhance your product with intelligent features',
                link: '/services/ai-ml'
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={service.link}
                  className="card p-6 hover-lift block group border-l-4 border-blue-500 hover:border-blue-400 bg-gradient-to-br from-blue-500/10 to-transparent hover:from-blue-500/15 transition-all"
                >
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{service.desc}</p>
                  <div className="flex items-center text-primary text-sm font-semibold">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-12 text-center border-l-4 border-blue-500 bg-gradient-to-br from-blue-500/10 to-transparent"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Design Your Product?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's create a user experience that delights your customers and drives business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Start Your Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="mailto:hello@asaaselabs.tech"
                className="btn-secondary"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      </div>

      <Footer />
    </main>
  )
}
