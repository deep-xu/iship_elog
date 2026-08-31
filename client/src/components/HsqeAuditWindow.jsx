import {
  MenuBar,
  SectionHeader,
  TabStrip,
  TitleBar,
  ToolDivider,
  ToolIcon,
  Toolbar,
  WindowBody,
  WindowFrame,
  WorkflowStepper,
} from './windowChrome.jsx'

const PROCESS_STEPS = ['Created', 'In Progress', 'Completed', 'Closed']
const BOTTOM_TABS = [
  'Certificates',
  'Requisitions',
  'Purchasing Docs',
  'Equipment/Space/Structure',
  'Safety Observation',
  'Technical Defect',
]

export default function HsqeAuditWindow({ onMinimize, onClose, preview = false }) {
  return (
    <WindowFrame>
      <TitleBar
        title="Quality & Compliance Audit - New"
        onMinimize={onMinimize}
        onClose={onClose}
        preview={preview}
      />
      <MenuBar items={['File', 'Reports', 'Help']} />

      <Toolbar>
        <ToolIcon label="Save">
          <SaveIcon />
        </ToolIcon>
        <ToolDivider />
        <ToolIcon label="Help">
          <QuestionIcon />
        </ToolIcon>
      </Toolbar>

      <WindowBody>
        <WorkflowStepper
          subtitle="Track audit from creation to closure"
          stages={PROCESS_STEPS}
          currentIndex={0}
        />

        <div className="min-w-[1180px] border-b border-[#e4edf3] bg-[#fcfeff] px-[18px] py-[18px]">
          <SectionHeader badge="Audit Details" hint="Seaspan Benefactor" />
          <TopFields />
        </div>

        <div className="min-w-[1180px] bg-white px-[18px] py-[18px]">
          <FindingsTabs />
          <ScheduleAndScores />
          <BottomSection />
        </div>
      </WindowBody>
    </WindowFrame>
  )
}

function TopFields() {
  return (
    <div className="grid grid-cols-[1.1fr_0.95fr] gap-x-[30px]">
      <div>
        <LabeledText label="Audit No." value="AutoGen" />
        <LabeledField label="Audit Type" required chevron />
        <LabeledField label="Ship" value="Seaspan Benefactor" chevron />
        <LabeledField label="Inspecting Party" chevron />
        <LabeledField label="Reference No." />

        <div className="mt-[18px] pl-[188px]">
          <div className="flex items-center gap-[18px] text-[13px] text-ns-navy">
            <Radio checked label="Single Inspector" />
            <Radio label="Multiple Inspectors" />
          </div>
        </div>

        <LabeledField label="Inspector's Name" chevron className="mt-[18px]" />
        <LabeledField label="Competency" chevron />
        <LabeledArea label="Competency Details" rows={4} />
      </div>

      <div>
        <LabeledField label="Title" />
        <LabeledField label="Questionnaire" />
        <LabeledField label="Ship Team" />
        <LabeledText label="Doc Owner" value="Seaspan Breeze, 2nd Engineer" />

        <div className="mt-[8px] pl-[132px]">
          <div className="inline-flex items-center gap-[18px] border-b border-dashed border-[#d7e5ed] pb-[10px] text-[13px] text-ns-navy">
            <Radio checked label="At Sea" />
            <Radio label="In Port" />
            <Radio label="Remote" />
          </div>
        </div>

        <LabeledField label="Place" className="mt-[14px]" />
      </div>
    </div>
  )
}

function FindingsTabs() {
  return (
    <div className="mt-[22px] border-t border-[#e4edf3] pt-[16px]">
      <div className="flex flex-wrap items-center gap-[8px]">
        {['Findings', 'Inspector', 'CARs', 'Comments', 'Description', 'Status', 'File Attachments', 'Message', "WO's/SR's", 'Certificates'].map(
          (tab, index) => (
            <button
              key={tab}
              type="button"
              className={`rounded-full px-[14px] py-[7px] text-[13px] transition focus:outline-none ${
                index === 0
                  ? 'bg-[linear-gradient(135deg,#2d86ca,#56ace4)] font-semibold text-white shadow-[0_10px_20px_rgba(46,139,207,0.22)]'
                  : 'border border-[#d7e5ed] bg-white text-[#5e7894] hover:bg-[#f4f9fc]'
              }`}
            >
              {tab}
            </button>
          ),
        )}
      </div>
    </div>
  )
}

