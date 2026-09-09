import QueryWindow from '@/components/ui/QueryWindow.jsx'
import { QUERY_SECTIONS, RESULT_COLUMNS } from '@/data/carQuery.js'

const MENUS = [
  { label: 'File' },
  { label: 'Tag' },
  { label: 'Process' },
  { label: 'Reports' },
  { label: 'Help' },
]

export default function CarQueryWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="CAR Query"
      menus={MENUS}
      toolbar={['new', 'open', 'print', 'find', 'refresh']}
      sections={QUERY_SECTIONS}
      columns={RESULT_COLUMNS}
      extraPanel={<CarRcaPanel />}
    />
  )
}

function CarRcaPanel() {
  return (
    <div className="mb-[10px] overflow-hidden rounded-[18px] border border-[#e2ecf3] bg-white shadow-[0_10px_24px_rgba(84,116,145,0.06)]">
      <div className="bg-[#edf5fa] px-[16px] py-[10px] text-[13px] font-semibold text-ns-navy">RCA Path</div>

      <div className="px-[16px] py-[14px]">
        <label className="flex items-center gap-[8px] text-[13px] text-ns-navy">
          <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] bg-ns-blue">
            <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-white" strokeWidth="2.4">
              <polyline points="3,8 6.5,11.5 13,4.5" />
            </svg>
          </span>
          Include all documents that contains this node.
        </label>

        <div className="mt-[12px] flex gap-[12px]">
          <div className="h-[88px] flex-1 rounded-[14px] border border-[#d8e5ed] bg-[#fbfdfe]" />
          <div className="flex w-[130px] flex-col justify-between">
            <button
              type="button"
              className="rounded-full bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] py-[9px] text-[13px] font-semibold text-white focus:outline-none"
            >
              Add
            </button>
            <button
              type="button"
              className="rounded-full border border-[#d7e5ed] bg-white py-[9px] text-[13px] font-semibold text-ns-navy focus:outline-none"
            >
              Clear
            </button>
          </div>
        </div>

        <TrailingField label="Exclude from statistics" chevron />
        <TrailingField label="Findings Type" value="-- Select --" muted chevron />

        <div className="mt-[12px] flex items-center gap-[10px] text-[13px] font-semibold text-[#45627e]">
          <span className="flex-1">Preventive Action Taken:</span>
          <span className="h-[18px] w-[18px] shrink-0 rounded-[5px] border border-[#c7d6e0] bg-[#fbfdff]" />
          <span className="flex-1" />
        </div>
      </div>
    </div>
  )
}

function TrailingField({ label, value, muted = false, chevron = false }) {
  return (
    <div className="mt-[10px] rounded-[14px] border border-[#e7eff5] bg-white px-[14px] py-[10px] shadow-[0_4px_12px_rgba(84,116,145,0.05)]">
      <div className="mb-[6px] text-[12px] font-semibold text-[#5b7690]">{label}</div>
      <span className="flex min-w-0 items-center rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] py-[7px] text-[13px] text-ns-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
        <span className={`min-w-0 flex-1 truncate ${muted ? 'text-neutral-500' : ''}`}>{value ?? ''}</span>
        {chevron && (
          <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0 fill-none stroke-ns-navy" strokeWidth="2.4">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        )}
      </span>
    </div>
  )
}
