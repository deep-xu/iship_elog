const outputOptions = [
  'Screen',
  'Printer/Fax',
  'File',
  'Email',
  'Schedule',
]

const jobGroups = [
  'Equipment/Maintained Parts',
  'Spaces',
  'Surveys/Certificates',
  'Services',
  'Condition Monitoring',
  'Miscellaneous Work',
  'Structures',
  'Serialized',
  'Non-PM Jobs',
]

function Radio({ label, checked = false }) {
  return (
    <label className="flex items-center gap-3 text-[13px] text-ns-navy">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          checked ? 'border-ns-blue' : 'border-[#c7d6e0]'
        }`}
      >
        {checked ? <span className="h-2 w-2 rounded-full bg-ns-blue" /> : null}
      </span>
      <span>{label}</span>
    </label>
  )
}

function Checkbox({ label, checked = false }) {
  return (
    <label className="flex items-center gap-3 text-[13px] text-ns-navy">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-[2px] border ${
          checked ? 'border-ns-blue bg-ns-blue' : 'border-[#c7d6e0] bg-white'
        }`}
      >
        {checked ? <span className="text-[11px] leading-none text-white">✓</span> : null}
      </span>
      <span>{label}</span>
    </label>
  )
}

function GroupRow({ label }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <Checkbox label={label} checked />
      <Checkbox label="All" checked />
      <div className="flex items-center justify-between border-b border-dashed border-[#d7e5ed] pb-1">
        <span>&nbsp;</span>
        <span className="text-[11px] text-[#7d95ad]">▼</span>
      </div>
    </div>
  )
}

function DateField() {
  return (
    <div className="flex items-center gap-3 text-[13px] text-ns-navy">
      <span>"Due" Cutoff Date:</span>
      <div className="flex items-center gap-3 border-b border-dashed border-[#d7e5ed] px-2 pb-1">
        <span>08/23/2026</span>
        <span className="text-[14px] text-[#7d95ad]">📅</span>
      </div>
    </div>
  )
}

export default function OverdueJobsReportWindow() {
  return (
    <div className="flex h-full flex-col bg-[#eef5fa] text-ns-navy">
      <div className="px-6 pb-6 pt-5">
        <div className="border border-[#dce8ef] bg-white px-6 py-2 text-center text-[19px] font-semibold">
          Overdue Jobs
        </div>

        <div className="border border-t-0 border-[#dce8ef] bg-white px-4 py-3">
          <div className="space-y-3">
            <Checkbox label="All" checked />
            {jobGroups.map((label) => (
              <GroupRow key={label} label={label} />
            ))}
            <Checkbox label="Only Deferred Jobs" />
          </div>
        </div>

        <div className="border border-t-0 border-[#dce8ef] bg-white px-4 py-4">
          <DateField />
        </div>

        <div className="border border-t-0 border-[#dce8ef] bg-white px-4 py-4">
          <div className="space-y-4">
            {outputOptions.map((option) => {
              if (option === 'File') {
                return (
                  <div key={option} className="flex items-center gap-6">
                    <div className="w-[150px]">
                      <Radio label={option} />
                    </div>
                    <div className="flex w-[360px] items-center gap-3 border-b border-dashed border-[#d7e5ed] pb-1 text-[13px] text-ns-navy">
                      <span>As</span>
                      <span>PDF (*.pdf)</span>
                      <span className="ml-auto text-[11px] text-[#7d95ad]">▼</span>
                    </div>
                  </div>
                )
              }

              if (option === 'Schedule') {
                return (
                  <div key={option} className="flex items-center gap-6">
                    <div className="w-[150px]">
                      <Radio label={option} />
                    </div>
                    <button
                      type="button"
                      className="bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-7 py-2 text-[12px] font-semibold text-white"
                    >
                      View Scheduled Tasks
                    </button>
                  </div>
                )
              }

              return <Radio key={option} label={option} checked={option === 'Screen'} />
            })}
          </div>
        </div>

        <div className="flex justify-center gap-3 border border-t-0 border-[#dce8ef] bg-white px-4 py-3">
          <button
            type="button"
            className="min-w-[120px] bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-6 py-2 text-[12px] font-semibold text-white"
          >
            Ok
          </button>
          <button
            type="button"
            className="min-w-[120px] bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-6 py-2 text-[12px] font-semibold text-white"
          >
            Help
          </button>
        </div>
      </div>
    </div>
  )
}
