const PLAN_ROWS = [
  ['VM inspection, ...', 'Jin, Chao', '06/21/2026', '06/21/2026', '', 'Audit', 'C', '00001...', 'IMD', '1', '0', 'HSQE'],
  ['Deck, Engine & ...', 'Jin, Chao', '07/27/2026', '', '', '', 'P...', '00000...', 'CAR', '', '', 'HSQE'],
  ['Training - GMDSS', '', '07/25/2026', '08/01/2026', '08/08/2026', 'Compliance...', 'S', '', 'CI(I...', '', '', 'DRTR'],
  ['Compliance SP ...', 'Jin, Chao', '08/03/2026', '', '08/03/2026', '', 'C...', '00001...', 'CAR', '', '', 'HSQE'],
  ['GNSS failure, ja...', '', '07/14/2026', '08/14/2026', '', 'Emergen...', 'S', '', 'CI(I...', '', '', 'DK'],
  ['Health - Safety ...', '', '08/18/2026', '', '', 'Complian...', '', '', 'CI(I...', '', '', 'HSQE'],
]

const JOB_TYPES = [
  'Audit',
  'Inspection/Meeting/Drill',
  'Compliance Job',
  'Internal Inspection',
  'Vetting Document',
  'CARs',
]

const JOB_STATUS = [
  'Created (C)',
  'Completed (CP)',
  'Reschedule Submitted',
  'Scheduled (S)',
  'Re-Open (RO)',
  'Approved (APPR)',
]

export default function CompliancePlanWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#c7def0] bg-[linear-gradient(180deg,#f8fcff_0%,#edf5fb_100%)] shadow-[0_28px_60px_rgba(37,90,138,0.22)]">
      <TitleBar onMinimize={onMinimize} onClose={onClose} preview={preview} />

      <div className="min-h-0 flex-1 overflow-auto p-[16px]">
        <div className="min-h-[930px] min-w-[1260px] overflow-hidden rounded-[24px] border border-[#d8e7f3] bg-white shadow-[0_16px_34px_rgba(66,114,154,0.08)]">
          <PeriodRow />
          <FiltersGrid />
          <OptionsRow />
          <ResultsTable />
        </div>
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
      <span className="ml-[12px] text-[22px] font-bold text-ns-navy">Compliance Time Plan - Seaspan Benefactor</span>
      <span className="ml-[12px] text-[13px] font-semibold text-[#738daa]">Last Calc: August 27, 2026</span>
      <div className="ml-auto flex items-center gap-[10px]">
        <WindowButton label="Minimize" onClick={preview ? undefined : onMinimize}>
          <svg viewBox="0 0 20 12" className="h-[14px] w-[18px] stroke-current" strokeWidth="2.6">
            <line x1="3" y1="9" x2="17" y2="9" />
          </svg>
        </WindowButton>
        <WindowButton label="Maximize">
          <svg viewBox="0 0 16 16" className="h-[15px] w-[15px] fill-none stroke-current" strokeWidth="1.8">
            <rect x="2" y="4" width="12" height="9" />
            <line x1="2" y1="6.5" x2="14" y2="6.5" />
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

function PeriodRow() {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-[18px] border-b border-[#e6eef4] px-[18px] py-[16px]">
      <FilterField label="Period" value="One Year" chevron />
      <FilterField label="Start Date" value="08/27/2026" calendar />
      <FilterField label="End Date" value="08/27/2027" calendar />
    </div>
  )
}

function FiltersGrid() {
  return (
    <div className="grid grid-cols-3 gap-[18px] border-b border-[#e6eef4] px-[18px] py-[16px]">
      <div className="space-y-[12px]">
        <FilterField label="Departments" />
        <FilterField label="Doc Owner(User)" value="-- Select --" chevron />
        <FilterField label="Doc Owner(Role)" value="-- Select --" chevron />
      </div>
      <div className="space-y-[12px]">
        <FilterField label="Audit Category" all chevron />
        <FilterField label="IMD Category" all chevron />
        <FilterField label="CAR Category" all chevron />
      </div>
      <div className="space-y-[12px]">
        <FilterField label="Questionnaire" value="-- Select --" chevron />
        <FilterField label="Inspector" value="-- Select --" chevron />
        <FilterField label="Compliance Hierarchy" value="-- Select --" chevron />
      </div>
    </div>
  )
}

function OptionsRow() {
  return (
    <div className="grid grid-cols-[1.1fr_0.9fr] gap-[18px] border-b border-[#e6eef4] px-[18px] py-[16px]">
      <OptionCard title="Jobs to be included" items={JOB_TYPES} />
      <OptionCard title="Job Status" items={JOB_STATUS} />
    </div>
  )
}

