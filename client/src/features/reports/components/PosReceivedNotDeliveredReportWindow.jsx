const OUTPUT_OPTIONS = ['Screen', 'Printer/Fax', 'File', 'Email', 'Schedule']

function Radio({ label, checked = false }) {
  return (
    <label className="flex items-center gap-3 text-[14px] text-ns-navy">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
          checked ? 'border-ns-blue' : 'border-[#8b8f97]'
        }`}
      >
        {checked ? <span className="h-3 w-3 rounded-full bg-ns-blue" /> : null}
      </span>
      <span>{label}</span>
    </label>
  )
}

function Checkbox({ label, checked = false }) {
  return (
    <label className="flex items-center gap-2 text-[14px] text-ns-navy">
      <span
        className={`flex h-5 w-5 items-center justify-center border ${
          checked ? 'border-ns-blue bg-ns-blue' : 'border-[#8b8f97] bg-white'
        }`}
      >
        {checked ? (
          <svg viewBox="0 0 10 10" className="h-3 w-3 stroke-white" strokeWidth="1.5" fill="none">
            <polyline points="1,5 4,8 9,2" />
          </svg>
        ) : null}
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  )
}

function Dropdown({ value = '' }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <span>{value}</span>
      <span className="text-[16px]">⌄</span>
    </div>
  )
}

export default function PosReceivedNotDeliveredReportWindow() {
  return (
    <div className="flex h-full w-full max-w-[820px] flex-col border border-[#d7e5ed] bg-[#eef5fa] shadow-md">
      <div className="flex items-center justify-between border-b border-[#d7e5ed] bg-[#e4edf3] px-4 py-2">
        <div className="flex items-center gap-3 text-[18px] font-semibold text-ns-navy">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-ns-blue text-[14px]">
            O
          </span>
          <span>Report Option</span>
        </div>
        <div className="flex items-center gap-4 text-ns-navy">
          <button type="button" className="text-[18px] leading-none">
            _
          </button>
          <button type="button" className="text-[18px] leading-none">
            ×
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="border border-[#e4edf3] bg-white px-6 py-3 text-center text-[22px] font-semibold text-ns-navy">
          POs Received Not Delivered
        </div>

        <div className="border border-[#e4edf3] bg-white p-5">
          <div className="mb-3 border-b border-[#e4edf3] pb-1 text-[13px] font-semibold text-ns-navy">
            Report Option
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="w-24 shrink-0 text-[14px] text-ns-navy">Ship:</span>
              <Dropdown value="Seaspan Benefactor" />
              <Checkbox label="All" />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 shrink-0 text-[14px] text-ns-navy">Vendor:</span>
              <Dropdown />
              <Checkbox label="All" checked />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 shrink-0 text-[14px] text-ns-navy">Department:</span>
              <Dropdown />
              <Checkbox label="All" checked />
            </div>

            <div className="border border-[#e4edf3] p-4">
              <div className="mb-3 text-[13px] font-semibold text-ns-navy">Date Range</div>
              <div className="flex items-center gap-6">
                <div className="flex flex-1 items-center gap-3">
                  <span className="shrink-0 text-[14px] text-ns-navy">Start Date:</span>
                  <Dropdown />
                  <span className="text-[16px] text-ns-navy">📅</span>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <span className="shrink-0 text-[14px] text-ns-navy">End Date:</span>
                  <Dropdown />
                  <span className="text-[16px] text-ns-navy">📅</span>
                </div>
              </div>
            </div>

            <div className="border border-[#e4edf3] p-4">
              <Checkbox label="Include Hidden PO's" />
            </div>
          </div>
        </div>

        <div className="border border-[#e4edf3] bg-white p-5">
          <div className="flex flex-col gap-4">
            {OUTPUT_OPTIONS.map((option) => (
              <div key={option} className="flex items-center gap-6">
                <Radio label={option} checked={option === 'Screen'} />
                {option === 'File' ? (
                  <div className="flex flex-1 items-center gap-4 pl-2 text-[14px] text-ns-navy">
                    <span>As</span>
                    <div className="flex flex-1 items-center justify-between border-b-2 border-[#e4edf3] px-2 py-1">
                      <span>PDF (*.pdf)</span>
                      <span className="text-[18px]">⌄</span>
                    </div>
                  </div>
                ) : null}
                {option === 'Schedule' ? (
                  <button
                    type="button"
                    className="bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-5 py-2 text-[14px] font-semibold text-white"
                  >
                    View Scheduled Tasks
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto flex justify-center gap-6 pb-2">
          <button
            type="button"
            className="min-w-[140px] bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-8 py-3 text-[18px] font-semibold text-white"
          >
            Ok
          </button>
          <button
            type="button"
            className="min-w-[140px] bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-8 py-3 text-[18px] font-semibold text-white"
          >
            Help
          </button>
        </div>
      </div>
    </div>
  )
}
