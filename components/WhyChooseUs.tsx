'use client'

import { motion } from 'framer-motion'

export default function WhyChooseUs() {
  const reasons = [
    {
      title: 'Innovation-Driven',
      description: 'We leverage the latest technologies and methodologies to deliver cutting-edge solutions.',
    },
    {
      title: 'Scalable Solutions',
      description: 'Built to grow with your business, designed for long-term success.',
    },
    {
      title: 'Client-Focused',
      description: 'Your vision drives our process. We collaborate closely to ensure your goals are met.',
    },
    {
      title: 'Cutting-Edge Tech',
      description: 'From AI to cloud infrastructure, we use the best tools to build superior products.',
    },
  ]

  return (
    <section className="section-spacing bg-gray-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Why Choose Asaase Labs
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            We combine technical excellence with a deep commitment to your success
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-8 md:p-10 hover-lift"
            >
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
