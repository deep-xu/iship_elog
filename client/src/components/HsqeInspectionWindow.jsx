import { WorkflowStepper } from './windowChrome.jsx'

const PROCESS_STEPS = ['Created', 'Completed', 'Closed']

const DETAIL_TABS = [
  'Description',
  'Details',
  'Questionnaire',
  'Findings',
  'Participants',
  'Statements',
  'CARs',
  'Job Safety Analysis',
  "WO's/SR's",
]

const FOOTER_TABS = [
  'Job Safety Analysis',
  "WO's/SR's",
  'Certificates',
  'Requisitions',
  'File Attachments',
  'Message',
  'Status',
  'Purchasing Docs',
]

export default function HsqeInspectionWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#c7def0] bg-[linear-gradient(180deg,#f8fcff_0%,#edf5fb_100%)] shadow-[0_28px_60px_rgba(37,90,138,0.22)]">
      <div className="flex h-[62px] shrink-0 items-center border-b border-[#d8e7f3] bg-[linear-gradient(90deg,#f7fbff_0%,#eef7ff_52%,#fdfcff_100%)] px-[18px]">
        <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#5ab6ff,#6a7dff)] shadow-[0_12px_20px_rgba(90,182,255,0.28)]">
          <TargetIcon />
        </div>
        <span className="ml-[12px] text-[22px] font-bold text-ns-navy">
          Quality &amp; Compliance Inspection/Meeting/Drill - New
        </span>
        <div className="ml-auto flex items-center gap-[10px]">
          <button
            type="button"
            aria-label="Minimize"
            onClick={preview ? undefined : onMinimize}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-white/80 text-ns-navy shadow-[0_8px_18px_rgba(64,111,156,0.12)] transition hover:bg-white focus:outline-none"
          >
            <svg viewBox="0 0 20 12" className="h-[14px] w-[18px] stroke-current" strokeWidth="2.6">
              <line x1="3" y1="9" x2="17" y2="9" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={preview ? undefined : onClose}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-[#234770] text-white shadow-[0_10px_18px_rgba(35,71,112,0.28)] transition hover:bg-[#1d3c60] focus:outline-none"
          >
            <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] stroke-current" strokeWidth="2">
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-[16px]">
        <div className="min-h-[980px] min-w-[1280px] overflow-hidden rounded-[26px] border border-[#d5e7f5] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] shadow-[0_18px_40px_rgba(66,114,154,0.12)]">
          <WorkflowStepper
            subtitle="Track inspection from creation to closure"
            stages={PROCESS_STEPS}
            currentIndex={0}
          />
          <div className="border-t border-[#e4edf3] p-[12px]">
            <TopFields />
            <DetailTabs />
            <DescriptionPanel />
            <BottomTabs />
          </div>
        </div>
      </div>
    </div>
  )
}

