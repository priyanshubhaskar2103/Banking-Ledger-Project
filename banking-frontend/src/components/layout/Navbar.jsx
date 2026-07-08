import { FiMenu, FiBell, FiMoon, FiSun } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'

export default function Navbar({ onMenuClick, pageTitle = 'Dashboard' }) {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U'

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-void/80 px-6 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-ink-muted hover:bg-white/5 hover:text-ink lg:hidden"
          aria-label="Open menu"
        >
          <FiMenu size={20} />
        </button>
        <h1 className="font-display text-xl font-semibold text-ink">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2.5 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
        <button
          className="relative rounded-lg p-2.5 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
          aria-label="Notifications"
        >
          <FiBell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-ledger-teal" />
        </button>
        <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-brand/20 text-sm font-semibold text-indigo-soft border border-indigo-brand/30">
          {initials}
        </div>
      </div>
    </header>
  )
}