function OptionCard({ title, items }) {
  return (
    <div className="rounded-[18px] border border-[#d9e7f2] bg-white p-[16px] shadow-[0_10px_24px_rgba(66,114,154,0.08)]">
      <div className="mb-[12px] text-[18px] font-semibold text-ns-navy">{title}</div>
      <div className="grid grid-cols-3 gap-y-[14px]">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-[10px] text-[16px] text-[#45627e]">
            <Checkbox checked />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function ResultsTable() {
  const headers = ['','Job Title','Owner','Open Wi...','Schedul...','Close Wi...','Execute...','Category','...','Docu...','Type','No...','N...','Departm...']
  return (
    <div className="p-[18px]">
      <div className="overflow-hidden rounded-[18px] border border-[#d9e7f2]">
        <div className="grid grid-cols-[44px_2fr_1.1fr_1fr_1fr_1fr_1fr_1fr_44px_1fr_80px_60px_60px_1fr] bg-[linear-gradient(90deg,#173d68,#24548a)] text-white">
          {headers.map((header, index) => (
            <div key={`${header}-${index}`} className="border-r border-white/10 px-[8px] py-[12px] text-[13px] font-semibold">
              {header}
            </div>
          ))}
        </div>
        {PLAN_ROWS.map((row, rowIndex) => (
          <div
            key={`${row[0]}-${rowIndex}`}
            className={`grid grid-cols-[44px_2fr_1.1fr_1fr_1fr_1fr_1fr_1fr_44px_1fr_80px_60px_60px_1fr] border-t border-[#e7eef5] text-[15px] ${
              rowIndex === 0 ? 'bg-[#2f77ff] text-white' : 'bg-white text-[#355779]'
            }`}
          >
            <div className="flex items-center justify-center p-[8px]">
              <span className={`h-[18px] w-[18px] rounded-[5px] border ${rowIndex === 0 ? 'border-white/80 bg-white/10' : 'border-[#c7d6e0] bg-[#fbfdff]'}`} />
            </div>
            {row.map((cell, index) => (
              <div key={`${cell}-${index}`} className={`truncate border-r border-[#edf3f7] px-[8px] py-[12px] ${index === 7 ? 'bg-[#ff2f68] text-white' : ''}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Label({ children }) {
  return <span className="text-[18px] font-semibold text-ns-navy">{children === 'PBookmarks' ? 'Bookmarks:' : children}</span>
}

function SelectField({ value }) {
  return (
    <div className="flex h-[48px] min-w-0 flex-1 items-center justify-between rounded-[16px] border border-[#d7e4ed] bg-white px-[16px] text-[16px] text-[#728ba6]">
      <span>{value}</span>
      <Chevron />
    </div>
  )
}

function FilterField({ label, value = '', chevron = false, calendar = false, all = false }) {
  return (
    <div className="flex items-center gap-[12px]">
      <span className="w-[150px] shrink-0 text-right text-[16px] font-semibold text-[#45627e]">{label}:</span>
      <div className="flex min-w-0 flex-1 items-center rounded-[14px] border border-[#d9e7f2] bg-[#fbfdff] px-[14px] py-[9px] text-[16px] text-ns-navy">
        <span className={`min-w-0 flex-1 truncate ${value ? '' : 'text-transparent'}`}>{value || 'placeholder'}</span>
        {calendar ? <CalendarIcon /> : null}
        {chevron ? <Chevron /> : null}
      </div>
      {all ? (
        <label className="flex items-center gap-[8px] text-[16px] text-[#45627e]">
          <Checkbox checked />
          <span>All</span>
        </label>
      ) : null}
    </div>
  )
}

function Checkbox({ checked = false }) {
  return (
    <span className={`flex h-[22px] w-[22px] items-center justify-center rounded-[6px] border ${
      checked ? 'border-[#3d8fe6] bg-[#3d8fe6]' : 'border-[#c7d6e0] bg-[#fbfdff]'
    }`}>
      {checked ? (
        <svg viewBox="0 0 16 16" className="h-[12px] w-[12px] fill-none stroke-white" strokeWidth="2.4">
          <polyline points="3,8 6.5,11.5 13,4.5" />
        </svg>
      ) : null}
    </span>
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

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px] fill-current">
      <path d="M3 6h6l2 2h10v2H9l-3 8H3V6zm5 5h13l-2.5 7H5.5L8 11z" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px] fill-current">
      <path d="M12 4a8 8 0 018 8h-2.5A5.5 5.5 0 1012 17.5v2.5a8 8 0 110-16z" />
      <path d="M12 1l4 3.5L12 8V1z" />
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

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 text-white">
      <circle cx="12" cy="12" r="9" className="fill-none stroke-current" strokeWidth="2.6" />
      <circle cx="12" cy="12" r="4" className="fill-current" />
    </svg>
  )
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-none stroke-ns-navy" strokeWidth="2.4">
      <polyline points="6,9 12,15 18,9" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-ns-navy">
      <path d="M3 5h18v16H3V5zm2 5v9h14v-9H5zM7 2v4H5V2h2zm12 0v4h-2V2h2z" />
    </svg>
  )
}