function ScheduleAndScores() {
  return (
    <div className="mt-[8px] grid grid-cols-[1.05fr_0.95fr] gap-x-[34px]">
      <div>
        <DateField label="Due" />
        <DateField label="Last" />
        <DateField label="Scheduled By System" />
        <DateField label="Reported" value="08/22/2026" />
        <DateField label="Date" value="08/22/2026" />
        <DateField label="Expiry Date" />
        <LabeledField label="Audit Outcome" chevron />

        <div className="mt-[18px] grid grid-cols-[170px_1fr] items-start gap-x-[16px]">
          <span className="pt-[8px] text-right text-[13px] font-semibold text-[#5b7690]">Certificate Type :</span>
          <div className="rounded-[18px] border border-[#e4edf3] bg-white px-[16px] py-[14px] shadow-[0_8px_18px_rgba(84,116,145,0.05)]">
            <div className="grid grid-cols-[1fr_210px] gap-x-[22px]">
              <div>
                <LabeledField label="Certificate" />
                <LabeledField label="Issued" calendar />
                <LabeledField label="Expiry Date" calendar />
              </div>
              <div>
                <LabeledField label="Port" />
                <LabeledField label="Issued By" />
                <LabeledField label="Reference" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_310px] gap-x-[24px]">
        <div>
          <LabeledText label="Master" value="" />
          <LabeledText label="Chief Officer" value="" />
          <LabeledText label="Chief Engineer" value="" />
          <LabeledText label="Second Engineer" value="" />
          <LabeledField label="Category" />
          <LabeledField label="Potential Score" />
          <LabeledField label="Observed Score" />
          <LabeledField label="Final Score" />
        </div>

        <div className="rounded-[18px] border border-[#e4edf3] bg-white px-[16px] py-[14px] shadow-[0_8px_18px_rgba(84,116,145,0.05)]">
          <DateField label="Scheduled" value="08/22/2026" compact />
          <DateField label="Start Date" value="08/22/2026" compact />
          <DateField label="End Date" compact />
          <DateField label="RP Complete Date" compact />
          <DateField label="Completed Date" compact />
        </div>
      </div>
    </div>
  )
}

