import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo.svg'
import { useAuth } from '../hooks/useAuth'

export default function Splash() {
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (loading) return
    const timer = setTimeout(() => {
      navigate(isAuthenticated ? '/dashboard' : '/login', { replace: true })
    }, 1600)
    return () => clearTimeout(timer)
  }, [loading, isAuthenticated, navigate])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-ledger-gradient">
      <motion.img
        src={logo}
        alt="Ledger"
        className="h-20 w-20"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <motion.h1
        className="mt-6 font-display text-3xl font-semibold text-ink"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Ledger
      </motion.h1>
      <motion.p
        className="mt-2 text-sm text-ink-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Enterprise Banking, Simplified
      </motion.p>
      <motion.div
        className="ledger-line mt-10 w-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      />
    </div>
  )
}
