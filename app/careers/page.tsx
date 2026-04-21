'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'

export default function Careers() {
  const openPositions = [
    {
      title: 'Full-Stack Developer',
      department: 'Engineering',
      location: 'Kumasi, Ghana',
      type: 'Full-time',
      description: 'Build scalable web applications using modern technologies like React, Node.js, and cloud platforms.',
      requirements: ['3+ years experience', 'React/Next.js', 'Node.js', 'TypeScript', 'Cloud platforms (AWS/GCP)']
    },
    {
      title: 'Mobile App Developer',
      department: 'Engineering',
      location: 'Kumasi, Ghana',
      type: 'Full-time',
      description: 'Create beautiful and performant mobile applications for iOS and Android platforms.',
      requirements: ['2+ years experience', 'React Native or Flutter', 'iOS/Android development', 'RESTful APIs', 'Git']
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Kumasi, Ghana',
      type: 'Full-time',
      description: 'Design intuitive and engaging user experiences for web and mobile applications.',
      requirements: ['2+ years experience', 'Figma/Adobe XD', 'User research', 'Prototyping', 'Design systems']
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Kumasi, Ghana',
      type: 'Full-time',
      description: 'Manage cloud infrastructure, CI/CD pipelines, and ensure system reliability and scalability.',
      requirements: ['3+ years experience', 'AWS/GCP/Azure', 'Docker/Kubernetes', 'Terraform', 'CI/CD tools']
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Kumasi, Ghana',
      type: 'Full-time',
      description: 'Lead product strategy, roadmap planning, and cross-functional team coordination.',
      requirements: ['3+ years experience', 'Product strategy', 'Agile methodologies', 'Data analysis', 'Stakeholder management']
    },
    {
      title: 'Content Creator',
      department: 'Marketing',
      location: 'Kumasi, Ghana / Remote',
      type: 'Full-time',
      description: 'Create engaging content across multiple platforms including blog posts, videos, and social media.',
      requirements: ['2+ years experience', 'Content writing', 'Video editing', 'Social media management', 'SEO knowledge']
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Kumasi, Ghana / Remote',
      type: 'Full-time',
      description: 'Drive digital marketing campaigns, SEO/SEM strategies, and brand awareness initiatives.',
      requirements: ['2+ years experience', 'Google Ads/Analytics', 'SEO/SEM', 'Social media advertising', 'Email marketing']
    },
    {
      title: 'Business Development Manager',
      department: 'Sales',
      location: 'Kumasi, Ghana',
      type: 'Full-time',
      description: 'Identify new business opportunities, build client relationships, and drive revenue growth.',
      requirements: ['3+ years experience', 'B2B sales', 'Client relationship management', 'Negotiation skills', 'Tech industry knowledge']
    },
    {
      title: 'Data Scientist',
      department: 'Engineering',
      location: 'Kumasi, Ghana',
      type: 'Full-time',
      description: 'Analyze complex data sets, build predictive models, and provide actionable insights.',
      requirements: ['2+ years experience', 'Python/R', 'Machine learning', 'SQL', 'Data visualization']
    },
    {
      title: 'Quality Assurance Engineer',
      department: 'Engineering',
      location: 'Kumasi, Ghana',
      type: 'Full-time',
      description: 'Ensure software quality through comprehensive testing, automation, and quality processes.',
      requirements: ['2+ years experience', 'Test automation', 'Selenium/Cypress', 'API testing', 'Agile/Scrum']
    },
    {
      title: 'Graphic Designer',
      department: 'Design',
      location: 'Kumasi, Ghana / Remote',
      type: 'Full-time',
      description: 'Create visual content for digital and print media including branding, marketing materials, and web graphics.',
      requirements: ['2+ years experience', 'Adobe Creative Suite', 'Branding', 'Typography', 'Print and digital design']
    },
    {
      title: 'Technical Writer',
      department: 'Product',
      location: 'Kumasi, Ghana / Remote',
      type: 'Full-time',
      description: 'Create clear and comprehensive technical documentation, API guides, and user manuals.',
      requirements: ['2+ years experience', 'Technical writing', 'API documentation', 'Markdown', 'Developer tools']
    },
  ]

  const benefits = [
    {
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Competitive Salary',
      description: 'Industry-leading compensation packages'
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Flexible Hours',
      description: 'Work-life balance with flexible schedules'
    },
    {
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      title: 'Remote Options',
      description: 'Hybrid and remote work opportunities'
    },
    {
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      title: 'Learning & Development',
      description: 'Continuous learning and skill development programs'
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      title: 'Team Events',
      description: 'Regular team building and social activities'
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for you and family'
    },
  ]

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-dark to-dark-lighter relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-10"></div>
        <div className="section-container relative z-10">
          <PageBackNav fallbackHref="/" fallbackLabel="Home" align="center" className="mb-8" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-primary text-sm font-bold tracking-wide">JOIN OUR TEAM</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Build the Future with Us
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join a team of passionate innovators building Africa's next generation of digital solutions. We are looking for talented individuals who want to make an impact.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing bg-dark">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Why Work at AsaaseLabs?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We offer more than just a job. Join a culture of innovation, growth, and impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover-lift"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-dark-lighter">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Open Positions
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore our current openings and find your perfect role
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="card p-6 hover-lift"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/careers/apply"
                    className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Apply Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <p className="text-gray-300 mb-4">{position.description}</p>
                
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {position.requirements.map((req, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-dark text-gray-300 text-sm rounded-lg border border-gray-700"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-dark">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-12 text-center border-l-4 border-primary bg-gradient-to-br from-primary/10 to-transparent"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don't See Your Role?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              We are always looking for talented individuals. Send us your resume and tell us how you can contribute to our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/careers/apply"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Send Your Resume
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
              <Link
                href="/"
                className="btn-secondary"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
