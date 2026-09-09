import { useEffect, useState } from 'react'
import { bootstrap } from '@/services/api/bootstrap.js'
import LoginPage from '@/features/auth/components/LoginPage.jsx'
import TopNav from '@/components/layout/TopNav.jsx'
import WorkspaceCanvas from '@/components/layout/WorkspaceCanvas.jsx'
import MaintenancePage from '@/components/layout/MaintenancePage.jsx'
import HsqePage from '@/components/layout/HsqePage.jsx'

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [tabResetKey, setTabResetKey] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('')
  const [userId, setUserId] = useState('')
  const [dbOffline, setDbOffline] = useState(false)

  useEffect(() => {
    function syncLoginRoute() {
      if (window.location.hash === '#login') {
        setIsLoggedIn(false)
      }
    }

    window.addEventListener('hashchange', syncLoginRoute)
    return () => window.removeEventListener('hashchange', syncLoginRoute)
  }, [])

  function handleLogout() {
    window.location.hash = 'login'
  }

  // Every window reads its data synchronously, so the stores are filled from
  // MySQL before the workspace renders. It happens here rather than on mount
  // because what the account can see — its vessels in particular — depends on
  // who signed in.
  async function handleLogin(loggedInRole = '', loggedInUserId = '') {
    const { connected } = await bootstrap(loggedInUserId)

    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    setRole(loggedInRole)
    setUserId(loggedInUserId)
    setDbOffline(!connected)
    setIsLoggedIn(true)
  }

  function handleTabChange(nextTab, options = {}) {
    setActiveTab(nextTab)
    if (options.reselect) {
      setTabResetKey((value) => value + 1)
    }
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#eef6fb] font-ui">
      {dbOffline ? (
        <div className="shrink-0 bg-[#fbe9d0] px-4 py-1 text-[13px] font-semibold text-[#8a5a12]">
          Database unavailable — showing locally cached data. Changes will not be saved.
        </div>
      ) : null}
      <TopNav
        user={role || 'Crew'}
        vessel="Seaspan Benefactor"
        cartCount={0}
        onLogout={handleLogout}
        activeTab={activeTab}
        onChangeTab={handleTabChange}
      />
      {activeTab === 'Maintenance & Purchasing' && (
        <MaintenancePage key={`maintenance-${tabResetKey}`} currentUserId={userId} />
      )}
      {activeTab === 'HSQE' && <HsqePage key={`hsqe-${tabResetKey}`} currentUserId={userId} />}
      {activeTab === 'Dashboard' && <WorkspaceCanvas key={`workspace-${tabResetKey}`} />}
    </div>
  )
}
