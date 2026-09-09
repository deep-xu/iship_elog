import ishipLogo from '@/assets/iship-logo-custom.png'
import { SectionIcon } from '@/components/ui/icons.jsx'

const LINKS = ['Log out']

const APP_TABS = [
  { label: 'Dashboard', icon: 'dashboard' },
  { label: 'Maintenance & Purchasing', icon: 'clipboard' },
  { label: 'HSQE', icon: 'shield' },
]

export default function TopNav({ user, vessel, cartCount, onLogout, activeTab, onChangeTab }) {
  return (
    <div className="flex h-[72px] w-full items-center gap-4 border-b border-[#d9e8f2] bg-[#ffffff] px-[22px] text-ns-navy shadow-[0_10px_30px_rgba(31,58,95,0.04)]">
      <div className="hidden shrink-0 items-center gap-4 xl:flex">
        <img src={ishipLogo} alt="iSHIP" className="h-[72px] w-auto object-contain" />

        {onChangeTab && (
          <div className="flex shrink-0 items-center gap-[6px]">
            {APP_TABS.map((tab) => {
              const isActive = tab.label === activeTab
              return (
                <button
                  key={tab.label}
                  type="button"
                  title={tab.label}
                  aria-label={tab.label}
                  onClick={() => onChangeTab(tab.label, { reselect: tab.label === activeTab })}
                  className={`flex h-[38px] w-[38px] items-center justify-center rounded-[12px] transition focus:outline-none ${
                    isActive
                      ? 'bg-[linear-gradient(135deg,#4297db,#59ace8)] shadow-[0_10px_20px_rgba(74,159,224,0.28)]'
                      : 'text-[#7f95aa] hover:bg-[#eef5fb] hover:text-ns-navy'
                  }`}
                >
                  <SectionIcon name={tab.icon} className={`h-[18px] w-[18px] ${isActive ? 'text-white' : ''}`} />
                </button>
              )
            })}
          </div>
        )}

      </div>

      <div className="ml-auto flex shrink-0 items-center gap-4">
        <StatusPill label="Onboard" value="Live" tone="blue" />
        <StatusPill label="Role" value={user} tone="neutral" />
        <Divider />
        {LINKS.map((label) => (
          <div key={label} className="flex items-center">
            {label === 'Log out' ? (
              <button
                type="button"
                onClick={onLogout}
                className="font-heading px-[16px] text-[13px] font-semibold text-ns-navy transition hover:text-ns-blue"
              >
                {label}
              </button>
            ) : (
              <a
                href="#"
                className="font-heading px-[16px] text-[13px] font-semibold text-ns-navy transition hover:text-ns-blue"
              >
                {label}
              </a>
            )}
            <Divider />
          </div>
        ))}
      </div>
    </div>
  )
}

function Divider() {
  return <span className="h-[28px] w-px bg-[#dde8f0]" />
}

function StatusPill({ label, value, tone }) {
  return (
    <div
      className={`rounded-full border px-4 py-2 ${
        tone === 'blue'
          ? 'border-[#c5dff0] bg-[#f1f8fd] text-ns-blue'
          : 'border-[#dde8f0] bg-[#fbfdfe] text-ns-navy'
      }`}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7f95aa]">{label}</span>
      <span className="ml-2 text-[12px] font-semibold">{value}</span>
    </div>
  )
}
