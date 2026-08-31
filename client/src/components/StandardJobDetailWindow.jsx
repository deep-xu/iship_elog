import { useMemo, useState } from 'react'
import { getActiveStandardJobDetail } from '../data/surveyCertificateData.js'
import {
  MenuBar,
  SectionHeader,
  TitleBar,
  ToolDivider,
  ToolIcon,
  Toolbar,
  WindowFrame,
} from './windowChrome.jsx'

const TAB_DEFINITIONS = [
  { key: 'jobDescription', label: 'Job Description' },
  { key: 'resources', label: 'Resources' },
  { key: 'adminInfo', label: 'Admin Info' },
  { key: 'questionnaire', label: 'Questionnaire' },
  { key: 'materialsRequired', label: 'Materials Required' },
  { key: 'changeLog', label: 'Change Log' },
  { key: 'counterHistory', label: 'Counter History', disabled: true },
  { key: 'miscEquipment', label: 'Misc.Equipment', disabled: true },
  { key: 'tables', label: 'Tables' },
  { key: 'relatedJobs', label: 'Related Jobs' },
  { key: 'workOrders', label: 'Work Orders' },
  { key: 'certificates', label: 'Certificates' },
  { key: 'sources', label: 'Sources', disabled: true },
  { key: 'message', label: 'Message' },
  { key: 'fileAttachments', label: 'File Attachments' },
  { key: 'subItems', label: 'Sub-Items', disabled: true },
  { key: 'cmEquipments', label: 'CM Equipments', disabled: true },
  { key: 'notifications', label: 'Notifications' },
]

const TAB_MENUS = {
  default: ['File', 'Reports', 'Help'],
  resources: ['File', 'Reports', 'Help'],
  adminInfo: ['File', 'Job List', 'Reports', 'Help'],
  materialsRequired: ['File', 'Job Materials', 'Reports', 'Help'],
  tables: ['File', 'Tables', 'Reports', 'Help'],
  relatedJobs: ['File', 'Predecessors', 'Reports', 'Help'],
  workOrders: ['File', 'Work Orders', 'Reports', 'Help'],
  message: ['File', 'Messages', 'Reports', 'Help'],
  fileAttachments: ['File', 'Attachment', 'Reports', 'Help'],
}

const TAB_TOOLBARS = {
  default: ['save', 'copy', 'help'],
  resources: ['save', 'copy', 'help'],
  adminInfo: ['save', 'copy', 'link', 'delete', 'help'],
  materialsRequired: ['save', 'copy', 'filter', 'help'],
  tables: ['save', 'copy', 'folder', 'help'],
  relatedJobs: ['save', 'copy', 'link', 'folder', 'delete', 'help'],
  workOrders: ['save', 'copy', 'new', 'folder', 'help'],
  message: ['save', 'copy', 'mail', 'mailOpen', 'help'],
  fileAttachments: ['save', 'copy', 'link', 'folder', 'image', 'delete', 'help'],
}

