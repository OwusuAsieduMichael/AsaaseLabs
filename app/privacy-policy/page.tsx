'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackNav from '@/components/PageBackNav'

const sections = [
  {
    title: '1. Information We Collect',
    bullets: [
      'Personal Information: Name, email address, and phone number.',
      'Project Information: Details submitted through inquiry and project forms.',
      'Technical Data: IP address, browser type, and usage data.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    bullets: [
      'Respond to inquiries and project requests.',
      'Provide, operate, and improve our services.',
      'Communicate updates and relevant service information.',
      'Maintain security and prevent fraud or abuse.',
    ],
  },
  {
    title: '3. Data Sharing',
    bullets: [
      'We do not sell your personal data.',
      'We may share data with trusted providers (e.g., hosting or analytics partners).',
      'We may disclose data to legal authorities when required by law.',
    ],
  },
  {
    title: '4. Data Security',
    body: 'We implement appropriate technical and organizational safeguards to protect your information against unauthorized access, misuse, loss, or disclosure.',
  },
  {
    title: '5. Data Retention',
    body: 'We retain personal data only for as long as necessary for operational, contractual, or legal purposes.',
  },
  {
    title: '6. Your Rights',
    bullets: [
      'Request access to your personal data.',
      'Request correction of inaccurate or outdated data.',
      'Request deletion of your data, subject to legal and contractual obligations.',
    ],
  },
  {
    title: '7. Cookies',
    body: 'We may use cookies and similar technologies to improve user experience, measure performance, and support analytics.',
  },
  {
    title: '8. Changes',
    body: 'We may update this Privacy Policy periodically. Any updates will be posted on this page with an updated effective date where applicable.',
  },
  {
    title: '9. Contact',
    body: 'For privacy-related requests or questions, contact us at hello@asaaselabs.tech.',
  },
]

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Privacy Policy</h1>
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
              Asaase Labs (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use our services.
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
