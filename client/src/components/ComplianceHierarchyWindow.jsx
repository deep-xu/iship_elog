const TREE = [
  {
    label: 'Audit',
    children: [
      '24h-ShipSafetyInspection',
      'External - ISM/ISO 9K 14K 45K',
      'External - MLC',
      'External - Navigation',
      'External - PSC',
      'External - VECP',
      {
        label: 'Internal',
        children: ['IHM', 'ISM / MLC / ISO 9K 14K 45K', 'Navigation', 'PMS'],
      },
      {
        label: "Master's Review",
        children: ['SMS', 'SOPEP'],
      },
    ],
  },
  {
    label: 'Inspection/Meeting/Drill',
    children: [
      {
        label: 'Drill',
        children: [
          'Abandonship',
          'Breakaway from Jetty/LNGBV',
          'Cyber Security',
          'Emergency Assistance.SAR / Serious Injury.Illness.MEDEVAC',
          'Emergency Notification to OneSea',
          'Emergency Steering',
          'Emergency Towing',
          'Enclosed Space Entry',
          'Fire',
          'Free-Fall Lifeboat Launching',
        ],
      },
    ],
  },
]

export default function ComplianceHierarchyWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#c7def0] bg-[linear-gradient(180deg,#f8fcff_0%,#edf5fb_100%)] shadow-[0_28px_60px_rgba(37,90,138,0.22)]">
      <TitleBar onMinimize={onMinimize} onClose={onClose} preview={preview} title="Compliance Hierarchy" />

      <div className="min-h-0 flex-1 overflow-auto p-[16px]">
        <div className="min-h-[880px] rounded-[24px] border border-[#d8e7f3] bg-white shadow-[0_16px_34px_rgba(66,114,154,0.08)]">
          <div className="border-b border-[#e6eef4] px-[18px] py-[14px]">
            <div className="flex items-center gap-[10px] rounded-full border border-[#dbe7ef] bg-[#f8fbfe] px-[14px] py-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
              <SearchIcon />
              <span className="text-[16px] text-[#6d87a4]">Search...</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-[#e6eef4] px-[18px] py-[10px] text-[13px] font-semibold uppercase tracking-[0.16em] text-[#8aa2ba]">
            <span>Library</span>
            <div className="flex items-center gap-[12px]">
              <TreeActionIcon />
              <TreeActionIcon reverse />
            </div>
          </div>

          <div className="max-h-[700px] overflow-auto px-[18px] py-[12px]">
            <div className="space-y-[8px]">
              <TreeNode label="Library" children={TREE} defaultOpen depth={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TitleBar({ onMinimize, onClose, preview, title }) {
  return (
    <div className="flex h-[62px] shrink-0 items-center border-b border-[#d8e7f3] bg-[linear-gradient(90deg,#f7fbff_0%,#eef7ff_52%,#fdfcff_100%)] px-[18px]">
      <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#5ab6ff,#6a7dff)] shadow-[0_12px_20px_rgba(90,182,255,0.28)]">
        <TargetIcon />
      </div>
      <span className="ml-[12px] text-[22px] font-bold text-ns-navy">{title}</span>
      <div className="ml-auto flex items-center gap-[10px]">
        <WindowButton label="Minimize" onClick={preview ? undefined : onMinimize}>
          <svg viewBox="0 0 20 12" className="h-[14px] w-[18px] stroke-current" strokeWidth="2.6">
            <line x1="3" y1="9" x2="17" y2="9" />
          </svg>
        </WindowButton>
        <WindowButton danger label="Close" onClick={preview ? undefined : onClose}>
          <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] stroke-current" strokeWidth="2">
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </svg>
        </WindowButton>
      </div>
    </div>
  )
}

function WindowButton({ children, label, onClick, danger = false }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-[34px] w-[34px] items-center justify-center rounded-[12px] transition focus:outline-none ${
        danger
          ? 'bg-[#234770] text-white shadow-[0_10px_18px_rgba(35,71,112,0.28)] hover:bg-[#1d3c60]'
          : 'bg-white/80 text-ns-navy shadow-[0_8px_18px_rgba(64,111,156,0.12)] hover:bg-white'
      }`}
    >
      {children}
    </button>
  )
}

function MenuRow({ items }) {
  return (
    <div className="flex h-[42px] shrink-0 items-center gap-[24px] border-b border-[#e5eef5] bg-white/88 px-[18px]">
      {items.map((label) => (
        <button key={label} type="button" className="text-[16px] text-ns-navy underline underline-offset-[2px] focus:outline-none">
          {label}
        </button>
      ))}
    </div>
  )
}

function ToolbarRow() {
  return (
    <div className="flex h-[62px] shrink-0 items-center gap-[14px] border-b border-[#e5eef5] bg-white/92 px-[18px]">
      <ToolButton label="Open">
        <FolderIcon />
      </ToolButton>
      <ToolButton label="Help" warm>
        <QuestionIcon />
      </ToolButton>
    </div>
  )
}

function ToolButton({ children, label, warm = false }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`flex h-[40px] w-[40px] items-center justify-center rounded-[12px] shadow-[0_8px_18px_rgba(64,111,156,0.12)] ${
        warm ? 'bg-[#fff4e9] text-[#cc8a2d]' : 'bg-[#eef6ff] text-ns-navy'
      }`}
    >
      {children}
    </button>
  )
}

function TreeNode({ label, children = [], defaultOpen = false, depth = 0 }) {
  const items = Array.isArray(children) ? children : []
  const hasChildren = items.length > 0

  return (
    <div style={{ marginLeft: depth * 28 }}>
      <div className="flex items-center gap-[10px] py-[4px] text-[16px] text-ns-navy">
        <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border text-[12px] font-bold ${hasChildren ? 'border-[#b9cee0] bg-[#eef6ff] text-[#5d7da0]' : 'border-transparent bg-transparent text-transparent'}`}>
          {hasChildren ? '−' : '·'}
        </span>
        <span className={depth === 0 ? 'rounded-[8px] bg-[#4aa0e0] px-[8px] py-[2px] font-semibold text-white' : 'font-medium'}>
          {label}
        </span>
      </div>
      {defaultOpen && hasChildren ? (
        <div className="ml-[9px] border-l border-dotted border-[#f2b9bf] pl-[24px]">
          {items.map((item) =>
            typeof item === 'string' ? (
              <div key={item} className="py-[5px] text-[15px] text-[#446688]">
                {item}
              </div>
            ) : (
              <TreeNode
                key={item.label}
                label={item.label}
                children={item.children}
                defaultOpen
                depth={depth + 1}
              />
            ),
          )}
        </div>
      ) : null}
    </div>
  )
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 text-white">
      <circle cx="12" cy="12" r="9" className="fill-none stroke-current" strokeWidth="2.6" />
      <circle cx="12" cy="12" r="4" className="fill-current" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px] fill-current">
      <path d="M3 6h6l2 2h10v2H9l-3 8H3V6zm5 5h13l-2.5 7H5.5L8 11z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-[#7d95ad]">
      <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
      <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function QuestionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px] text-current">
      <circle cx="12" cy="12" r="10" className="fill-current" />
      <text x="12" y="17" textAnchor="middle" className="fill-white" style={{ fontSize: '13px', fontWeight: 700 }}>
        ?
      </text>
    </svg>
  )
}

function TreeActionIcon({ reverse = false }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-[18px] w-[18px] text-[#59789c] ${reverse ? 'rotate-180' : ''}`}>
      <path d="M6 5h8v4H6zM10 9v10M14 14h4M16 12l2 2-2 2" className="fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