export default function StandardJobDetailWindow({ onMinimize, onClose, preview = false }) {
  const detail = useMemo(() => getActiveStandardJobDetail(), [])
  const [activeTab, setActiveTab] = useState('jobDescription')

  const menus = TAB_MENUS[activeTab] ?? TAB_MENUS.default
  const toolbar = TAB_TOOLBARS[activeTab] ?? TAB_TOOLBARS.default

  return (
    <WindowFrame>
      <TitleBar
        title={`Standard Job - ${detail.title} - [${detail.jobCode}]`}
        onMinimize={onMinimize}
        onClose={onClose}
        preview={preview}
      />

      <MenuBar items={menus} />
      <Toolbar>
        {toolbar.map((item) => (
          <ToolIcon key={item} label={item}>
            <ToolbarGlyph type={item} />
          </ToolIcon>
        ))}
      </Toolbar>

      <div className="min-h-0 flex-1 overflow-auto bg-[#eef5fa] p-[14px]">
        <div className="min-h-full w-full min-w-0 overflow-hidden rounded-[24px] border border-[#dce8ef] bg-white shadow-[0_16px_38px_rgba(84,116,145,0.08)]">
          <div className="border-b border-[#e4edf3] bg-[linear-gradient(180deg,#fbfdff_0%,#f4f9fc_100%)] px-[18px] py-[16px]">
            <SectionHeader badge={detail.sectionLabel} hint="MV Genco" />
          </div>

          <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)] gap-[18px] px-[14px] py-[14px]">
            <FieldRow label="Job Title:" value={detail.title} action />
            <Panel title="JSA Requirement">
              <div className="grid grid-cols-[minmax(0,220px)_minmax(0,1fr)] items-center gap-x-[16px] gap-y-[10px]">
                <CheckboxLabel label="JSA Required" checked={detail.jsaRequired} />
                <InlineSelect label="Template:" value="" />
              </div>
            </Panel>
          </div>

          <div className="grid grid-cols-[minmax(180px,1.2fr)_minmax(220px,1.8fr)_minmax(180px,1.2fr)_minmax(180px,1.1fr)_minmax(220px,1.5fr)] gap-[14px] px-[14px]">
            <Panel title="Job Constraint">
              <RadioLabel label="Calendar-Based" checked={detail.jobConstraint === 'Calendar-Based'} />
              <RadioLabel label="Counter-Based" checked={detail.jobConstraint === 'Counter-Based'} />
            </Panel>

            <Panel title="">
              <CheckboxLabel label="Do not schedule during lay-up" checked={false} />
              <CheckboxLabel label="Inherent Predecessors" checked={false} />
            </Panel>

            <Panel title="Maintenance Trigger">
              <RadioLabel label="Grouped Counter" checked />
              <RadioLabel label="Individual Counter" checked={false} />
            </Panel>

            <Panel title="Schedule Based On">
              <RadioLabel label="Completion Date" checked />
              <RadioLabel label="Due Date" checked={false} />
            </Panel>

            <Panel title="PTW Requirement">
              <CheckboxLabel label="PTW Required" checked={detail.ptwRequired} />
              <InlineSelect label="Template:" value="" />
            </Panel>
          </div>

          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-[22px] gap-y-[10px] px-[18px] py-[18px] text-[13px] text-ns-navy">
            <InlineValue label="Calendar Interval:" value={detail.calendarIntervalValue} trailing={detail.calendarIntervalUnit} optionGroup={['Weeks', 'Months']} activeOption={detail.calendarIntervalUnit} />
            <InlineValue label="Job Size:" value={detail.jobSize} />
            <InlineValue label="Status:" value="" radioOptions={['Active', 'Dormant']} activeRadio={detail.status} />
            <CheckboxLabel label="WO Table Entries Required" checked={detail.woTableEntriesRequired} standalone />

            <InlineValue label="Counter Interval:" value={detail.counterIntervalValue} trailing={detail.counterIntervalUnit} checkboxLabel="vs Calendar" checked={false} />
            <InlineValue label="Job Counter:" value={detail.jobCounter} />
            <div />
            <CheckboxLabel label="WO Findings Required" checked={detail.woFindingsRequired} standalone />

            <InlineSelect label="Open Window:" value={detail.openWindowValue} tailValue={detail.openWindowUnit} />
            <InlineSelect label="Close Window:" value={detail.closeWindowValue} tailValue={detail.closeWindowUnit} />
            <InlineDate label="Last Done:" value={detail.lastDone} />
            <div />

            <InlineSelect label="Service:" value={detail.service} />
            <InlineSelect label="Questionnaire:" value={detail.questionnaire} />
            <InlineDate label="Last Due:" value={detail.lastDue} />
            <div />

            <div />
            <InlineSelect label="SI Reference:" value={detail.siReference} />
            <InlineSelect label="Vendor Analysis:" value={detail.vendorAnalysis} />
            <div />
          </div>

          <div className="border-t border-[#e4edf3]">
            <div className="flex items-stretch overflow-x-auto border-b border-[#e4edf3] bg-[#fbfdff]">
              {TAB_DEFINITIONS.map((tab) => {
                const isActive = tab.key === activeTab
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => !tab.disabled && setActiveTab(tab.key)}
                    className={`shrink-0 border-r border-[#e7eff4] px-[18px] py-[12px] text-[13px] transition focus:outline-none ${
                      tab.disabled
                        ? 'cursor-default text-[#b6c6d3]'
                        : isActive
                          ? 'bg-[linear-gradient(135deg,#2d86ca,#56ace4)] font-semibold text-white'
                          : 'text-[#5e7894] hover:bg-[#f4f9fc]'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
              <div className="ml-auto flex shrink-0 items-center gap-[14px] px-[12px] text-[#5e7894]">
                <span>◀</span>
                <span>▶</span>
                <span className="text-[18px]">▤</span>
              </div>
            </div>

            <div className="min-h-[365px] bg-white p-[14px]">
              {activeTab === 'jobDescription' ? <JobDescriptionTab detail={detail} /> : null}
              {activeTab === 'resources' ? <ResourcesTab detail={detail} /> : null}
              {activeTab === 'adminInfo' ? <AdminInfoTab detail={detail} /> : null}
              {activeTab === 'questionnaire' ? <QuestionnaireTab detail={detail} /> : null}
              {activeTab === 'materialsRequired' ? <MaterialsRequiredTab detail={detail} /> : null}
              {activeTab === 'changeLog' ? <ChangeLogTab detail={detail} /> : null}
              {activeTab === 'tables' ? <TablesTab detail={detail} /> : null}
              {activeTab === 'relatedJobs' ? <RelatedJobsTab detail={detail} /> : null}
              {activeTab === 'workOrders' ? <WorkOrdersTab detail={detail} /> : null}
              {activeTab === 'certificates' ? <CertificatesTab detail={detail} /> : null}
              {activeTab === 'message' ? <MessageTab detail={detail} /> : null}
              {activeTab === 'fileAttachments' ? <FileAttachmentsTab detail={detail} /> : null}
              {activeTab === 'notifications' ? <NotificationsTab detail={detail} /> : null}
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  )
}

function ToolbarGlyph({ type }) {
  if (type === 'save') return <span className="text-[24px]">▣</span>
  if (type === 'copy') return <span className="text-[24px]">⧉</span>
  if (type === 'link') return <span className="text-[24px]">⛓</span>
  if (type === 'delete') return <span className="text-[24px]">🗑</span>
  if (type === 'folder') return <span className="text-[24px]">🗀</span>
  if (type === 'new') return <span className="text-[24px]">📄</span>
  if (type === 'mail') return <span className="text-[24px]">✉</span>
  if (type === 'mailOpen') return <span className="text-[24px]">✉</span>
  if (type === 'image') return <span className="text-[24px]">▧</span>
  if (type === 'filter') return <span className="text-[24px]">⫶</span>
  return (
    <div className="flex h-[31px] w-[31px] items-center justify-center rounded-full bg-ns-blue text-[22px] font-bold text-white">
      ?
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <div className="min-h-[116px] min-w-0 rounded-[18px] border border-[#e4edf3] bg-white px-[16px] py-[14px] shadow-[0_8px_18px_rgba(84,116,145,0.05)]">
      {title ? <div className="mb-[12px] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#88a2bb]">{title}</div> : null}
      <div className="space-y-[8px]">{children}</div>
    </div>
  )
}

function FieldRow({ label, value, action = false }) {
  return (
    <div className="grid min-w-0 grid-cols-[132px_minmax(0,1fr)_42px] items-center gap-[10px]">
      <div className="text-right text-[13px] font-semibold text-[#5b7690]">{label}</div>
      <div className="flex min-h-[36px] min-w-0 items-center truncate rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy">
        {value}
      </div>
      <button
        type="button"
        aria-label="Browse"
        className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[#d7e5ed] bg-white text-[16px] text-ns-navy transition hover:bg-[#eef6fb] focus:outline-none"
      >
        {action ? '…' : ''}
      </button>
    </div>
  )
}

function CheckboxLabel({ label, checked, standalone = false }) {
  return (
    <label className={`flex min-w-0 items-center gap-[8px] text-[13px] text-ns-navy ${standalone ? 'pt-[4px]' : ''}`}>
      <span className={`flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[5px] border text-[11px] ${checked ? 'border-ns-blue bg-ns-blue text-white' : 'border-[#c7d6e0] bg-white'}`}>
        {checked ? '✓' : ''}
      </span>
      <span className="truncate">{label}</span>
    </label>
  )
}

function RadioLabel({ label, checked }) {
  return (
    <label className="flex min-w-0 items-center gap-[8px] text-[13px] text-ns-navy">
      <span className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-2 ${checked ? 'border-ns-blue' : 'border-[#c7d6e0]'}`}>
        {checked ? <span className="h-[8px] w-[8px] rounded-full bg-ns-blue" /> : null}
      </span>
      <span className="truncate">{label}</span>
    </label>
  )
}

