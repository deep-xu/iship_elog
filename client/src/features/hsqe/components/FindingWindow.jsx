function DotIcon() {
  return (
    <div className="h-5 w-5 rounded-full border-[3px] border-ns-blue bg-white" />
  )
}

function SaveIcon() {
  return (
    <div className="relative h-9 w-9 border border-[#c8ced8] bg-white">
      <div className="absolute left-2 top-2 h-5 w-5 rounded-sm bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)]" />
      <div className="absolute bottom-2 left-3 h-2 w-3 bg-white" />
    </div>
  )
}

function LinkIcon() {
  return (
    <div className="relative h-9 w-9 border border-[#c8ced8] bg-white">
      <div className="absolute left-[7px] top-[11px] h-3 w-5 rotate-[-35deg] rounded-full border-[3px] border-ns-blue" />
      <div className="absolute right-[7px] top-[11px] h-3 w-5 rotate-[-35deg] rounded-full border-[3px] border-[#9aa2ad]" />
    </div>
  )
}

function HelpIcon() {
  return (
    <div className="flex h-9 w-9 items-center justify-center border border-[#c8ced8] bg-white">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] text-lg font-bold text-white">
        ?
      </div>
    </div>
  )
}

function ProcessBar() {
  const items = ['Created', 'In Progress', 'Closed']
  return (
    <div className="flex items-center gap-1 px-4 py-4">
      {items.map((item, index) => (
        <div
          key={item}
          className={`relative flex h-12 flex-1 items-center justify-center border text-[18px] font-semibold ${
            index === 0
              ? 'border-[#2d8d90] bg-[#2b8f92] text-white'
              : 'border-[#d4d7dc] bg-[#f4f5f7] text-[#6d7580]'
          }`}
        >
          {item}
          <div
            className={`absolute -right-6 top-0 h-12 w-12 rotate-45 border-r border-t ${
              index === 0 ? 'border-[#2d8d90] bg-[#f4f5f7]' : 'border-[#d4d7dc] bg-white'
            }`}
          />
        </div>
      ))}
    </div>
  )
}

function FieldRow({ label, children, className = '' }) {
  return (
    <div className={`grid grid-cols-[170px_minmax(0,1fr)] items-center gap-3 ${className}`}>
      <div className="text-right text-[18px] text-ns-navy">{label}</div>
      {children}
    </div>
  )
}

function LineInput({ value = '', emphasized = false, align = 'left' }) {
  return (
    <div
      className={`min-h-[34px] border-b-2 px-2 py-1 text-[18px] ${
        emphasized ? 'border-[#da4e57]' : 'border-[#d2d7de]'
      } ${align === 'center' ? 'text-center' : ''}`}
    >
      {value}
    </div>
  )
}

function SelectLine({ value = '' }) {
  return (
    <div className="relative min-h-[34px] border-b-2 border-[#d2d7de] px-2 py-1 text-[18px]">
      {value}
      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[18px] text-ns-navy">
        ▼
      </span>
    </div>
  )
}

function ScoreLine({ value = '0' }) {
  return (
    <div className="relative min-h-[34px] border-b-2 border-[#d2d7de] px-2 py-1 text-[18px]">
      {value}
      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[18px] text-ns-navy">
        ▼
      </span>
    </div>
  )
}

function CheckboxRow({ label }) {
  return (
    <label className="flex items-center justify-between gap-3 text-[18px] text-ns-navy">
      <span>{label}</span>
      <input type="checkbox" className="h-6 w-6 accent-[#2e8bcf]" />
    </label>
  )
}

function QuestionnaireAreas() {
  return (
    <div className="grid grid-cols-[210px_minmax(0,1fr)] gap-x-4 gap-y-3 px-4 py-4">
      <div className="text-right text-[18px] text-ns-navy">Questionnaire Hierarchy:</div>
      <div className="h-12 bg-[#cfcfcf]" />
      <div className="text-right text-[18px] text-ns-navy">Question:</div>
      <div className="h-28 border-b-2 border-[#d2d7de] bg-white" />
    </div>
  )
}

