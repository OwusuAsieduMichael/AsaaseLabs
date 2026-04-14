'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    location: '',
    linkedIn: '',
    portfolio: '',
    experience: '',
    availability: '',
    coverLetter: '',
    resume: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const positions = [
    'Full-Stack Developer',
    'Mobile App Developer',
    'UI/UX Designer',
    'DevOps Engineer',
    'Product Manager',
    'Content Creator',
    'Digital Marketing Specialist',
    'Business Development Manager',
    'Data Scientist',
    'Quality Assurance Engineer',
    'Graphic Designer',
    'Technical Writer',
    'Other',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create a hidden form and submit it to FormSubmit.co (free email service)
      const form = document.createElement('form')
      form.action = 'https://formsubmit.co/owusuasiedumichael9@gmail.com'
      form.method = 'POST'
      form.style.display = 'none'

      // Add form fields
      const fields = {
        '_subject': `Job Application - ${formData.position} - ${formData.firstName} ${formData.lastName}`,
        '_captcha': 'false',
        '_template': 'table',
        'First Name': formData.firstName,
        'Last Name': formData.lastName,
        'Email': formData.email,
        'Phone': formData.phone,
        'Position': formData.position,
        'Location': formData.location,
        'Experience': formData.experience,
        'Availability': formData.availability,
        'LinkedIn': formData.linkedIn || 'Not provided',
        'Portfolio': formData.portfolio || 'Not provided',
        'Cover Letter': formData.coverLetter,
        'Resume': formData.resume ? formData.resume.name : 'No file uploaded',
      }

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()

      // Show success message
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          position: '',
          location: '',
          linkedIn: '',
          portfolio: '',
          experience: '',
          availability: '',
          coverLetter: '',
          resume: null,
        })
      }, 5000)

    } catch (error) {
      console.error('Error submitting application:', error)
      
      // Fallback: Open email client
      const emailBody = `
NEW JOB APPLICATION

PERSONAL INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

POSITION DETAILS:
Position: ${formData.position}
Location: ${formData.location}
Experience: ${formData.experience}
Availability: ${formData.availability}

PROFESSIONAL LINKS:
LinkedIn: ${formData.linkedIn || 'Not provided'}
Portfolio: ${formData.portfolio || 'Not provided'}

COVER LETTER:
${formData.coverLetter}

RESUME: ${formData.resume ? formData.resume.name : 'No file uploaded'}
      `
      
      const mailtoLink = `mailto:owusuasiedumichael9@gmail.com?subject=Job Application - ${encodeURIComponent(formData.position)} - ${encodeURIComponent(formData.firstName + ' ' + formData.lastName)}&body=${encodeURIComponent(emailBody)}`
      window.open(mailtoLink, '_blank')
      
      alert('Please send the email that just opened in your email client to complete your application.')
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-dark to-dark-lighter relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-10"></div>
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Careers
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Job Application
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Complete the form below to apply for a position at AsaaseLabs. We will review your application and respond within 5 business days.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing bg-dark">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-12 text-center"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Application Submitted!</h2>
                <p className="text-gray-300 mb-2">
                  Thank you for applying to AsaaseLabs. We have received your application.
                </p>
                <p className="text-gray-400 text-sm">
                  Our team will review your application and respond within 5 business days.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <form onSubmit={handleSubmit} className="card p-8 md:p-10 space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-800">
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="+233 55 977 6547"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Position Details */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-800">
                      Position Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="position" className="block text-sm font-semibold text-gray-300 mb-2">
                          Position Applied For *
                        </label>
                        <select
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                          <option value="">Select a position</option>
                          {positions.map((pos) => (
                            <option key={pos} value={pos}>{pos}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-semibold text-gray-300 mb-2">
                          Preferred Location *
                        </label>
                        <select
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                          <option value="">Select location</option>
                          <option value="kumasi">Kumasi, Ghana (On-site)</option>
                          <option value="remote">Remote</option>
                          <option value="hybrid">Hybrid</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="experience" className="block text-sm font-semibold text-gray-300 mb-2">
                          Years of Experience *
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                          <option value="">Select experience</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="availability" className="block text-sm font-semibold text-gray-300 mb-2">
                          Availability *
                        </label>
                        <select
                          id="availability"
                          name="availability"
                          value={formData.availability}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                          <option value="">Select availability</option>
                          <option value="immediate">Immediate</option>
                          <option value="2weeks">2 weeks notice</option>
                          <option value="1month">1 month notice</option>
                          <option value="2months">2+ months</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Professional Links */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-800">
                      Professional Links
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="linkedIn" className="block text-sm font-semibold text-gray-300 mb-2">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          id="linkedIn"
                          name="linkedIn"
                          value={formData.linkedIn}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                      <div>
                        <label htmlFor="portfolio" className="block text-sm font-semibold text-gray-300 mb-2">
                          Portfolio / Website
                        </label>
                        <input
                          type="url"
                          id="portfolio"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-800">
                      Resume / CV
                    </h3>
                    <div>
                      <label htmlFor="resume" className="block text-sm font-semibold text-gray-300 mb-2">
                        Upload Resume *
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Accepted formats: PDF, DOC, DOCX (Max 5MB)
                      </p>
                      {formData.resume && (
                        <p className="text-sm text-primary mt-2">
                          Selected: {formData.resume.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-800">
                      Cover Letter
                    </h3>
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-semibold text-gray-300 mb-2">
                        Tell us why you're a great fit *
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        placeholder="Share your motivation, relevant experience, and what makes you a great fit for this role..."
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Minimum 100 characters
                      </p>
                    </div>
                  </div>

                  {/* Trust Message */}
                  <div className="bg-dark-lighter border border-gray-800 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-300 mb-1">
                          <span className="font-semibold text-white">Your information is confidential.</span> We respect your privacy and will only use your information for recruitment purposes.
                        </p>
                        <p className="text-xs text-gray-400">
                          We will respond to all applications within 5 business days.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary flex-1 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                    <Link
                      href="/careers"
                      className="btn-secondary flex-1 text-center"
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
