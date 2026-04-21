'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'

export default function CloudInfrastructure() {
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
              Cloud Infrastructure
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Scalable, secure, and resilient cloud architectures designed for high-availability enterprise workloads.
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
                What is Cloud Infrastructure?
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Cloud infrastructure encompasses the hardware and software components needed to support cloud computing, including servers, storage, networking, and virtualization resources. We design and implement cloud solutions that are scalable, secure, and optimized for performance.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our cloud infrastructure services ensure your applications run reliably with minimal downtime, automatic scaling, and robust disaster recovery capabilities.
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
                { title: 'Who is it for?', desc: 'Businesses requiring reliable, scalable infrastructure without managing physical servers' },
                { title: 'Key Benefits', desc: 'Cost efficiency, automatic scaling, high availability, disaster recovery, and global reach' },
                { title: 'Applications', desc: 'Web hosting, data storage, application deployment, backup solutions, and hybrid cloud setups' },
              ].map((item, index) => (
                <div key={index} className="card p-6 border-l-4 border-purple-500">
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
              Comprehensive cloud infrastructure services to power your digital operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
                title: 'Infrastructure Design',
                desc: 'Architecture planning for scalability, security, and cost optimization'
              },
              {
                icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
                title: 'Cloud Migration',
                desc: 'Seamless migration of existing applications and data to the cloud'
              },
              {
                icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
                title: 'Security & Compliance',
                desc: 'Implementation of security best practices and compliance standards'
              },
              {
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'Auto-Scaling',
                desc: 'Automatic resource scaling based on demand and traffic patterns'
              },
              {
                icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
                title: 'Database Management',
                desc: 'Managed database services with automated backups and replication'
              },
              {
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                title: 'Monitoring & Alerts',
                desc: 'Real-time monitoring with automated alerts and performance insights'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover-lift border-l-4 border-purple-500 hover:border-purple-400 bg-gradient-to-br from-purple-500/10 to-transparent hover:from-purple-500/15 transition-all"
              >
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Our Cloud Implementation Approach
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A systematic methodology for building reliable and scalable cloud infrastructure
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: '01',
                title: 'Assessment & Planning',
                desc: 'We analyze your current infrastructure, workload requirements, and business objectives to design the optimal cloud architecture.',
                duration: '1-2 weeks'
              },
              {
                step: '02',
                title: 'Architecture Design',
                desc: 'Create detailed infrastructure blueprints including network topology, security layers, and resource allocation strategies.',
                duration: '1-2 weeks'
              },
              {
                step: '03',
                title: 'Infrastructure Setup',
                desc: 'Deploy cloud resources using infrastructure-as-code for consistency, version control, and easy replication.',
                duration: '2-4 weeks'
              },
              {
                step: '04',
                title: 'Migration & Integration',
                desc: 'Migrate existing applications and data with minimal downtime, ensuring seamless integration with current systems.',
                duration: '2-6 weeks'
              },
              {
                step: '05',
                title: 'Testing & Optimization',
                desc: 'Comprehensive testing for performance, security, and reliability. Fine-tune configurations for optimal efficiency.',
                duration: '1-2 weeks'
              },
              {
                step: '06',
                title: 'Monitoring & Support',
                desc: 'Continuous monitoring, automated alerts, regular maintenance, and 24/7 support for critical infrastructure.',
                duration: 'Ongoing'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8 border-l-4 border-purple-500 hover:border-purple-400 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl font-bold text-gray-800">{item.step}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <span className="text-sm text-purple-400 font-semibold">{item.duration}</span>
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
              Cloud Platforms & Technologies
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We work with leading cloud providers and modern DevOps tools
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Cloud Providers',
                technologies: ['AWS', 'Google Cloud', 'Microsoft Azure', 'DigitalOcean'],
                icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
              },
              {
                category: 'Infrastructure as Code',
                technologies: ['Terraform', 'CloudFormation', 'Ansible', 'Pulumi'],
                icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
              },
              {
                category: 'Container & Orchestration',
                technologies: ['Docker', 'Kubernetes', 'ECS', 'Cloud Run'],
                icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
              },
            ].map((stack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8 border-l-4 border-purple-500 hover:border-purple-400 bg-gradient-to-br from-purple-500/10 to-transparent hover:from-purple-500/15 transition-all"
              >
                <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                q: 'Which cloud provider should I choose?',
                a: 'The choice depends on your specific needs, existing tools, and budget. We help you evaluate options and recommend the best fit based on your requirements.'
              },
              {
                q: 'How long does cloud migration take?',
                a: 'Migration timelines vary from 2-12 weeks depending on the complexity of your infrastructure and data volume. We provide a detailed timeline after assessment.'
              },
              {
                q: 'Will my applications experience downtime during migration?',
                a: 'We use strategies like blue-green deployment and phased migration to minimize or eliminate downtime during the transition.'
              },
              {
                q: 'How do you ensure cloud security?',
                a: 'We implement multiple security layers including encryption, access controls, network segmentation, regular audits, and compliance with industry standards.'
              },
              {
                q: 'What are the cost implications of moving to the cloud?',
                a: 'Cloud costs vary based on usage. We optimize your infrastructure for cost efficiency and provide transparent pricing estimates before migration.'
              },
              {
                q: 'Do you provide ongoing cloud management?',
                a: 'Yes, we offer managed cloud services including monitoring, maintenance, optimization, and 24/7 support to ensure your infrastructure runs smoothly.'
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
              Complement your cloud infrastructure with these services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Custom Software',
                desc: 'Bespoke applications built to run on your cloud infrastructure',
                link: '/services/custom-software'
              },
              {
                title: 'Product Design',
                desc: 'User-centric UI/UX design for cloud-based applications',
                link: '/services/product-design'
              },
              {
                title: 'AI & Machine Learning',
                desc: 'Intelligent cloud-powered systems that scale automatically',
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
                  className="card p-6 hover-lift block group border-l-4 border-purple-500 hover:border-purple-400 bg-gradient-to-br from-purple-500/10 to-transparent hover:from-purple-500/15 transition-all"
                >
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{service.desc}</p>
                  <div className="flex items-center text-purple-400 text-sm font-semibold">
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
            className="card p-12 text-center border-l-4 border-purple-500 bg-gradient-to-br from-purple-500/10 to-transparent"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Move to the Cloud?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your infrastructure needs and design a cloud solution that scales with your business.
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
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello%40asaaselabs.tech&su=Cloud%20Infrastructure%20Inquiry"
                target="_blank"
                rel="noopener noreferrer"
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
