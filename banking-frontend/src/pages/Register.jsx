import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import logo from '../assets/logo.svg'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { isValidEmail, getPasswordStrength } from '../utils/validators'

const strengthColors = ['#FF5C6C', '#FF5C6C', '#F5A623', '#F5A623', '#00D4B5', '#00D4B5']

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const strength = getPasswordStrength(form.password)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((err) => ({ ...err, [e.target.name]: undefined }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email) newErrors.email = 'Email is required'
    else if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email address'
    if (!form.password) newErrors.password = 'Password is required'
    else if (form.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters'
    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const user = await register(form.name.trim(), form.email, form.password)
      toast.success(`Account created — welcome, ${user?.name?.split(' ')[0] || 'there'}!`)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ledger-gradient px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full max-w-md rounded-2xl p-8 shadow-glass"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <img src={logo} alt="Ledger" className="mb-4 h-12 w-12" />
          <h1 className="font-display text-2xl font-semibold text-ink">Create your account</h1>
          <p className="mt-1 text-sm text-ink-muted">Open your ledger in under a minute</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <Input
            label="Full name"
            name="name"
            icon={FiUser}
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            autoComplete="name"
          />
          <Input
            label="Email address"
            name="email"
            type="email"
            icon={FiMail}
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />
          <div>
            <Input
              label="Password"
              name="password"
              type="password"
              icon={FiLock}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
            />
            {form.password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full bg-white/10"
                      style={{
                        backgroundColor:
                          i < strength.score ? strengthColors[strength.score] : undefined,
                      }}
                    />
                  ))}
                </div>
                <p
                  className="mt-1 text-xs"
                  style={{ color: strengthColors[strength.score] }}
                >
                  {strength.label}
                </p>
              </div>
            )}
          </div>
          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            icon={FiLock}
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            icon={FiArrowRight}
          >
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-soft hover:text-indigo-brand">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
