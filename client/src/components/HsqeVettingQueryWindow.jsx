const TOP_COLUMNS = [
  { label: '', width: 28 },
  { label: '', width: 28 },
  { label: 'Inspection No.', width: 180 },
  { label: 'Vetting Type', width: 170 },
  { label: 'Inspection Date', width: 190 },
  { label: 'Title', width: 240 },
]

const MID_COLUMNS = [
  { label: 'Fi...', width: 42 },
  { label: 'Fi...', width: 42 },
  { label: 'Title', width: 92 },
  { label: 'S...', width: 48 },
  { label: 'Findi...', width: 70 },
  { label: 'Que...', width: 72 },
  { label: 'Ques...', width: 78 },
  { label: 'R...', width: 52 },
  { label: '...', width: 40 },
]

const BOTTOM_COLUMNS = [
  { label: 'Number', width: 110 },
  { label: 'Title', width: 110 },
  { label: 'Type', width: 92 },
  { label: 'Status', width: 110 },
  { label: 'Description', width: 180 },
]

const SEARCH_SECTIONS = [
  {
    title: 'Vetting Document',
    fields: [
      { label: 'Ship', value: 'SBEN', chevron: true },
      { label: 'Document No.' },
    ],
  },
  {
    title: 'Vetting',
    fields: [
      { label: 'Status', chevron: true },
      { label: 'Inspecting Party', value: '-- Select --', muted: true, chevron: true },
      { label: 'Inspector', value: '-- Select --', muted: true, chevron: true },
      { label: 'Questionnaire', value: '-- Select --', muted: true, chevron: true },
      { label: 'Port', value: '-- Select --', muted: true, chevron: true },
      { label: 'Type of Vetting', value: '-- Select --', muted: true, chevron: true },
    ],
  },
  {
    title: 'Miscellaneous',
    fields: [
      { label: "I'm the approver", checkbox: true },
      { label: 'Invoice Paid', checkbox: true },
      { label: 'To be Re-scheduled', checkbox: true },
      { label: 'Rescheduled', checkbox: true },
      { label: 'Scheduled/Un-scheduled', chevron: true },
      { label: 'Inspection Date', value: '-- Select --', muted: true, chevron: true },
      { label: 'SIRE Report #:' },
      { label: 'LOB Company', value: '-- Select --', muted: true, chevron: true },
      { label: 'Doc Owner(User)', value: '-- Select --', muted: true, chevron: true },
      { label: 'Doc Owner(Role)', value: '-- Select --', muted: true, chevron: true },
      { label: 'Ship Team', value: '-- Select --', muted: true, chevron: true },
      { label: 'No. of CARs', value: '-- Select --', muted: true, chevron: true },
      { label: 'No. of Findings', value: '-- Select --', muted: true, chevron: true },
      { label: 'Ext. Inspector Company', value: '-- Select --', muted: true, chevron: true },
      { label: 'Vetting Outcome', value: '-- Select --', muted: true, chevron: true },
      { label: 'Location', chevron: true },
    ],
  },
]

export default function HsqeVettingQueryWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#c7def0] bg-[linear-gradient(180deg,#f8fcff_0%,#edf5fb_100%)] shadow-[0_28px_60px_rgba(37,90,138,0.22)]">
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
    <div className="flex h-[62px] shrink-0 items-center border-b border-[#d8e7f3] bg-[linear-gradient(90deg,#f7fbff_0%,#eef7ff_52%,#fdfcff_100%)] px-[18px]">
      <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#5ab6ff,#6a7dff)] shadow-[0_12px_20px_rgba(90,182,255,0.28)]">
        <TargetIcon />
      </div>
      <span className="ml-[12px] text-[22px] font-bold text-ns-navy">Vetting Query</span>
      <div className="ml-auto flex items-center gap-[10px]">
        <button
          type="button"
          aria-label="Minimize"
          onClick={preview ? undefined : onMinimize}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-white/80 text-ns-navy shadow-[0_8px_18px_rgba(64,111,156,0.12)] transition hover:bg-white focus:outline-none"
        >
          <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] stroke-current" strokeWidth="2.6">
            <line x1="3" y1="11" x2="13" y2="11" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Maximize"
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-white/80 text-ns-navy shadow-[0_8px_18px_rgba(64,111,156,0.12)] transition hover:bg-white focus:outline-none"
        >
          <svg viewBox="0 0 16 16" className="h-[15px] w-[15px] fill-none stroke-current" strokeWidth="1.8">
            <rect x="2" y="4" width="12" height="9" />
            <line x1="2" y1="6.5" x2="14" y2="6.5" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Close"
          onClick={preview ? undefined : onClose}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-[#234770] text-white shadow-[0_10px_18px_rgba(35,71,112,0.28)] transition hover:bg-[#1d3c60] focus:outline-none"
        >
          <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] stroke-current" strokeWidth="2">
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </svg>
        </button>
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
      <GridSection columns={TOP_COLUMNS} flex={1.2} />
      <GridSection columns={MID_COLUMNS} flex={0.45} topBorder />
      <GridSection columns={BOTTOM_COLUMNS} flex={0.38} topBorder />
    </div>
  )
}

function GridSection({ columns, flex, topBorder = false }) {
  return (
    <div className={`flex min-h-0 flex-col ${topBorder ? 'border-t border-[#e6eef4]' : ''}`} style={{ flex }}>
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
        <div className="absolute bottom-[10px] left-[34px] h-[4px] w-[84px] rounded-full bg-[#7c7c7c]" />
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
      className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[12px] text-ns-navy transition hover:bg-[#eef6fb] focus:outline-none"
    >
      {children}
    </button>
  )
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 text-white">
      <circle cx="12" cy="12" r="10" className="fill-none stroke-current" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" className="fill-current" />
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
