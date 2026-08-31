export default function ShelfLifeExpirationListingReportWindow({
  onMinimize,
  onClose,
  preview = false,
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex h-[34px] shrink-0 items-center bg-[#eef5fa] pl-[10px]">
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-navy" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-navy" />
        </svg>
        <span className="ml-[9px] text-[17px] font-semibold text-ns-navy">Report Option</span>
        <div className="ml-auto flex items-center gap-[14px] pr-[8px]">
          <button
            type="button"
            aria-label="Minimize"
            onClick={preview ? undefined : onMinimize}
            className="flex h-[24px] w-[24px] items-center justify-center focus:outline-none"
          >
            <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] stroke-ns-navy" strokeWidth="2">
              <line x1="3" y1="11" x2="13" y2="11" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={preview ? undefined : onClose}
            className="flex h-[22px] w-[26px] items-center justify-center bg-ns-navy focus:outline-none"
          >
            <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] stroke-white" strokeWidth="2">
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-[#eef5fa] p-[18px]">
        <div className="border border-[#e4edf3] bg-white px-[18px] py-[8px] text-center text-[18px] font-semibold text-ns-navy">
          Shelf Life Expiration Listing
        </div>

        <div className="mt-[6px] border border-[#e4edf3] bg-[#f7f7f7] px-[18px] py-[16px]">
          <div className="w-[500px] border border-[#e4edf3] bg-[#f7f7f7] px-[18px] py-[18px]">
            <DateRow label="Show items expired as of:" value="08/23/2026" active />
          </div>
        </div>

        <div className="mt-[14px] flex min-h-0 flex-1 flex-col border border-[#e4edf3] bg-[#f7f7f7] px-[18px] py-[18px]">
          <div className="flex items-center gap-[10px]">
            <Radio checked />
            <span className="text-[17px] text-ns-navy">Screen</span>
          </div>

          <div className="mt-[16px] flex items-center gap-[10px]">
            <Radio />
            <span className="text-[17px] text-ns-navy">Printer/Fax</span>
          </div>

          <div className="mt-[16px] flex items-center gap-[10px]">
            <Radio />
            <span className="w-[160px] text-[17px] text-ns-navy">File</span>
            <span className="text-[17px] text-ns-navy">As</span>
            <div className="flex w-[330px] items-center border-b border-[#d7e5ed] pb-[3px] text-[17px] text-ns-navy">
              <span className="flex-1">PDF (*.pdf)</span>
              <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-current" strokeWidth="2.6">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>

          <div className="mt-[16px] flex items-center gap-[10px]">
            <Radio />
            <span className="text-[17px] text-ns-navy">Email</span>
          </div>
        </div>

        <div className="mt-[8px] flex items-center justify-center gap-[8px]">
          <button
            type="button"
            className="min-w-[148px] bg-ns-navy px-[26px] py-[8px] text-[15px] font-semibold text-white focus:outline-none"
          >
            Ok
          </button>
          <button
            type="button"
            className="min-w-[148px] bg-ns-navy px-[26px] py-[8px] text-[15px] font-semibold text-white focus:outline-none"
          >
            Help
          </button>
        </div>
      </div>
    </div>
  )
}

function Radio({ checked = false }) {
  return (
    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 border-[#d7e5ed] bg-white">
      {checked ? <span className="h-[10px] w-[10px] rounded-full bg-ns-blue" /> : null}
    </span>
  )
}

function DateRow({ label, value, active = false }) {
  return (
    <div className="flex items-center gap-[10px] text-[17px] text-ns-navy">
      <span className="w-[228px] text-right">{label}</span>
      <div className="flex w-[148px] items-center border-b border-[#d7e5ed] pb-[3px]">
        <span className={`px-[2px] ${active ? 'bg-ns-blue text-white' : ''}`}>{value}</span>
      </div>
      <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] fill-none stroke-[#7d95ad]" strokeWidth="1.8">
        <rect x="4" y="5.5" width="16" height="14" rx="1.2" />
        <line x1="4" y1="9.5" x2="20" y2="9.5" />
        <line x1="8" y1="3.5" x2="8" y2="7.5" />
        <line x1="16" y1="3.5" x2="16" y2="7.5" />
      </svg>
    </div>
  )
}
