'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'

export default function CareerLensPage() {
  const features = [
    {
      title: 'AI-Powered Resume Analysis',
      description: 'Advanced machine learning algorithms analyze your resume against job descriptions to provide accurate match scores.',
      icon: '🤖'
    },
    {
      title: 'Skill Gap Identification',
      description: 'Instantly identify missing skills and qualifications that could improve your chances of landing the job.',
      icon: '🎯'
    },
    {
      title: 'Personalized Recommendations',
      description: 'Get actionable insights and suggestions to optimize your resume for specific positions.',
      icon: '💡'
    },
    {
      title: 'ATS Optimization',
      description: 'Ensure your resume passes Applicant Tracking Systems with our ATS-friendly formatting suggestions.',
      icon: '✅'
    },
    {
      title: 'Career Path Insights',
      description: 'Discover career progression opportunities and understand what skills you need for your next role.',
      icon: '📈'
    },
    {
      title: 'Real-time Feedback',
      description: 'Get instant feedback as you update your resume, with live match score updates.',
      icon: '⚡'
    }
  ]

  const techStack = [
    'Python',
    'TensorFlow',
    'Natural Language Processing',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'AWS',
    'Docker'
  ]

  const roadmap = [
    {
      phase: 'Phase 1',
      status: 'Completed',
      items: ['Core AI model development', 'Resume parsing engine', 'Basic matching algorithm']
    },
    {
      phase: 'Phase 2',
      status: 'In Progress',
      items: ['Advanced NLP integration', 'User dashboard', 'Skill gap analysis', 'ATS optimization']
    },
    {
      phase: 'Phase 3',
      status: 'Planned',
      items: ['Mobile app', 'Career path recommendations', 'Interview preparation', 'Job board integration']
    },
    {
      phase: 'Phase 4',
      status: 'Future',
      items: ['AI interview coach', 'Salary insights', 'Network recommendations', 'Premium features']
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
            style={{ backgroundImage: 'url(/background6.jpg)' }}
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
            <div className="inline-flex items-center mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
              <span className="text-blue-400 text-sm font-bold tracking-wide">AI-POWERED CAREER INTELLIGENCE</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
              CareerLens
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your job search with AI-driven resume analysis and career intelligence
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Development Progress</span>
                <span className="font-bold text-blue-400">75%</span>
              </div>
              <div className="h-3 bg-dark-lighter rounded-full overflow-hidden border border-gray-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all"
              >
                Join Waitlist
              </motion.button>
              <motion.a
                href="#features"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-gray-700 hover:border-primary hover:bg-primary/10 transition-all"
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
                Your AI Career Assistant
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                CareerLens uses advanced artificial intelligence and natural language processing to analyze your resume against job descriptions, providing you with actionable insights to improve your chances of landing your dream job.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Whether you're a fresh graduate or an experienced professional, CareerLens helps you understand exactly what employers are looking for and how to position yourself as the perfect candidate.
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">10K+</div>
                  <div className="text-sm text-gray-400">Target Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">95%</div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
                  <div className="text-sm text-gray-400">Availability</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="card p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl">
                      📄
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Upload Your Resume</h3>
                      <p className="text-sm text-gray-300">Support for PDF, DOCX, and TXT formats</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl">
                      🎯
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Add Job Description</h3>
                      <p className="text-sm text-gray-300">Paste the job posting you're interested in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl">
                      🤖
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Get AI Analysis</h3>
                      <p className="text-sm text-gray-300">Receive detailed insights and recommendations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl">
                      ✨
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Optimize & Apply</h3>
                      <p className="text-sm text-gray-300">Improve your resume and increase your chances</p>
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
              Everything you need to optimize your resume and land your dream job
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
                className="card p-8 border-l-4 border-blue-500 hover:border-cyan-500 bg-gradient-to-br from-blue-500/5 to-transparent hover:from-blue-500/10 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section-spacing relative">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Technology Stack
            </h2>
            <p className="text-lg text-gray-300">
              Built with cutting-edge technologies for optimal performance
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-6 py-3 bg-dark-lighter border border-gray-800 rounded-xl text-gray-300 font-semibold hover:border-blue-500 hover:text-blue-400 transition-all"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Development Roadmap
            </h2>
            <p className="text-lg text-gray-300">
              Our journey to building the ultimate career intelligence platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card p-6 border-t-4 ${
                  phase.status === 'Completed' ? 'border-green-500 bg-gradient-to-b from-green-500/10' :
                  phase.status === 'In Progress' ? 'border-blue-500 bg-gradient-to-b from-blue-500/10' :
                  phase.status === 'Planned' ? 'border-yellow-500 bg-gradient-to-b from-yellow-500/10' :
                  'border-gray-500 bg-gradient-to-b from-gray-500/10'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{phase.phase}</h3>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    phase.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    phase.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                    phase.status === 'Planned' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{item}</span>
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
            className="card p-12 text-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Be Among the First to Experience CareerLens
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our waitlist and get early access when we launch. Plus, receive exclusive updates on our development progress.
            </p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-dark border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-all whitespace-nowrap"
              >
                Join Waitlist
              </button>
            </form>
            
            <p className="text-sm text-gray-400">
              🎉 Join 500+ professionals already on the waitlist
            </p>
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
              { name: 'KasaBridge', desc: 'AI-powered multilingual translation', link: '/products/kasabridge', gradient: 'from-purple-500 to-pink-500' },
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
