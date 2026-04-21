'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'

export default function GoXpressPage() {
  const features = [
    {
      title: 'Real-time Tracking',
      description: 'Track your parcels in real-time with live GPS updates and delivery status notifications.',
      icon: '📍'
    },
    {
      title: 'Route Optimization',
      description: 'AI-powered route planning that reduces delivery time and operational costs.',
      icon: '🗺️'
    },
    {
      title: 'Smart Dispatch',
      description: 'Intelligent dispatch system that assigns deliveries to the most suitable drivers.',
      icon: '🚚'
    },
    {
      title: 'Customer Portal',
      description: 'User-friendly portal for customers to book, track, and manage their deliveries.',
      icon: '💻'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting for data-driven decision making.',
      icon: '📊'
    },
    {
      title: 'Multi-stop Delivery',
      description: 'Efficiently manage multiple delivery points in a single trip.',
      icon: '📦'
    }
  ]

  const benefits = [
    {
      title: 'For Businesses',
      points: ['Reduce delivery costs by up to 30%', 'Improve customer satisfaction', 'Scale operations efficiently', 'Real-time visibility'],
      icon: '🏢',
      color: 'orange'
    },
    {
      title: 'For Drivers',
      points: ['Optimized routes save time', 'Easy-to-use mobile app', 'Transparent earnings', 'Flexible scheduling'],
      icon: '👨‍✈️',
      color: 'blue'
    },
    {
      title: 'For Customers',
      points: ['Track deliveries in real-time', 'Flexible delivery options', 'Instant notifications', 'Reliable service'],
      icon: '😊',
      color: 'green'
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
            style={{ backgroundImage: 'url(/background5.jpg)' }}
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
            <div className="inline-flex items-center mb-6 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full backdrop-blur-sm">
              <span className="text-orange-400 text-sm font-bold tracking-wide">SMART LOGISTICS SOLUTION</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
              GoXpress
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Revolutionizing delivery and logistics with real-time tracking and intelligent route optimization
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Development Progress</span>
                <span className="font-bold text-orange-400">60%</span>
              </div>
              <div className="h-3 bg-dark-lighter rounded-full overflow-hidden border border-gray-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:opacity-90 transition-all"
              >
                Get Started
              </motion.button>
              <motion.a
                href="#features"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-gray-700 hover:border-orange-500 hover:bg-orange-500/10 transition-all"
              >
                Learn More
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
                Logistics Made Simple
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                GoXpress is a comprehensive logistics platform that streamlines the entire delivery process from dispatch to doorstep. Our intelligent system optimizes routes, reduces costs, and enhances customer experience.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Whether you're a small business or a large enterprise, GoXpress scales with your needs, providing the tools and insights you need to run efficient delivery operations.
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-1">30%</div>
                  <div className="text-sm text-gray-400">Cost Reduction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-1">50%</div>
                  <div className="text-sm text-gray-400">Faster Delivery</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-1">95%</div>
                  <div className="text-sm text-gray-400">On-time Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="card p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">How It Works</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Create Delivery</h4>
                      <p className="text-sm text-gray-300">Enter pickup and delivery details through our platform</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Smart Assignment</h4>
                      <p className="text-sm text-gray-300">AI assigns the best driver based on location and availability</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Real-time Tracking</h4>
                      <p className="text-sm text-gray-300">Track your parcel every step of the way with live updates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Successful Delivery</h4>
                      <p className="text-sm text-gray-300">Receive confirmation and proof of delivery instantly</p>
                    </div>
                  </div>
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
              Everything you need to run efficient delivery operations
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
                className="card p-8 border-l-4 border-orange-500 hover:border-red-500 bg-gradient-to-br from-orange-500/5 to-transparent hover:from-orange-500/10 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Benefits for Everyone
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              GoXpress creates value for all stakeholders in the delivery ecosystem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8 text-center hover-lift"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-6">{benefit.title}</h3>
                <ul className="space-y-3 text-left">
                  {benefit.points.map((point) => (
                    <li key={point} className="text-gray-300 flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
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
            className="card p-12 text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Transform Your Logistics?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join businesses already optimizing their delivery operations with GoXpress. Get started today!
            </p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-dark border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:opacity-90 transition-all whitespace-nowrap"
              >
                Get Started
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
              { name: 'KasaBridge', desc: 'Multilingual translation platform', link: '/products/kasabridge', gradient: 'from-purple-500 to-pink-500' },
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
