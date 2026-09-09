// Shared window chrome, extracted from WorkOrderWindow so every MDI window
// lands on the same frame, palette and spacing.

export function WindowFrame({ children }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      {children}
    </div>
  )
}

export function TitleBar({ title, onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-[62px] shrink-0 items-center border-b border-[#e1ecf2] bg-white pl-[20px]">
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
        <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
      </svg>
      <span className="ml-[10px] truncate font-heading text-[18px] font-bold text-ns-navy">{title}</span>
      <div className="ml-auto flex items-center gap-[10px] pr-[14px]">
        <button
          type="button"
          aria-label="Minimize"
          onClick={preview ? undefined : onMinimize}
          className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[#8aa0b4] transition hover:bg-[#eef6fb] hover:text-ns-navy focus:outline-none"
        >
          <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-current" strokeWidth="1.9">
            <line x1="3" y1="11" x2="13" y2="11" />
          </svg>
        </button>
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
  )
}

// Window menu bar and icon toolbar removed globally per design direction.
export function MenuBar() {
  return null
}

export function Toolbar() {
  return null
}

export function ToolIcon({ label, muted = false, children }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px] transition focus:outline-none ${
        muted ? 'text-[#a9bccd]' : 'text-ns-navy hover:bg-[#eef6fb]'
      }`}
    >
      <span className="h-[20px] w-[20px]">{children}</span>
    </button>
  )
}

export function ToolDivider() {
  return <span className="mx-[6px] h-[22px] w-px shrink-0 bg-[#e4edf3]" />
}

export function WindowBody({ children }) {
  return (
    <div className="min-h-0 flex-1 overflow-auto bg-[#eef5fa] p-[14px]">
      <div className="min-h-full overflow-hidden rounded-[24px] border border-[#dce8ef] bg-white shadow-[0_16px_38px_rgba(84,116,145,0.08)]">
        {children}
      </div>
    </div>
  )
}

export function WorkflowStepper({ caption = 'Workflow Status', subtitle, stages, currentIndex }) {
  return (
    <div className="border-b border-[#e4edf3] bg-[linear-gradient(180deg,#fbfdff_0%,#f4f9fc_100%)] px-[18px] py-[16px]">
      <div className="rounded-[22px] border border-[#e2edf5] bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] px-[20px] py-[16px] shadow-[0_10px_24px_rgba(84,116,145,0.06)]">
        <div className="mb-[10px] flex items-center justify-between gap-[12px]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#88a2bb]">{caption}</div>
            {subtitle ? (
              <div className="mt-[4px] text-[15px] font-semibold text-ns-navy">{subtitle}</div>
            ) : null}
          </div>
          <div className="shrink-0 rounded-full border border-[#d8e8f2] bg-white px-[14px] py-[7px] text-[12px] font-semibold text-[#4a6a86]">
            Current: {stages[currentIndex]}
          </div>
        </div>

        <div className="flex items-center">
          {stages.map((stage, index) => (
            <Step
              key={stage}
              label={stage}
              index={index}
              currentIndex={currentIndex}
              isLast={index === stages.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Step({ label, index, currentIndex, isLast }) {
  const active = index === currentIndex
  const complete = index < currentIndex

  return (
    <div className="flex min-w-0 flex-1 items-center">
      <div
        className={`flex min-w-0 flex-1 items-center gap-[12px] rounded-[18px] border px-[16px] py-[14px] transition ${
          active
            ? 'border-[#7ec0ee] bg-[linear-gradient(135deg,#2d86ca,#56ace4)] text-white shadow-[0_16px_30px_rgba(46,139,207,0.24)]'
            : complete
              ? 'border-[#cfe4f0] bg-[#edf7f1] text-[#23415d]'
              : 'border-[#dce8ef] bg-white text-[#6e86a0]'
        }`}
      >
        <span
          className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
            active
              ? 'bg-white/20 text-white'
              : complete
                ? 'bg-[#2f9d69] text-white'
                : 'border border-[#d6e3ec] bg-[#f7fbfe] text-[#7d95ad]'
          }`}
        >
          {complete ? '✓' : index + 1}
        </span>
        <div className="min-w-0">
          <div
            className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
              active ? 'text-white/75' : complete ? 'text-[#4f7b69]' : 'text-[#8aa1b6]'
            }`}
          >
            Step {index + 1}
          </div>
          <div className="truncate text-[16px] font-semibold">{label}</div>
        </div>
      </div>

      {!isLast ? (
        <div className="mx-[10px] flex w-[32px] shrink-0 items-center">
          <div className={`h-[4px] w-full rounded-full ${complete ? 'bg-[#6bb98d]' : 'bg-[#dce8ef]'}`} />
        </div>
      ) : null}
    </div>
  )
}

export function SectionHeader({ badge, hint }) {
  return (
    <div className="mb-[14px] flex flex-wrap items-center gap-[10px]">
      <div className="rounded-full bg-[#eaf4fb] px-[12px] py-[5px] text-[11px] font-semibold uppercase tracking-[0.14em] text-ns-blue">
        {badge}
      </div>
      {hint ? <div className="text-[12px] text-[#7f96ab]">{hint}</div> : null}
    </div>
  )
}

export function SectionCard({ caption, children, className = '' }) {
  return (
    <div
      className={`rounded-[18px] border border-[#e4edf3] bg-white px-[16px] py-[14px] shadow-[0_8px_18px_rgba(84,116,145,0.05)] ${className}`}
    >
      {caption ? (
        <div className="mb-[12px] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#88a2bb]">
          {caption}
        </div>
      ) : null}
      <div className="space-y-[12px]">{children}</div>
    </div>
  )
}

