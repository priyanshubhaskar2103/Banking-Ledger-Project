import { useState, forwardRef } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Input = forwardRef(function Input(
  { label, type = 'text', error, icon: Icon, className = '', ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-ink-muted">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
          />
        )}
        <input
          ref={ref}
          type={inputType}
          className={`
            w-full rounded-xl border bg-void-panel/60 py-3 text-sm text-ink
            placeholder:text-ink-faint transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-indigo-brand/50
            ${Icon ? 'pl-11' : 'pl-4'}
            ${isPassword ? 'pr-11' : 'pr-4'}
            ${error ? 'border-ledger-red/60' : 'border-white/10 focus:border-indigo-brand/60'}
            ${className}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-muted"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-ledger-red">{error}</p>}
    </div>
  )
})

export default Input
