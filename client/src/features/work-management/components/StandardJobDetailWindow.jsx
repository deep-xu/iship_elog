import { useMemo, useRef, useState } from 'react'
import { getActiveStandardJobDetail } from '@/data/surveyCertificateData.js'
import { saveRelatedJobsForSource } from '@/stores/relatedJobsStore.js'
import { findWorkOrdersForStandardJob } from '@/stores/createdWorkOrdersStore.js'
import { saveCreatedStandardJob } from '@/stores/createdStandardJobsStore.js'
import { PLAN_ROWS } from '@/data/maintenancePlan.js'
import EquipmentTreePanel from '@/features/equipment/components/EquipmentTreePanel.jsx'
import StandardJobPickerPanel from '@/features/work-management/components/StandardJobPickerPanel.jsx'
import {
  MenuBar,
  TitleBar,
  ToolDivider,
  ToolIcon,
  Toolbar,
  WindowFrame,
} from '@/components/ui/windowChrome.jsx'
import { loadDocument, saveDocument } from '@/stores/documentsStore.js'

const RA_TEMPLATES = ['', 'General Risk Assessment', 'Hot Work', 'Enclosed Space Entry', 'Working Aloft']
const PTW_TEMPLATES = ['', 'Hot Work Permit', 'Enclosed Space Permit', 'Electrical Isolation Permit']
const SERVICE_OPTIONS = ['', 'Class Survey', 'Maker Service', 'In-House', 'Outside Contractor']
const VENDOR_ANALYSIS_OPTIONS = ['', 'Required', 'Not Required']
const RANKS_OPTIONS = ['', 'Master', 'Chief Officer', 'Chief Engineer', 'Second Engineer', 'Third Engineer', 'Electrical Officer']

const INTERVAL_UNITS = ['Hours', 'Days', 'Weeks', 'Months', 'Years']

function loadSavedStandardJob(key) {
  return loadDocument(key, {})
}

// Rows saved before equipment tags existed on Related Jobs entries won't have
// majorSystem/subSystem/component — fill those in from the PMS plan by job
// name so they still show up on the matching Equipment/Part window.
function backfillJobTags(row) {
  if (row.component || row.subSystem || row.majorSystem) {
    return row
  }
  const match = PLAN_ROWS.find((planRow) => planRow.jobTitle === row.jobName)
  if (!match) {
    return row
  }
  return {
    ...row,
    jobSize: row.jobSize ?? 1,
    price: row.price ?? '0.0000',
    status: row.status ?? match.status,
    majorSystem: match.majorSystem,
    subSystem: match.subSystem,
    component: match.component,
  }
}

const TAB_DEFINITIONS = [
  { key: 'jobDescription', label: 'Job Description' },
  { key: 'resources', label: 'Resources' },
  { key: 'adminInfo', label: 'Admin Info' },
  { key: 'changeLog', label: 'Change Log' },
  { key: 'relatedJobs', label: 'Related Jobs' },
  { key: 'workOrders', label: 'Work Orders' },
  { key: 'certificates', label: 'Certificates' },
  { key: 'fileAttachments', label: 'File Attachments' },
]

const TAB_MENUS = {
  default: ['File', 'Reports', 'Help'],
  resources: ['File', 'Reports', 'Help'],
  adminInfo: ['File', 'Job List', 'Reports', 'Help'],
  relatedJobs: ['File', 'Predecessors', 'Reports', 'Help'],
  workOrders: ['File', 'Work Orders', 'Reports', 'Help'],
  fileAttachments: ['File', 'Attachment', 'Reports', 'Help'],
}

const TAB_TOOLBARS = {
  default: ['save', 'copy', 'help'],
  resources: ['save', 'copy', 'help'],
  adminInfo: ['save', 'copy', 'link', 'delete', 'help'],
  relatedJobs: ['save', 'copy', 'link', 'folder', 'delete', 'help'],
  workOrders: ['save', 'copy', 'new', 'folder', 'help'],
  fileAttachments: ['save', 'copy', 'link', 'folder', 'image', 'delete', 'help'],
}

