'use client'

import { motion } from 'framer-motion'

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'Deep-dive workshops and market research to understand your vision and requirements.',
    },
    {
      number: '02',
      title: 'Design',
      description: 'User-centered design systems and interactive prototypes.',
    },
    {
      number: '03',
      title: 'Development',
      description: 'Agile development with modern tech stacks and continuous integration.',
    },
    {
      number: '04',
      title: 'Testing',
      description: 'Comprehensive testing, security audits, and performance optimization.',
    },
    {
      number: '05',
      title: 'Deployment',
      description: 'Cloud deployment with CI/CD pipelines and monitoring setup.',
    },
    {
      number: '06',
      title: 'Scale',
      description: 'Continuous monitoring, optimization, and dedicated support.',
    },
  ]

  return (
    <section id="process" className="section-spacing bg-white">
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
            Our Process
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            A systematic approach that delivers exceptional results
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-8 hover-lift"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
