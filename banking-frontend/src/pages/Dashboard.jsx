import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import {
  FiPlusCircle,
  FiCreditCard,
  FiPieChart,
  FiTrendingUp,
  FiArrowUpRight,
} from 'react-icons/fi'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import StatusBadge from '../components/ui/StatusBadge'
import { SkeletonCard } from '../components/ui/SkeletonLoader'
import { useAuth } from '../hooks/useAuth'
import { getAccounts, getBalance, createAccount } from '../services/api'
import { formatCurrency, maskAccountNumber, formatDate } from '../utils/validators'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [accounts, setAccounts] = useState([])
  const [totalBalance, setTotalBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAccounts()
      const accountList = res.data?.accounts || res.data || []
      setAccounts(accountList)

      // Sum balances across all accounts for the total balance card
      const balances = await Promise.all(
        accountList.map((acc) =>
          getBalance(acc._id || acc.id)
            .then((r) => Number(r.data?.balance ?? 0))
            .catch(() => 0)
        )
      )
      setTotalBalance(balances.reduce((sum, b) => sum + b, 0))
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleCreateAccount = async () => {
    setCreating(true)
    try {
      await createAccount()
      toast.success('New account created successfully')
      await loadData()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not create account')
    } finally {
      setCreating(false)
    }
  }

  // Chart trend derived from account creation order — illustrates balance growth shape
  const chartData = accounts
    .slice()
    .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))
    .map((acc, idx) => ({
      name: `Acc ${idx + 1}`,
      value: Math.max(totalBalance / Math.max(accounts.length, 1) * (idx + 1), 0),
    }))

  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-2xl font-semibold text-ink">
          Welcome back, {firstName} 👋
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Here&apos;s what&apos;s happening with your ledger today.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <Card delay={0.05} className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink-muted">Total Balance</span>
                <div className="rounded-lg bg-indigo-brand/15 p-2 text-indigo-soft">
                  <FiTrendingUp size={16} />
                </div>
              </div>
              <div className="ledger-line my-3" />
              <AnimatedCounter
                value={totalBalance}
                className="font-display text-3xl font-semibold text-ink"
              />
              <p className="mt-2 text-xs text-ink-faint">Across all active accounts</p>
            </Card>

            <Card delay={0.1} className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink-muted">Account Count</span>
                <div className="rounded-lg bg-ledger-teal/15 p-2 text-ledger-teal">
                  <FiCreditCard size={16} />
                </div>
              </div>
              <div className="ledger-line my-3" />
              <p className="tabular-figure font-display text-3xl font-semibold text-ink">
                {accounts.length}
              </p>
              <p className="mt-2 text-xs text-ink-faint">
                {accounts.length === 0 ? 'No accounts yet' : 'Accounts under your name'}
              </p>
            </Card>

            <Card delay={0.15} className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink-muted">Quick Action</span>
                <div className="rounded-lg bg-ledger-amber/15 p-2 text-ledger-amber">
                  <FiPieChart size={16} />
                </div>
              </div>
              <div className="ledger-line my-3" />
              <p className="mb-3 text-sm text-ink-muted">
                Open a new account in a single click.
              </p>
              <Button
                variant="teal"
                icon={FiPlusCircle}
                onClick={handleCreateAccount}
                loading={creating}
                fullWidth
              >
                Create Account
              </Button>
            </Card>
          </>
        )}
      </div>

      {/* Chart + Recent activity */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card delay={0.2} className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink">Balance Overview</h3>
            <span className="text-xs text-ink-faint">By account</span>
          </div>
          {loading ? (
            <div className="skeleton h-64 w-full" />
          ) : chartData.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <p className="text-sm text-ink-muted">No balance data to chart yet.</p>
              <p className="mt-1 text-xs text-ink-faint">Create an account to get started.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4C6FFF" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#4C6FFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#5A6690"
                  tick={{ fill: '#8A94B3', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#5A6690"
                  tick={{ fill: '#8A94B3', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => formatCurrency(v).replace(/\.\d+$/, '')}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0F1B34',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    color: '#F5F7FF',
                  }}
                  formatter={(value) => [formatCurrency(value), 'Balance']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4C6FFF"
                  strokeWidth={2}
                  fill="url(#balanceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card delay={0.25} className="p-6">
          <h3 className="mb-4 font-display text-lg font-semibold text-ink">Recent Accounts</h3>
          {loading ? (
            <div className="space-y-3">
              <div className="skeleton h-14 w-full" />
              <div className="skeleton h-14 w-full" />
              <div className="skeleton h-14 w-full" />
            </div>
          ) : accounts.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-ink-muted">Nothing to show yet.</p>
              <p className="mt-1 text-xs text-ink-faint">Your latest accounts will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {accounts.slice(0, 4).map((acc) => (
                <div
                  key={acc._id || acc.id}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3"
                >
                  <div>
                    <p className="tabular-figure text-sm font-medium text-ink">
                      {maskAccountNumber(acc._id || acc.id)}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-faint">
                      {formatDate(acc.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={acc.status || 'active'} />
                </div>
              ))}
              <button
                onClick={() => navigate('/accounts')}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-medium text-indigo-soft hover:text-indigo-brand"
              >
                View all accounts <FiArrowUpRight size={14} />
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