function InlineValue({ label, value, trailing, optionGroup, activeOption, checkboxLabel, checked, radioOptions, activeRadio }) {
  return (
    <div className="flex min-w-0 items-center gap-[10px]">
      <span className="min-w-[132px] text-right text-[13px] font-semibold text-[#5b7690]">{label}</span>
      <div className="flex min-h-[36px] min-w-[72px] items-center rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy">{value}</div>
      {trailing ? <span className="text-[13px] text-[#5b7690]">{trailing}</span> : null}
      {optionGroup ? (
        <div className="flex min-w-0 flex-wrap items-center gap-x-[18px] gap-y-[8px]">
          {optionGroup.map((option) => (
            <RadioLabel key={option} label={option} checked={activeOption === option} />
          ))}
        </div>
      ) : null}
      {checkboxLabel ? <CheckboxLabel label={checkboxLabel} checked={checked} /> : null}
      {radioOptions ? (
        <div className="flex min-w-0 flex-wrap items-center gap-x-[18px] gap-y-[8px]">
          {radioOptions.map((option) => (
            <RadioLabel key={option} label={option} checked={activeRadio === option} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function InlineSelect({ label, value, tailValue }) {
  return (
    <div className="flex min-w-0 items-center gap-[10px]">
      <span className="min-w-[132px] text-right text-[13px] font-semibold text-[#5b7690]">{label}</span>
      <div className="flex min-h-[36px] min-w-0 flex-1 items-center justify-between rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy">
        <span className="truncate">{value}</span>
        <span className="text-[#7d95ad]">▾</span>
      </div>
      {tailValue ? <span className="shrink-0 text-[13px] text-[#5b7690]">{tailValue}</span> : null}
    </div>
  )
}

function InlineDate({ label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-[10px]">
      <span className="min-w-[120px] text-right text-[13px] font-semibold text-[#5b7690]">{label}</span>
      <div className="flex min-h-[36px] min-w-0 flex-1 items-center justify-between rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy">
        <span className="truncate">{value}</span>
        <span className="shrink-0 text-[#7d95ad]">🗓</span>
      </div>
    </div>
  )
}

function JobDescriptionTab({ detail }) {
  return (
    <div className="border border-[#d8d8d8]">
      <div className="border-b border-[#e4edf3] px-[14px] py-[8px] text-[13px] text-ns-navy">
        Standard Description
      </div>
      <div className="max-h-[300px] overflow-auto px-[18px] py-[16px] text-[13px] leading-[1.7] text-ns-navy">
        {detail.jobDescription.map((line, index) => (
          <div key={`${index}-${line || 'blank'}`} className={line.startsWith('Index:') ? 'mb-[8px]' : ''}>
            {line || <span>&nbsp;</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function ResourcesTab({ detail }) {
  return (
    <div className="space-y-[16px]">
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-[24px]">
        <InlineSelect label="Skills:" value={detail.resources.skills} />
        <div className="flex min-w-0 flex-wrap items-center gap-[12px] text-[13px] text-ns-navy">
          <span className="min-w-[120px] text-right">Est. Cost:</span>
          <div className="min-w-[120px] border-b border-[#d7e5ed] pb-[4px] text-right">{detail.resources.estCost}</div>
          <span>{detail.resources.currency}</span>
          <button type="button" className="bg-[#6a7184] px-[24px] py-[8px] font-semibold text-white">
            Generate Estimate
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-[24px] text-[13px] text-ns-navy">
        <span>Usual Method of Execution:</span>
        <RadioLabel label="Crew" checked={detail.resources.executionMethod === 'Crew'} />
        <RadioLabel label="Outside Contractor" checked={detail.resources.executionMethod === 'Outside Contractor'} />
      </div>

      <SimpleTable
        columns={[
          { key: 'owner', label: 'Owner', width: '120px', centered: true },
          { key: 'positionName', label: 'Position Name', width: '1fr' },
          { key: 'estManHours', label: 'Est. Man-Hrs', width: '220px', right: true },
        ]}
        rows={detail.resources.rows}
        rowHeight="46px"
        renderCell={(row, key) => {
          if (key === 'owner') return row.owner ? '✓' : ''
          return row[key]
        }}
      />
    </div>
  )
}

function AdminInfoTab({ detail }) {
  const info = detail.adminInfo
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[22px]">
      <div className="space-y-[12px] border border-[#d8d8d8] px-[18px] py-[16px]">
        <InlineSelect label="Account:" value={info.accountCode} tailValue={info.accountName} />
        <InlineSelect label="Department:" value={info.department} />
        <InlineSelect label="Job Category:" value={info.jobCategory} />
        <InlineSelect label="Item Category:" value={info.itemCategory} />

        <div className="mt-[20px] border border-[#d8d8d8]">
          <div className="flex items-center justify-between bg-ns-navy px-[14px] py-[8px] text-[16px] font-semibold text-white">
            <span>Job List Index Terms</span>
            <span>▾</span>
          </div>
          <div className="h-[150px] bg-white" />
        </div>
      </div>

      <div className="space-y-[12px] border border-[#d8d8d8] px-[18px] py-[16px]">
        <InlineSelect label="Class No.:" value={info.classNo} />
        <InlineSelect label="Coast Guard No.:" value={info.coastGuardNo} />
        <InlineSelect label="Priority:" value={info.priority} />
        <CheckboxLabel label="Event Job Only" checked={info.eventJobOnly} />
        <InlineSelect label="Standard Job Code:" value={info.standardJobCode} />
        <div className="border border-[#d8d8d8] px-[14px] py-[14px]">
          <div className="mb-[8px] text-[13px] text-ns-navy">Drydock</div>
          <CheckboxLabel label="Standard Drydock item" checked={info.drydock.standardItem} />
          <CheckboxLabel label="Include in Shipyard RFQ" checked={info.drydock.includeInShipyardRfq} />
        </div>
      </div>
    </div>
  )
}

function QuestionnaireTab() {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-[16px]">
      <div className="h-[260px] border border-[#d8d8d8] bg-white" />
      <div className="flex flex-col gap-[10px]">
        <div className="h-[160px] rounded-[16px] border border-[#dce8ef] bg-[#eef5fa]" />
        <div className="h-[120px] border border-[#d8d8d8] bg-white" />
        <div className="mt-auto flex justify-between gap-[12px]">
          <button type="button" className="min-w-[180px] bg-[#666c80] px-[20px] py-[12px] font-semibold text-white">
            PREVIOUS
          </button>
          <button type="button" className="min-w-[220px] bg-[#666c80] px-[20px] py-[12px] font-semibold text-white">
            GENERATE FINDINGS
          </button>
          <button type="button" className="min-w-[180px] bg-[#666c80] px-[20px] py-[12px] font-semibold text-white">
            NEXT
          </button>
        </div>
      </div>
    </div>
  )
}

function MaterialsRequiredTab({ detail }) {
  return (
    <SimpleTable
      columns={[
        { key: 'shipName', label: 'Ship Name', width: '220px' },
        { key: 'equipment', label: 'Equipment', width: '280px' },
        { key: 'partName', label: 'Part Name', width: '280px' },
        { key: 'partNo', label: 'Part No.', width: '220px' },
        { key: 'qty', label: 'Qty', width: '180px', centered: true },
        { key: 'uom', label: 'UOM', width: '180px', centered: true },
      ]}
      rows={detail.materialsRows}
    />
  )
}

function ChangeLogTab({ detail }) {
  return (
    <SimpleTable
      columns={[
        { key: 'action', label: 'Action', width: '1fr' },
        { key: 'by', label: 'By', width: '1fr' },
        { key: 'actedOn', label: 'Acted On', width: '240px' },
      ]}
      rows={detail.changeLogRows}
    />
  )
}

function TablesTab({ detail }) {
  return (
    <SimpleTable
      columns={[
        { key: 'index', label: 'Index', width: '1fr' },
        { key: 'description', label: 'Description', width: '1fr' },
        { key: 'columns', label: 'Columns', width: '260px' },
      ]}
      rows={detail.tablesRows}
    />
  )
}

function RelatedJobsTab({ detail }) {
  return (
    <div className="space-y-[14px]">
      <SimpleTable
        columns={[
          { key: 'jobName', label: 'Job Name', width: '1fr' },
          { key: 'interval', label: 'Interval', width: '240px' },
          { key: 'lastDone', label: 'Last Done', width: '240px' },
        ]}
        rows={detail.relatedJobs.rows}
      />
      <div className="flex flex-wrap border border-[#d8d8d8]">
        {detail.relatedJobs.footerTabs.map((tab, index) => (
          <div
            key={tab}
            className={`px-[18px] py-[10px] text-[16px] ${
              index === 0 ? 'bg-[linear-gradient(135deg,#2d86ca,#56ace4)] font-semibold text-white' : 'text-ns-navy'
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  )
}

function WorkOrdersTab({ detail }) {
  return (
    <div className="space-y-[12px]">
      <SimpleTable
        columns={[
          { key: 'type', label: 'Type', width: '180px' },
          { key: 'number', label: 'Number', width: '150px' },
          { key: 'title', label: 'Title', width: '1fr' },
          { key: 'status', label: 'Status', width: '120px', centered: true },
          { key: 'scDate', label: 'S/C Date', width: '200px', centered: true },
          { key: 'cost', label: 'Cost( USD)', width: '210px', right: true },
          { key: 'contractor', label: 'Contractor', width: '320px' },
          { key: 'event', label: 'Event', width: '320px' },
          { key: 'findings', label: 'F', width: '80px', centered: true },
        ]}
        rows={detail.workOrders.rows}
      />
    </div>
  )
}

function CertificatesTab({ detail }) {
  return (
    <div className="space-y-[12px]">
      <SimpleTable
        columns={[
          { key: 'certificate', label: 'Certificate', width: '1fr' },
          { key: 'type', label: 'Type', width: '320px' },
          { key: 'code', label: 'Code', width: '320px' },
        ]}
        rows={detail.certificatesRows}
      />
    </div>
  )
}

function MessageTab({ detail }) {
  return (
    <div className="space-y-[12px]">
      <SimpleTable
        columns={[
          { key: 'from', label: 'From', width: '260px' },
          { key: 'subject', label: 'Subject', width: '1fr' },
          { key: 'sendDate', label: 'Send Date', width: '240px' },
          { key: 'priority', label: 'Pri', width: '80px', centered: true },
          { key: 'permission', label: 'Perm', width: '90px', centered: true },
        ]}
        rows={detail.messageRows}
      />
    </div>
  )
}

function FileAttachmentsTab({ detail }) {
  return (
    <div className="space-y-[12px]">
      <SimpleTable
        columns={[
          { key: 'attachment', label: 'Attachment', width: '1fr' },
          { key: 'size', label: 'Size', width: '220px', centered: true },
          { key: 'type', label: 'Type', width: '220px', centered: true },
          { key: 'replicate', label: 'Replicate', width: '220px', centered: true },
        ]}
        rows={detail.fileAttachmentsRows}
      />
    </div>
  )
}

function NotificationsTab({ detail }) {
  return (
    <div className="space-y-[12px]">
      <SimpleTable
        columns={[
          { key: 'lookAhead', label: 'Look Ahead Day', width: '1fr' },
          { key: 'user', label: 'User', width: '1fr' },
          { key: 'userRole', label: 'User Role', width: '1fr' },
        ]}
        rows={detail.notificationsRows}
      />
    </div>
  )
}

function SimpleTable({ columns, rows, renderCell, rowHeight = '54px' }) {
  return (
    <div className="overflow-x-auto border border-[#d8d8d8]">
      <div
        className="grid bg-ns-navy text-[16px] font-semibold text-white"
        style={{ gridTemplateColumns: columns.map((column) => column.width).join(' ') }}
      >
        {columns.map((column) => (
          <div key={column.key} className="border-r border-white/20 px-[10px] py-[9px] text-center last:border-r-0">
            {column.label}
          </div>
        ))}
      </div>

      <div className="min-h-[160px] bg-white">
        {rows.length === 0 ? (
          <div className="h-[120px] bg-white" />
        ) : (
          rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid border-t border-[#e4edf3] bg-ns-navy text-[13px] text-white first:border-t-0"
              style={{
                gridTemplateColumns: columns.map((column) => column.width).join(' '),
                minHeight: rowHeight,
              }}
            >
              {columns.map((column) => (
                <div
                  key={column.key}
                  className={`px-[10px] py-[9px] ${
                    column.centered ? 'text-center' : column.right ? 'text-right' : 'truncate'
                  }`}
                >
                  {renderCell ? renderCell(row, column.key) : row[column.key] ?? ''}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
