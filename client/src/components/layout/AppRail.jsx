import { SectionIcon } from '@/components/ui/icons.jsx'

const TABS = [
  { label: 'Dashboard', icon: 'dashboard' },
  { label: 'Maintenance & Purchasing', icon: 'clipboard' },
  { label: 'HSQE', icon: 'shield' },
]

// A slim, always-visible vertical icon rail (VS Code activity-bar style) for
// switching between the top-level app areas, independent of whatever module
// page (with its own Navigator sidebar) is currently rendered to its right.
export default function AppRail({ activeTab, onChangeTab }) {
  return (
    <div className="flex h-full w-[64px] shrink-0 flex-col items-center gap-[8px] border-r border-[#12283f] bg-[linear-gradient(180deg,#132840_0%,#173554_55%,#1f4569_100%)] py-[14px]">
      {TABS.map((tab) => {
        const isActive = tab.label === activeTab
        return (
          <button
            key={tab.label}
            type="button"
            title={tab.label}
            aria-label={tab.label}
            onClick={() => onChangeTab(tab.label, { reselect: tab.label === activeTab })}
            className={`flex h-[46px] w-[46px] items-center justify-center rounded-[16px] transition focus:outline-none ${
              isActive
                ? 'bg-[linear-gradient(135deg,#4297db,#59ace8)] shadow-[0_10px_20px_rgba(74,159,224,0.32)]'
                : 'text-white/70 hover:bg-white/12 hover:text-white'
            }`}
          >
            <SectionIcon name={tab.icon} className={`h-[22px] w-[22px] ${isActive ? 'text-white' : ''}`} />
          </button>
        )
      })}
    </div>
  )
}
