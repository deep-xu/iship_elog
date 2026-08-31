const COLUMNS = [
  { label: 'Name', width: '29%' },
  { label: 'SI Reference', width: '17%' },
  { label: 'PO', width: '13%' },
  { label: 'Serial No.', width: '16%' },
  { label: 'Current site Date', width: '25%' },
]

export default function UpdateSerialNoWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#d7e5ee] bg-[linear-gradient(180deg,#f8fbfd_0%,#eff5fa_100%)] shadow-[0_22px_60px_rgba(68,101,129,0.12)]">
      <div className="flex h-[58px] shrink-0 items-center border-b border-[#e5edf4] bg-white/92 pl-[20px] backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
        </svg>
        <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">Update Serial No.</span>
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

      <div className="min-h-0 flex-1 p-[18px]">
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[24px] border border-[#dce8ef] bg-white shadow-[0_14px_34px_rgba(84,116,145,0.08)]">
          <div className="flex h-[50px] shrink-0 items-center border-b border-[#e6eef4] bg-[#f9fcfe] px-[18px]">
            <div className="rounded-full bg-[#eaf4fb] px-[14px] py-[6px] text-[13px] font-semibold text-ns-blue">
              Serial Number Update
            </div>
            <span className="ml-auto text-[12px] text-[#7f96ab]">Select an item and confirm the update.</span>
          </div>

          <div className="overflow-x-auto border-b border-[#e6eef4] bg-[#f7fbfe]">
            <div className="flex bg-[#dbeaf5] text-ns-navy">
              {COLUMNS.map((col) => (
                <div
                  key={col.label}
                  style={{ width: col.width }}
                  className="flex h-[42px] shrink-0 items-center justify-center border-r border-white/50 px-[8px] text-[11px] font-semibold uppercase tracking-[0.08em]"
                >
                  {col.label}
                </div>
              ))}
              <div className="flex h-[42px] min-w-[34px] shrink-0 items-center justify-center border-l border-white/30">
                <svg
                  viewBox="0 0 24 24"
                  className="h-[16px] w-[16px] fill-none stroke-ns-navy"
                  strokeWidth="2.4"
                >
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </div>
            </div>
          </div>

          <div className="min-h-[300px] flex-1 bg-white" />

          <div className="flex h-[64px] shrink-0 items-center justify-center gap-[10px] border-t border-[#e6eef4] bg-[#fbfdff] px-[16px]">
            <button
              type="button"
              className="min-w-[150px] rounded-full bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[24px] py-[9px] text-[14px] font-semibold text-white shadow-[0_12px_24px_rgba(46,139,207,0.2)] focus:outline-none"
            >
              Ok
            </button>
            <button
              type="button"
              className="min-w-[150px] rounded-full border border-[#d8e5ed] bg-white px-[22px] py-[9px] text-[14px] font-semibold text-ns-navy focus:outline-none"
            >
              Help
            </button>
          </div>
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
