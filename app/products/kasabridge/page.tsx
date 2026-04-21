'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'

export default function KasaBridgePage() {
  const features = [
    {
      title: 'Real-time Translation',
      description: 'Instant translation between English and major Ghanaian languages with high accuracy.',
      icon: '⚡'
    },
    {
      title: 'Speech Recognition',
      description: 'Advanced voice recognition technology that understands various accents and dialects.',
      icon: '🎤'
    },
    {
      title: 'Text Translation',
      description: 'Translate written content seamlessly across multiple languages.',
      icon: '📝'
    },
    {
      title: 'Offline Mode',
      description: 'Access basic translation features even without internet connectivity.',
      icon: '📱'
    },
    {
      title: 'Cultural Context',
      description: 'Translations that preserve cultural nuances and local expressions.',
      icon: '🌍'
    },
    {
      title: 'Multi-Language Support',
      description: 'Support for Twi, Ga, Ewe, Hausa, and more Ghanaian languages.',
      icon: '🗣️'
    }
  ]

  const languages = [
    { name: 'Twi (Akan)', status: 'Active' },
    { name: 'Ga', status: 'Active' },
    { name: 'Ewe', status: 'In Progress' },
    { name: 'Hausa', status: 'In Progress' },
    { name: 'Dagbani', status: 'Planned' },
    { name: 'Fante', status: 'Planned' },
  ]

  const useCases = [
    {
      title: 'Healthcare',
      description: 'Enable better communication between healthcare providers and patients who speak different languages.',
      icon: '🏥',
      color: 'blue'
    },
    {
      title: 'Education',
      description: 'Help students learn in their native language while mastering English.',
      icon: '📚',
      color: 'green'
    },
    {
      title: 'Business',
      description: 'Facilitate business transactions and negotiations across language barriers.',
      icon: '💼',
      color: 'purple'
    },
    {
      title: 'Tourism',
      description: 'Assist tourists in communicating with locals and experiencing authentic culture.',
      icon: '✈️',
      color: 'orange'
    }
  ]

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/background3.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/95 via-[#0F172A]/90 to-[#0F172A]" />
        </div>
        <div className="absolute inset-0 pattern-dots opacity-20" />
        
        <div className="section-container relative z-10">
          <PageBackNav fallbackHref="/#products" fallbackLabel="Products" align="center" className="mb-8" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
              <span className="text-purple-400 text-sm font-bold tracking-wide">BREAKING LANGUAGE BARRIERS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
              KasaBridge
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              AI-powered multilingual communication platform connecting English and Ghanaian languages
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Development Progress</span>
                <span className="font-bold text-purple-400">65%</span>
              </div>
              <div className="h-3 bg-dark-lighter rounded-full overflow-hidden border border-gray-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition-all"
              >
                Request Early Access
              </motion.button>
              <motion.a
                href="#features"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-gray-700 hover:border-purple-500 hover:bg-purple-500/10 transition-all"
              >
                Explore Features
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-spacing relative">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Bridging Communication Gaps
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                KasaBridge leverages cutting-edge AI and natural language processing to enable seamless communication between English and major Ghanaian languages. Whether it's speech or text, we make understanding effortless.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our platform is designed to preserve cultural context and local expressions, ensuring that translations are not just accurate, but also culturally appropriate and meaningful.
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">6+</div>
                  <div className="text-sm text-gray-400">Languages</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">90%</div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">Real-time</div>
                  <div className="text-sm text-gray-400">Translation</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="card p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">Supported Languages</h3>
                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between p-4 bg-dark-lighter rounded-lg">
                      <span className="text-white font-semibold">{lang.name}</span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        lang.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        lang.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {lang.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-spacing relative">
        <div className="absolute inset-0 pattern-grid opacity-20" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Everything you need for seamless multilingual communication
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8 border-l-4 border-purple-500 hover:border-pink-500 bg-gradient-to-br from-purple-500/5 to-transparent hover:from-purple-500/10 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Real-World Applications
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              KasaBridge is transforming communication across various sectors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8 hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 bg-${useCase.color}-500/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}>
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{useCase.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing relative">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-12 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Join the Communication Revolution
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of breaking down language barriers in Ghana and beyond. Request early access to KasaBridge today.
            </p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-dark border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition-all whitespace-nowrap"
              >
                Request Access
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section-spacing relative">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Explore Our Other Products
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'CareerLens', desc: 'AI-powered career intelligence', link: '/products/careerlens', gradient: 'from-blue-500 to-cyan-500' },
              { name: 'GoXpress', desc: 'Smart logistics platform', link: '/products/goxpress', gradient: 'from-orange-500 to-red-500' },
              { name: 'LAMLA FrontDesk', desc: 'Student preparation platform', link: '/products/lamla', gradient: 'from-green-500 to-teal-500' },
            ].map((product) => (
              <Link
                key={product.name}
                href={product.link}
                className="card p-6 group hover-lift border-l-4 border-purple-500 hover:border-purple-400"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4">{product.desc}</p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  Learn more
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
