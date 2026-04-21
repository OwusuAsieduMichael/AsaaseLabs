'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'

const sections = [
  {
    title: '1. Services',
    body: 'Asaase Labs provides software development, mobile application, AI systems, cloud, and product design services.',
  },
  {
    title: '2. Client Responsibilities',
    bullets: [
      'Provide accurate and complete project requirements.',
      'Communicate approvals, feedback, and updates in a timely manner.',
      'Fulfill payment obligations as agreed in project terms.',
    ],
  },
  {
    title: '3. Payments',
    bullets: [
      'Fees are defined per project scope or contract.',
      'Payments may be milestone-based or upfront depending on agreement.',
      'Late payments may result in delayed or suspended services.',
    ],
  },
  {
    title: '4. Intellectual Property',
    bullets: [
      'Upon full payment, ownership of deliverables transfers to the client unless otherwise agreed in writing.',
      'Asaase Labs retains the right to showcase completed work in portfolio and case-study formats unless restricted by contract.',
    ],
  },
  {
    title: '5. Confidentiality',
    body: 'Both parties agree to keep confidential information private and not disclose it without prior consent, except where legally required.',
  },
  {
    title: '6. Limitation of Liability',
    body: 'Asaase Labs is not liable for indirect, incidental, special, or consequential damages arising from the use of our services.',
  },
  {
    title: '7. Service Availability',
    body: 'We strive to provide reliable and secure service delivery, but uninterrupted operation is not guaranteed.',
  },
  {
    title: '8. Termination',
    body: 'We reserve the right to suspend or terminate services in cases of contractual breach, non-payment, or misuse of services.',
  },
  {
    title: '9. Governing Law',
    body: 'These Terms are governed by the laws of the Republic of Ghana.',
  },
  {
    title: '10. Changes',
    body: 'We may update these Terms from time to time. Continued use of our services constitutes acceptance of any updated terms.',
  },
  {
    title: '11. Contact',
    body: 'For legal questions related to these Terms, contact us at hello@asaaselabs.tech.',
  },
]

export default function TermsOfServicePage() {
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
              <span className="text-primary text-sm font-bold tracking-wide">LEGAL</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-gray-300 text-lg">Effective Date: 5th April, 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing bg-dark">
        <div className="section-container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card p-8 md:p-10 mb-8 border-l-4 border-blue-500"
          >
            <p className="text-gray-300 leading-relaxed">
              These Terms govern your use of Asaase Labs services and website interfaces. By engaging our services, you agree to the terms outlined on this page.
            </p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="card p-7 md:p-8 border-l-4 border-blue-500/80 bg-gradient-to-br from-blue-500/10 to-transparent"
              >
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{section.title}</h2>
                {section.body && <p className="text-gray-300 leading-relaxed">{section.body}</p>}
                {section.bullets && (
                  <ul className="space-y-2 text-gray-300">
                    {section.bullets.map((item) => (
                      <li key={item} className="leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
