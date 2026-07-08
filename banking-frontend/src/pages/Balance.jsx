import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FiRefreshCw, FiCreditCard } from 'react-icons/fi'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import { SkeletonCard } from '../components/ui/SkeletonLoader'
import { getAccounts, getBalance } from '../services/api'
import { maskAccountNumber } from '../utils/validators'

export default function Balance() {
  const location = useLocation()
  const [accounts, setAccounts] = useState([])
  const [selectedId, setSelectedId] = useState(location.state?.accountId || '')
  const [balance, setBalance] = useState(null)
  const [loadingAccounts, setLoadingAccounts] = useState(true)
  const [loadingBalance, setLoadingBalance] = useState(false)

  const loadAccounts = useCallback(async () => {
    setLoadingAccounts(true)
    try {
      const res = await getAccounts()
      const list = res.data?.accounts || res.data || []
      setAccounts(list)
      if (!selectedId && list.length > 0) {
        setSelectedId(list[0]._id || list[0].id)
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load accounts')
    } finally {
      setLoadingAccounts(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadBalance = useCallback(async (accountId) => {
    if (!accountId) return
    setLoadingBalance(true)
    try {
      const res = await getBalance(accountId)
      setBalance(Number(res.data?.balance ?? 0))
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to fetch balance')
      setBalance(null)
    } finally {
      setLoadingBalance(false)
    }
  }, [])

  useEffect(() => {
    loadAccounts()
  }, [loadAccounts])

  useEffect(() => {
    if (selectedId) loadBalance(selectedId)
  }, [selectedId, loadBalance])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Account Balance</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Real-time balance for the account you select below.
        </p>
      </div>

      {loadingAccounts ? (
        <SkeletonCard />
      ) : accounts.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-3 p-14 text-center">
          <div className="rounded-full bg-indigo-brand/10 p-4 text-indigo-soft">
            <FiCreditCard size={28} />
          </div>
          <h3 className="font-display text-lg font-semibold text-ink">No accounts to display</h3>
          <p className="max-w-xs text-sm text-ink-muted">
            Create an account first, then check its balance here.
          </p>
        </Card>
      ) : (
        <>
          <div className="max-w-xs">
            <label className="mb-1.5 block text-sm font-medium text-ink-muted">
              Select account
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-void-panel/60 px-4 py-3 text-sm text-ink focus:border-indigo-brand/60 focus:outline-none focus:ring-2 focus:ring-indigo-brand/50"
            >
              {accounts.map((acc) => (
                <option key={acc._id || acc.id} value={acc._id || acc.id}>
                  {maskAccountNumber(acc._id || acc.id)}
                </option>
              ))}
            </select>
          </div>

          <Card className="relative overflow-hidden p-10 text-center">
            <div className="absolute inset-0 bg-card-sheen" />
            <div className="relative">
              <p className="text-sm font-medium uppercase tracking-wide text-ink-faint">
                Available Balance
              </p>
              <div className="ledger-line mx-auto my-5 w-32" />
              {loadingBalance || balance === null ? (
                <div className="skeleton mx-auto h-12 w-56" />
              ) : (
                <AnimatedCounter
                  value={balance}
                  className="font-display text-5xl font-bold text-ink"
                />
              )}
              <p className="mt-3 text-xs text-ink-faint">
                {selectedId && maskAccountNumber(selectedId)}
              </p>
              <Button
                variant="secondary"
                icon={FiRefreshCw}
                loading={loadingBalance}
                onClick={() => loadBalance(selectedId)}
                className="mx-auto mt-6"
              >
                Refresh Balance
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