function TopFields() {
  return (
    <div className="grid grid-cols-[1.05fr_1.15fr] gap-x-[34px]">
      <div>
        <LabeledText label="Number" value="AutoGen" />
        <LabeledField label="Type" chevron />
        <LabeledField label="Ship" value="Seaspan Benefactor" chevron />
        <LabeledField label="Authority" chevron />
        <LabeledField label="Place" />

        <div className="mt-[10px] pl-[144px]">
          <div className="flex items-center gap-[18px] text-[17px] text-ns-navy">
            <Radio checked label="At Sea" />
            <Radio label="In Port" />
            <Radio label="Remote" />
          </div>
        </div>

        <LabeledField label="Voyage No." className="mt-[12px]" />
        <LabeledText label="IMO No." value="9739666" />
        <LabeledField label="Reported By" />

        <div className="mt-[14px] pl-[144px]">
          <button
            type="button"
            className="rounded-[12px] bg-[linear-gradient(135deg,#244a72,#3a74aa)] px-[18px] py-[10px] text-[15px] font-semibold text-white shadow-[0_10px_20px_rgba(36,74,114,0.2)] focus:outline-none"
          >
            Link To Compliance Job
          </button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-[1fr_320px] gap-x-[22px]">
          <div>
            <LabeledField label="Title" required />
            <LabeledField label="Questionnaire" chevron />
            <LabeledField label="Ship Team" chevron />
            <LabeledField label="Doc Owner" value="Seaspan Breeze, Master" chevron />
            <LabeledField label="City, Country" chevron />
          </div>

          <div className="mt-[12px] rounded-[18px] border border-[#d9e7f2] bg-white p-[16px] shadow-[0_10px_24px_rgba(66,114,154,0.08)]">
            <DateField label="Scheduled" value="29-08-2026" />
            <DateField label="Date Time" value="29-08-2026" />
            <DateField label="Reported" value="29-08-2026" />
            <DateField label="Completed" />
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailTabs() {
  return (
    <div className="mt-[22px] border-t border-[#e5eef5] pt-[16px]">
      <div className="flex flex-wrap items-end gap-[12px] text-[18px] text-ns-navy">
        {DETAIL_TABS.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`rounded-full px-[18px] py-[8px] focus:outline-none ${
              index === 0
                ? 'bg-[linear-gradient(135deg,#2e77ff,#57c0ff)] font-semibold text-white shadow-[0_10px_20px_rgba(62,141,255,0.22)]'
                : 'bg-[#f2f7fb] text-[#6f86a0]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

function DescriptionPanel() {
  return (
    <div className="mt-[18px] space-y-[16px]">
      <LabeledArea label="Description" rows={8} />
      <LabeledArea label="Remarks" rows={4} />
      <LabeledArea label="Office Feedback" rows={4} />
    </div>
  )
}

function BottomTabs() {
  return (
    <div className="mt-[26px] border-t border-[#e5eef5] pt-[14px]">
      <div className="flex items-center gap-[12px] text-[18px] text-ns-navy">
        {FOOTER_TABS.map((tab) => (
          <button key={tab} type="button" className="rounded-full bg-[#f6f9fc] px-[14px] py-[8px] text-[#6f86a0] focus:outline-none">
            {tab}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-[12px] text-black">
          <span className="text-[22px]">&#9664;</span>
          <span className="text-[22px]">&#9654;</span>
          <span className="text-[18px]">&#9638;</span>
        </span>
      </div>
    </div>
  )
}

function LabeledText({ label, value, className = '' }) {
  return (
    <div className={`mt-[12px] flex items-center gap-[14px] ${className}`}>
      <span className="w-[130px] shrink-0 text-right text-[17px] text-ns-navy">{label}:</span>
      <div className="min-w-0 flex-1 rounded-[14px] border border-[#d9e7f2] bg-[#fbfdff] px-[14px] py-[9px] text-[17px] text-ns-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
        {value}
      </div>
    </div>
  )
}

function LabeledField({ label, value = '', chevron, required, className = '' }) {
  return (
    <div className={`mt-[12px] flex items-center gap-[14px] ${className}`}>
      <span className="w-[130px] shrink-0 text-right text-[17px] text-ns-navy">
        {label}:{required ? <span className="text-[#ff1a1a]"> *</span> : ''}
      </span>
      <div className={`flex min-w-0 flex-1 items-center rounded-[14px] border px-[14px] py-[9px] text-[17px] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ${
        required ? 'border-[#ff9ab6] bg-[#fff8fb]' : 'border-[#d9e7f2] bg-[#fbfdff]'
      }`}>
        <span className="min-w-0 flex-1 truncate text-ns-navy">{value}</span>
        {chevron && (
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-none stroke-ns-navy" strokeWidth="3">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        )}
      </div>
    </div>
  )
}

function LabeledArea({ label, rows = 4 }) {
  return (
    <div className="flex items-start gap-[14px]">
      <span className="w-[130px] shrink-0 pt-[8px] text-right text-[17px] text-ns-navy">{label}:</span>
      <div
        className="min-w-0 flex-1 rounded-[14px] border border-[#d9e7f2] bg-[#fbfdff] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
        style={{ minHeight: `${rows * 30}px` }}
      />
    </div>
  )
}

function DateField({ label, value = '' }) {
  return (
    <div className="mt-[12px] flex items-center gap-[12px]">
      <span className="w-[104px] shrink-0 text-right text-[15px] text-ns-navy">{label}:</span>
      <div className="flex min-w-0 flex-1 items-center rounded-[12px] border border-[#d9e7f2] bg-[#fbfdff] px-[12px] py-[8px] text-[15px] text-ns-navy">
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
      <span className={`flex h-[20px] w-[20px] items-center justify-center rounded-full border-[3px] ${checked ? 'border-[#2e77ff]' : 'border-[#a3b3c3]'}`}>
        {checked && <span className="h-[8px] w-[8px] rounded-full bg-[#2e77ff]" />}
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

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px] fill-none stroke-current" strokeWidth="2">
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M4 16V4h12" />
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

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 text-white">
      <circle cx="12" cy="12" r="9" className="fill-none stroke-current" strokeWidth="3" />
      <circle cx="12" cy="12" r="4" className="fill-current" />
    </svg>
  )
}
