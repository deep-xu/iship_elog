const TOP_COLUMNS = [
  { label: '', width: 28 },
  { label: '', width: 28 },
  { label: 'Questi...', width: 96 },
  { label: 'Inspectio...', width: 110 },
  { label: 'Date Ti...', width: 98 },
  { label: 'Status', width: 96 },
  { label: 'Y', width: 44 },
  { label: 'N', width: 44 },
  { label: 'NS', width: 50 },
  { label: 'NA', width: 50 },
  { label: 'CAR', width: 56 },
  { label: 'Inspector', width: 110 },
  { label: 'Master', width: 96 },
  { label: 'Chief E...', width: 110 },
]

const SEARCH_SECTIONS = [
  {
    title: 'Internal Inspection Document',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Document No.' },
    ],
  },
  {
    title: 'Internal Inspection',
    fields: [
      { label: 'Status', chevron: true },
      { label: 'Inspector', value: '-- Select --', muted: true, chevron: true },
      { label: 'Port', value: '-- Select --', muted: true, chevron: true },
      { label: 'Questionnaire', value: '-- Select --', muted: true, chevron: true },
      { label: 'Inspection Date', value: '-- Select --', muted: true, chevron: true },
      { label: 'CARs Attached', checkbox: true },
    ],
  },
]

export default function HsqeInternalInspectionsQueryWindow({
  onMinimize,
  onClose,
  preview = false,
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#d8e5ee] bg-[linear-gradient(180deg,#f8fbfd_0%,#eef4f9_100%)] shadow-[0_22px_58px_rgba(68,101,129,0.12)]">
      <TitleBar onMinimize={onMinimize} onClose={onClose} preview={preview} />

      <div className="flex min-h-0 flex-1 flex-col">
        <SearchPanel />
        <ResultsPane />
      </div>
    </div>
  )
}

function TitleBar({ onMinimize, onClose, preview }) {
  return (
    <div className="flex h-[40px] shrink-0 items-center border-b border-[#e5edf4] bg-white/92 pl-[14px] backdrop-blur-sm">
      <TargetIcon />
      <span className="ml-[9px] text-[16px] font-semibold text-ns-navy">
        Internal Inspections Query
      </span>
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
          aria-label="Maximize"
          className="flex h-[24px] w-[24px] items-center justify-center focus:outline-none"
        >
          <svg viewBox="0 0 16 16" className="h-[15px] w-[15px] fill-none stroke-ns-navy" strokeWidth="1.8">
            <rect x="2" y="4" width="12" height="9" />
            <line x1="2" y1="6.5" x2="14" y2="6.5" />
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
  )
}

function MenuRow() {
  return (
    <div className="flex h-[30px] shrink-0 items-center gap-[24px] border-b border-[#e8eff4] bg-white/88 pl-[18px]">
      {['File', 'Tag', 'View', 'Help'].map((label) => (
        <button key={label} type="button" className="text-[16px] text-ns-navy focus:outline-none">
          <span className="underline">{label[0]}</span>
          {label.slice(1)}
        </button>
      ))}
    </div>
  )
}

function ToolbarRow() {
  return (
    <div className="flex h-[54px] shrink-0 items-center gap-[12px] border-b border-[#e8eff4] bg-white/88 px-[16px]">
      <ToolButton label="Open">
        <FolderIcon />
      </ToolButton>
      <ToolButton label="Print">
        <PrintIcon />
      </ToolButton>
      <ToolButton label="Archive">
        <ArchiveIcon />
      </ToolButton>
      <ToolButton label="Find">
        <FindIcon />
      </ToolButton>
      <ToolButton label="Refresh">
        <RefreshIcon />
      </ToolButton>
      <ToolButton label="Grid">
        <GridIcon />
      </ToolButton>

      <span className="h-[26px] w-px bg-neutral-300" />

      <ToolButton label="Help">
        <QuestionIcon />
      </ToolButton>

      <div className="ml-auto flex h-[38px] w-[300px] items-center gap-[8px] rounded-full border border-[#dbe7ef] bg-[#f8fbfe] px-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
        <FindSmallIcon />
        <span className="text-[12px] text-ns-navy">▾</span>
        <input
          type="text"
          placeholder="Search..."
          className="min-w-0 flex-1 bg-transparent text-[14px] text-ns-navy placeholder:text-[#8ba0b2] focus:outline-none"
        />
      </div>
    </div>
  )
}

