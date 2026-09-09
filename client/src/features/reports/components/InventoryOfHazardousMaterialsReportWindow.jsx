export default function InventoryOfHazardousMaterialsReportWindow({
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
          Inventory of Hazardous Materials
        </div>

        <div className="mt-[6px] border border-[#e4edf3] bg-[#f7f7f7] px-[18px] py-[14px]">
          <div className="text-[17px] text-ns-navy">Ships</div>

          <div className="mt-[16px] flex items-center gap-[10px]">
            <Radio />
            <span className="text-[17px] text-ns-navy">All Ships</span>
          </div>

          <div className="mt-[16px] flex items-center gap-[10px]">
            <Radio checked />
            <span className="w-[150px] text-[17px] text-ns-navy">Ships</span>
            <div className="flex w-[330px] items-center border-b border-[#e4edf3] pb-[3px] text-[17px] text-ns-navy">
              <span className="flex-1">Seaspan Benefactor</span>
              <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-current" strokeWidth="2.6">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>

          <div className="ml-[160px] mt-[22px] h-px w-[330px] border-t border-dashed border-[#d7e5ed]" />

          <div className="mt-[24px] flex items-center gap-[44px] text-[17px] text-ns-navy">
            <CheckLabel label="PART1" checked disabled />
            <CheckLabel label="PART2" />
            <CheckLabel label="PART3" />
          </div>

          <div className="mt-[18px] flex items-center gap-[10px] text-[17px] text-ns-navy">
            <Checkbox checked />
            <span>Display Equipment addition/deletion history</span>
          </div>

          <div className="mt-[18px] border border-[#e4edf3] bg-[#f7f7f7] px-[12px] pb-[12px] pt-[8px]">
            <div className="text-[17px] text-ns-navy">Versioning</div>
            <button
              type="button"
              className="mt-[14px] min-w-[196px] bg-ns-navy px-[28px] py-[8px] text-[15px] font-semibold text-white focus:outline-none"
            >
              Version History
            </button>
          </div>
        </div>

        <div className="mt-[4px] flex min-h-0 flex-1 flex-col border border-[#e4edf3] bg-[#f7f7f7] px-[18px] py-[18px]">
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
            <span className="w-[140px] text-[17px] text-ns-navy">File</span>
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

        <div className="mt-[4px] flex items-center justify-center gap-[8px]">
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

function Checkbox({ checked = false, disabled = false }) {
  return (
    <span
      className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[3px] border border-[#d7e5ed] ${
        disabled ? 'bg-[#efefef]' : 'bg-white'
      }`}
    >
      {checked ? (
        <svg viewBox="0 0 16 16" className={`h-[12px] w-[12px] ${disabled ? 'stroke-white' : 'stroke-white'}`} strokeWidth="2.2" fill="none">
          <polyline points="3.5,8.5 6.5,11.5 12.5,4.5" />
        </svg>
      ) : null}
      <span
        className={`absolute h-[22px] w-[22px] rounded-[3px] ${
          checked ? (disabled ? 'bg-[#c9c9c9]' : 'bg-ns-blue') : 'bg-transparent'
        } -z-10`}
      />
    </span>
  )
}

function CheckLabel({ label, checked = false, disabled = false }) {
  return (
    <label className="flex items-center gap-[10px]">
      <Checkbox checked={checked} disabled={disabled} />
      <span>{label}</span>
    </label>
  )
}
