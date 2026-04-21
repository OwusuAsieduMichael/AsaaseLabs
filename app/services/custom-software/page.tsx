'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'

export default function CustomSoftware() {
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
              Custom Software Development
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Bespoke web and mobile applications built with modern stacks to solve complex operational challenges and drive business growth.
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
                What is Custom Software Development?
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Custom software development is the process of designing, creating, deploying, and maintaining software tailored specifically to your business needs. Unlike off-the-shelf solutions, custom software is built from the ground up to match your unique workflows, processes, and goals.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We specialize in building scalable, secure, and high-performance applications that give you a competitive advantage and adapt as your business grows.
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
                { title: 'Who is it for?', desc: 'Businesses needing unique solutions that off-the-shelf software cannot provide' },
                { title: 'Key Benefits', desc: 'Complete control, scalability, competitive advantage, and perfect fit for your processes' },
                { title: 'Applications', desc: 'Enterprise systems, SaaS platforms, internal tools, customer portals, and more' },
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
              Comprehensive end-to-end development services to bring your vision to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
                title: 'Requirements Analysis',
                desc: 'Deep dive into your business needs, workflows, and goals'
              },
              {
                icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
                title: 'UI/UX Design',
                desc: 'User-centered interface design with interactive prototypes'
              },
              {
                icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
                title: 'Full-Stack Development',
                desc: 'Frontend, backend, and database implementation'
              },
              {
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                title: 'Quality Assurance',
                desc: 'Comprehensive testing, security audits, and performance optimization'
              },
              {
                icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
                title: 'Deployment',
                desc: 'Cloud deployment with CI/CD pipelines and monitoring'
              },
              {
                icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
                title: 'Ongoing Support',
                desc: '3 months of post-launch support, maintenance, and updates'
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
              Our Development Approach
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A proven methodology that ensures quality, transparency, and timely delivery
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: '01',
                title: 'Discovery & Planning',
                desc: 'We start by understanding your business, users, and technical requirements. This phase includes stakeholder interviews, competitive analysis, and technical feasibility assessment.',
                duration: '1-2 weeks'
              },
              {
                step: '02',
                title: 'Design & Prototyping',
                desc: 'Our designers create wireframes and interactive prototypes. You will see and interact with your application before a single line of code is written.',
                duration: '2-3 weeks'
              },
              {
                step: '03',
                title: 'Agile Development',
                desc: 'We build your software in 2-week sprints with regular demos and feedback sessions. You will see progress continuously and can request adjustments along the way.',
                duration: '4-6 weeks'
              },
              {
                step: '04',
                title: 'Testing & Quality Assurance',
                desc: 'Comprehensive testing including unit tests, integration tests, security audits, and performance optimization to ensure a robust final product.',
                duration: '2-3 weeks'
              },
              {
                step: '05',
                title: 'Deployment & Launch',
                desc: 'We handle the entire deployment process, including cloud infrastructure setup, CI/CD pipelines, monitoring, and a smooth go-live transition.',
                duration: '1 week'
              },
              {
                step: '06',
                title: 'Support & Maintenance',
                desc: 'Post-launch support includes bug fixes, performance monitoring, security updates, and feature enhancements as your business evolves.',
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
              Technology Stack
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We use modern, proven technologies to build scalable and maintainable applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Frontend',
                technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
                icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              },
              {
                category: 'Backend',
                technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'],
                icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
              },
              {
                category: 'Cloud & DevOps',
                technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
                icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
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
                q: 'How long does custom software development take?',
                a: 'Typical projects range from 3-6 months depending on complexity. We provide a detailed timeline after the discovery phase.'
              },
              {
                q: 'What is the cost of custom software development?',
                a: 'Costs vary by scope and complexity. Typical project budget bands are $350-$500, $550-$1,000, $2,000+, or negotiable after discovery. We provide a clear quote before implementation.'
              },
              {
                q: 'Do you provide ongoing maintenance and support?',
                a: 'Yes, all projects include 3 months of post-launch support. We also offer ongoing maintenance packages for long-term support and feature development.'
              },
              {
                q: 'Can you integrate with our existing systems?',
                a: 'Absolutely. We specialize in building software that integrates seamlessly with your existing tools, databases, and third-party services.'
              },
              {
                q: 'Will I own the source code?',
                a: 'Yes, you will have full ownership of all source code, designs, and intellectual property created for your project.'
              },
              {
                q: 'How do you ensure the software is secure?',
                a: 'We follow industry best practices including secure coding standards, regular security audits, penetration testing, and compliance with relevant regulations.'
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
              Complement your custom software with these services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Cloud Infrastructure',
                desc: 'Scalable, secure cloud architectures for high-availability workloads',
                link: '/services/cloud-infrastructure'
              },
              {
                title: 'Product Design',
                desc: 'User-centric UI/UX design for intuitive experiences',
                link: '/services/product-design'
              },
              {
                title: 'AI & Machine Learning',
                desc: 'Intelligent systems that learn and adapt to your business',
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
              Ready to Build Your Custom Software?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and create a solution tailored to your business needs.
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
                href="mailto:hello@asaaselabs.tech?subject=Custom%20Software%20Project%20Inquiry"
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