function BottomSection() {
  return (
    <div className="mt-[24px] border-t border-[#e4edf3] pt-[16px]">
      <div className="flex flex-wrap items-center gap-[8px]">
        {BOTTOM_TABS.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`rounded-full px-[14px] py-[7px] text-[13px] transition focus:outline-none ${
              index === 0
                ? 'bg-[linear-gradient(135deg,#2d86ca,#56ace4)] font-semibold text-white shadow-[0_10px_20px_rgba(46,139,207,0.22)]'
                : 'border border-[#d7e5ed] bg-white text-[#5e7894] hover:bg-[#f4f9fc]'
            }`}
          >
            {tab}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-[12px] text-[#5e7894]">
          <span>&#9664;</span>
          <span>&#9654;</span>
          <span className="text-[16px]">&#9638;</span>
        </span>
      </div>

      <div className="mt-[10px] grid grid-cols-[1fr_1fr] gap-x-[50px]">
        <div>
          <LabeledField label="Overall Risk" />
          <LabeledField label="Department" />
          <LabeledText label="Approver" value="0" />
          <LabeledText label="Approve By Date" value="0" />
          <LabeledText label="Identifier" value="0" />

          <div className="mt-[14px] rounded-[18px] border border-[#e4edf3] bg-white px-[16px] py-[14px] shadow-[0_8px_18px_rgba(84,116,145,0.05)]">
            <LabeledField label="Approver" chevron />
            <LabeledField label="Approve By Date" calendar />
          </div>
        </div>

        <div>
          <div className="mb-[12px] flex justify-end">
            <button
              type="button"
              className="rounded-full bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-[16px] py-[9px] text-[13px] font-semibold text-white shadow-[0_14px_26px_rgba(46,139,207,0.24)] transition focus:outline-none"
            >
              View Plan Window
            </button>
          </div>
          <div className="rounded-[18px] border border-[#e4edf3] bg-white px-[16px] py-[14px] shadow-[0_8px_18px_rgba(84,116,145,0.05)]">
            <LabeledField label="Deferral Setup" />
            <LabeledField label="Approver" chevron />
            <LabeledField label="Approve By Date" calendar />
            <LabeledField label="Identifier" chevron />
            <LabeledField label="Reason" />
          </div>
        </div>
      </div>
    </div>
  )
}

function LabeledText({ label, value, className = '' }) {
  return (
    <div className={`mt-[12px] grid grid-cols-[170px_1fr] items-center gap-x-[16px] ${className}`}>
      <span className="text-right text-[13px] font-semibold text-[#5b7690]">{label}:</span>
      <div className="flex min-h-[36px] items-center rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
        {value}
      </div>
    </div>
  )
}

function LabeledField({ label, value = '', chevron, calendar, required, className = '' }) {
  return (
    <div className={`mt-[12px] grid grid-cols-[170px_1fr] items-center gap-x-[16px] ${className}`}>
      <span className="text-right text-[13px] font-semibold text-[#5b7690]">
        {label}:{required ? <span className="text-[#d96c6c]"> *</span> : ''}
      </span>
      <div className={`flex min-h-[36px] items-center rounded-full border px-[14px] text-[13px] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ${
        required ? 'border-[#e9b3c1] bg-[#fdf6f8]' : 'border-[#d7e5ed] bg-[#fbfdfe]'
      }`}>
        <span className="min-w-0 flex-1 truncate text-ns-navy">{value}</span>
        {chevron && (
          <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0 fill-none stroke-ns-navy" strokeWidth="2.4">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        )}
        {calendar && (
          <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-ns-navy">
            <path d="M3 5h18v16H3V5zm2 5v9h14v-9H5zM7 2v4H5V2h2zm12 0v4h-2V2h2z" />
          </svg>
        )}
      </div>
    </div>
  )
}

function LabeledArea({ label, rows = 4 }) {
  return (
    <div className="mt-[12px] grid grid-cols-[170px_1fr] items-start gap-x-[16px]">
      <span className="pt-[8px] text-right text-[13px] font-semibold text-[#5b7690]">{label}:</span>
      <div className="rounded-[18px] border border-[#d7e5ed] bg-[#fbfdfe]" style={{ minHeight: `${rows * 32}px` }} />
    </div>
  )
}

function DateField({ label, value = '', compact = false }) {
  const labelWidth = compact ? 'w-[118px]' : 'w-[170px]'
  return (
    <div className={`mt-[12px] flex items-center gap-[16px] ${compact ? '' : ''}`}>
      <span className={`${labelWidth} shrink-0 text-right text-[13px] font-semibold text-[#5b7690]`}>{label}:</span>
      <div className="flex min-h-[36px] min-w-0 flex-1 items-center rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy">
        <span className="min-w-0 flex-1 truncate">{value}</span>
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-ns-navy">
          <path d="M3 5h18v16H3V5zm2 5v9h14v-9H5zM7 2v4H5V2h2zm12 0v4h-2V2h2z" />
        </svg>
      </div>
    </div>
  )
}

function Radio({ checked, label }) {
  return (
    <span className="flex items-center gap-[8px]">
      <span className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-2 ${checked ? 'border-ns-blue' : 'border-[#c7d6e0]'}`}>
        {checked && <span className="h-[8px] w-[8px] rounded-full bg-ns-blue" />}
      </span>
      <span>{label}</span>
    </span>
  )
}

function SaveIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[28px] w-[28px] fill-current">
      <path d="M4 3h13l3 3v15H4V3zm3 0v6h8V3H7zm1 11h8v5H8v-5z" />
    </svg>
  )
}

function QuestionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[26px] w-[26px] text-current">
      <circle cx="12" cy="12" r="10" className="fill-current" />
      <text x="12" y="17" textAnchor="middle" className="fill-white" style={{ fontSize: '14px', fontWeight: 700 }}>
        ?
      </text>
    </svg>
  )
}

