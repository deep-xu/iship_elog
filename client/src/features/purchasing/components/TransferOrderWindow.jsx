import { useState } from 'react'
import {
  DataTable,
  Field,
  MenuBar,
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
} from '@/components/ui/windowChrome.jsx'

const MENUS = ['File', 'Process', 'Items', 'Reports', 'Help']

const STAGES = ['Created', 'Issued', 'Shipped', 'Delivered']

const TABS = ['TO Items', 'Admin Info', 'Remarks', 'Status', 'Message', 'Documents']

const TO_COLUMNS = [
  { label: 'Itm', width: 74 },
  { label: 'Source Part Name', width: 210 },
  { label: 'Type', width: 110 },
  { label: 'Unit Cost', width: 132 },
  { label: 'Qty', width: 104 },
  { label: 'Unit', width: 96 },
  { label: 'Destination Part Name', width: 220 },
  { label: 'Type', width: 110 },
  { label: 'Req.Qty', width: 104 },
]

export default function TransferOrderWindow({ onMinimize, onClose, preview = false }) {
  const [activeTab, setActiveTab] = useState('TO Items')

  return (
    <WindowFrame>
      <TitleBar title="Transfer Order - New" onMinimize={onMinimize} onClose={onClose} preview={preview} />
      <MenuBar items={MENUS} />

      <Toolbar>
        <ToolIcon label="Save">
          <Save />
        </ToolIcon>
        <ToolIcon label="Send">
          <MailArrow />
        </ToolIcon>
        <ToolIcon label="Add from cart" muted>
          <Cart />
        </ToolIcon>
        <ToolIcon label="Add from hierarchy">
          <TreeT />
        </ToolIcon>
        <ToolIcon label="Add from requisition" muted>
          <TreeRE />
        </ToolIcon>
        <ToolDivider />
        <ToolIcon label="Help">
          <HelpFilled />
        </ToolIcon>
      </Toolbar>

      <WindowBody>
        <WorkflowStepper
          subtitle="Track transfer from creation to delivery"
          stages={STAGES}
          currentIndex={0}
        />

        <div className="border-b border-[#e4edf3] bg-[#fcfeff] px-[18px] py-[18px]">
          <SectionHeader
            badge="Transfer Order Details"
            hint="Set the order header, then pick source and destination."
          />

          <div className="grid gap-[16px] xl:grid-cols-[minmax(340px,1fr)_minmax(340px,1fr)]">
            <SectionCard caption="Order">
              <Field label="TO No." value="AutoGen" labelWidth={150} />
              <Field label="Fiscal Effective Date" value="08/23/2026" calendar labelWidth={150} />
            </SectionCard>

            <SectionCard caption="Totals">
              <Field label="Number of Packages" labelWidth={150} />
              <Field label="Total Weight" labelWidth={150} />
              <Field label="Total Volume" labelWidth={150} />
            </SectionCard>

            <SectionCard caption="Source">
              <Field label="Location" value="Seaspan Benefactor" chevron labelWidth={86} />
              <Field label="Account" chevron dotted labelWidth={86} />
              <Field label="Project" chevron dotted labelWidth={86} />
            </SectionCard>

            <SectionCard caption="Destination">
              <Field label="Location" chevron labelWidth={86} />
              <Field label="Account" chevron dotted labelWidth={86} />
              <Field label="Project" chevron dotted labelWidth={86} />
            </SectionCard>
          </div>
        </div>

        <TabStrip tabs={TABS} active={activeTab} onChange={setActiveTab} />

        <div className="bg-white px-[16px] py-[14px]">
          {activeTab === 'TO Items' ? (
            <DataTable columns={TO_COLUMNS} rows={[]} emptyHeight="h-[320px]" />
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

function MailArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M8 5h14v14H8V5z" className="fill-current" />
      <path d="M1 12h7M4 9l-3 3 3 3" className="fill-none stroke-current" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function Cart() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 14.8l.03-.12.9-1.68h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49L19.16 4l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 16.37 5.48 18 7 18h12v-2H7.42c-.14 0-.25-.11-.22-.2z" />
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

function TreeRE() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <text x="2" y="10" className="fill-current" style={{ fontSize: '10px', fontWeight: 700 }}>
        T
      </text>
      <text x="11" y="18" className="fill-current" style={{ fontSize: '8px', fontWeight: 700 }}>
        RE
      </text>
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
