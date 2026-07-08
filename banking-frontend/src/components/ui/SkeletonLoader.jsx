export function SkeletonLine({ width = '100%', height = 14, className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius: 6 }}
    />
  )
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass-panel rounded-2xl p-6 ${className}`}>
      <SkeletonLine width="40%" height={12} className="mb-4" />
      <SkeletonLine width="70%" height={28} className="mb-2" />
      <SkeletonLine width="50%" height={12} />
    </div>
  )
}

export function SkeletonTable({ rows = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="glass-panel flex items-center gap-4 rounded-xl p-4">
          <SkeletonLine width={40} height={40} className="!rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonLine width="30%" height={12} />
            <SkeletonLine width="50%" height={10} />
          </div>
          <SkeletonLine width={80} height={24} />
        </div>
      ))}
    </div>
  )
}
