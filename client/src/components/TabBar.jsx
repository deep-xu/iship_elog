const TABS = ['Dashboard', 'Maintenance & Purchasing', 'HSQE']

export default function TabBar({ active, onChange }) {
  return (
    <div className="flex h-[68px] items-center gap-3 border-b border-[#d9e8f2] bg-[#f5fbff] px-[16px]">
      {TABS.map((tab) => {
        const isActive = tab === active
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab, { reselect: tab === active })}
            className={`rounded-full px-[18px] py-[10px] font-heading text-[14px] font-bold transition ${
              isActive
                ? 'bg-[linear-gradient(135deg,#4297db,#59ace8)] text-white shadow-[0_14px_26px_rgba(74,159,224,0.24)]'
                : 'bg-white text-ns-navy shadow-[0_8px_20px_rgba(31,58,95,0.04)] hover:bg-[#f3f9fd]'
            }`}
          >
            {tab}
          </button>
        )
      })}

      <div className="ml-auto hidden items-center gap-2 lg:flex">
        <span className="rounded-full border border-[#d8e7f0] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#88a0b7]">
          Simpler workflows
        </span>
      </div>
    </div>
  )
}
