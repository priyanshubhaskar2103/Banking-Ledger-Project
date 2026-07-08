const statusStyles = {
  active: 'bg-ledger-teal/10 text-ledger-teal border-ledger-teal/30',
  inactive: 'bg-ink-faint/10 text-ink-faint border-ink-faint/30',
  pending: 'bg-ledger-amber/10 text-ledger-amber border-ledger-amber/30',
  closed: 'bg-ledger-red/10 text-ledger-red border-ledger-red/30',
}

export default function StatusBadge({ status = 'active' }) {
  const key = String(status).toLowerCase()
  const style = statusStyles[key] || statusStyles.active

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