function TabBar() {
  const tabs = [
    'Findings',
    'Comments',
    'CARs',
    'Root Cause Analysis',
    'Standard Reference',
    'File Attachments',
    'Status',
    'Message',
    'Technical Defect',
  ]

  return (
    <div className="flex items-end gap-2 overflow-hidden border-b border-[#d0d4db] px-4 pt-2 text-[16px]">
      {tabs.map((tab, index) => (
        <div
          key={tab}
          className={`shrink-0 px-3 py-2 ${
            index === 0
              ? 'border border-b-0 border-[#7fa0d6] bg-ns-blue font-semibold text-white'
              : 'text-ns-navy'
          }`}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

function BottomEditors() {
  return (
    <div className="px-4 pb-4 pt-3">
      <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3">
        <div className="pt-4 text-right text-[18px] text-ns-navy">Findings:</div>
        <div className="h-36 border border-[#d9dde4] bg-white" />
        <div className="pt-4 text-right text-[18px] text-ns-navy">Response:</div>
        <div className="h-32 border border-[#d9dde4] bg-white" />
      </div>
      <label className="mt-4 flex items-center gap-3 text-[18px] text-ns-navy">
        <span>Include response in Library:</span>
        <input type="checkbox" className="h-6 w-6 accent-[#2e8bcf]" />
      </label>
    </div>
  )
}

export default function FindingWindow() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-ns-navy">
      <div className="flex items-center gap-3 border-b border-[#c8ced8] px-4 py-3">
        <DotIcon />
        <h2 className="text-[20px] font-semibold">Finding - New</h2>
      </div>

      <ProcessBar />

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_430px] gap-6 overflow-auto px-4 pb-4">
        <div className="space-y-3">
          <div className="grid grid-cols-[170px_minmax(0,1fr)] items-center gap-3">
            <div className="text-right text-[18px] text-ns-navy">Finding No.:</div>
            <div className="text-[18px] font-semibold text-ns-navy">AutoGen</div>
          </div>

          <FieldRow label="Findings Type:">
            <SelectLine value="Non Conformity" />
          </FieldRow>
          <FieldRow label="Ship:">
            <SelectLine value="Seaspan Benefactor" />
          </FieldRow>
          <FieldRow label="Internal Ref. 1:">
            <SelectLine />
          </FieldRow>
          <FieldRow label="">
            <LineInput />
          </FieldRow>
          <FieldRow label="Doc Owner:">
            <SelectLine value="Seaspan Breeze, 2nd Enginee" />
          </FieldRow>
          <FieldRow label="Questionnaire:">
            <SelectLine />
          </FieldRow>
          <FieldRow label="Source:">
            <div className="px-2 py-1 text-[18px] text-ns-navy">NC</div>
          </FieldRow>

          <QuestionnaireAreas />

          <TabBar />
          <BottomEditors />
        </div>

        <div className="space-y-3 pt-9">
          <FieldRow label="Finding Sort No.:">
            <LineInput />
          </FieldRow>
          <FieldRow label="Category:">
            <LineInput />
          </FieldRow>
          <FieldRow label="Ship Team:">
            <LineInput />
          </FieldRow>
          <FieldRow label="Internal Ref. 2:">
            <LineInput />
          </FieldRow>
          <FieldRow label="Responsible Role:">
            <LineInput />
          </FieldRow>
          <FieldRow label="SMM Ref.:">
            <LineInput />
          </FieldRow>
          <FieldRow label="PSC Defect Code:">
            <LineInput />
          </FieldRow>

          <div className="h-10" />

          <FieldRow label="Title:">
            <LineInput value="Non Conformity" emphasized />
          </FieldRow>
          <FieldRow label="Severity:">
            <SelectLine />
          </FieldRow>
          <FieldRow label="IMO No.:">
            <div className="px-2 py-1 text-[18px] text-ns-navy">9739666</div>
          </FieldRow>
          <FieldRow label="Internal Ref. 3:">
            <SelectLine />
          </FieldRow>
          <FieldRow label="Risk:">
            <SelectLine />
          </FieldRow>
          <FieldRow label="Nature of Concern:">
            <SelectLine />
          </FieldRow>
          <FieldRow label="Subject of Concern:">
            <SelectLine />
          </FieldRow>
          <FieldRow label="Potential Score:">
            <ScoreLine value="0" />
          </FieldRow>
          <FieldRow label="Observed Score:">
            <ScoreLine value="0" />
          </FieldRow>
          <FieldRow label="Final Score:">
            <ScoreLine value="0" />
          </FieldRow>

          <div className="mt-4 border border-[#d0d4db] p-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-[#d2d7de] pb-3 text-[18px] text-ns-navy">
              <span>Reported Date:</span>
              <span>08/22/2026</span>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-[#d2d7de] py-3 text-[18px] text-ns-navy">
              <span>Respond By Date:</span>
              <span />
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-3 pt-3 text-[18px] text-ns-navy">
              <span>Closed By Date:</span>
              <span>09/05/2026</span>
            </div>
          </div>

          <div className="space-y-3 pt-3">
            <CheckboxRow label="No Further Action Required:" />
            <CheckboxRow label="Generated from SIRE:" />
            <CheckboxRow label="Exclude from statistics:" />
          </div>
        </div>
      </div>
    </div>
  )
}
