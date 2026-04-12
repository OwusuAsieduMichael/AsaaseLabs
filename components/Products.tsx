'use client'

import { motion } from 'framer-motion'

export default function Products() {
  const products = [
    {
      name: 'CareerLens',
      description: 'AI-powered career guidance platform with machine learning algorithms for personalized career path recommendations.',
      status: 'In Development',
      tech: ['AI/ML', 'NLP', 'React', 'Python'],
      progress: 75,
    },
    {
      name: 'KasaBridge',
      description: 'Blockchain-verified property marketplace connecting seekers with authentic listings across Africa.',
      status: 'Coming Soon',
      tech: ['Blockchain', 'Next.js', 'Smart Contracts'],
      progress: 40,
    },
    {
      name: 'GoXpress',
      description: 'Real-time logistics platform with AI route optimization and predictive delivery analytics.',
      status: 'In Development',
      tech: ['IoT', 'Real-time', 'Maps API', 'AI'],
      progress: 60,
    },
    {
      name: 'Lamla FrontDesk',
      description: 'Smart visitor management with facial recognition and automated check-ins.',
      status: 'Coming Soon',
      tech: ['Computer Vision', 'Cloud', 'Mobile'],
      progress: 30,
    },
  ]

  return (
    <section id="products" className="section-spacing bg-gray-50">
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
            Our Innovations
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Next-generation products we're building to solve real-world problems
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
              className="card p-8 md:p-10 hover-lift"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {product.name}
                </h3>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                  {product.status}
                </span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Development Progress</span>
                  <span>{product.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${product.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  ></motion.div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {product.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-100"
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
  )
}
