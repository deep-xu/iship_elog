import { useState } from 'react'
import {
  Checkbox,
  Chevron,
  DataTable,
  Field,
  MenuBar,
  PillButton,
  SectionCard,
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

const MENUS = ['File', 'Process', 'Items', 'Reports', 'Help']

const STAGES = ['Created', 'Authorized', 'Reviewed']

const TABS = [
  'Requisition Items',
  'Admin Info',
  'Remarks',
  'Documents',
  'Message',
  'File Attachments',
  'Status',
]

const ITEM_COLUMNS = [
  { label: '', width: 34 },
  { label: 'Itm', width: 48 },
  { label: 'Type', width: 62 },
  { label: 'Part Name', width: 148 },
  { label: 'Part Number', width: 132 },
  { label: 'ST', width: 46 },
  { label: 'Document', width: 108 },
  { label: 'Materia...', width: 96 },
  { label: 'Qty', width: 106 },
  { label: 'Unit', width: 66 },
  { label: 'On-Hand', width: 134 },
  { label: 'Est. Cost', width: 100 },
  { label: 'Ext. Cost', width: 100 },
]

const CONTRACT_COLUMNS = [
  { label: '', width: 34 },
  { label: 'Contract No.', width: 176 },
  { label: 'Title', width: 176 },
  { label: 'Effect', width: 176 },
  { label: 'Expires', width: 176 },
  { label: 'Contractor / Vendor', width: 214 },
]

export default function RequisitionWindow({ onMinimize, onClose, preview = false }) {
  const [activeTab, setActiveTab] = useState('Requisition Items')

  return (
    <WindowFrame>
      <TitleBar title="Requisition - New" onMinimize={onMinimize} onClose={onClose} preview={preview} />
      <MenuBar items={MENUS} />

      <Toolbar>
        <ToolIcon label="Save">
          <Save />
        </ToolIcon>
        <ToolIcon label="Copy">
          <Copy />
        </ToolIcon>
        <ToolIcon label="Requisition from contract" muted>
          <DocBadge text="RC" />
        </ToolIcon>
        <ToolIcon label="Add from hierarchy">
          <TreeT />
        </ToolIcon>
        <ToolIcon label="Add from parts" muted>
          <TreeKey />
        </ToolIcon>
        <ToolIcon label="Edit">
          <PencilT />
        </ToolIcon>
        <ToolIcon label="Link">
          <LinkKey />
        </ToolIcon>
        <ToolDivider />
        <ToolIcon label="Help">
          <HelpFilled />
        </ToolIcon>

        <div className="ml-auto">
          <PillButton>View Process Map</PillButton>
        </div>
      </Toolbar>

      <WindowBody>
        <WorkflowStepper
          subtitle="Track requisition from creation to review"
          stages={STAGES}
          currentIndex={0}
        />

        <div className="border-b border-[#e4edf3] bg-[#fcfeff] px-[18px] py-[18px]">
          <SectionHeader badge="Requisition Details" hint="Seaspan Benefactor" />

          <div className="grid gap-[16px] xl:grid-cols-2">
            <SectionCard caption="Order">
              <Field label="Req. No." value="AutoGen" labelWidth={108} />
              <Field label="Ship" value="Seaspan Benefactor" chevron labelWidth={108} />
              <Field label="Project" chevron dotted labelWidth={108} />
              <div className="flex items-center gap-[10px]">
                <div className="min-w-0 flex-1">
                  <Field label="Account" chevron dotted labelWidth={108} />
                </div>
                <PillButton variant="ghost">Budget</PillButton>
              </div>
              <Field label="Port" chevron dotted labelWidth={108} />
              <Field label="Cost Center" chevron dotted labelWidth={108} />
            </SectionCard>

            <SectionCard caption="Planning">
              <Field label="Equipment" chevron dotted labelWidth={130} />
              <Field label="Needed" calendar labelWidth={130} />
              <Field label="Department" chevron dotted labelWidth={130} />
              <Field label="WBS" chevron dotted labelWidth={130} />

              <div className="flex flex-wrap items-center gap-[12px]">
                <span className="w-[130px] shrink-0 text-right text-[13px] font-semibold text-[#5b7690]">
                  Priority:
                </span>
                <span className="flex h-[36px] w-[92px] items-center rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy">
                  <span className="flex-1">D</span>
                  <Chevron />
                </span>
                <Checkbox label="Save As Template" />
              </div>

              <div className="flex flex-wrap items-center gap-[20px] pl-[142px]">
                <Checkbox label="Ready To Be Authorized" />
                <Checkbox label="Ready To Be Reviewed" />
              </div>
            </SectionCard>
          </div>
        </div>

        <TabStrip tabs={TABS} active={activeTab} onChange={setActiveTab} />

        <div className="space-y-[14px] bg-white px-[16px] py-[14px]">
          {activeTab === 'Requisition Items' ? (
            <>
              <DataTable columns={ITEM_COLUMNS} rows={[]} emptyHeight="h-[170px]" />

              <div className="flex items-center justify-end gap-[12px]">
                <span className="text-[13px] font-semibold text-[#5b7690]">Total Cost:</span>
                <span className="flex h-[36px] w-[160px] items-center justify-end rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] font-semibold text-ns-navy">
                  0.00
                </span>
              </div>

              <div>
                <div className="mb-[8px] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#88a2bb]">
                  Contracts
                </div>
                <DataTable columns={CONTRACT_COLUMNS} rows={[]} emptyHeight="h-[110px]" />
              </div>
            </>
          ) : (
            <div className="h-[320px] rounded-[16px] border border-[#dce8ef] bg-white" />
          )}
        </div>
      </WindowBody>
    </WindowFrame>
  )
}

function Save() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <rect x="2" y="6" width="20" height="13" rx="2" className="fill-none stroke-current" strokeWidth="1.8" />
      <path d="M2 13h20" className="stroke-current" strokeWidth="1.8" />
      <circle cx="18" cy="16" r="1.2" className="fill-current" />
    </svg>
  )
}

