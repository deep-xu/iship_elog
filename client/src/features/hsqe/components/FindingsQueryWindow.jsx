import QueryWindow from '@/components/ui/QueryWindow.jsx'
import { QUERY_SECTIONS, RESULT_COLUMNS } from '@/data/findingsQuery.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'View', accel: 3 },
  { label: 'Help', accel: 0 },
]

export default function FindingsQueryWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Findings Query"
      menus={MENUS}
      toolbar={['new', 'open', 'print', 'find', 'refresh']}
      sections={QUERY_SECTIONS}
      columns={RESULT_COLUMNS}
      extraPanel={<RcaPath />}
    />
  )
}

function RcaPath() {
  return (
    <div className="border-t border-[#e4edf3] bg-white px-[16px] py-[16px]">
      <div className="text-[15px] font-semibold text-ns-navy">RCA Path</div>
      <label className="mt-[10px] flex items-center gap-[8px] text-[15px] text-ns-navy">
        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] bg-ns-blue">
          <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-white" strokeWidth="2.4">
            <polyline points="3,8 6.5,11.5 13,4.5" />
          </svg>
        </span>
        Include all documents that contains this node.
      </label>

      <div className="mt-[12px] flex gap-[12px]">
        <div className="h-[88px] flex-1 rounded-[18px] border border-[#d8e5ed] bg-[#fbfdfe]" />
        <div className="flex w-[150px] flex-col justify-between">
          <button
            type="button"
            className="rounded-full bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] py-[10px] text-[15px] font-semibold text-white focus:outline-none"
          >
            Add
          </button>
          <button
            type="button"
            className="rounded-full border border-[#d7e5ed] bg-white py-[10px] text-[15px] font-semibold text-ns-navy focus:outline-none"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mt-[14px] flex items-center gap-[8px] text-[15px] text-ns-navy">
        <span className="flex-1 text-right">Preventive Action Taken:</span>
        <span className="h-[18px] w-[18px] shrink-0 rounded-[5px] border border-[#bfced9] bg-white" />
        <span className="flex-1" />
      </div>
    </div>
  )
}
