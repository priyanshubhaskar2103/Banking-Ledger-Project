import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-ledger-gradient px-4 text-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display text-8xl font-bold text-indigo-brand/30"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-2 font-display text-2xl font-semibold text-ink"
      >
        This page isn&apos;t in the ledger
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-2 max-w-sm text-sm text-ink-muted"
      >
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-indigo-soft"
        >
          <FiArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  )
}
