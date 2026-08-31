export default function FindRecordByIdWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#d7e5ee] bg-[linear-gradient(180deg,#f8fbfd_0%,#eff5fa_100%)] shadow-[0_22px_60px_rgba(68,101,129,0.12)]">
      <div className="flex h-[58px] shrink-0 items-center border-b border-[#e5edf4] bg-white/92 pl-[20px] backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
        </svg>
        <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">Find Record by ID</span>
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

      <div className="flex min-h-0 flex-1 flex-col p-[18px]">
        <div className="flex min-h-0 flex-1 flex-col rounded-[24px] border border-[#dce8ef] bg-white p-[28px] shadow-[0_14px_34px_rgba(84,116,145,0.08)]">
          <div className="mb-[18px] rounded-full bg-[#eaf4fb] px-[14px] py-[7px] text-[12px] font-semibold uppercase tracking-[0.12em] text-ns-blue w-fit">
            Lookup
          </div>

          <div className="mx-auto flex w-full max-w-[880px] flex-1 flex-col justify-center gap-8">
            <div className="flex items-center gap-4">
              <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#eef6fb] text-[28px]">🔍</span>
              <span className="text-[20px] font-semibold text-[#45627e]">Please enter the Record ID to be searched</span>
            </div>

            <div className="rounded-[22px] border border-[#dce8ef] bg-[#fbfdfe] p-[24px]">
              <div className="flex items-center gap-4">
                <span className="w-[72px] text-[14px] font-semibold text-[#5b7690]">ID:</span>
                <input
                  type="text"
                  defaultValue="0000-00000-00000000"
                  className="flex-1 rounded-full border border-[#d7e5ed] bg-[linear-gradient(135deg,#3a8fc4,#4ba6dc)] px-[18px] py-[12px] text-[18px] font-semibold text-white outline-none"
                />
              </div>
            </div>

            <div className="mt-auto flex justify-center gap-6">
              <button
                type="button"
                className="min-w-[160px] rounded-full bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-8 py-3 text-[14px] font-semibold text-white shadow-[0_12px_24px_rgba(46,139,207,0.2)]"
              >
                Ok
              </button>
              <button
                type="button"
                className="min-w-[160px] rounded-full border border-[#d7e5ed] bg-white px-8 py-3 text-[14px] font-semibold text-ns-navy"
              >
                Help
              </button>
            </div>
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
