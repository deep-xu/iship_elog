import { useState } from 'react'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Items', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

const COLUMNS = [
  { label: 'Equipment', width: 210 },
  { label: 'Part Name', width: 210 },
  { label: 'Location', width: 200 },
  { label: 'On-Hand', width: 120 },
  { label: "Reconc'd", width: 120 },
  { label: 'Unit Cost', width: 120 },
]

export default function ReconciliationWindow({ onMinimize, onClose, preview = false }) {
  const [activeTab, setActiveTab] = useState('Items')

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex h-[34px] shrink-0 items-center bg-[#f7fbfd] pl-[10px]">
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-navy" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-navy" />
        </svg>
        <span className="ml-[9px] text-[17px] font-semibold text-ns-navy">Reconciliation - New</span>
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


      <div className="min-h-0 flex-1 overflow-auto bg-white">
        <div className="border-b border-[#e4edf3] px-[16px] py-[16px]">
          <div className="flex items-start gap-[12px]">
            <label className="pt-[8px] text-[16px] text-ns-navy">Remarks:</label>
            <textarea
              className="h-[150px] min-w-0 flex-1 resize-none border border-[#e4edf3] bg-white p-[8px] text-[16px] text-ns-navy focus:outline-none"
              defaultValue=""
            />
          </div>

          <div className="flex items-center gap-[14px] px-[60px] pt-[18px] text-[16px] text-ns-navy">
            <span>Inventory Transaction Date:</span>
            <div className="flex items-center gap-[10px] border-b border-[#da4b4b] pb-[4px]">
              <span>08/23/2026</span>
              <CalendarIcon />
            </div>
          </div>
        </div>

        <div className="flex items-end gap-[2px] px-[14px] pt-[10px]">
          {['Items', 'Status'].map((tab) => {
            const active = tab === activeTab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-[22px] py-[10px] text-[16px] focus:outline-none ${
                  active ? 'bg-ns-blue font-semibold text-white' : 'border border-[#e4edf3] bg-white text-ns-navy'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        <div className="overflow-x-auto border-t border-[#e4edf3]">
          <div className="flex min-w-[980px] bg-ns-navy text-white">
            {COLUMNS.map((column) => (
              <div
                key={column.label}
                style={{ width: column.width }}
                className="flex h-[36px] shrink-0 items-center justify-center border-r border-white/25 px-[4px] text-[15px] font-semibold"
              >
                {column.label}
              </div>
            ))}
            <div className="flex flex-1 items-center justify-end pr-[8px]">
              <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-white" strokeWidth="2.6">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="h-[520px] border-x border-b border-[#e4edf3] bg-white" />

        <div className="h-[48px] border-x border-b border-[#e4edf3] bg-[#c9c9c9]" />
      </div>
    </div>
  )
}

function ToolBtn({ children, label }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="h-[25px] w-[25px] shrink-0 text-ns-navy hover:opacity-70 focus:outline-none"
    >
      {children}
    </button>
  )
}

function DiskIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M4 4h14l2 2v14H4V4z" className="fill-none stroke-current" strokeWidth="1.8" />
      <rect x="7" y="5.5" width="8" height="4" className="fill-current" />
      <rect x="7" y="14" width="10" height="5" className="fill-none stroke-current" strokeWidth="1.6" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M8 3h10v13H8z" className="fill-none stroke-current" strokeWidth="1.8" />
      <path d="M5 7H3v14h10v-2" className="fill-none stroke-current" strokeWidth="1.8" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M5 2h9l5 5v15H5V2z" className="fill-none stroke-current" strokeWidth="1.6" />
      <path d="M14 2v5h5" className="fill-none stroke-current" strokeWidth="1.6" />
    </svg>
  )
}

function ReconcileIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="9" cy="12" r="5.5" className="fill-none stroke-[#b9b23b]" strokeWidth="2" />
      <circle cx="14.5" cy="9" r="5.5" className="fill-none stroke-current" strokeWidth="2" />
      <path d="M14 14l5 5" className="stroke-current" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function HelpFilled() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <circle cx="12" cy="12" r="10" />
      <path
        d="M9.5 9a2.5 2.5 0 115 0c0 1.8-2 2.2-2 4"
        className="fill-none stroke-white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17.4" r="1.2" className="fill-white" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] fill-none stroke-ns-navy" strokeWidth="1.8">
      <rect x="3.5" y="5.5" width="17" height="15" rx="1" />
      <path d="M3.5 9.5h17M8 3.5v4M16 3.5v4" strokeLinecap="round" />
    </svg>
  )
}
