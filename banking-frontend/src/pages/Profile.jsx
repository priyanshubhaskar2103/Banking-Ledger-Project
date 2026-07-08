import toast from 'react-hot-toast'
import { FiMail, FiUser, FiLogOut, FiShield } from 'react-icons/fi'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'

export default function Profile() {
  const { user, logout } = useAuth()

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U'

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      toast.error('Something went wrong while logging out')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Profile</h2>
        <p className="mt-1 text-sm text-ink-muted">Your personal account information.</p>
      </div>

      <Card className="mx-auto max-w-xl p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-indigo-brand/40 bg-indigo-brand/15 font-display text-3xl font-semibold text-indigo-soft">
            {initials}
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold text-ink">
            {user?.name || 'Unnamed User'}
          </h3>
          <p className="mt-1 text-sm text-ink-muted">{user?.email || '—'}</p>
        </div>

        <div className="ledger-line my-8" />

        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="rounded-lg bg-indigo-brand/15 p-2.5 text-indigo-soft">
              <FiUser size={18} />
            </div>
            <div>
              <p className="text-xs text-ink-faint">Full Name</p>
              <p className="mt-0.5 text-sm font-medium text-ink">{user?.name || '—'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="rounded-lg bg-ledger-teal/15 p-2.5 text-ledger-teal">
              <FiMail size={18} />
            </div>
            <div>
              <p className="text-xs text-ink-faint">Email Address</p>
              <p className="mt-0.5 text-sm font-medium text-ink">{user?.email || '—'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="rounded-lg bg-ledger-amber/15 p-2.5 text-ledger-amber">
              <FiShield size={18} />
            </div>
            <div>
              <p className="text-xs text-ink-faint">Account ID</p>
              <p className="tabular-figure mt-0.5 text-sm font-medium text-ink">
                {user?._id || '—'}
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="danger"
          icon={FiLogOut}
          fullWidth
          onClick={handleLogout}
          className="mt-8"
        >
          Logout
        </Button>
      </Card>
    </div>
  )
}
