'use client'

import { motion } from 'framer-motion'

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'Deep-dive workshops and market research to understand your vision and requirements.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Design',
      description: 'User-centered design systems and interactive prototypes.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Development',
      description: 'Agile development with modern tech stacks and continuous integration.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Testing',
      description: 'Comprehensive testing, security audits, and performance optimization.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      number: '05',
      title: 'Deployment',
      description: 'Cloud deployment with CI/CD pipelines and monitoring setup.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    },
    {
      number: '06',
      title: 'Scale',
      description: 'Continuous monitoring, optimization, and dedicated support.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ]

  return (
    <section id="process" className="section-spacing section-gradient-3 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30"></div>
      
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
            <span className="text-primary text-sm font-bold tracking-wide">OUR METHODOLOGY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
            Our Process
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-balance font-medium">
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
              className="card p-8 hover-lift group border-l-4 border-purple-500 hover:border-purple-400 bg-gradient-to-br from-purple-500/10 to-transparent hover:from-purple-500/15 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  {step.icon}
                </div>
                <div className="text-5xl font-bold text-gray-800/50">
                  {step.number}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm font-medium">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
