'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'

export default function AIMLService() {
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">AI & Machine Learning</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Practical AI solutions that automate workflows, improve predictions, and help your team make faster, better decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn-primary inline-flex items-center justify-center gap-2">
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#approach" className="btn-secondary">
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
                What is AI & Machine Learning?
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                AI and machine learning enable systems to learn from data, automate complex tasks, and generate predictions that support better business decisions. Instead of generic tools, we build models and workflows tailored to your operations and goals.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our focus is production-ready implementation: reliable pipelines, secure APIs, measurable outcomes, and continuous model improvement after deployment.
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
                { title: 'Who is it for?', desc: 'Teams looking to automate operations, improve forecasting, and unlock value from business data.' },
                { title: 'Key Benefits', desc: 'Faster decision-making, lower operational overhead, improved accuracy, and scalable intelligence.' },
                { title: 'Applications', desc: 'Recommendation systems, document extraction, chat assistants, fraud detection, and predictive analytics.' },
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">What's Included</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              End-to-end AI implementation services from problem framing to production monitoring
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
                title: 'AI Opportunity Discovery',
                desc: 'Identify high-impact use cases based on your workflow, data quality, and expected ROI.',
              },
              {
                icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
                title: 'Data Engineering',
                desc: 'Build clean, scalable data pipelines for training, inference, and reporting.',
              },
              {
                icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
                title: 'Model Development',
                desc: 'Train and validate ML models with performance benchmarks aligned to business KPIs.',
              },
              {
                icon: 'M5 13l4 4L19 7',
                title: 'Evaluation & Testing',
                desc: 'Test for quality, reliability, and bias before release into production workflows.',
              },
              {
                icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9',
                title: 'API & Workflow Integration',
                desc: 'Integrate AI outputs into your existing applications, dashboards, and internal tools.',
              },
              {
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m14 0V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10m6 0a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v14',
                title: 'Monitoring & Optimization',
                desc: 'Track model drift, improve accuracy, and continuously optimize production performance.',
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Our AI Delivery Approach</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A disciplined process that moves from idea to measurable production outcomes
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { step: '01', title: 'Problem framing', desc: 'Define business objective, constraints, and success metrics.', duration: '1-2 months' },
              { step: '02', title: 'Data readiness', desc: 'Assess data quality, build pipelines, and prepare training sets.', duration: '1-3 months' },
              { step: '03', title: 'Model development', desc: 'Train and evaluate models, then benchmark against KPIs.', duration: '2-5 months' },
              { step: '04', title: 'Deployment', desc: 'Ship model as APIs/workflows with observability and safeguards.', duration: '1-2 months' },
              { step: '05', title: 'Monitoring & tuning', desc: 'Track drift, improve performance, and iterate continuously.', duration: 'Ongoing' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Frequently Asked Questions</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'How long does an AI implementation take?',
                a: 'Most AI implementations take 2-6 months depending on scope, data quality, and integration complexity.',
              },
              {
                q: 'Do we need a lot of data before starting?',
                a: 'Not always. We can begin with available data, run an initial feasibility phase, and define what additional data is needed.',
              },
              {
                q: 'Can you integrate AI into our current software?',
                a: 'Yes. We design integrations for existing web apps, CRMs, internal dashboards, and backend services.',
              },
              {
                q: 'How do you ensure model reliability?',
                a: 'We use validation benchmarks, production monitoring, fallback logic, and regular tuning to maintain reliability over time.',
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Related Services</h2>
            <p className="text-gray-300">Complement your AI systems with these services</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Custom Software',
                desc: 'Build robust applications that embed AI into real business workflows',
                link: '/services/custom-software',
              },
              {
                title: 'Cloud Infrastructure',
                desc: 'Run AI workloads on secure, scalable cloud architecture',
                link: '/services/cloud-infrastructure',
              },
              {
                title: 'Product Design',
                desc: 'Design intuitive experiences around AI-powered features',
                link: '/services/product-design',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.link} className="card p-6 hover-lift block group border-l-4 border-blue-500 hover:border-blue-400 bg-gradient-to-br from-blue-500/10 to-transparent hover:from-blue-500/15 transition-all">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to integrate AI into your workflow?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let us identify the fastest path from idea to measurable AI outcomes for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn-primary inline-flex items-center justify-center gap-2">
                Start Your Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello%40asaaselabs.tech&su=AI%20%26%20Machine%20Learning%20Inquiry"
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
