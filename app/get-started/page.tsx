'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'
import ConsentModal from '@/components/ConsentModal'

export default function GetStarted() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectTypeOther: '',
    description: '',
    budget: '',
    timeline: '',
    descriptionFile: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [hasAcceptedLegal, setHasAcceptedLegal] = useState(false)
  const [showConsentModal, setShowConsentModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'projectType' && value !== 'other' ? { projectTypeOther: '' } : {}),
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setFormData((prev) => ({ ...prev, descriptionFile: file }))
  }

  const resetSubmissionForm = () => {
    setIsSubmitted(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      projectTypeOther: '',
      description: '',
      budget: '',
      timeline: '',
      descriptionFile: null,
    })
    setHasAcceptedLegal(false)
    setSubmitError(null)
  }

  const submitProjectInquiry = async () => {
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      if (!formData.description.trim() && !formData.descriptionFile) {
        setSubmitError('Please provide project description text or upload a project description file.')
        setIsSubmitting(false)
        return
      }
      const fd = new FormData()
      fd.set('name', formData.name)
      fd.set('email', formData.email)
      fd.set('phone', formData.phone)
      fd.set('company', formData.company)
      fd.set(
        'projectType',
        formData.projectType === 'other' && formData.projectTypeOther.trim()
          ? `other: ${formData.projectTypeOther.trim()}`
          : formData.projectType
      )
      fd.set('description', formData.description)
      fd.set('budget', formData.budget)
      fd.set('timeline', formData.timeline)
      fd.set('termsAccepted', 'true')
      if (formData.descriptionFile) {
        fd.set('descriptionFile', formData.descriptionFile)
      }

      const res = await fetch('/api/project-inquiry', {
        method: 'POST',
        body: fd,
      })
      const data = (await res.json()) as { success?: boolean; message?: string; devHint?: string }

      if (!res.ok || !data.success) {
        const base = data.message || 'Something went wrong. Please try again.'
        setSubmitError(data.devHint ? `${base} (${data.devHint})` : base)
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (err) {
      console.error(err)
      setSubmitError('Network error. Check your connection and try again.')
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hasAcceptedLegal) {
      setShowConsentModal(true)
      return
    }
    await submitProjectInquiry()
  }

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-dark to-dark-lighter">
        <div className="section-container">
          <PageBackNav fallbackHref="/" fallbackLabel="Home" align="center" className="mb-8" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Get Started with Your Project
            </h1>
            <p className="text-lg text-gray-300 mb-4">
              Tell us about your project and we'll respond promptly with a tailored solution.
            </p>
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Your information is kept confidential
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-dark-lighter">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-12 text-center border-l-4 border-primary bg-gradient-to-br from-primary/10 to-transparent"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
                <p className="text-gray-300 mb-2">
                  Your project request has been received successfully.
                </p>
                <p className="text-gray-400 text-sm">
                  We will respond within 24 hours with next steps.
                </p>
                <button
                  type="button"
                  onClick={resetSubmissionForm}
                  className="mt-6 inline-flex items-center rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                >
                  Start New Submission
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card p-8 md:p-12"
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                    >
                      {submitError}
                    </div>
                  )}
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-800">
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="john@company.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="+233 XX XXX XXXX"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-300 mb-2">
                          Company Name <span className="text-gray-500 text-xs">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-800">
                      Project Details
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-semibold text-gray-300 mb-2">
                          Project Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                          <option value="">Select a project type</option>
                          <option value="web-application">Web Application</option>
                          <option value="mobile-app">Mobile Application</option>
                          <option value="ai-ml">AI & Machine Learning</option>
                          <option value="cloud-infrastructure">Cloud Infrastructure</option>
                          <option value="product-design">Product Design</option>
                          <option value="consulting">Technical Consulting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      {formData.projectType === 'other' && (
                        <div>
                          <label htmlFor="projectTypeOther" className="block text-sm font-semibold text-gray-300 mb-2">
                            Please specify <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="projectTypeOther"
                            name="projectTypeOther"
                            value={formData.projectTypeOther}
                            onChange={handleChange}
                            required={formData.projectType === 'other'}
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Enter your project type"
                          />
                        </div>
                      )}

                      <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
                          Project Description <span className="text-gray-500 text-xs">(Optional if file is uploaded)</span>
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required={!formData.descriptionFile}
                          rows={5}
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                          placeholder="Please describe your project requirements, goals, and any specific features you need..."
                        />
                      </div>

                      <div>
                        <label htmlFor="descriptionFile" className="block text-sm font-semibold text-gray-300 mb-2">
                          Project Description File <span className="text-gray-500 text-xs">(Optional if text is provided)</span>
                        </label>
                        <input
                          type="file"
                          id="descriptionFile"
                          name="descriptionFile"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.txt,.md"
                          required={!formData.description.trim()}
                          className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Accepted formats: PDF, DOC, DOCX, TXT, MD (Max 10MB)
                        </p>
                        {formData.descriptionFile && (
                          <p className="text-sm text-primary mt-2">
                            Selected: {formData.descriptionFile.name}
                          </p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="budget" className="block text-sm font-semibold text-gray-300 mb-2">
                            Budget Range <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          >
                            <option value="">Select budget range</option>
                            <option value="350-500">$350 – $500</option>
                            <option value="550-1000">$550 – $1,000</option>
                            <option value="2000-plus">$2,000+</option>
                            <option value="negotiations">Negotiations — call us to discuss</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="timeline" className="block text-sm font-semibold text-gray-300 mb-2">
                            Preferred Timeline <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          >
                            <option value="">Select timeline</option>
                            <option value="urgent">Urgent (1-2 months)</option>
                            <option value="standard">Standard (3-4 months)</option>
                            <option value="flexible">Flexible (5+ months)</option>
                            <option value="ongoing">Ongoing Project</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-800">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)' }}
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
                          Submit Project Request
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="text-center text-sm text-gray-400 mt-4">
                      By submitting this form, you agree to our{' '}
                      <a href="/terms-of-service" className="text-primary hover:text-primary-light underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy-policy" className="text-primary hover:text-primary-light underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                  title: '24-Hour Response',
                  description: 'We respond to all inquiries within one business day'
                },
                {
                  icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                  title: 'Confidential & Secure',
                  description: 'Your project details are protected and never shared'
                },
                {
                  icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                  title: 'Expert Team',
                  description: 'Experienced professionals ready to bring your vision to life'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <ConsentModal
        isOpen={showConsentModal}
        title="Review Terms Before Submission"
        description="Before we process your project request, you need to review and accept our legal terms."
        accepted={hasAcceptedLegal}
        onAcceptedChange={setHasAcceptedLegal}
        onClose={() => setShowConsentModal(false)}
        onConfirm={async () => {
          setShowConsentModal(false)
          await submitProjectInquiry()
        }}
      />

      <Footer />
    </main>
  )
}
