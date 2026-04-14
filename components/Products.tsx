'use client'

import { motion } from 'framer-motion'

export default function Products() {
  const products = [
    {
      name: 'CareerLens',
      description: 'AI-driven career intelligence platform that analyzes resumes against job descriptions to provide match scores, skill gaps, and improvement insights. Empowers candidates to optimize their CVs and make data-driven career decisions.',
      status: 'In Development',
      tech: ['AI/ML', 'NLP', 'Resume Analysis', 'Career Intelligence'],
      progress: 75,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'KasaBridge',
      description: 'AI-powered multilingual communication platform that translates speech and text between English and major Ghanaian languages. Leverages speech recognition and NLP to enable seamless, real-time communication and bridge language barriers.',
      status: 'In Development',
      tech: ['AI/ML', 'Speech Recognition', 'NLP', 'Translation'],
      progress: 65,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'GoXpress',
      description: 'Smart logistics and delivery platform designed to optimize parcel movement through real-time tracking, route optimization, and efficient dispatch systems. Enhances delivery speed, reduces operational costs, and improves customer experience.',
      status: 'In Development',
      tech: ['Real-time Tracking', 'Route Optimization', 'Logistics', 'Dispatch'],
      progress: 60,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500',
    },
    {
      name: 'LAMLA FrontDesk',
      description: 'AI-powered student preparation platform offering smart quizzes, performance tracking, and academic tools like GPA/CWA analytics. Enhances learning through real-time feedback, adaptive systems, and structured study support.',
      status: 'In Development',
      tech: ['AI/ML', 'Education Tech', 'Analytics', 'Performance Tracking'],
      progress: 70,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: 'from-green-500 to-teal-500',
    },
  ]

  return (
    <section id="products" className="section-spacing relative overflow-hidden">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background6.jpg)' }}
        />
        <div className="absolute inset-0 bg-[#0F172A]/85" />
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-40 z-0"></div>
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
            <span className="text-primary text-sm font-bold tracking-wide">INNOVATION PIPELINE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
            Our Innovations
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-balance font-medium">
            Next-generation products powered by AI and cutting-edge technology
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Gradient glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl`}></div>
              
              <div className="relative card p-8 md:p-10 hover-lift border-l-4 border-purple-500 hover:border-purple-400 bg-gradient-to-br from-purple-500/10 to-transparent hover:from-purple-500/15 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className={`text-primary bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>
                    {product.icon}
                  </div>
                  <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-500/30 tracking-wide">
                    {product.status}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-300 mb-5 leading-relaxed font-medium">
                  {product.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs text-gray-300 mb-2 font-semibold">
                    <span>Development Progress</span>
                    <span className="font-bold">{product.progress}%</span>
                  </div>
                  <div className="h-2 bg-dark rounded-full overflow-hidden border border-gray-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${product.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`h-full bg-gradient-to-r ${product.gradient} rounded-full`}
                    ></motion.div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {product.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-dark-lighter text-gray-200 text-xs font-semibold rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
