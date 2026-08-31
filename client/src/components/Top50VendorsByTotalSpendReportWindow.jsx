const OUTPUT_OPTIONS = ['Screen', 'Printer/Fax', 'File', 'Email']

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

function DateField({ label, value }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <span className="w-20 shrink-0 text-[14px] text-ns-navy">{label}</span>
      <div className="flex flex-1 items-center justify-between border-b-2 border-[#e4edf3] px-2 py-1 text-[14px] text-ns-navy">
        <span>{value}</span>
        <span className="text-[16px]">📅</span>
      </div>
    </div>
  )
}

function formatToday() {
  const now = new Date()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const yyyy = now.getFullYear()
  return `${mm}/${dd}/${yyyy}`
}

export default function Top50VendorsByTotalSpendReportWindow() {
  const today = formatToday()

  return (
    <div className="flex h-full w-full max-w-[760px] flex-col border border-[#d7e5ed] bg-[#eef5fa] shadow-md">
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
          Top 50 Vendors by Total Spend
        </div>

        <div className="border border-[#e4edf3] bg-white p-5">
          <div className="flex flex-col gap-4">
            <DateField label="Start Date:" value={today} />
            <DateField label="End Date:" value={today} />
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