export default function StandardJobDetailWindow({ payload, onMinimize, onClose, preview = false }) {
  const detail = useMemo(() => getActiveStandardJobDetail(), [])
  // Set when this window was opened by double-clicking a row in Standard Job
  // Query — seeds the form with that job's data instead of a blank record.
  const sourceRow = payload ?? null

  // Records are kept per source row (so different query jobs don't clobber
  // each other); with no source row this is the one "new job" draft.
  const storageKey = `ns5-standard-job-${sourceRow?.jobNo ?? 'draft'}`
  const saved = useMemo(() => loadSavedStandardJob(storageKey), [storageKey])

  const [activeTab, setActiveTab] = useState('jobDescription')
  const [equipmentPanelOpen, setEquipmentPanelOpen] = useState(false)
  const [equipmentSelection, setEquipmentSelection] = useState(saved.equipmentSelection ?? [])
  const [equipmentPathOverride, setEquipmentPathOverride] = useState(
    saved.equipmentPathOverride ??
      (sourceRow ? [sourceRow.ship, sourceRow.majorSystem, sourceRow.component].filter(Boolean).join(' * ') : ''),
  )
  const [form, setForm] = useState(() => ({
    category: detail.categoryLabel ?? 'Machinery',
    jobTitle: sourceRow?.jobTitle ?? '',
    raRequired: detail.jsaRequired,
    raTemplate: '',
    ptwRequired: detail.ptwRequired,
    ptwTemplate: '',
    jobConstraint: detail.jobConstraint,
    trigger: 'Grouped Counter',
    scheduleBasedOn: 'Completion Date',
    calendarIntervalValue: detail.calendarIntervalValue,
    calendarIntervalUnit: detail.calendarIntervalUnit,
    jobSize: detail.jobSize,
    status: detail.status,
    counterIntervalValue: detail.counterIntervalValue,
    vsCalendar: false,
    jobCounter: detail.jobCounter,
    remainingHours: detail.remainingHours ?? '',
    woTableEntriesRequired: detail.woTableEntriesRequired,
    woFindingsRequired: detail.woFindingsRequired,
    openWindowValue: detail.openWindowValue,
    openWindowUnit: detail.openWindowUnit,
    graceValue: detail.closeWindowValue,
    graceUnit: detail.closeWindowUnit,
    lastDone: sourceRow ? fromDateInput(sourceRow.completionDate) : detail.lastDone,
    lastDue: detail.lastDue,
    standardIndex: sourceRow ? `Standard Jobs*${sourceRow.majorSystem ?? ''}` : '',
    standardDescription: sourceRow?.remarks ?? '',
    vesselDescription: '',
    service: sourceRow?.department || detail.service,
    vendorAnalysis: detail.vendorAnalysis,
    ranks: detail.ranks ?? '',
    ...saved.form,
  }))

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  // Falls back to whatever seeded the form (a query-grid row) until equipment
  // is picked from the tree, which then takes over.
  const equipmentPath = equipmentSelection.length ? equipmentSelection[0].path.join(' * ') : equipmentPathOverride

  const [relatedJobs, setRelatedJobs] = useState(() => (saved.relatedJobs ?? []).map(backfillJobTags))
  const [jobPickerOpen, setJobPickerOpen] = useState(false)

  function addRelatedJobsFromPicker(pickedRows) {
    setRelatedJobs((current) => {
      const existingNames = new Set(current.map((row) => row.jobName))
      const additions = pickedRows
        .filter((row) => !existingNames.has(row.jobTitle))
        .map((row) => ({
          id: `related-${row.jobNo}`,
          jobName: row.jobTitle,
          interval: row.interval,
          lastDone: row.lastDone,
          // Kept so this job can also show up on that equipment's own
          // "Standard Jobs" tab.
          jobSize: 1,
          price: '0.0000',
          status: row.status,
          majorSystem: row.majorSystem,
          subSystem: row.subSystem,
          component: row.component,
        }))
      return [...current, ...additions]
    })
    setJobPickerOpen(false)
  }

  function updateRelatedJob(id, field, value) {
    setRelatedJobs((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  function removeRelatedJob(id) {
    setRelatedJobs((current) => current.filter((row) => row.id !== id))
  }

  const [savedMessage, setSavedMessage] = useState('')
  const savedMessageTimeout = useRef(null)
  // Stable job number for this record: the row it was opened from, one saved
  // earlier for this draft, or a fresh one for a brand-new standard job.
  const createdJobNoRef = useRef(
    sourceRow?.jobNo ?? saved.createdRow?.jobNo ?? `SJ-${Date.now().toString().slice(-6)}`,
  )

  function buildStandardJobRow() {
    const path = equipmentSelection.length ? equipmentSelection[0].path : []
    const intervalValue = form.calendarIntervalValue ?? ''
    const intervalUnit = form.calendarIntervalUnit ?? ''
    return {
      ship: 'MV Genco',
      jobNo: createdJobNoRef.current,
      majorSystem: path[0] || sourceRow?.majorSystem || '',
      subSystem: path.length > 2 ? path[path.length - 2] : sourceRow?.subSystem || '',
      component: path[path.length - 1] || sourceRow?.component || '',
      jobTitle: form.jobTitle || sourceRow?.jobTitle || 'Untitled Standard Job',
      basis: intervalUnit ? 'Calendar' : sourceRow?.basis || '',
      interval: [intervalValue, intervalUnit].filter(Boolean).join(' ') || sourceRow?.interval || '',
      lastDone: form.lastDone || sourceRow?.lastDone || '',
      nextDue: form.lastDue || sourceRow?.nextDue || '',
      status: form.status || sourceRow?.status || 'OK',
      critical: sourceRow?.critical || 'N',
      classRelated: sourceRow?.classRelated || 'N',
      department: sourceRow?.department || 'Engine Department',
      responsible: form.ranks || sourceRow?.responsible || sourceRow?.performedBy || '',
      linkedPartNo: sourceRow?.linkedPartNo || '',
      stockQty: sourceRow?.stockQty ?? '',
      stockStatus: sourceRow?.stockStatus || '',
      remarks: form.standardDescription || form.vesselDescription || sourceRow?.remarks || '',
    }
  }

  function handleSave() {
    try {
      const createdRow = buildStandardJobRow()
      const stored = saveDocument(storageKey, {
        form,
        relatedJobs,
        equipmentSelection,
        equipmentPathOverride,
        createdRow,
      })
      saveRelatedJobsForSource(storageKey, relatedJobs)
      saveCreatedStandardJob(createdRow)
      setSavedMessage(stored ? 'All changes saved.' : 'Save is unavailable.')
    } catch {
      setSavedMessage('Save is unavailable.')
    }
    window.clearTimeout(savedMessageTimeout.current)
    savedMessageTimeout.current = window.setTimeout(() => setSavedMessage(''), 3000)
  }

  const menus = TAB_MENUS[activeTab] ?? TAB_MENUS.default
  const toolbar = TAB_TOOLBARS[activeTab] ?? TAB_TOOLBARS.default

  return (
    <WindowFrame>
      <TitleBar
        title="Standard Job"
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

      <div className="flex min-h-0 flex-1">
      <div className="min-h-0 min-w-0 flex-1 overflow-auto bg-[#eef5fa] p-[14px]">
        <div className="min-h-full w-full min-w-0 overflow-hidden rounded-[24px] border border-[#dce8ef] bg-white shadow-[0_16px_38px_rgba(84,116,145,0.08)]">
          <div className="border-b border-[#e4edf3] bg-[linear-gradient(180deg,#fbfdff_0%,#f4f9fc_100%)] px-[18px] py-[14px]">
            <div className="flex min-w-0 items-center gap-[12px]">
              <input
                type="text"
                aria-label="Equipment category"
                value={form.category}
                onChange={(event) => setField('category', event.target.value)}
                className="h-[38px] w-[190px] shrink-0 rounded-full border border-[#d7e5ed] bg-white px-[16px] text-[13px] font-semibold text-[#5b7690] outline-none focus:border-ns-blue"
              />
              <div className="flex h-[38px] min-w-0 flex-1 items-center truncate rounded-full bg-[#eaf1f7] px-[16px] text-[13px] font-semibold text-ns-navy">
                {equipmentPath}
              </div>
              <button
                type="button"
                aria-pressed={equipmentPanelOpen}
                onClick={() => {
                  setJobPickerOpen(false)
                  setEquipmentPanelOpen((current) => !current)
                }}
                className="h-[38px] shrink-0 rounded-full bg-[linear-gradient(135deg,#1c4c7c,#2d86ca)] px-[24px] text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(28,76,124,0.22)] transition hover:brightness-110 focus:outline-none"
              >
                Equipment
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[18px] px-[14px] py-[14px] xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)]">
            <FieldRow
              label="Job Title:"
              value={form.jobTitle}
              onChange={(value) => setField('jobTitle', value)}
              action
            />
            <Panel title="Requirements">
              <div className="grid grid-cols-[minmax(max-content,1fr)_max-content] items-center gap-x-[14px] gap-y-[10px]">
                <CheckboxLabel
                  label="RA Required"
                  checked={form.raRequired}
                  onChange={(value) => setField('raRequired', value)}
                />
                <InlineSelect
                  label="Template:"
                  value={form.raTemplate}
                  onChange={(value) => setField('raTemplate', value)}
                  options={RA_TEMPLATES}
                  compact
                />
                <CheckboxLabel
                  label="PTW Required"
                  checked={form.ptwRequired}
                  onChange={(value) => setField('ptwRequired', value)}
                />
                <InlineSelect
                  label="Template:"
                  value={form.ptwTemplate}
                  onChange={(value) => setField('ptwTemplate', value)}
                  options={PTW_TEMPLATES}
                  compact
                />
              </div>
            </Panel>
          </div>

          <div className="grid grid-cols-1 gap-[14px] px-[14px] md:grid-cols-3">
            <Panel title="Trigger">
              {['Grouped Counter', 'Individual Counter'].map((option) => (
                <RadioLabel
                  key={option}
                  name="job-trigger"
                  label={option}
                  checked={form.trigger === option}
                  onChange={() => setField('trigger', option)}
                />
              ))}
            </Panel>

            <Panel title="Schedule Based On">
              {['Completion Date', 'Due Date'].map((option) => (
                <RadioLabel
                  key={option}
                  name="schedule-based-on"
                  label={option}
                  checked={form.scheduleBasedOn === option}
                  onChange={() => setField('scheduleBasedOn', option)}
                />
              ))}
            </Panel>

          </div>

          <div className="flex flex-col gap-[12px] px-[18px] py-[18px] text-[13px] text-ns-navy">
            <FormRow>
              <div className="flex flex-col gap-[12px]">
                <IntervalBasisValue
                  basis={form.jobConstraint}
                  onBasisChange={(value) => setField('jobConstraint', value)}
                  calendarValue={form.calendarIntervalValue}
                  onCalendarValueChange={(value) => setField('calendarIntervalValue', value)}
                  calendarUnit={form.calendarIntervalUnit}
                  onCalendarUnitChange={(value) => setField('calendarIntervalUnit', value)}
                  counterValue={form.counterIntervalValue}
                  onCounterValueChange={(value) => setField('counterIntervalValue', value)}
                  counterUnit={detail.counterIntervalUnit}
                />
                <InlineValue
                  label="Job Opens:"
                  value={form.openWindowValue}
                  onValueChange={(value) => setField('openWindowValue', value)}
                  unitOptions={INTERVAL_UNITS}
                  unitValue={form.openWindowUnit}
                  onUnitChange={(value) => setField('openWindowUnit', value)}
                />
              </div>
              <InlineValue
                label="Status:"
                radioOptions={['Active', 'Dormant']}
                activeRadio={form.status}
                radioName="job-status"
                onRadioChange={(value) => setField('status', value)}
              />
              <div className="flex flex-col gap-[12px]">
                <InlineValue
                  label="Current Running Hour:"
                  value={form.jobCounter}
                  onValueChange={(value) => setField('jobCounter', value)}
                />
                <InlineValue
                  label="Remaining Hours:"
                  value={form.remainingHours}
                  onValueChange={(value) => setField('remainingHours', value)}
                />
              </div>
            </FormRow>

            <FormRow>
              <div className="pl-[190px]">
                <CheckboxLabel
                  label="WO Findings Required"
                  checked={form.woFindingsRequired}
                  onChange={(value) => setField('woFindingsRequired', value)}
                  standalone
                />
              </div>
              <CheckboxLabel
                label="WO Table Entries Required"
                checked={form.woTableEntriesRequired}
                onChange={(value) => setField('woTableEntriesRequired', value)}
                standalone
              />
              <InlineValue
                label="Grace:"
                value={form.graceValue}
                onValueChange={(value) => setField('graceValue', value)}
                unitOptions={INTERVAL_UNITS}
                unitValue={form.graceUnit}
                onUnitChange={(value) => setField('graceUnit', value)}
              />
            </FormRow>

            <FormRow>
              <div />
              <InlineDate label="Last Done:" value={form.lastDone} onChange={(value) => setField('lastDone', value)} />
              <InlineDate label="Last Due:" value={form.lastDue} onChange={(value) => setField('lastDue', value)} />
            </FormRow>

            <FormRow>
              <InlineSelect
                label="Service:"
                value={form.service}
                onChange={(value) => setField('service', value)}
                options={SERVICE_OPTIONS}
              />
              <InlineSelect
                label="Vendor Analysis:"
                value={form.vendorAnalysis}
                onChange={(value) => setField('vendorAnalysis', value)}
                options={VENDOR_ANALYSIS_OPTIONS}
              />
              <InlineSelect
                label="Ranks:"
                value={form.ranks}
                onChange={(value) => setField('ranks', value)}
                options={RANKS_OPTIONS}
              />
            </FormRow>
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
              {activeTab === 'jobDescription' ? <JobDescriptionTab form={form} setField={setField} /> : null}
              {activeTab === 'resources' ? <ResourcesTab detail={detail} /> : null}
              {activeTab === 'adminInfo' ? <AdminInfoTab detail={detail} /> : null}
              {activeTab === 'changeLog' ? <ChangeLogTab detail={detail} /> : null}
              {activeTab === 'relatedJobs' ? (
                <RelatedJobsTab
                  rows={relatedJobs}
                  onAdd={() => {
                    setEquipmentPanelOpen(false)
                    setJobPickerOpen(true)
                  }}
                  onChange={updateRelatedJob}
                  onRemove={removeRelatedJob}
                />
              ) : null}
              {activeTab === 'workOrders' ? (
                <WorkOrdersTab detail={detail} jobNo={sourceRow?.jobNo} />
              ) : null}
              {activeTab === 'certificates' ? <CertificatesTab detail={detail} /> : null}
              {activeTab === 'fileAttachments' ? <FileAttachmentsTab detail={detail} /> : null}
            </div>
          </div>
        </div>
      </div>

      {equipmentPanelOpen ? (
        <div className="w-[380px] shrink-0">
          <EquipmentTreePanel
            title={`Equipment Structure${equipmentSelection.length ? ` (${equipmentSelection.length})` : ''}`}
            onClose={() => setEquipmentPanelOpen(false)}
            onApply={(selection) => {
              setEquipmentSelection(selection)
              setField(
                'jobTitle',
                [...new Set(selection.map((item) => item.equipmentLabel))].join(' , '),
              )
              setEquipmentPanelOpen(false)
            }}
          />
        </div>
      ) : null}

      {jobPickerOpen ? (
        <div className="w-[380px] shrink-0">
          <StandardJobPickerPanel onClose={() => setJobPickerOpen(false)} onApply={addRelatedJobsFromPicker} />
        </div>
      ) : null}
      </div>

      <div className="flex h-[52px] shrink-0 items-center justify-end gap-[14px] border-t border-[#e4edf3] bg-[#f5f8fb] px-[18px]">
        {savedMessage ? <span className="text-[13px] font-semibold text-[#2f9d69]">{savedMessage}</span> : null}
        <button
          type="button"
          onClick={handleSave}
          className="rounded-[8px] bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[26px] py-[9px] text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(46,139,207,0.24)] transition hover:brightness-110 focus:outline-none"
        >
          Save
        </button>
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

function FieldRow({ label, value, onChange, action = false }) {
  return (
    <div className="grid min-w-0 grid-cols-[118px_minmax(0,1fr)_42px] items-center gap-[10px]">
      <div className="text-right text-[13px] font-semibold text-[#5b7690]">{label}</div>
      <input
        type="text"
        aria-label={label}
        {...bind(value, onChange)}
        className="h-[36px] min-w-0 rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy outline-none focus:border-ns-blue"
      />
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

// Controlled when a change handler is supplied, otherwise the control keeps its
// own state so every field on the form can still be filled in.
function bind(value, onChange, { type = 'value' } = {}) {
  const key = type === 'checked' ? 'checked' : 'value'
  const defaultKey = type === 'checked' ? 'defaultChecked' : 'defaultValue'

  if (!onChange) {
    return { [defaultKey]: value ?? (type === 'checked' ? false : '') }
  }

  return {
    [key]: value ?? (type === 'checked' ? false : ''),
    onChange: (event) => onChange(type === 'checked' ? event.target.checked : event.target.value),
  }
}

// One visual row of up to three fields, each pinned to its own column so
// removing/merging a field in one row never shifts fields in the rows below.
function FormRow({ children }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-[16px] gap-y-[12px] xl:grid-cols-3">{children}</div>
  )
}

function CheckboxLabel({ label, checked, onChange, standalone = false }) {
  return (
    <label className={`flex shrink-0 items-center gap-[8px] text-[13px] text-ns-navy ${standalone ? 'pt-[4px]' : ''}`}>
      <input
        type="checkbox"
        {...bind(checked, onChange, { type: 'checked' })}
        className="h-[16px] w-[16px] shrink-0 accent-ns-blue"
      />
      <span className="whitespace-nowrap">{label}</span>
    </label>
  )
}

function RadioLabel({ label, checked, onChange, name }) {
  return (
    <label className="flex shrink-0 items-center gap-[8px] text-[13px] text-ns-navy">
      <input
        type="radio"
        name={name}
        {...bind(checked, onChange && (() => onChange(label)), { type: 'checked' })}
        className="h-[15px] w-[15px] shrink-0 accent-ns-blue"
      />
      <span className="whitespace-nowrap">{label}</span>
    </label>
  )
}

// Merges the old "Calendar Interval" / "Counter Interval" rows into one: a
// small toggle picks the basis, and only that basis's value/unit is shown.
function IntervalBasisValue({
  basis,
  onBasisChange,
  calendarValue,
  onCalendarValueChange,
  calendarUnit,
  onCalendarUnitChange,
  counterValue,
  onCounterValueChange,
  counterUnit,
}) {
  const isCalendar = basis !== 'Counter-Based'

  return (
    <div className="flex min-w-0 items-center gap-[10px]">
      <span className="w-[140px] shrink-0 whitespace-nowrap text-right text-[13px] font-semibold text-[#5b7690]">
        Interval:
      </span>
      <div className="flex shrink-0 overflow-hidden rounded-full border border-[#d7e5ed] bg-[#fbfdfe] text-[12px] font-semibold">
        {['Calendar', 'Counter'].map((option) => {
          const active = isCalendar ? option === 'Calendar' : option === 'Counter'
          return (
            <button
              key={option}
              type="button"
              onClick={() => onBasisChange(option === 'Calendar' ? 'Calendar-Based' : 'Counter-Based')}
              className={`h-[36px] px-[14px] transition focus:outline-none ${
                active ? 'bg-ns-blue text-white' : 'text-[#5b7690] hover:bg-[#eef5fb]'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
      {isCalendar ? (
        <>
          <input
            type="text"
            aria-label="Calendar Interval"
            {...bind(calendarValue, onCalendarValueChange)}
            className="h-[36px] w-[64px] shrink-0 rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[12px] text-[13px] text-ns-navy outline-none focus:border-ns-blue"
          />
          <select
            aria-label="Calendar Interval unit"
            {...bind(calendarUnit, onCalendarUnitChange)}
            className="h-[36px] w-[110px] shrink-0 rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[12px] text-[13px] text-ns-navy outline-none focus:border-ns-blue"
          >
            {INTERVAL_UNITS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <input
            type="text"
            aria-label="Counter Interval"
            {...bind(counterValue, onCounterValueChange)}
            className="h-[36px] w-[64px] shrink-0 rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[12px] text-[13px] text-ns-navy outline-none focus:border-ns-blue"
          />
          <span className="shrink-0 text-[13px] text-[#5b7690]">{counterUnit}</span>
        </>
      )}
    </div>
  )
}

function InlineValue({
  label,
  value,
  onValueChange,
  trailing,
  unitOptions,
  unitValue,
  onUnitChange,
  optionGroup,
  activeOption,
  optionName,
  onOptionChange,
  checkboxLabel,
  checked,
  onCheckedChange,
  radioOptions,
  activeRadio,
  radioName,
  onRadioChange,
}) {
  const options = optionGroup ?? radioOptions
  const selected = optionGroup ? activeOption : activeRadio
  const groupName = optionName ?? radioName
  const onGroupChange = onOptionChange ?? onRadioChange

  return (
    <div className="flex min-w-0 items-center gap-[10px]">
      <span className="w-[190px] shrink-0 whitespace-nowrap text-right text-[13px] font-semibold text-[#5b7690]">{label}</span>
      {value !== undefined ? (
        <input
          type="text"
          aria-label={label}
          {...bind(value, onValueChange)}
          className="h-[36px] w-[64px] shrink-0 rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[12px] text-[13px] text-ns-navy outline-none focus:border-ns-blue"
        />
      ) : null}
      {unitOptions ? (
        <select
          aria-label={`${label} unit`}
          {...bind(unitValue, onUnitChange)}
          className="h-[36px] w-[110px] shrink-0 rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[12px] text-[13px] text-ns-navy outline-none focus:border-ns-blue"
        >
          {unitOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : null}
      {trailing && !unitOptions ? (
        <span className="shrink-0 text-[13px] text-[#5b7690]">{trailing}</span>
      ) : null}
      {options ? (
        <div className="flex shrink-0 items-center gap-x-[18px] whitespace-nowrap">
          {options.map((option) => (
            <RadioLabel
              key={option}
              name={groupName}
              label={option}
              checked={selected === option}
              onChange={onGroupChange}
            />
          ))}
        </div>
      ) : null}
      {checkboxLabel ? (
        <CheckboxLabel label={checkboxLabel} checked={checked} onChange={onCheckedChange} />
      ) : null}
    </div>
  )
}

function InlineSelect({ label, value, onChange, options, tailValue, compact = false }) {
  const choices = options ?? ['', value].filter((choice, index, list) => list.indexOf(choice) === index)

  return (
    <div className="flex min-w-0 items-center gap-[10px]">
      <span
        className={`shrink-0 text-right text-[13px] font-semibold text-[#5b7690] ${
          compact ? 'w-auto' : 'w-[108px]'
        }`}
      >
        {label}
      </span>
      <select
        aria-label={label}
        {...bind(value, onChange)}
        className="h-[36px] w-[158px] shrink-0 rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[12px] text-[13px] text-ns-navy outline-none focus:border-ns-blue"
      >
        {choices.map((choice) => (
          <option key={choice || 'blank'} value={choice}>
            {choice}
          </option>
        ))}
      </select>
      {tailValue ? <span className="shrink-0 text-[13px] text-[#5b7690]">{tailValue}</span> : null}
    </div>
  )
}

function InlineDate({ label, value, onChange }) {
  return (
    <div className="flex min-w-0 items-center gap-[10px]">
      <span className="w-[98px] shrink-0 text-right text-[13px] font-semibold text-[#5b7690]">{label}</span>
      <input
        type="date"
        aria-label={label}
        {...bind(toDateInput(value), onChange && ((next) => onChange(fromDateInput(next))))}
        className="h-[36px] w-[158px] shrink-0 rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[12px] text-[13px] text-ns-navy outline-none focus:border-ns-blue"
      />
    </div>
  )
}

// The records carry MM/DD/YYYY; <input type="date"> wants YYYY-MM-DD.
function toDateInput(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value ?? '')
  return match ? `${match[3]}-${match[1]}-${match[2]}` : ''
}

function fromDateInput(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '')
  return match ? `${match[2]}/${match[3]}/${match[1]}` : ''
}

function JobDescriptionTab({ form, setField }) {
  return (
    <div className="space-y-[16px]">
      <Fieldset legend="Standard Description">
        <div className="mb-[12px] flex items-center gap-[10px]">
          <span className="shrink-0 text-[13px] font-semibold text-[#5b7690]">Index:</span>
          <input
            type="text"
            aria-label="Index"
            value={form.standardIndex}
            onChange={(event) => setField('standardIndex', event.target.value)}
            className="h-[32px] min-w-0 flex-1 border-b border-[#d7e5ed] bg-transparent px-[4px] text-[13px] text-ns-navy outline-none focus:border-ns-blue"
          />
        </div>
        <textarea
          aria-label="Standard Description"
          value={form.standardDescription}
          onChange={(event) => setField('standardDescription', event.target.value)}
          className="h-[240px] w-full resize-y rounded-[8px] border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] py-[12px] text-[13px] leading-[1.7] text-ns-navy outline-none focus:border-ns-blue"
        />
      </Fieldset>

      <Fieldset legend="Vessel Specific Description">
        <textarea
          aria-label="Vessel Specific Description"
          value={form.vesselDescription}
          onChange={(event) => setField('vesselDescription', event.target.value)}
          className="h-[200px] w-full resize-y rounded-[8px] border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] py-[12px] text-[13px] leading-[1.7] text-ns-navy outline-none focus:border-ns-blue"
        />
      </Fieldset>
    </div>
  )
}

function Fieldset({ legend, children }) {
  return (
    <fieldset className="rounded-[14px] border border-[#dce8ef] px-[16px] pb-[16px] pt-[6px]">
      <legend className="px-[6px] text-[12px] font-semibold uppercase tracking-[0.12em] text-[#88a2bb]">
        {legend}
      </legend>
      {children}
    </fieldset>
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
        <RadioLabel name="execution-method" label="Crew" checked={detail.resources.executionMethod === 'Crew'} />
        <RadioLabel
          name="execution-method"
          label="Outside Contractor"
          checked={detail.resources.executionMethod === 'Outside Contractor'}
        />
      </div>

      <SimpleTable
        columns={[
          { key: 'owner', label: 'Owner', width: '120px', centered: true },
          { key: 'positionName', label: 'Position Name', width: '1fr' },
          { key: 'estManHours', label: 'Est. Man-Hrs', width: '220px', right: true },
        ]}
        rows={[]}
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
      </div>
    </div>
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
      rows={[]}
    />
  )
}

function RelatedJobsTab({ rows, onAdd, onChange, onRemove }) {
  return (
    <div className="space-y-[12px]">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-[6px] rounded-full bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[16px] py-[7px] text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(46,139,207,0.2)] transition hover:brightness-110 focus:outline-none"
        >
          <svg viewBox="0 0 24 24" className="h-[13px] w-[13px] stroke-current" strokeWidth="2.4" fill="none" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Job
        </button>
      </div>

      <div className="overflow-x-auto border border-[#d8d8d8]">
        <div
          className="grid bg-ns-navy text-[16px] font-semibold text-white"
          style={{ gridTemplateColumns: '1fr 220px 200px 52px' }}
        >
          {['Job Name', 'Interval', 'Last Done', ''].map((label) => (
            <div key={label} className="border-r border-white/20 px-[10px] py-[9px] text-center last:border-r-0">
              {label}
            </div>
          ))}
        </div>

        <div className="min-h-[300px] bg-white">
          {rows.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center text-[13px] text-[#8da3b7]">
              No related jobs yet — use “Add Job” to add one.
            </div>
          ) : (
            rows.map((row) => (
              <div
                key={row.id}
                className="grid items-center border-t border-[#e4edf3] text-[13px] text-ns-navy first:border-t-0"
                style={{ gridTemplateColumns: '1fr 220px 200px 52px', minHeight: '48px' }}
              >
                <input
                  type="text"
                  aria-label="Job Name"
                  value={row.jobName}
                  onChange={(event) => onChange(row.id, 'jobName', event.target.value)}
                  className="h-[34px] min-w-0 border-r border-[#eef4f8] bg-transparent px-[10px] outline-none focus:bg-[#f4f9fc]"
                />
                <input
                  type="text"
                  aria-label="Interval"
                  value={row.interval}
                  onChange={(event) => onChange(row.id, 'interval', event.target.value)}
                  className="h-[34px] min-w-0 border-r border-[#eef4f8] bg-transparent px-[10px] text-center outline-none focus:bg-[#f4f9fc]"
                />
                <input
                  type="text"
                  aria-label="Last Done"
                  value={row.lastDone}
                  onChange={(event) => onChange(row.id, 'lastDone', event.target.value)}
                  className="h-[34px] min-w-0 border-r border-[#eef4f8] bg-transparent px-[10px] text-center outline-none focus:bg-[#f4f9fc]"
                />
                <button
                  type="button"
                  aria-label="Remove job"
                  onClick={() => onRemove(row.id)}
                  className="flex h-full items-center justify-center text-[16px] text-[#b14d4d] transition hover:bg-[#fff4f4] focus:outline-none"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function WorkOrdersTab({ detail, jobNo }) {
  const rows = useMemo(() => {
    return findWorkOrdersForStandardJob(jobNo).map((wo, index) => {
      const snapshot = wo.formSnapshot ?? {}
      const status = wo.workflowStatus
        ? wo.workflowStatus.charAt(0).toUpperCase() + wo.workflowStatus.slice(1)
        : 'Active'
      return {
        id: wo.jobNo ? `${wo.jobNo}-${index}` : `wo-${index}`,
        type: snapshot.cmType || 'Work Order',
        number: wo.jobNo || '',
        title: wo.jobTitle || '',
        status,
        scDate: wo.completionDate || '',
        cost: '',
        contractor: wo.performedBy || '',
        event: snapshot.eventType || wo.eventType || '',
        findings: '',
      }
    })
  }, [jobNo])

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
        rows={rows}
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
        rows={[]}
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

function SimpleTable({ columns, rows, renderCell, rowHeight = '54px', highlighted = false }) {
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

      <div className="min-h-[300px] bg-white">
        {rows.length === 0 ? (
          <div className="h-[300px] bg-white" />
        ) : (
          rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid border-t border-[#e4edf3] text-[13px] first:border-t-0 ${
                highlighted ? 'bg-[#2d6ee0] text-white' : 'bg-white text-ns-navy'
              }`}
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
