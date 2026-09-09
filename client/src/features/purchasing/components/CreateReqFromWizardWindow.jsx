export default function CreateReqFromWizardWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex h-[34px] shrink-0 items-center bg-[#f7fbfd] pl-[10px]">
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-navy" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-navy" />
        </svg>
        <span className="ml-[9px] text-[17px] font-semibold text-ns-navy">Create REQ from Wizard</span>
        <div className="ml-auto flex items-center gap-[14px] pr-[8px]">
          <button
            type="button"
            aria-label="Minimize"
            onClick={preview ? undefined : onMinimize}
            className="flex h-[24px] w-[24px] items-center justify-center focus:outline-none"
          >
            <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] stroke-ns-navy" strokeWidth="1.8">
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

      <div className="min-h-0 flex-1 overflow-auto bg-white p-[10px]">
        <div className="border border-[#e4edf3] bg-[#f3f3f3]">
          <div className="border-b border-[#e4edf3] px-[12px] py-[6px] text-[16px] font-semibold text-ns-navy">
            Source Document Details
          </div>

          <div className="flex gap-[8px] p-[8px]">
            <div className="flex flex-1 flex-col gap-[10px] border border-[#e4edf3] bg-white px-[18px] py-[12px] text-[16px] text-ns-navy">
              <div>
                <span className="font-semibold">Ship:</span>
                <span className="ml-[12px]">Seaspan Benefactor</span>
              </div>
              <div>
                <span className="font-semibold">Equipment:</span>
              </div>
            </div>

            <div className="flex w-[300px] shrink-0 items-start gap-[12px] border border-[#e4edf3] bg-white px-[18px] py-[12px] text-[16px] text-ns-navy">
              <span className="font-semibold">Req. No.:</span>
              <span>AutoGen</span>
            </div>
          </div>

          <div className="flex min-h-[560px] border-t border-[#e4edf3]">
            <div className="flex w-[300px] shrink-0 flex-col bg-[#7d95ad] p-[10px] text-white">
              <div className="flex h-[150px] w-[150px] items-center justify-center border border-white/70 bg-[#7d95ad]">
                <svg viewBox="0 0 120 120" className="h-[120px] w-[120px]">
                  <rect x="18" y="58" width="28" height="12" rx="2" className="fill-[#35d4d7]" transform="rotate(-38 32 64)" />
                  <rect x="20" y="84" width="30" height="14" rx="2" className="fill-[#d2c10d]" transform="rotate(-35 35 91)" />
                  <rect x="53" y="84" width="30" height="14" rx="2" className="fill-[#e5302d]" transform="rotate(-35 68 91)" />
                  <rect x="42" y="26" width="14" height="62" rx="3" className="fill-black" transform="rotate(-35 49 57)" />
                  <circle cx="73" cy="19" r="3" className="fill-[#e15a30]" />
                  <circle cx="86" cy="24" r="3" className="fill-[#d2c10d]" />
                  <circle cx="96" cy="40" r="3" className="fill-[#d93a35]" />
                  <circle cx="87" cy="52" r="3" className="fill-[#d2c10d]" />
                  <circle cx="74" cy="42" r="3" className="fill-[#d93a35]" />
                  <circle cx="64" cy="29" r="3" className="fill-[#d2c10d]" />
                </svg>
              </div>
              <div className="pt-[28px] text-[24px] leading-[1.2]">Create REQ from Wizard</div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between bg-white">
              <div className="px-[28px] py-[34px] text-ns-navy">
                <div className="pb-[28px] text-[16px] font-semibold">
                  How do you want to create Requisition?:
                </div>

                <label className="flex items-center gap-[12px] pb-[20px] text-[18px]">
                  <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full border-[2px] border-[#7d7d7d]">
                    <span className="h-[10px] w-[10px] rounded-full bg-transparent" />
                  </span>
                  <span>Create REQ Manually</span>
                </label>

                <label className="flex items-center gap-[12px] text-[18px]">
                  <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full border-[2px] border-ns-blue">
                    <span className="h-[10px] w-[10px] rounded-full bg-ns-blue" />
                  </span>
                  <span>Create REQ from Wizard</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-[12px] border-t border-[#e4edf3] bg-[#f6f6f6] px-[18px] py-[14px]">
                <WizardButton label="<< Previous" muted />
                <WizardButton label="Next >>" active />
                <WizardButton label="Finish" muted />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WizardButton({ label, active = false, muted = false }) {
  const classes = active
    ? 'bg-ns-navy text-white'
    : muted
      ? 'bg-[#717b92] text-white'
      : 'bg-white text-ns-navy'

  return (
    <button
      type="button"
      className={`min-w-[160px] px-[18px] py-[10px] text-[16px] font-semibold focus:outline-none ${classes}`}
    >
      {label}
    </button>
  )
}
