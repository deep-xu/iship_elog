const TABS = [
  'Technical',
  'Admin Info',
  'Accounts',
  'Cost Center',
  'Contact Info',
  'User Roles',
  'Control & Defaults',
  'Approval Plans',
  'Allotments',
]

const SECTIONS = [
  'Primary Information',
  'Background',
  'Birth Certificate',
  'Classification',
  'Dimensions/Weights',
  'Key Events',
  'Lifeboats',
  'Liferafts',
  'Machinery Particulars',
  'Preservation',
  'Propulsion',
  'Retention/Layup',
  'Tanks (Non-Cargo) Capacity',
  'Diagrams',
]

function Field({ label, value, wide = false }) {
  return (
    <div className={`flex items-center justify-between gap-4 ${wide ? '' : ''}`}>
      <span className="shrink-0 text-[14px] text-ns-navy">{label}</span>
      <span className="flex-1 border-b border-[#d7e5ed] px-1 py-1 text-right text-[14px] text-ns-navy">
        {value}
      </span>
    </div>
  )
}

export default function ShipDetailsWindow() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex items-center justify-between border-b border-[#d7e5ed] bg-[#e4edf3] px-4 py-2">
        <div className="flex items-center gap-3 text-[16px] font-semibold text-ns-navy">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-ns-blue text-[13px]">
            O
          </span>
          <span>Ship - Seaspan Benefactor - [0103-00001-00000067] - [Read Only]</span>
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

      <div className="grid grid-cols-2 gap-6 border-b border-[#d7e5ed] bg-white px-6 py-4">
        <div className="flex flex-col gap-3">
          <Field label="Vessel Name :" value="Seaspan Benefactor" />
          <Field label="Previous Name :" value="" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <Field label="Ship Code :" value="SBEN" />
            <label className="flex items-center gap-2 text-[14px] text-ns-navy">
              <input type="checkbox" readOnly />
              Hidden
            </label>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Field label="Interface Number :" value="2019" />
            <label className="flex items-center gap-2 text-[14px] text-ns-navy">
              <input type="checkbox" readOnly />
              Warehouse
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-[#d7e5ed] bg-[#eef5fa] px-3 pt-2 text-[14px]">
        {TABS.map((tab, i) => (
          <span
            key={tab}
            className={`px-4 py-2 ${
              i === 0
                ? 'bg-ns-blue font-semibold text-white'
                : 'bg-white text-ns-navy'
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[220px] shrink-0 overflow-auto border-r border-[#d7e5ed] bg-white text-[14px] text-ns-navy">
          {SECTIONS.map((section, i) => (
            <div
              key={section}
              className={`px-3 py-2 ${i === 0 ? 'bg-ns-blue font-semibold text-white' : ''}`}
            >
              {section}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="mb-5 grid grid-cols-2 gap-x-10 gap-y-4">
            <Field label="Ship Builder :" value="Jiangsu New Yangzi Shipy ⌄" />
            <Field label="Built:" value="📅" />
            <Field label="Main Engine:" value="CMD ⌄" />
            <Field label="Date of Delivery:" value="03/24/2016 📅" />
          </div>

          <div className="mb-5 grid grid-cols-2 gap-x-10 gap-y-4">
            <Field label="Gross Tonnage:" value="113,042.00" />
            <Field label="Horsepower:" value="0.00" />
            <Field label="Net Tonnage:" value="57,162.00" />
            <Field label="Length Overall :" value="337.00" />
            <Field label="Deadweight:" value="115,177.00 [History]" />
            <Field label="Maximum Draft:" value="0.00" />
            <Field label="Lightship Draft:" value="0.00" />
          </div>

          <div className="mb-5 grid grid-cols-2 gap-x-10 gap-y-4">
            <Field label="Complement:" value="0" />
            <Field label="Accommodation Capacity:" value="0" />
          </div>

          <div className="mb-5 border border-[#e4edf3] p-4">
            <div className="mb-2 text-[13px] font-semibold text-ns-navy">Propeller Operations</div>
            <div className="flex items-center gap-8 text-[14px] text-ns-navy">
              <label className="flex items-center gap-2">
                <input type="radio" name="propeller" readOnly />
                Controllable Pitch
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="propeller" readOnly defaultChecked />
                Fixed Pitch
              </label>
              <span className="ml-auto">0.000000</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4">
            <Field label="Last Drydock:" value="📅" />
            <Field label="Next Drydock:" value="📅" />
            <Field label="Last Hull Cleaning:" value="[History] 📅" />
          </div>
        </div>
      </div>
    </div>
  )
}
