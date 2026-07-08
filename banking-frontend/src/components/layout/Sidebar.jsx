import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiGrid,
  FiCreditCard,
  FiPieChart,
  FiUser,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/accounts', label: 'Accounts', icon: FiCreditCard },
  { to: '/balance', label: 'Balance', icon: FiPieChart },
  { to: '/profile', label: 'Profile', icon: FiUser },
  { to: '/settings', label: 'Settings', icon: FiSettings },
]

export default function Sidebar({ mobileOpen = false, onClose }) {
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      toast.error('Something went wrong while logging out')
    }
  }

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-white/5
          bg-void-panel/95 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center gap-3 px-6 py-6">
          <img src={logo} alt="Ledger logo" className="h-9 w-9" />
          <div>
            <p className="font-display text-lg font-semibold leading-none text-ink">Ledger</p>
            <p className="text-xs text-ink-faint">Banking Suite</p>
          </div>
        </div>

        <div className="ledger-line mx-6 mb-4" />

        <nav className="flex-1 space-y-1 px-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `
                group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                ${isActive ? 'text-ink' : 'text-ink-muted hover:text-ink hover:bg-white/5'}
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-indigo-brand/15 border border-indigo-brand/30"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon size={18} className="relative z-10" />
                  <span className="relative z-10">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 pb-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ledger-red/90 transition-colors duration-200 hover:bg-ledger-red/10"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
