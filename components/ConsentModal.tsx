'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

type ConsentModalProps = {
  isOpen: boolean
  title: string
  description: string
  accepted: boolean
  onAcceptedChange: (accepted: boolean) => void
  onClose: () => void
  onConfirm: () => void
}

export default function ConsentModal({
  isOpen,
  title,
  description,
  accepted,
  onAcceptedChange,
  onClose,
  onConfirm,
}: ConsentModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl rounded-2xl border border-gray-700 bg-dark-card p-7 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
              <p className="text-gray-300 leading-relaxed mb-5">{description}</p>

              <div className="rounded-xl border border-gray-700 bg-dark-lighter/80 p-4 mb-6">
                <p className="text-sm text-gray-300">
                  Please review and accept our{' '}
                  <Link href="/privacy-policy" className="text-primary hover:text-primary-light underline">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/terms-of-service" className="text-primary hover:text-primary-light underline">
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>

              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => onAcceptedChange(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-500 bg-dark-lighter text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-300">
                  I confirm that I have read and agree to the Privacy Policy and Terms of Service.
                </span>
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={onClose} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={!accepted}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue & Submit
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