export function Field({
  label,
  value = '',
  chevron = false,
  calendar = false,
  dotted = false,
  labelWidth = 112,
  align = 'right',
}) {
  return (
    <div className="flex min-w-0 items-center gap-[10px]">
      <span
        style={{ width: labelWidth }}
        className={`shrink-0 text-[13px] font-semibold text-[#5b7690] ${align === 'right' ? 'text-right' : ''}`}
      >
        {label}:
      </span>
      <span
        className={`flex min-h-[36px] min-w-0 flex-1 items-center rounded-full border bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ${
          dotted ? 'border-dashed border-[#ccd9e3]' : 'border-[#d7e5ed]'
        }`}
      >
        <span className="min-w-0 flex-1 truncate">{value}</span>
        {calendar ? <CalendarIcon /> : null}
        {chevron ? <Chevron /> : null}
      </span>
    </div>
  )
}

export function Checkbox({ label, checked = false }) {
  return (
    <span className="flex items-center gap-[8px] text-[13px] text-ns-navy">
      <span
        className={`flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[5px] border text-[11px] ${
          checked ? 'border-ns-blue bg-ns-blue text-white' : 'border-[#c7d6e0] bg-white'
        }`}
      >
        {checked ? '✓' : ''}
      </span>
      {label}
    </span>
  )
}

export function PillButton({ children, variant = 'primary', onClick }) {
  const styles =
    variant === 'primary'
      ? 'bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] text-white shadow-[0_14px_26px_rgba(46,139,207,0.24)]'
      : 'border border-[#d7e5ed] bg-white text-ns-navy'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-[16px] py-[8px] text-[13px] font-semibold transition focus:outline-none ${styles}`}
    >
      {children}
    </button>
  )
}

export function TabStrip({ tabs, active, onChange }) {
  return (
    <div className="flex items-stretch border-b border-[#e4edf3] bg-[#fbfdff]">
      <div className="flex min-w-0 flex-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab === active
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onChange(tab)}
              className={`shrink-0 border-r border-[#e7eff4] px-[18px] py-[12px] text-[13px] transition focus:outline-none ${
                isActive
                  ? 'bg-[linear-gradient(135deg,#2d86ca,#56ace4)] font-semibold text-white'
                  : 'text-[#5e7894] hover:bg-[#f4f9fc]'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function DataTable({ columns, rows = [], keys = [], emptyHeight = 'h-[260px]' }) {
  const minWidth = columns.every((col) => col.width)
    ? columns.reduce((sum, col) => sum + col.width, 0)
    : undefined

  return (
    <div className="overflow-x-auto rounded-[16px] border border-[#dce8ef]">
      <div style={{ minWidth }}>
        <div className="flex bg-ns-navy text-white">
          {columns.map((col, index) => (
            <div
              key={`${col.label}-${index}`}
              style={col.width ? { width: col.width } : undefined}
              className={`flex h-[42px] items-center justify-center border-r border-white/20 px-[10px] text-[13px] font-semibold ${
                col.width ? 'shrink-0' : 'flex-1'
              }`}
            >
              {col.label}
            </div>
          ))}
          {minWidth ? <div className="h-[42px] flex-1" /> : null}
        </div>

        {rows.length > 0 ? (
          rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex border-t border-[#e4edf3] text-[13px] text-ns-navy odd:bg-[#fbfdfe]">
              {columns.map((col, index) => (
                <div
                  key={`${col.label}-${index}`}
                  style={col.width ? { width: col.width } : undefined}
                  className={`truncate border-r border-[#eef4f8] px-[10px] py-[10px] ${
                    col.width ? 'shrink-0' : 'flex-1'
                  }`}
                >
                  {row[keys[index]] ?? ''}
                </div>
              ))}
              {minWidth ? <div className="flex-1" /> : null}
            </div>
          ))
        ) : (
          <div className={`${emptyHeight} bg-white`} />
        )}
      </div>
    </div>
  )
}

export function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-ns-navy">
      <path d="M3 5h18v16H3V5zm2 5v9h14v-9H5zM7 2v4H5V2h2zm12 0v4h-2V2h2z" />
    </svg>
  )
}

export function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0 fill-none stroke-ns-navy" strokeWidth="2.4">
      <polyline points="6,9 12,15 18,9" />
    </svg>
  )
}
