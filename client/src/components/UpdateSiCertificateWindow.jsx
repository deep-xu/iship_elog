const CERTIFICATE_SUB_COLUMNS = [
  { label: 'Name', width: '17%' },
  { label: 'Number', width: '15%' },
  { label: 'Issued D...', width: '12%' },
  { label: 'Expiry D...', width: '12%' },
  { label: 'Expir...', width: '10%' },
  { label: 'Certificate', width: '20%' },
  { label: 'Atta...', width: '14%' },
]

export default function UpdateSiCertificateWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      {/* Title bar */}
      <div className="flex h-[34px] shrink-0 items-center bg-[#f7fbfd] pl-[10px]">
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-navy" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-navy" />
        </svg>
        <span className="ml-[9px] text-[17px] font-semibold text-ns-navy">Update SI Certificate</span>
        <div className="ml-auto flex items-center gap-[12px] pr-[8px]">
          <button
            type="button"
            aria-label="Minimize"
            onClick={preview ? undefined : onMinimize}
            className="flex h-[24px] w-[24px] items-center justify-center focus:outline-none"
          >
            <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] stroke-ns-navy" strokeWidth="2.6">
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

      <div className="min-h-0 flex-1 overflow-auto bg-white p-[14px]">
        <div className="flex justify-end gap-[10px] pb-[10px]">
          <button
            type="button"
            className="bg-ns-navy px-[18px] py-[8px] text-[15px] font-semibold text-white focus:outline-none"
          >
            Create And Link Certificate
          </button>
          <button
            type="button"
            className="bg-ns-navy px-[18px] py-[8px] text-[15px] font-semibold text-white focus:outline-none"
          >
            Link Existing Certificate
          </button>
        </div>

        <div className="overflow-x-auto border-t border-[#e4edf3]">
          <div className="flex min-w-[900px] bg-ns-navy text-white">
            <div className="flex w-[28px] shrink-0 items-center justify-center border-r border-white/25" />
            <div className="flex w-[140px] shrink-0 items-center justify-center border-r border-white/25 px-[6px] py-[8px] text-[14px] font-semibold">
              SI Reference
            </div>
            <div className="flex w-[140px] shrink-0 items-center justify-center border-r border-white/25 px-[6px] py-[8px] text-[14px] font-semibold">
              Name
            </div>
            <div className="flex w-[110px] shrink-0 items-center justify-center border-r border-white/25 px-[6px] py-[8px] text-[14px] font-semibold">
              Serial No.
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center justify-center border-b border-white/25 py-[6px] text-[14px] font-semibold">
                Certificate Details
              </div>
              <div className="flex">
                {CERTIFICATE_SUB_COLUMNS.map((col) => (
                  <div
                    key={col.label}
                    style={{ width: col.width }}
                    className="flex shrink-0 items-center justify-center border-r border-t border-white/25 px-[4px] py-[6px] text-[13px] font-semibold"
                  >
                    {col.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-[28px] shrink-0 items-center justify-end pr-[6px]">
              <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-white" strokeWidth="2.4">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="min-h-[320px] bg-white" />
      </div>

      {/* Footer buttons */}
      <div className="flex h-[54px] shrink-0 items-center justify-center gap-[8px] bg-white px-[14px]">
        <button
          type="button"
          className="bg-ns-navy px-[26px] py-[8px] text-[15px] font-semibold text-white focus:outline-none"
        >
          Ok
        </button>
        <button
          type="button"
          className="bg-ns-navy px-[22px] py-[8px] text-[15px] font-semibold text-white focus:outline-none"
        >
          Help
        </button>
      </div>
    </div>
  )
}
