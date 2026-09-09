import {
  MenuBar,
  TitleBar,
  ToolDivider,
  ToolIcon,
  Toolbar,
  WindowFrame,
} from '@/components/ui/windowChrome.jsx'

const LOCATIONS = [
  'ACETYLENE ROOM UPP DK',
  'Bridge',
  'E/R BOTTOM PORT',
  'E/R BOTTOM STORE',
  'E/R SPARE ROOM',
  'ECR',
  'ELECTRICAL WORKSHOP',
  'ER 2nd deck',
  'ER 3rd DECK',
  'ER 4th DECK FWD',
  'ER LT COOLER DECK',
  'FWD Bosune store',
  'G/E L.O.Tk',
  'ME LO settling tank',
  'ME LO storage tank',
  'NO.1 CYL.O.Tk',
  'NO.2CYL.O.Tk',
  'OXYGEN ROOM UPP DK',
  'Paint Store',
  'REEFER STORE',
  'Safety Locker Upper deck',
  'Steering gear',
]

const MENUS = ['File', 'Tools', 'View', 'Reports', 'Help']

const TOP_COLUMNS = [
  { label: 'Equipment', width: 210 },
  { label: 'HCS', width: 62 },
  { label: 'Part Name', width: 210 },
  { label: 'Part Number', width: 210 },
  { label: '', width: 60 },
]

const BOTTOM_COLUMNS = [
  { label: 'Ship', width: 62 },
  { label: 'H...', width: 46 },
  { label: 'Equipment', width: 140 },
  { label: 'Code', width: 66 },
  { label: 'Manufactu...', width: 118 },
  { label: 'Model', width: 78 },
  { label: 'Equip...', width: 78 },
  { label: 'Location', width: 100 },
  { label: 'Class ...', width: 82 },
  { label: 'Failu...', width: 70 },
]

