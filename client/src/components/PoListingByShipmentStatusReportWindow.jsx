const OUTPUT_OPTIONS = ['Screen', 'Printer/Fax', 'File', 'Email']

function Radio({ label, checked = false }) {
  return (
    <label className="flex items-center gap-3 text-[15px] text-ns-navy">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          checked ? 'border-ns-blue' : 'border-[#8b8b8b]'
        }`}
      >
        {checked ? <span className="h-2.5 w-2.5 rounded-full bg-ns-blue" /> : null}
      </span>
      <span>{label}</span>
    </label>
  )
}

export default function PoListingByShipmentStatusReportWindow() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex items-center justify-between border-b border-[#d7e5ed] bg-[#cfcfcf] px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-ns-blue text-[18px] font-semibold text-ns-navy">
            O
          </span>
          <span className="text-[18px] font-semibold text-ns-navy">Report Option</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="border border-[#e4edf3] bg-white px-6 py-3 text-center text-[20px] font-semibold text-ns-navy">
          PO Listing by Shipment Status
        </div>

        <div className="mt-4 border border-[#e4edf3] bg-white p-5 text-ns-navy">
          <div className="grid grid-cols-[150px_1fr_28px] items-center gap-x-4 gap-y-4 text-[15px]">
            <span>Shipment Status:</span>
            <div className="h-8 border-b border-[#d7e5ed]" />
            <button type="button" className="text-xl leading-none text-ns-navy">
              ▾
            </button>

            <span>Start Date:</span>
            <div className="flex h-8 items-center border-b border-[#d7e5ed] px-2">08/23/2026</div>
            <button type="button" className="text-lg text-ns-navy">
              📅
            </button>

            <span>End Date:</span>
            <div className="flex h-8 items-center border-b border-[#d7e5ed] px-2">08/23/2026</div>
            <button type="button" className="text-lg text-ns-navy">
              📅
            </button>

            <span>Order Info:</span>
            <div className="col-span-2 h-8 border-b border-[#d7e5ed]" />
          </div>

          <fieldset className="mt-5 border border-[#e4edf3] px-4 pb-4 pt-2">
            <legend className="px-2 text-[15px] text-ns-navy">Sort By</legend>
            <div className="flex gap-8">
              <Radio label="Status Date" checked />
              <Radio label="Vendor" />
            </div>
          </fieldset>
        </div>

        <div className="mt-5 border border-[#e4edf3] bg-white p-5">
          <div className="space-y-4">
            {OUTPUT_OPTIONS.map((option) => (
              <div key={option} className="flex items-center gap-4">
                <Radio label={option} checked={option === 'Screen'} />
                {option === 'File' ? (
                  <div className="ml-8 flex flex-1 items-center gap-4 text-[15px] text-ns-navy">
                    <span>As</span>
                    <div className="flex-1 border-b border-[#d7e5ed] pb-1">PDF (*.pdf)</div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-6">
          <button
            type="button"
            className="min-w-[120px] bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-8 py-2 text-[15px] font-semibold text-white"
          >
            Ok
          </button>
          <button
            type="button"
            className="min-w-[120px] bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-8 py-2 text-[15px] font-semibold text-white"
          >
            Help
          </button>
        </div>
      </div>
    </div>
  )
}
