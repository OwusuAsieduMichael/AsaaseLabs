'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section-spacing section-gradient-2 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-30"></div>
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
              About AsaaseLabs
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed font-medium">
              We are an African-based technology innovation lab that partners with businesses, 
              startups, and visionaries to transform groundbreaking ideas into scalable, 
              high-impact digital solutions.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Our multidisciplinary team combines cutting-edge AI, modern development practices, 
              and deep understanding of both African markets and global standards to deliver 
              solutions that exceed expectations.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700/50">
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
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-semibold tracking-wide">{stat.label}</div>
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
            <div className="card p-8 border-l-4 border-blue-500 bg-gradient-to-br from-blue-500/10 to-transparent hover:from-blue-500/15 transition-all">
              <h3 className="text-xl font-bold mb-3 text-white tracking-tight">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed font-medium">
                To empower businesses and individuals across Africa and beyond with innovative, 
                AI-driven technology solutions that drive exponential growth and create lasting impact.
              </p>
            </div>

            <div className="card p-8 border-l-4 border-purple-500 bg-gradient-to-br from-purple-500/10 to-transparent hover:from-purple-500/15 transition-all">
              <h3 className="text-xl font-bold mb-3 text-white tracking-tight">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed font-medium">
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