export default function StorageLocationWindow({ onMinimize, onClose, preview = false }) {
  return (
    <WindowFrame>
      <TitleBar title="Storage Location" onMinimize={onMinimize} onClose={onClose} preview={preview} />
      <MenuBar items={MENUS} />

      <Toolbar>
        <ToolIcon label="New">
          <Doc />
        </ToolIcon>
        <ToolIcon label="Previous">
          <EyeArrow dir="left" />
        </ToolIcon>
        <ToolIcon label="Next">
          <EyeArrow dir="right" />
        </ToolIcon>
        <ToolIcon label="Merge">
          <MergeMoveIcon kind="merge" />
        </ToolIcon>
        <ToolIcon label="Hide">
          <MergeMoveIcon kind="hide" />
        </ToolIcon>
        <ToolIcon label="Move">
          <MergeMoveIcon kind="move" />
        </ToolIcon>
        <ToolIcon label="Back">
          <BackChevron />
        </ToolIcon>
        <ToolDivider />
        <ToolIcon label="Help">
          <HelpFilled />
        </ToolIcon>
      </Toolbar>

      <div className="min-h-0 flex-1 bg-[#eef5fa] p-[14px]">
        <div className="flex h-full min-h-0 overflow-hidden rounded-[24px] border border-[#dce8ef] bg-white shadow-[0_16px_38px_rgba(84,116,145,0.08)]">
          {/* Tree pane */}
          <div className="flex w-[46%] min-w-0 shrink-0 flex-col border-r border-[#e4edf3] bg-[#fcfeff]">
            <div className="flex shrink-0 items-center gap-[10px] border-b border-[#e4edf3] px-[16px] py-[14px]">
              <div className="flex h-[38px] min-w-0 flex-1 items-center gap-[8px] rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px]">
                <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 text-[#7d95ad]">
                  <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
                  <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search locations..."
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-ns-navy placeholder:text-[#8ba0b2] focus:outline-none"
                />
              </div>
              <ExpandCollapseIcon direction="down" />
              <ExpandCollapseIcon direction="up" />
            </div>

            <div className="min-h-0 flex-1 overflow-auto px-[16px] py-[12px]">
              <div className="flex items-center gap-[8px] rounded-[12px] bg-[#eaf4fb] px-[10px] py-[8px]">
                <ExpandBox open />
                <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-ns-blue">
                  <path d="M12 2l-5 4v2h10V6l-5-4zM5 10h14l-2 7H7l-2-7zm-1 9h16v3H4v-3z" />
                </svg>
                <span className="truncate text-[13px] font-semibold text-ns-navy">
                  [SBEN] Seaspan Benefactor
                </span>
              </div>

              <ul className="ml-[16px] mt-[6px] border-l border-[#dce8ef]">
                {LOCATIONS.map((label) => (
                  <li
                    key={label}
                    className="flex items-center gap-[8px] rounded-[10px] py-[6px] pl-[12px] pr-[8px] transition hover:bg-[#f4f9fc]"
                  >
                    <span className="h-px w-[8px] shrink-0 bg-[#dce8ef]" />
                    <ExpandBox />
                    <input
                      type="checkbox"
                      className="h-[15px] w-[15px] shrink-0 rounded-[4px] accent-ns-blue"
                    />
                    <StorageIcon />
                    <span className="truncate text-[13px] text-ns-navy">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Two stacked result grids, both empty */}
          <div className="flex min-w-0 flex-1 flex-col bg-white p-[14px]">
            <EmptyGrid columns={TOP_COLUMNS} caption="Parts at location" className="flex-1" />

            <div className="flex h-[26px] shrink-0 items-center justify-center gap-[6px] text-[10px] text-[#8aa0b4]">
              <span>▲</span>
              <span>▼</span>
            </div>

            <EmptyGrid columns={BOTTOM_COLUMNS} caption="Equipment at location" className="flex-1" />
          </div>
        </div>
      </div>
    </WindowFrame>
  )
}

function EmptyGrid({ columns, caption, className = '' }) {
  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div className="mb-[8px] shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#88a2bb]">
        {caption}
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-auto rounded-[16px] border border-[#dce8ef]">
        <div
          className="flex shrink-0 bg-ns-navy text-white"
          style={{ minWidth: columns.reduce((sum, c) => sum + c.width, 0) }}
        >
          {columns.map((col, i) => (
            <div
              key={`${col.label}-${i}`}
              style={{ width: col.width }}
              className="flex h-[42px] shrink-0 items-center justify-center border-r border-white/20 px-[10px] text-[13px] font-semibold"
            >
              {col.label}
            </div>
          ))}
        </div>
        <div className="min-h-0 flex-1 bg-white" />
      </div>
    </div>
  )
}

function ExpandBox({ open = false }) {
  return (
    <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[4px] border border-[#c7d6e0] bg-white">
      <svg viewBox="0 0 10 10" className="h-[9px] w-[9px] stroke-[#7d95ad]" strokeWidth="1.4">
        <line x1="2" y1="5" x2="8" y2="5" />
        {!open && <line x1="5" y1="2" x2="5" y2="8" />}
      </svg>
    </span>
  )
}

function StorageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-[#7d95ad]">
      <path d="M2 4h20v6H2V4zm1 8h18v9H3v-9zm4 2v5h4v-5H7z" />
    </svg>
  )
}

function ExpandCollapseIcon({ direction }) {
  return (
    <button
      type="button"
      aria-label={direction === 'down' ? 'Expand all' : 'Collapse all'}
      className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px] text-ns-navy transition hover:bg-[#eef6fb] focus:outline-none"
    >
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]">
        <rect x="2" y="4" width="9" height="7" className="fill-none stroke-current" strokeWidth="2" />
        <line x1="6.5" y1="5.5" x2="6.5" y2="9.5" className="stroke-current" strokeWidth="2" />
        <line x1="4.5" y1="7.5" x2="8.5" y2="7.5" className="stroke-current" strokeWidth="2" />
        <path
          d={direction === 'down' ? 'M17 4v10m0 0l-3-3m3 3l3-3' : 'M17 14V4m0 0l-3 3m3-3l3 3'}
          className="fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}

function Doc() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M5 2h9l5 5v15H5V2z" className="fill-none stroke-current" strokeWidth="1.6" />
      <path d="M14 2v5h5" className="fill-none stroke-current" strokeWidth="1.6" />
    </svg>
  )
}

function EyeArrow({ dir }) {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M3 8c3-3.5 9-3.5 12 0-3 3.5-9 3.5-12 0z" className="fill-none stroke-current" strokeWidth="1.6" />
      <circle cx="9" cy="8" r="2" className="fill-current" />
      <circle cx="15.5" cy="16.5" r="5.5" className="fill-none stroke-current" strokeWidth="1.8" />
      <path
        d={dir === 'left' ? 'M17 13.5L14 16.5l3 3' : 'M14 13.5l3 3-3 3'}
        className="fill-none stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BackChevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M15 4L7 12l8 8" className="fill-none stroke-current" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

function HelpFilled() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="12" cy="12" r="10" className="fill-current" />
      <text x="12" y="17" textAnchor="middle" className="fill-white" style={{ fontSize: '13px', fontWeight: 700 }}>
        ?
      </text>
    </svg>
  )
}

function MergeMoveIcon({ kind }) {
  if (kind === 'merge') {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <path d="M4 7h6l3 4 3-4h4v4l-4 4 4 4v2h-2l-4-4-4 4H8v-2l4-4-4-4V7z" className="fill-none stroke-current" strokeWidth="1.8" />
        <path d="M6 6l3 3M18 6l-3 3" className="stroke-[#2f9d69]" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 18l3-3M18 18l-3-3" className="stroke-ns-blue" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'hide') {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <path d="M3 12s3-5 9-5 9 5 9 5-3 5-9 5-9-5-9-5z" className="fill-none stroke-current" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.5" className="fill-current" />
        <path d="M4 20L20 4" className="stroke-[#d96c6c]" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M4 7h10M4 17h10M14 4l6 6-6 6M10 4L4 10l6 6" className="fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
