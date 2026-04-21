'use client'

import { AnimatePresence, motion } from 'framer-motion'

type ConfirmActionModalProps = {
  isOpen: boolean
  title: string
  description: string
  confirmLabel: string
  isLoading?: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function ConfirmActionModal({
  isOpen,
  title,
  description,
  confirmLabel,
  isLoading = false,
  onClose,
  onConfirm,
}: ConfirmActionModalProps) {
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
              className="w-full max-w-lg rounded-2xl border border-gray-700 bg-dark-card p-7 shadow-2xl"
            >
              <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="btn-secondary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="flex-1 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
