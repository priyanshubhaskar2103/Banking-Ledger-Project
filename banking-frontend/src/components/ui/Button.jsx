import { motion } from 'framer-motion'
import Spinner from './Spinner'

const variants = {
  primary:
    'bg-indigo-brand text-white hover:bg-indigo-soft shadow-glow',
  secondary:
    'bg-void-elevated text-ink border border-white/10 hover:border-indigo-brand/50',
  ghost:
    'bg-transparent text-ink-muted hover:text-ink hover:bg-white/5',
  danger:
    'bg-ledger-red/10 text-ledger-red border border-ledger-red/30 hover:bg-ledger-red/20',
  teal:
    'bg-ledger-teal text-void hover:brightness-110 shadow-glow-teal',
}

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  icon: Icon,
  fullWidth = false,
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.015 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5
        font-body font-semibold text-sm transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Spinner size={16} />
      ) : (
        Icon && <Icon size={16} />
      )}
      {children}
    </motion.button>
  )
}
