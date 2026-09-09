export default function SparesListByLocationReportWindow() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex items-center justify-between border-b border-[#d7e5ed] bg-[#c6c6c6] px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-semibold text-ns-navy">Report Option</span>
        </div>
        <div className="flex items-center gap-3 text-ns-navy">
          <span className="text-xl leading-none">−</span>
          <span className="text-xl leading-none">×</span>
        </div>
      </div>

      <div className="flex-1 bg-[#eef5fa] p-6">
        <div className="border border-[#e4edf3] bg-white px-6 py-3 text-center text-[24px] font-semibold text-ns-navy">
          Spares List by Location
        </div>

        <div className="mt-4 border border-[#e4edf3] bg-[#f7f7f7] p-6">
          <div className="relative border border-[#e4edf3] bg-[#f7f7f7] px-6 pb-5 pt-6">
            <div className="absolute -top-3 left-3 bg-[#f7f7f7] px-2 text-[16px] text-ns-navy">
              Locations
            </div>

            <div className="flex items-center gap-8 text-[18px] text-ns-navy">
              <Radio checked />
              <span className="-ml-5">All</span>
              <Radio />
              <span className="-ml-5">Select</span>
            </div>

            <div className="mt-7 flex items-center gap-4">
              <div className="w-[120px] text-right text-[18px] text-ns-navy">Locations:</div>
              <div className="flex w-[360px] items-center justify-between border-b-2 border-dotted border-[#c9c9c9] pb-1 text-[18px] text-ns-navy">
                <span>&nbsp;</span>
                <span className="text-[22px] leading-none">⌄</span>
              </div>
            </div>
          </div>

          <div className="mt-5 border border-[#e4edf3] bg-[#f7f7f7] px-6 py-5">
            <CheckboxRow label="Include quantity on order" />
            <div className="mt-5">
              <CheckboxRow label="Print critical parts only" />
            </div>
            <div className="mt-6">
              <SelectRow label="Criticality index:" />
            </div>
          </div>
        </div>

        <div className="mt-3 border border-[#e4edf3] bg-[#f7f7f7] p-6">
          <div className="space-y-5 text-[18px] text-ns-navy">
            <div className="flex items-center gap-4">
              <Radio checked />
              <span>Screen</span>
            </div>
            <div className="flex items-center gap-4">
              <Radio />
              <span>Printer/Fax</span>
            </div>
            <div className="flex items-center gap-4">
              <Radio />
              <span className="w-[58px]">File</span>
              <span>As</span>
              <div className="flex w-[280px] items-center justify-between border-b border-[#dce8ef] px-2 pb-1">
                <span>PDF (*.pdf)</span>
                <span className="text-[22px] leading-none">⌄</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Radio />
              <span>Email</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button className="min-w-[150px] bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-8 py-3 text-[20px] font-semibold text-white">
              Ok
            </button>
            <button className="min-w-[150px] bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-8 py-3 text-[20px] font-semibold text-white">
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Radio({ checked = false }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-[#8e8e8e] bg-white">
      {checked ? <span className="h-4 w-4 rounded-full bg-ns-blue" /> : null}
    </span>
  )
}

function CheckboxRow({ label }) {
  return (
    <div className="flex items-center gap-4 text-[18px] text-ns-navy">
      <span className="h-8 w-8 border-[3px] border-[#8e8e8e] bg-white" />
      <span>{label}</span>
    </div>
  )
}

function SelectRow({ label }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[180px] text-right text-[18px] text-ns-navy">{label}</div>
      <div className="flex w-[360px] items-center justify-between border-b border-[#dce8ef] pb-1 text-[18px] text-ns-navy">
        <span>&nbsp;</span>
        <span className="text-[22px] leading-none">⌄</span>
      </div>
    </div>
  )
}
