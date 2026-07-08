import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FiPlusCircle, FiCreditCard, FiArrowRight } from 'react-icons/fi'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import StatusBadge from '../components/ui/StatusBadge'
import { SkeletonTable } from '../components/ui/SkeletonLoader'
import { getAccounts, createAccount } from '../services/api'
import { formatDate, maskAccountNumber } from '../utils/validators'

export default function Accounts() {
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  const loadAccounts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAccounts()
      setAccounts(res.data?.accounts || res.data || [])
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load accounts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAccounts()
  }, [loadAccounts])

  const handleCreateAccount = async () => {
    setCreating(true)
    try {
      await createAccount()
      toast.success('New account created successfully')
      await loadAccounts()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not create account')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Your Accounts</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Manage and monitor every account under your name.
          </p>
        </div>
        <Button variant="primary" icon={FiPlusCircle} loading={creating} onClick={handleCreateAccount}>
          Create Account
        </Button>
      </div>

      {loading ? (
        <SkeletonTable rows={5} />
      ) : accounts.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-3 p-14 text-center">
          <div className="rounded-full bg-indigo-brand/10 p-4 text-indigo-soft">
            <FiCreditCard size={28} />
          </div>
          <h3 className="font-display text-lg font-semibold text-ink">No accounts yet</h3>
          <p className="max-w-xs text-sm text-ink-muted">
            Create your first account to start tracking balances and activity.
          </p>
          <Button variant="primary" icon={FiPlusCircle} loading={creating} onClick={handleCreateAccount}>
            Create Account
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {accounts.map((acc, idx) => {
            const id = acc._id || acc.id
            return (
              <Card key={id} delay={idx * 0.05} className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-lg bg-indigo-brand/15 p-2.5 text-indigo-soft">
                    <FiCreditCard size={18} />
                  </div>
                  <StatusBadge status={acc.status || 'active'} />
                </div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                  Account Number
                </p>
                <p className="tabular-figure mt-1 text-lg font-semibold text-ink">
                  {maskAccountNumber(id)}
                </p>

                <div className="ledger-line my-4" />

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-ink-faint">Currency</p>
                    <p className="mt-0.5 font-medium text-ink">{acc.currency || 'INR'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-ink-faint">Created</p>
                    <p className="mt-0.5 font-medium text-ink">{formatDate(acc.createdAt)}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/balance', { state: { accountId: id } })}
                  className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-indigo-brand/50 hover:text-ink"
                >
                  View Balance <FiArrowRight size={14} />
                </button>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
