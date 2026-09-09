import { Component, useState } from 'react'
import Navigator from '@/components/layout/Navigator.jsx'
import { WINDOW_REGISTRY } from '@/app/windowRegistry.jsx'

// Shared layout for a module tab: Navigator sidebar + MDI area.
export default function ModulePage({
  sections,
  defaultSection,
  showMore = false,
  initialWindow = null,
  currentUserId = '',
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [openWindows, setOpenWindows] = useState(() => (initialWindow ? [initialWindow] : []))
  const [activeWindow, setActiveWindow] = useState(initialWindow)
  // Data a window was opened with — e.g. the row that was double-clicked to
  // get here — plus a bump so re-opening the same window with new data
  // remounts it instead of reusing the still-mounted instance.
  const [openPayload, setOpenPayload] = useState(null)
  const [openToken, setOpenToken] = useState(0)

  function openWindow(key, payload = null) {
    if (!WINDOW_REGISTRY[key]) return
    setOpenWindows((cur) => (cur.includes(key) ? cur : [...cur, key]))
    // Force a remount (fresh state) when data is being handed to the window,
    // or when it wasn't already the active one. Re-opening the same window
    // with no new data just refocuses it, keeping whatever the user typed.
    if (payload !== null || activeWindow !== key) {
      setOpenToken((token) => token + 1)
    }
    setActiveWindow(key)
    setOpenPayload(payload)
  }

  function closeWindow(key) {
    setOpenWindows((cur) => cur.filter((k) => k !== key))
    setActiveWindow((cur) => (cur === key ? null : cur))
  }

  const ActiveWindow = activeWindow ? WINDOW_REGISTRY[activeWindow].Component : null

  return (
    <div className="flex min-h-0 flex-1">
      <Navigator
        sections={sections}
        defaultSection={defaultSection}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        openWindows={openWindows}
        activeWindow={activeWindow}
        onFocusWindow={setActiveWindow}
        onOpenWindow={openWindow}
      />

      {!collapsed && (
        <div className="flex w-[10px] shrink-0 items-center justify-center bg-[#e2ebf2]">
          <div className="flex flex-col gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="block h-[2px] w-[2px] bg-[#8da3b7]" />
            ))}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="relative min-h-0 flex-1 bg-[linear-gradient(180deg,#eef5fa_0%,#e8f1f7_100%)]">
          {ActiveWindow && (
            <div className="absolute inset-0">
              <WindowErrorBoundary windowTitle={WINDOW_REGISTRY[activeWindow]?.title ?? activeWindow}>
                <ActiveWindow
                  key={`${activeWindow}-${openToken}`}
                  payload={openPayload}
                  currentUserId={currentUserId}
                  title={WINDOW_REGISTRY[activeWindow]?.title}
                  onOpenWindow={openWindow}
                  onMinimize={() => setActiveWindow(null)}
                  onClose={() => closeWindow(activeWindow)}
                />
              </WindowErrorBoundary>
            </div>
          )}
          {showMore && (
            <button
              type="button"
              className="absolute bottom-[12px] right-[20px] text-[13px] font-semibold text-ns-navy focus:outline-none"
            >
              more...
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

class WindowErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    console.error('Window render failed:', error)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.windowTitle !== this.props.windowTitle && this.state.error) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full items-center justify-center rounded-[18px] border border-[#f2c7c7] bg-white p-8 text-center text-ns-navy shadow-sm">
          <div className="max-w-[640px]">
            <h2 className="font-heading text-[22px] font-semibold text-[#b14d4d]">Window failed to load</h2>
            <p className="mt-3 text-[15px] text-ns-muted">{this.props.windowTitle}</p>
            <p className="mt-4 rounded-[12px] bg-[#fff4f4] px-4 py-3 font-mono text-[13px] text-[#7e3d3d]">
              {this.state.error.message}
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
