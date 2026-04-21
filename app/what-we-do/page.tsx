'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'

const heroImages = ['/hero-big.jpg', '/hero-big2.jpg', '/hero-big3.jpg']

const offerings = [
  {
    title: 'AI Automations & Integrations',
    image: '/AIAut.jpeg',
    description:
      'We design reliable AI workflows that reduce manual effort, improve speed, and keep quality consistent across your operations.',
    highlight: 'Built for accuracy, security, and measurable business impact.',
    tint: 'from-blue-500/20',
    accent: 'border-blue-500/60',
  },
  {
    title: 'Website Design',
    image: '/WebDeve.jpeg',
    description:
      'We craft premium websites with modern UX, clear messaging, and performance-first engineering that converts visitors into customers.',
    highlight: 'Fast, responsive, and tailored to your brand credibility.',
    tint: 'from-cyan-500/20',
    accent: 'border-cyan-500/60',
  },
  {
    title: 'Cloud Infrastructure',
    image: '/CloudInf.jpeg',
    description:
      'We architect scalable cloud foundations with strong governance, uptime-focused design, and clean deployment pipelines.',
    highlight: 'Engineered for stability, growth, and long-term resilience.',
    tint: 'from-violet-500/20',
    accent: 'border-violet-500/60',
  },
  {
    title: 'Product Design',
    image: '/ProductDes.jpeg',
    description:
      'We turn product ideas into intuitive digital experiences through structured research, strategic UI decisions, and rapid iteration.',
    highlight: 'Designed with clarity so users trust and adopt faster.',
    tint: 'from-fuchsia-500/20',
    accent: 'border-fuchsia-500/60',
  },
]

export default function WhatWeDoPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
          <div className="absolute inset-0 bg-dark/80" />
          <div className="absolute inset-0 pattern-grid opacity-10" />
        </div>

        <div className="section-container relative z-10">
          <PageBackNav fallbackHref="/#about" fallbackLabel="About Us" align="center" className="mb-8" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-primary text-sm font-bold tracking-wide">ABOUT US</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">What We Do</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We deliver practical technology solutions across AI, web, cloud, and product design to help teams move faster and build smarter.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing relative overflow-hidden" id="offerings">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/background5.jpg)' }}
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
        </div>
        <div className="absolute inset-0 pattern-grid opacity-30 z-0" />

        <div className="section-container relative z-10">
          <div className="space-y-14 md:space-y-16">
            {offerings.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative max-w-6xl mx-auto overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/20 ${item.accent}`}
              >
                <div className="relative z-10 grid lg:grid-cols-[1.2fr,0.8fr] gap-5 lg:gap-7 items-stretch p-3 md:p-4">
                  <div className="card overflow-hidden lg:-ml-4 bg-dark-lighter/90 border border-white/10 transition-all duration-300 group-hover:border-white/20">
                    <div className="relative h-[18rem] md:h-[23rem] lg:h-[27rem] w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-fill object-center"
                        sizes="(max-width: 1024px) 100vw, 65vw"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 md:p-8 flex flex-col justify-center transition-all duration-300 group-hover:bg-white/10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">{item.title}</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">{item.description}</p>
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold">
                      {item.highlight}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 bg-dark">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto rounded-2xl border border-gray-700/60 bg-white/5 backdrop-blur-sm p-8 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
              A disciplined approach to digital excellence
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              At AsaaseLabs, every engagement follows a structured delivery model focused on quality, transparency, and long-term value.
              From discovery to implementation, we align each decision with business outcomes, user needs, and technical reliability.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Whether we are building intelligent automations, modern web experiences, cloud-ready systems, or product interfaces, our
              commitment remains the same: to deliver solutions that are trustworthy, scalable, and professionally executed.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
