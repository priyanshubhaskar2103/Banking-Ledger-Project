import { FiMoon, FiSun } from 'react-icons/fi'
import Card from '../components/ui/Card'
import { useTheme } from '../hooks/useTheme'

export default function Settings() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink">Settings</h2>
        <p className="mt-1 text-sm text-ink-muted">Personalize how your ledger looks.</p>
      </div>

      <Card className="max-w-xl p-8">
        <h3 className="font-display text-lg font-semibold text-ink">Appearance</h3>
        <p className="mt-1 text-sm text-ink-muted">Choose between dark and light mode.</p>

        <div className="ledger-line my-6" />

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTheme('dark')}
            className={`flex flex-col items-center gap-3 rounded-2xl border p-6 transition-all duration-200 ${
              theme === 'dark'
                ? 'border-indigo-brand bg-indigo-brand/10 shadow-glow'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="rounded-full bg-void-elevated p-3 text-indigo-soft">
              <FiMoon size={22} />
            </div>
            <span className="text-sm font-medium text-ink">Dark Mode</span>
          </button>

          <button
            onClick={() => setTheme('light')}
            className={`flex flex-col items-center gap-3 rounded-2xl border p-6 transition-all duration-200 ${
              theme === 'light'
                ? 'border-indigo-brand bg-indigo-brand/10 shadow-glow'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="rounded-full bg-void-elevated p-3 text-ledger-amber">
              <FiSun size={22} />
            </div>
            <span className="text-sm font-medium text-ink">Light Mode</span>
          </button>
        </div>
      </Card>
    </div>
  )
}