function SearchPanel() {
  return (
    <div className="flex min-h-0 shrink-0 flex-col border-b border-[#dfe8ef] bg-[linear-gradient(180deg,#f6fbff_0%,#edf5fb_100%)]" style={{ flexBasis: '58%' }}>
      <div className="flex h-[48px] shrink-0 items-end border-b border-[#e6eef4] px-[16px] pb-[8px] pt-[8px]">
        <div className="mx-[4px] flex-1 rounded-full bg-[#f0f5f9] px-[14px] py-[8px] text-center text-[14px] font-semibold text-[#86a0b5]">
          Bookmarks
        </div>
        <div className="mx-[4px] flex-1 rounded-full bg-white px-[14px] py-[8px] text-center text-[14px] font-semibold text-ns-blue shadow-[0_8px_20px_rgba(124,155,181,0.12)]">
          Search
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-[12px] py-[10px]">
        {SEARCH_SECTIONS.map((section) => (
          <div key={section.title} className="mb-[12px] overflow-hidden rounded-[20px] border border-[#d9e7f2] bg-white shadow-[0_16px_30px_rgba(84,116,145,0.08)]">
            <div className="flex items-center bg-[linear-gradient(90deg,#edf7ff,#fff7fc)] px-[16px] py-[12px] text-[14px] font-semibold tracking-[0.01em] text-ns-navy">
              <span className="flex-1">{section.title}</span>
              <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-ns-navy" strokeWidth="2.4">
                <polyline points="5,14 12,7 19,14" />
              </svg>
            </div>
            {section.fields.map((field) => (
              <QueryField key={field.label} field={field} />
            ))}
          </div>
        ))}
      </div>

      <div className="flex h-[68px] shrink-0 items-center border-t border-[#e6eef4] bg-white/96 px-[18px]">
        <button
          type="button"
          className="rounded-full border border-[#dce9f1] bg-[#eef7fd] px-[16px] py-[8px] text-[13px] font-semibold text-ns-blue focus:outline-none"
        >
          Save
        </button>
        <div className="ml-auto flex gap-[8px]">
          <button
            type="button"
            className="rounded-full border border-[#d8e5ed] bg-white px-[18px] py-[8px] text-[13px] font-semibold text-ns-navy focus:outline-none"
          >
            Reset
          </button>
          <button
            type="button"
            className="rounded-full bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[20px] py-[8px] text-[13px] font-semibold text-white shadow-[0_12px_24px_rgba(46,139,207,0.2)] focus:outline-none"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

function ResultsPane() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white/96">
      <GridSection columns={TOP_COLUMNS} />
    </div>
  )
}

function GridSection({ columns }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="overflow-x-auto border-b border-[#e6eef4] bg-[#f7fbfe]">
        <div
          className="flex bg-[linear-gradient(90deg,#dcecff,#e7f1fb)] text-ns-navy"
          style={{ minWidth: columns.reduce((sum, c) => sum + c.width, 0) }}
        >
          {columns.map((col, i) => (
            <div
              key={`${col.label}-${i}`}
              style={{ width: col.width }}
              className="flex h-[42px] shrink-0 items-center justify-center border-r border-white/50 px-[6px] text-[11px] font-semibold uppercase tracking-[0.08em]"
            >
              {col.label}
            </div>
          ))}
          <div className="flex h-[42px] flex-1 items-center justify-end pr-[8px]">
            <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-ns-navy" strokeWidth="2.4">
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </div>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 bg-white">
        <div className="absolute bottom-[12px] right-[4px] top-[8px] w-[6px] rounded-full bg-[#e5e5e5]" />
      </div>
    </div>
  )
}

function QueryField({ field }) {
  return (
    <div className="flex items-center gap-[10px] border-b border-[#edf3f7] bg-white px-[16px] py-[8px] text-[13px] text-ns-navy last:border-b-0">
      <span className="w-[42%] shrink-0 text-right font-semibold text-[#45627e]">{field.label}:</span>
      {field.checkbox ? (
        <span className="h-[18px] w-[18px] shrink-0 rounded-[5px] border border-[#c7d6e0] bg-[#fbfdff] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />
      ) : (
        <span className="flex min-w-0 flex-1 items-center rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] py-[7px] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
          <span className={`min-w-0 flex-1 truncate ${field.muted ? 'text-neutral-500' : ''}`}>
            {field.value ?? ''}
          </span>
          {field.chevron && (
            <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0 fill-none stroke-ns-navy" strokeWidth="2.4">
              <polyline points="6,9 12,15 18,9" />
            </svg>
          )}
        </span>
      )}
    </div>
  )
}

function ToolButton({ label, children }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] text-ns-navy transition hover:bg-[#eef6fb] focus:outline-none"
    >
      {children}
    </button>
  )
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0">
      <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-navy" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" className="fill-ns-navy" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M2 5h7l2 2h5v2H8L5 19H2V5zm5.5 6H22l-3 8H4.5l3-8z" />
    </svg>
  )
}

function PrintIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M7 3h10v4H7V3zM4 8h16v8h-3v5H7v-5H4V8zm5 8v3h6v-3H9z" />
    </svg>
  )
}

function ArchiveIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M2 4h20v5H2V4zm1.5 6.5h17V21h-17V10.5zM8.5 13h7v2h-7v-2z" />
    </svg>
  )
}

function FindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="10" cy="10" r="7" className="fill-none stroke-current" strokeWidth="2.4" />
      <line x1="15.5" y1="15.5" x2="22" y2="22" className="stroke-current" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  )
}

function FindSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 text-ns-navy">
      <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
      <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M12 4a8 8 0 018 8h-2.5A5.5 5.5 0 1012 17.5v2.5a8 8 0 110-16z" />
      <path d="M12 1l4 3.5L12 8V1z" />
      <path d="M12 23l-4-3.5L12 16v7z" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M4 4h16v16H4V4z" className="fill-none stroke-current" strokeWidth="1.8" />
      <path d="M4 10h16M4 16h16M10 4v16M16 4v16" className="stroke-current" strokeWidth="1.4" />
    </svg>
  )
}

function QuestionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="12" cy="12" r="10" className="fill-current" />
      <text x="12" y="17" textAnchor="middle" className="fill-white" style={{ fontSize: '13px', fontWeight: 700 }}>
        ?
      </text>
    </svg>
  )
}
