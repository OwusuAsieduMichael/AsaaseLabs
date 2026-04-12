'use client'

import { motion } from 'framer-motion'

export default function Services() {
  const services = [
    {
      title: 'AI & Machine Learning',
      description: 'Advanced neural networks, predictive analytics, and intelligent automation systems.',
      features: ['Deep Learning', 'Computer Vision', 'NLP', 'Predictive Analytics'],
    },
    {
      title: 'Software Development',
      description: 'Cloud-native applications and scalable enterprise solutions with modern tech stacks.',
      features: ['Cloud Native', 'Microservices', 'API Development', 'DevOps'],
    },
    {
      title: 'Mobile Applications',
      description: 'Cross-platform apps with seamless native performance and modern user experiences.',
      features: ['iOS & Android', 'React Native', 'Flutter', 'Progressive Web Apps'],
    },
    {
      title: 'Product Design',
      description: 'User-centered design systems and immersive digital experiences.',
      features: ['UI/UX Design', 'Design Systems', 'Prototyping', 'User Research'],
    },
  ]

  return (
    <section id="services" className="section-spacing bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Comprehensive technology solutions designed to transform your business
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-8 md:p-10 hover-lift group"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-100"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Hover indicator */}
              <div className="mt-6 flex items-center text-sm font-medium text-gray-400 group-hover:text-gray-900 transition-colors">
                Learn more
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
