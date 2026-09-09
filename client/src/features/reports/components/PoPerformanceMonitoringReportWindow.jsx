function Radio({ checked = false }) {
  return (
    <span
      className={`inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${
        checked ? 'border-ns-blue' : 'border-[#9aa0b4]'
      }`}
    >
      {checked ? <span className="h-[8px] w-[8px] rounded-full bg-ns-blue" /> : null}
    </span>
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

function MinimizeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="2.4">
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="2.2">
      <path d="M7 7l10 10M17 7L7 17" strokeLinecap="round" />
    </svg>
  )
}

function SelectCaret() {
  return (
    <svg viewBox="0 0 12 12" className="h-[12px] w-[12px] fill-current">
      <path d="M2 4l4 4 4-4H2z" />
    </svg>
  )
}

function OutputRow({ selected = false, label, children = null }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <span className="shrink-0">
        <Radio checked={selected} />
      </span>
      <span className="w-[120px]">{label}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

export default function PoPerformanceMonitoringReportWindow({
  onMinimize,
  onClose,
  preview = false,
}) {
  return (
    <div
      className={`flex h-full min-h-0 min-w-0 flex-col bg-[#eef5fa] ${
        preview ? 'overflow-auto p-5' : ''
      }`}
    >
      <div className="flex items-center justify-between border border-[#9c9c9c] bg-[#cfcfcf] px-3 py-2">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border-[4px] border-ns-navy bg-white">
            <span className="block h-[6px] w-[6px] rounded-full bg-ns-navy" />
          </span>
          <span className="text-[20px] font-bold text-ns-navy">Report Option</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Minimize"
            onClick={onMinimize}
            className="flex h-9 w-10 items-center justify-center text-ns-navy hover:bg-[#eef5fa]"
          >
            <MinimizeIcon />
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-9 w-10 items-center justify-center bg-ns-navy text-white hover:opacity-90"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto border-x border-b border-[#9c9c9c] bg-[#d3d3d3] p-6">
        <div className="mx-auto flex w-full max-w-[880px] flex-col gap-6">
          <section className="border border-[#d5d5d5] bg-white px-8 py-5 text-center">
            <h1 className="text-[26px] font-bold text-ns-navy">PO Performance Monitoring Report</h1>
          </section>

          <section className="border border-[#d5d5d5] bg-white p-6 text-ns-navy">
            <div className="max-w-[640px] border border-[#bfc4ce] px-4 py-4">
              <div className="mb-4 text-[18px] font-semibold">Options</div>
              <div className="flex flex-wrap gap-8 text-[18px]">
                <label className="flex items-center gap-3">
                  <Radio checked />
                  <span>Creation Date</span>
                </label>
                <label className="flex items-center gap-3">
                  <Radio />
                  <span>Approval Date</span>
                </label>
                <label className="flex items-center gap-3">
                  <Radio />
                  <span>Issue Date</span>
                </label>
              </div>
            </div>

            <div className="mt-5 flex max-w-[640px] flex-col gap-5 border border-[#dce8ef] px-10 py-7">
              <div className="flex items-center justify-between gap-6">
                <span className="min-w-[140px] text-[18px] font-semibold">Start Date:</span>
                <div className="flex flex-1 items-center gap-4">
                  <span className="border-b-2 border-[#aeb3bf] px-1 pb-1 text-[19px]">08/23/2026</span>
                  <CalendarIcon />
                </div>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="min-w-[140px] text-[18px] font-semibold">End Date:</span>
                <div className="flex flex-1 items-center gap-4">
                  <span className="border-b-2 border-[#aeb3bf] px-1 pb-1 text-[19px]">08/23/2026</span>
                  <CalendarIcon />
                </div>
              </div>
            </div>
          </section>

          <section className="border border-[#d5d5d5] bg-white p-6">
            <div className="flex max-w-[720px] flex-col gap-5">
              <OutputRow selected label="Screen" />
              <OutputRow label="Printer/Fax" />
              <OutputRow label="File">
                <div className="flex items-center gap-4 text-[17px] text-ns-navy">
                  <span>As</span>
                  <div className="flex min-w-0 flex-1 items-center justify-between border-b-2 border-[#aeb3bf] px-1 pb-1">
                    <span>PDF (*.pdf)</span>
                    <SelectCaret />
                  </div>
                </div>
              </OutputRow>
              <OutputRow label="Email" />
              <OutputRow label="Schedule">
                <button
                  type="button"
                  className="h-[48px] min-w-[320px] bg-ns-navy px-8 text-[17px] font-semibold text-white"
                >
                  View Scheduled Tasks
                </button>
              </OutputRow>
            </div>

            <div className="mt-8 flex justify-center gap-6">
              <button
                type="button"
                className="min-w-[170px] bg-ns-navy px-10 py-3 text-[17px] font-semibold text-white"
              >
                Ok
              </button>
              <button
                type="button"
                className="min-w-[170px] bg-ns-navy px-10 py-3 text-[17px] font-semibold text-white"
              >
                Help
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
