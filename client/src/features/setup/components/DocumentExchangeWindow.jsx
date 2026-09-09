export default function DocumentExchangeWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#d7e5ee] bg-[linear-gradient(180deg,#f8fbfd_0%,#eff5fa_100%)] shadow-[0_22px_60px_rgba(68,101,129,0.12)]">
      <div className="flex h-[58px] shrink-0 items-center border-b border-[#e5edf4] bg-white/92 pl-[20px] backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
        </svg>
        <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">Document Exchange</span>
        <div className="ml-auto flex items-center gap-[10px] pr-[14px]">
          <WindowActionButton label="Minimize" onClick={preview ? undefined : onMinimize}>
            <line x1="3" y1="11" x2="13" y2="11" />
          </WindowActionButton>
          <WindowActionButton label="Close" onClick={preview ? undefined : onClose}>
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </WindowActionButton>
        </div>
      </div>

      <div className="flex h-[56px] shrink-0 items-center gap-[10px] border-b border-[#e8eff4] bg-white/88 px-[18px]">
        <button type="button" className="rounded-full bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[20px] py-[9px] text-[13px] font-semibold text-white shadow-[0_12px_24px_rgba(46,139,207,0.2)]">
          Add
        </button>
        <button type="button" className="rounded-full border border-[#d7e5ed] bg-white px-[20px] py-[9px] text-[13px] font-semibold text-ns-navy">
          Remove
        </button>
        <div className="ml-auto flex items-center gap-[8px] rounded-full border border-[#dbe7ef] bg-[#f8fbfe] px-[14px] py-[8px] text-[13px] text-[#5e7894]">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search..."
            className="w-[180px] bg-transparent text-ns-navy outline-none"
            readOnly
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-white px-[18px] pb-[18px]">
        <div className="overflow-hidden rounded-[22px] border border-[#dce8ef] shadow-[0_10px_28px_rgba(84,116,145,0.08)]">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-[#dbeaf5] text-left text-ns-navy">
              <th className="border-b border-r border-white/50 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">Category</th>
              <th className="border-b border-r border-white/50 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">Document Name</th>
              <th className="border-b border-r border-white/50 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">Expires On</th>
              <th className="border-b px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">Ship</th>
            </tr>
          </thead>
          <tbody className="bg-white text-[#45627e]">
            <tr>
              <td className="border-b border-[#edf2f6] px-3 py-6" colSpan={4}></td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

function WindowActionButton({ label, children, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-[28px] w-[28px] items-center justify-center rounded-full text-[#8aa0b4] transition hover:bg-[#eef6fb] hover:text-ns-navy focus:outline-none"
    >
      <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] fill-none stroke-current" strokeWidth="1.9">
        {children}
      </svg>
    </button>
  )
}
