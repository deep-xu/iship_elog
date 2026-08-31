export default function ReportOptionWindow({
  title,
  onMinimize,
  onClose,
  preview = false,
  children,
  footer,
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#d7e5ee] bg-[linear-gradient(180deg,#f8fbfd_0%,#eff5fa_100%)] shadow-[0_22px_60px_rgba(68,101,129,0.12)]">
      <div className="flex h-[58px] shrink-0 items-center border-b border-[#e5edf4] bg-white/92 pl-[20px] backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
        </svg>
        <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">Report Option</span>
        <div className="ml-auto flex items-center gap-[10px] pr-[14px]">
          <WindowActionButton label="Minimize" onClick={preview ? undefined : onMinimize}>
            <line x1="3" y1="11" x2="13" y2="11" />
          </WindowActionButton>
          <WindowActionButton label="Close" onClick={preview ? undefined : onClose}>
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </WindowActionButton>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-[18px]">
        <div className="flex min-h-0 flex-1 flex-col rounded-[24px] border border-[#dce8ef] bg-white p-[24px] shadow-[0_14px_34px_rgba(84,116,145,0.08)]">
          <div className="mb-[18px] rounded-full bg-[#eaf4fb] px-[14px] py-[7px] text-[12px] font-semibold uppercase tracking-[0.12em] text-ns-blue w-fit">
            Reports
          </div>

          <div className="rounded-[18px] border border-[#dce8ef] bg-[#fbfdfe] px-[18px] py-[12px] text-center text-[20px] font-semibold text-[#45627e]">
            {title}
          </div>

          <div className="mt-[18px] flex min-h-0 flex-1 flex-col gap-[18px]">
            {children}
          </div>

          <div className="mt-[18px] flex items-center justify-center gap-[12px]">
            {footer ?? (
              <>
                <button
                  type="button"
                  className="min-w-[160px] rounded-full bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[26px] py-[10px] text-[14px] font-semibold text-white shadow-[0_12px_24px_rgba(46,139,207,0.2)] focus:outline-none"
                >
                  Ok
                </button>
                <button
                  type="button"
                  className="min-w-[160px] rounded-full border border-[#d7e5ed] bg-white px-[26px] py-[10px] text-[14px] font-semibold text-ns-navy focus:outline-none"
                >
                  Help
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ReportCard({ children, className = '' }) {
  return (
    <div className={`rounded-[22px] border border-[#dce8ef] bg-white px-[22px] py-[22px] ${className}`.trim()}>
      {children}
    </div>
  )
}

export function ReportContentStack({ children, className = '' }) {
  return (
    <div className={`mx-auto flex w-full max-w-[1040px] flex-col gap-[18px] ${className}`.trim()}>{children}</div>
  )
}

export function ReportOptionRow({ label, checked = false, children }) {
  return (
    <div className="flex flex-wrap items-center gap-[14px] rounded-[16px] border border-[#e8f0f5] bg-[#f8fbfe] px-[16px] py-[14px]">
      <Radio checked={checked} />
      <span className="text-[16px] font-medium text-[#45627e]">{label}</span>
      {children ? <div className="ml-auto flex min-w-[240px] flex-1 items-center gap-[12px]">{children}</div> : null}
    </div>
  )
}

export function ReportFileOptionRow({ checked = false, value = 'PDF (*.pdf)' }) {
  return (
    <ReportOptionRow label="File" checked={checked}>
      <span className="text-[15px] text-[#6f89a0]">As</span>
      <SelectPill value={value} />
    </ReportOptionRow>
  )
}

export function ReportScheduleOptionRow({ checked = false, buttonLabel = 'View Scheduled Tasks' }) {
  return (
    <ReportOptionRow label="Schedule" checked={checked}>
      <button
        type="button"
        className="rounded-full bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[18px] py-[10px] text-[13px] font-semibold text-white shadow-[0_10px_18px_rgba(46,139,207,0.18)] focus:outline-none"
      >
        {buttonLabel}
      </button>
    </ReportOptionRow>
  )
}

export function ReportFieldRow({ label, children, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-[14px] ${className}`.trim()}>
      <span className="w-[160px] text-right text-[15px] font-medium text-[#45627e]">{label}</span>
      <div className="min-w-[260px] flex-1">{children}</div>
    </div>
  )
}

export function SelectPill({ value = '', placeholder = '', className = '' }) {
  return (
    <div
      className={`flex min-h-[46px] w-full items-center rounded-full border border-[#d7e5ed] bg-white px-[16px] text-[15px] text-ns-navy ${className}`.trim()}
    >
      <span className={`flex-1 ${value ? '' : 'text-[#8ea4b7]'}`}>{value || placeholder}</span>
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-current" strokeWidth="2.6">
        <polyline points="6,9 12,15 18,9" />
      </svg>
    </div>
  )
}

export function InputPill({ value = '', placeholder = '', className = '' }) {
  return (
    <div
      className={`flex min-h-[46px] w-full items-center rounded-full border border-[#d7e5ed] bg-white px-[16px] text-[15px] ${value ? 'text-ns-navy' : 'text-[#8ea4b7]'} ${className}`.trim()}
    >
      {value || placeholder || '\u00a0'}
    </div>
  )
}

export function DatePill({ value = '', className = '' }) {
  return (
    <div
      className={`flex min-h-[46px] w-full items-center rounded-full border border-[#d7e5ed] bg-white px-[16px] text-[15px] text-ns-navy ${className}`.trim()}
    >
      <span className="flex-1">{value}</span>
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="1.8">
        <rect x="4" y="5.5" width="16" height="14" rx="1.2" />
        <line x1="4" y1="9.5" x2="20" y2="9.5" />
        <line x1="8" y1="3.5" x2="8" y2="7.5" />
        <line x1="16" y1="3.5" x2="16" y2="7.5" />
      </svg>
    </div>
  )
}

export function CheckboxPill({ label, checked = false, disabled = false }) {
  return (
    <label className={`flex items-center gap-[10px] text-[15px] font-medium text-[#45627e] ${disabled ? 'opacity-70' : ''}`}>
      <span className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[6px] border border-[#c8d7e3] ${checked ? 'bg-[#3b8fcb]' : 'bg-white'}`}>
        {checked ? (
          <svg viewBox="0 0 16 16" className="h-[12px] w-[12px] stroke-white" strokeWidth="2.2" fill="none">
            <polyline points="3.5,8.5 6.5,11.5 12.5,4.5" />
          </svg>
        ) : null}
      </span>
      <span>{label}</span>
    </label>
  )
}

function Radio({ checked = false }) {
  return (
    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 border-[#9eb3c7] bg-white">
      {checked ? <span className="h-[10px] w-[10px] rounded-full bg-[#3b8fcb]" /> : null}
    </span>
  )
}

function WindowActionButton({ label, children, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-[28px] w-[28px] items-center justify-center rounded-full text-[#8aa0b4] transition hover:bg-[#eef6fb] hover:text-ns-navy focus:outline-none"
    >
      <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] fill-none stroke-current" strokeWidth="1.9">
        {children}
      </svg>
    </button>
  )
}
