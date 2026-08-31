import { useEffect, useState } from 'react'
import LoginPage from './components/LoginPage.jsx'
import TopNav from './components/TopNav.jsx'
import TabBar from './components/TabBar.jsx'
import WorkspaceCanvas from './components/WorkspaceCanvas.jsx'
import MaintenancePage from './components/MaintenancePage.jsx'
import HsqePage from './components/HsqePage.jsx'

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [tabResetKey, setTabResetKey] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

  function handleLogin() {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
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
      <TopNav user="Master" vessel="Seaspan Benefactor" cartCount={0} onLogout={handleLogout} />
      <TabBar active={activeTab} onChange={handleTabChange} />
      {activeTab === 'Maintenance & Purchasing' && <MaintenancePage key={`maintenance-${tabResetKey}`} />}
      {activeTab === 'HSQE' && <HsqePage key={`hsqe-${tabResetKey}`} />}
      {activeTab === 'Dashboard' && <WorkspaceCanvas key={`workspace-${tabResetKey}`} />}
    </div>
  )
}
