'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section-spacing bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              About Asaase Labs
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are an African-based technology innovation lab that partners with businesses, 
              startups, and visionaries to transform groundbreaking ideas into scalable, 
              high-impact digital solutions.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our multidisciplinary team combines cutting-edge AI, modern development practices, 
              and deep understanding of both African markets and global standards to deliver 
              solutions that exceed expectations.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              {[
                { value: '50+', label: 'Projects' },
                { value: '15+', label: 'AI Models' },
                { value: '98%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="card p-8 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses and individuals across Africa and beyond with innovative, 
                AI-driven technology solutions that drive exponential growth and create lasting impact.
              </p>
            </div>

            <div className="card p-8 border-l-4 border-purple-600">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be Africa's leading technology innovation lab, recognized globally for delivering 
                exceptional digital solutions that shape the future of technology.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