function Copy() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <rect x="3" y="3" width="12" height="14" className="fill-none stroke-current" strokeWidth="1.8" />
      <rect x="8" y="7" width="12" height="14" className="fill-current" />
    </svg>
  )
}

function DocBadge({ text }) {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M5 2h9l5 5v15H5V2z" className="fill-none stroke-current" strokeWidth="1.6" />
      <path d="M14 2v5h5" className="fill-none stroke-current" strokeWidth="1.6" />
      <text x="12" y="18" textAnchor="middle" className="fill-current" style={{ fontSize: '7px', fontWeight: 700 }}>
        {text}
      </text>
    </svg>
  )
}

function TreeT() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <text x="3" y="9" className="fill-current" style={{ fontSize: '9px', fontWeight: 700 }}>
        T
      </text>
      <g className="fill-none stroke-current" strokeWidth="1.6">
        <path d="M11 5v13h4M11 11.5h4" />
      </g>
      <g className="fill-current">
        <rect x="15" y="3" width="5" height="4" />
        <rect x="15" y="9.5" width="5" height="4" />
        <rect x="15" y="16" width="5" height="4" />
      </g>
    </svg>
  )
}

function TreeKey() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <text x="2" y="9" className="fill-current" style={{ fontSize: '9px', fontWeight: 700 }}>
        T
      </text>
      <circle cx="9" cy="16" r="3.5" className="fill-none stroke-current" strokeWidth="1.8" />
      <path d="M12 15l9-3" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 12v3M16 13v3" className="stroke-current" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function PencilT() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <text x="2" y="9" className="fill-current" style={{ fontSize: '9px', fontWeight: 700 }}>
        T
      </text>
      <path d="M8 20l2-5 8-8 3 3-8 8-5 2z" className="fill-current" />
    </svg>
  )
}

function LinkKey() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="7" cy="15" r="4" className="fill-none stroke-current" strokeWidth="2" />
      <path d="M11 14l10-4" className="stroke-current" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 9v4M16 10v4" className="stroke-current" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function HelpFilled() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="12" cy="12" r="10" className="fill-current" />
      <text x="12" y="17" textAnchor="middle" className="fill-white" style={{ fontSize: '13px', fontWeight: 700 }}>
        ?
      </text>
    </svg>
  )
}
