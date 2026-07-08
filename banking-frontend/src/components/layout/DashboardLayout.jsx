import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const titleMap = {
  '/dashboard': 'Dashboard',
  '/accounts': 'Accounts',
  '/balance': 'Balance',
  '/profile': 'Profile',
  '/settings': 'Settings',
}

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const pageTitle = titleMap[location.pathname] || 'Ledger'

  return (
    <div className="flex min-h-screen bg-ledger-gradient">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar onMenuClick={() => setMobileOpen(true)} pageTitle={pageTitle} />
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
