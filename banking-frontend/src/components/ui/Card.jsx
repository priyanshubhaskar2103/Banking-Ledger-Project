import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hover = true,
  as = 'div',
  delay = 0,
  ...props
}) {
  const Component = motion[as] || motion.div
  return (
    <Component
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -3 } : undefined}
      className={`glass-panel rounded-2xl shadow-glass ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
