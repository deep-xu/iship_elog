const BOTTOM_TABS = [
  'Description',
  'JSA/Work Permit',
  'Work Certificates',
  'Findings',
  'Questionnaire',
  'Observation',
  'Admin Info',
  'Materials',
  'Certificate',
]

export default function VesselRequirementsWindow() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex items-center justify-between border-b border-[#d7e5ed] bg-[#e4edf3] px-4 py-2">
        <div className="flex items-center gap-3 text-[18px] font-semibold text-ns-navy">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-ns-blue text-[14px]">
            O
          </span>
          <span>Vessel Requirements</span>
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

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 overflow-auto border-b border-[#d7e5ed]">
          <table className="w-1/2 border-collapse border-r border-[#d7e5ed] text-[13px] text-ns-navy">
            <thead>
              <tr className="bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] text-left text-white">
                <th className="border border-[#d7e5ed] px-3 py-2">Qualifications (Registry Requirements)</th>
                <th className="border border-[#d7e5ed] px-3 py-2">No of Seamen</th>
                <th className="border border-[#d7e5ed] px-3 py-2">No of Positions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#e4edf3] px-3 py-8" colSpan={3}></td>
              </tr>
            </tbody>
          </table>
          <table className="w-1/2 border-collapse text-[13px] text-ns-navy">
            <thead>
              <tr className="bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] text-left text-white">
                <th className="border border-[#d7e5ed] px-3 py-2">Qualifications (Owner's Req...</th>
                <th className="border border-[#d7e5ed] px-3 py-2">No of Sea...</th>
                <th className="border border-[#d7e5ed] px-3 py-2">No of Positi...</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#e4edf3] px-3 py-8" colSpan={3}></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center gap-1 border-b border-[#d7e5ed] bg-[#eef5fa] px-2 pt-2 text-[14px]">
          {BOTTOM_TABS.map((tab, i) => (
            <span
              key={tab}
              className={`px-4 py-2 ${
                i === 0 ? 'bg-ns-blue font-semibold text-white' : 'bg-white text-ns-navy'
              }`}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="flex-1 bg-white" />
      </div>
    </div>
  )
}
