import { useState } from 'react'

const OPTIONS = [
  { key: 'through', label: 'Calculate Through', withDate: true },
  { key: 'complete', label: 'Complete Calculation' },
  { key: 'revise', label: 'Revise Calculation' },
]

export default function RecalculateMaintenanceScheduleWindow({ onClose, preview = false }) {
  const [selected, setSelected] = useState('complete')

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="w-[560px] overflow-hidden rounded-[28px] border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.16)]">
        <div className="flex h-[58px] shrink-0 items-center border-b border-[#e4edf3] bg-white pl-[18px]">
          <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0">
            <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
          </svg>
          <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">Schedule</span>
          <div className="ml-auto flex items-center pr-[14px]">
            <button
              type="button"
              aria-label="Close"
              onClick={preview ? undefined : onClose}
              className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[#8aa0b4] transition hover:bg-[#eef6fb] hover:text-ns-navy focus:outline-none"
            >
              <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-current" strokeWidth="1.9">
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-[#eef5fa] px-[22px] py-[20px]">
          <div className="rounded-[24px] border border-[#dce8ef] bg-white px-[22px] py-[22px]">
            <div className="flex flex-col gap-[16px]">
              {OPTIONS.map((opt) => (
                <label key={opt.key} className="flex items-center gap-[12px] text-[15px] font-medium text-ns-navy">
                  <button
                    type="button"
                    onClick={() => setSelected(opt.key)}
                    aria-label={opt.label}
                    className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#b8c9d6] bg-white focus:outline-none"
                  >
                    {selected === opt.key && (
                      <span className="h-[9px] w-[9px] rounded-full bg-ns-blue" />
                    )}
                  </button>
                  <span className={opt.withDate ? 'border-b border-dotted border-[#b8c9d6]' : ''}>
                    {opt.label}
                  </span>
                  {opt.withDate && (
                    <>
                      <span className="ml-[10px] h-[18px] flex-1 border-b border-[#c7d7e2]" />
                      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-ns-navy">
                        <path d="M3 5h18v16H3V5zm2 5v9h14v-9H5zM7 2v4H5V2h2zm12 0v4h-2V2h2z" />
                      </svg>
                    </>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-[18px] flex items-center justify-center gap-[10px]">
            <button
              type="button"
              onClick={preview ? undefined : onClose}
              className="rounded-full bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-[26px] py-[9px] text-[14px] font-semibold text-white shadow-[0_14px_26px_rgba(46,139,207,0.24)] focus:outline-none"
            >
              Ok
            </button>
            <button
              type="button"
              className="rounded-full border border-[#d7e5ed] bg-white px-[24px] py-[9px] text-[14px] font-semibold text-ns-navy focus:outline-none"
            >
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
