import { useMemo, useState } from 'react'
import {
  getActiveWorkOrderDetail,
  getBlankWorkOrderDetail,
  getWorkOrderDetailFromRow,
} from '@/data/workOrderDetailData.js'
import { WORK_ORDER_SEARCH_COLUMNS } from '@/data/workOrderSearch.js'
import {
  loadCreatedWorkOrders,
  saveCreatedWorkOrders,
} from '@/stores/createdWorkOrdersStore.js'
import {
  SectionHeader,
  TitleBar as ChromeTitleBar,
  WindowBody,
  WindowFrame,
} from '@/components/ui/windowChrome.jsx'
import StandardJobPickerPanel from '@/features/work-management/components/StandardJobPickerPanel.jsx'

const WORK_ORDER_TABS = ['All', 'Active', 'Approvals', 'Closed', 'Deferred', 'Cancelled']
const DETAIL_TABS = [
  'Description',
  'JSA/Work Permit',
  'Work Certificates',
  'Findings',
  'Admin Info',
  'Materials',
  'Certificates',
  'Resources',
  'Status',
  'RA For WO Deferral',
  'Equipment/Space/Structure',
  'File Attachments',
  'Prev. Findings',
  'Failures',
  'Technical Defect',
]

export default function WorkOrderWindow({ payload, currentUserId = '', onMinimize, onClose, preview = false }) {
  const [openedRow, setOpenedRow] = useState(() => payload ?? null)
  const [created, setCreated] = useState(Boolean(payload))
  const detail = useMemo(
    () => {
      if (openedRow) return getWorkOrderDetailFromRow(openedRow)
      if (created) return getBlankWorkOrderDetail()
      return getActiveWorkOrderDetail()
    },
    [created, openedRow],
  )
  const [activeTab, setActiveTab] = useState('All')
  const [detailTab, setDetailTab] = useState('Description')
  const [jsaPermitTab, setJsaPermitTab] = useState('RA')
  const [standardJobPickerOpen, setStandardJobPickerOpen] = useState(false)
  const [selectedStandardJobs, setSelectedStandardJobs] = useState([])
  const [createdWorkOrders, setCreatedWorkOrders] = useState(loadCreatedWorkOrders)
  const [search, setSearch] = useState('')
  const isChiefEngineer = currentUserId === 'mv_ce'

  function handleHistoryRowDoubleClick(row) {
    if (row.workflowStatus === 'approvals' && !isChiefEngineer) {
      return
    }
    setOpenedRow(row)
    setCreated(true)
    setDetailTab('Description')
    setJsaPermitTab('RA')
  }

  function handleSaveWorkOrder(form) {
    const today = new Date().toISOString().slice(0, 10)
    const isDeferred = Boolean(form.ext)
    const row = {
      ...openedRow,
      ship: form.shipName || openedRow?.ship || 'MV Genco',
      jobNo: form.woNumber || openedRow?.jobNo || `WO-${Date.now().toString().slice(-6)}`,
      jobTitle: form.title || openedRow?.jobTitle || 'Untitled Work Order',
      majorSystem: form.equipment || openedRow?.majorSystem || '',
      component: form.equipment || openedRow?.component || '',
      completionDate: form.completed || openedRow?.completionDate || today,
      readingAtCompletion: form.scheduled || openedRow?.readingAtCompletion || '',
      department: openedRow?.department || 'Engine Department',
      performedBy: form.performBy || openedRow?.performedBy || '',
      deferredDate: form.ext || '',
      grace: form.grace || '',
      standardJobNo: form.standardJobNo || openedRow?.standardJobNo || '',
      remarks: isDeferred ? 'Deferral - pending approval' : openedRow?.remarks || 'Created from Work Order form',
      // A deferral needs approval first; it only moves to the Deferred tab once approved.
      workflowStatus: isDeferred ? 'approvals' : openedRow?.workflowStatus || 'active',
      pendingDeferral: isDeferred || undefined,
      formSnapshot: { ...openedRow?.formSnapshot, ...form },
    }
    setCreatedWorkOrders((current) => {
      const next = [row, ...current.filter((item) => item.jobNo !== row.jobNo)]
      saveCreatedWorkOrders(next)
      return next
    })
    setSelectedStandardJobs([])
    setActiveTab(isDeferred ? 'Approvals' : 'Active')
    setOpenedRow(null)
    setCreated(false)
  }

  function handleApprove(form) {
    const toDeferred = Boolean(openedRow?.pendingDeferral || form.ext)
    const row = {
      ...openedRow,
      ship: form.shipName || openedRow?.ship || 'MV Genco',
      jobNo: form.woNumber || openedRow?.jobNo || `WO-${Date.now().toString().slice(-6)}`,
      jobTitle: form.title || openedRow?.jobTitle || 'Untitled Work Order',
      majorSystem: openedRow?.majorSystem || form.equipment || '',
      component: openedRow?.component || form.equipment || '',
      completionDate: form.completed || openedRow?.completionDate || new Date().toISOString().slice(0, 10),
      readingAtCompletion: form.scheduled || openedRow?.readingAtCompletion || '',
      department: openedRow?.department || 'Engine Department',
      performedBy: form.performBy || openedRow?.performedBy || 'Chief Engineer',
      remarks: toDeferred ? 'Deferred' : 'Approved',
      // An approved deferral lands in the Deferred tab; everything else closes.
      workflowStatus: toDeferred ? 'deferred' : 'closed',
      pendingDeferral: undefined,
      formSnapshot: { ...openedRow?.formSnapshot, ...form },
    }

    setCreatedWorkOrders((current) => {
      const next = [row, ...current.filter((item) => item.jobNo !== row.jobNo)]
      saveCreatedWorkOrders(next)
      return next
    })
    setActiveTab(toDeferred ? 'Deferred' : 'Closed')
    setOpenedRow(null)
    setCreated(false)
  }

  function handleReject(form) {
    const row = {
      ...openedRow,
      ship: form.shipName || openedRow?.ship || 'MV Genco',
      jobNo: form.woNumber || openedRow?.jobNo || `WO-${Date.now().toString().slice(-6)}`,
      jobTitle: form.title || openedRow?.jobTitle || 'Untitled Work Order',
      majorSystem: openedRow?.majorSystem || form.equipment || '',
      component: openedRow?.component || form.equipment || '',
      completionDate: form.completed || openedRow?.completionDate || new Date().toISOString().slice(0, 10),
      readingAtCompletion: form.scheduled || openedRow?.readingAtCompletion || '',
      department: openedRow?.department || 'Engine Department',
      performedBy: form.performBy || openedRow?.performedBy || 'Chief Engineer',
      remarks: 'Rejected',
      workflowStatus: 'cancelled',
      pendingDeferral: undefined,
      formSnapshot: { ...openedRow?.formSnapshot, ...form },
    }

    setCreatedWorkOrders((current) => {
      const next = [row, ...current.filter((item) => item.jobNo !== row.jobNo)]
      saveCreatedWorkOrders(next)
      return next
    })
    setActiveTab('Cancelled')
    setOpenedRow(null)
    setCreated(false)
  }

  function handleRequestApproval(form) {
    const today = new Date().toISOString().slice(0, 10)
    const row = {
      ship: form.shipName || openedRow?.ship || 'MV Genco',
      jobNo: form.woNumber || openedRow?.jobNo || `WO-${Date.now().toString().slice(-6)}`,
      jobTitle: form.title || openedRow?.jobTitle || 'Untitled Work Order',
      majorSystem: openedRow?.majorSystem || form.equipment || '',
      component: openedRow?.component || form.equipment || '',
      completionDate: form.completed || openedRow?.completionDate || today,
      readingAtCompletion: form.scheduled || openedRow?.readingAtCompletion || '',
      department: openedRow?.department || 'Engine Department',
      performedBy: form.performBy || openedRow?.performedBy || '',
      remarks: form.ext ? 'Deferral - pending approval' : openedRow?.remarks || 'Requested for approval',
      standardJobNo: form.standardJobNo || openedRow?.standardJobNo || '',
      workflowStatus: 'approvals',
      pendingDeferral: form.ext ? true : openedRow?.pendingDeferral || undefined,
      formSnapshot: { ...openedRow?.formSnapshot, ...form },
    }

    setCreatedWorkOrders((current) => {
      const next = [row, ...current.filter((item) => item.jobNo !== row.jobNo)]
      saveCreatedWorkOrders(next)
      return next
    })
    setSelectedStandardJobs([])
    setActiveTab('Approvals')
    setOpenedRow(null)
    setCreated(false)
  }

  if (created) {
    return (
      <WindowFrame>
        <ChromeTitleBar title={detail.titleBar} onMinimize={onMinimize} onClose={onClose} preview={preview} />
        <WindowBody>
          <WorkOrderDetail
            detail={detail}
            activeTab={detailTab}
            onTabChange={setDetailTab}
            jsaPermitTab={jsaPermitTab}
            onJsaPermitTabChange={setJsaPermitTab}
            standardJobPickerOpen={standardJobPickerOpen}
            selectedStandardJobs={selectedStandardJobs}
            onOpenStandardJobPicker={() => setStandardJobPickerOpen(true)}
            onCloseStandardJobPicker={() => setStandardJobPickerOpen(false)}
            onApplyStandardJobs={(jobs) => {
              setSelectedStandardJobs(jobs)
              setStandardJobPickerOpen(false)
            }}
            workflowStatus={openedRow?.workflowStatus}
            onCancel={() => setCreated(false)}
            onSave={handleSaveWorkOrder}
            onRequestApproval={
              openedRow && openedRow.workflowStatus !== 'approvals' ? handleRequestApproval : undefined
            }
            onApprove={
              openedRow?.workflowStatus === 'approvals' && isChiefEngineer ? handleApprove : undefined
            }
            onReject={
              openedRow?.workflowStatus === 'approvals' && isChiefEngineer ? handleReject : undefined
            }
          />
        </WindowBody>
      </WindowFrame>
    )
  }

  return (
    <WindowFrame>
      <TitleBar title="Work Order" onMinimize={onMinimize} onClose={onClose} preview={preview} />

      <div className="flex min-h-0 flex-1 flex-col bg-[#eef5fa] p-[14px]">
        <div className="mb-[14px] flex shrink-0 items-center justify-between gap-[12px]">
          <div className="flex min-w-0 flex-1 overflow-x-auto">
            {WORK_ORDER_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 border-b-2 px-[16px] py-[8px] text-[13px] font-semibold transition focus:outline-none ${
                  activeTab === tab
                    ? 'border-ns-blue text-ns-blue'
                    : 'border-transparent text-[#7a91a8] hover:text-ns-navy'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative shrink-0">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-[12px] top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#8aa0b4]">
              <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
              <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search work orders"
              className="h-[38px] w-[240px] rounded-full border border-[#dbe7ef] bg-[#f8fbfe] pl-[34px] pr-[14px] text-[13px] text-ns-navy outline-none placeholder:text-[#9db0c2] focus:border-ns-blue"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setOpenedRow(null)
              setSelectedStandardJobs([])
              setDetailTab('Description')
              setJsaPermitTab('RA')
              setCreated(true)
            }}
            className="shrink-0 rounded-[10px] bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[22px] py-[9px] text-[14px] font-semibold text-white shadow-[0_14px_26px_rgba(46,139,207,0.24)] focus:outline-none"
          >
            + Create
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[12px] border border-[#dce8ef] bg-white shadow-[0_16px_38px_rgba(84,116,145,0.08)]">
          <WorkOrderHistory
            activeTab={activeTab}
            createdRows={createdWorkOrders}
            search={search}
            onRowActivate={handleHistoryRowDoubleClick}
          />
        </div>
      </div>
    </WindowFrame>
  )
}

function WorkOrderHistory({ activeTab = 'All', createdRows = [], search = '', onRowActivate }) {
  const keys = WORK_ORDER_SEARCH_COLUMNS.map((col) => col.key)
  const WORKFLOW_STATUSES = ['active', 'approvals', 'closed', 'deferred', 'cancelled']
  // Only workflow rows are shown. "All" aggregates every workflow tab;
  // each other tab filters that same set by status.
  const merged =
    activeTab === 'All'
      ? createdRows.filter((row) => WORKFLOW_STATUSES.includes(row.workflowStatus))
      : createdRows.filter((row) => row.workflowStatus === activeTab.toLowerCase())

  const term = search.trim().toLowerCase()
  const rows = term
    ? merged.filter((row) => keys.some((key) => String(row[key] ?? '').toLowerCase().includes(term)))
    : merged

  return (
    <div className="min-h-0 flex-1 overflow-auto bg-white">
      <div className="min-w-[1180px]">
        <div className="sticky top-0 z-10 flex bg-ns-navy text-white">
          {WORK_ORDER_SEARCH_COLUMNS.map((col, index) => (
            <div
              key={`${col.label}-${index}`}
              className="flex flex-1 items-center justify-center border-r border-white/20 px-[10px] py-[10px] text-[13px] font-semibold"
            >
              {col.label}
            </div>
          ))}
        </div>
        {rows.length === 0 ? (
          <div className="px-[16px] py-[40px] text-center text-[13px] text-[#7a91a8]">
            No {activeTab.toLowerCase()} work orders.
          </div>
        ) : null}
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            onDoubleClick={() => onRowActivate?.(row)}
            className={`flex border-b border-[#e4edf3] text-[13px] text-ns-navy odd:bg-[#fbfdfe] ${
              onRowActivate ? 'cursor-pointer' : ''
            }`}
          >
            {keys.map((key, index) => (
              <div key={index} className="flex-1 truncate border-r border-[#eef4f8] px-[10px] py-[10px]">
                {row[key] ?? ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function TitleBar({ title, onMinimize, onClose, preview }) {
  return (
    <div className="flex h-[62px] shrink-0 items-center border-b border-[#e1ecf2] bg-white pl-[20px]">
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
        <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
      </svg>
      <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">{title}</span>
      <div className="ml-auto flex items-center gap-[10px] pr-[14px]">
        <button
          type="button"
          aria-label="Minimize"
          onClick={preview ? undefined : onMinimize}
          className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[#8aa0b4] transition hover:bg-[#eef6fb] hover:text-ns-navy focus:outline-none"
        >
          <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-current" strokeWidth="1.9">
            <line x1="3" y1="11" x2="13" y2="11" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Close"
          onClick={preview ? undefined : onClose}
          className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[#8aa0b4] transition hover:bg-[#eef6fb] hover:text-ns-navy focus:outline-none"
        >
          <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-current" strokeWidth="1.9">
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function Toolbar({ items }) {
  return (
    <div className="flex h-[58px] shrink-0 items-center gap-[4px] border-b border-[#e4edf3] bg-white px-[18px]">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className="flex h-[32px] w-[32px] items-center justify-center rounded-[10px] text-ns-navy hover:bg-[#eef6fb]"
        >
          <ToolbarGlyph type={item} />
        </button>
      ))}

      <div className="ml-auto">
        <SearchBar />
      </div>
    </div>
  )
}

function WorkOrderDetail({
  detail,
  activeTab,
  onTabChange,
  jsaPermitTab,
  onJsaPermitTabChange,
  standardJobPickerOpen,
  selectedStandardJobs,
  onOpenStandardJobPicker,
  onCloseStandardJobPicker,
  onApplyStandardJobs,
  onCancel,
  onSave,
  onRequestApproval,
  onApprove,
  onReject,
  workflowStatus,
}) {
  const isReadOnly = workflowStatus === 'closed' || workflowStatus === 'cancelled'
  const [form, setForm] = useState(() => ({
    shipName: detail.shipName ?? '',
    woNumber: detail.woNumber ?? '',
    scheduled: detail.scheduled ?? '',
    completed: detail.completed ?? '',
    cmType: detail.cmType ?? '',
    ranks: detail.ranks ?? '',
    performBy: detail.performBy ?? '',
    priority: detail.priority ?? '',
    title: detail.title ?? '',
    due: detail.due ?? '',
    equipment: detail.equipment ?? '',
    ext: detail.ext ?? '',
    counter: detail.counter ?? '',
    grace: detail.grace ?? '',
    eventType: detail.eventType ?? 'Event',
    vendorAnalysis: detail.vendorAnalysis ?? '',
    failure: !!detail.failure,
    conditionBased: !!detail.conditionBased,
    standardJobNo: detail.standardJobNo ?? '',
  }))

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  // When a single standard job is picked and confirmed, pull its details into
  // the form so the Work Order is pre-filled from the PMS plan entry.
  function handleApplyStandardJobs(jobs) {
    const [job] = jobs
    if (job) {
      const isDate = /^\d{4}-\d{2}-\d{2}$/.test(job.nextDue ?? '')
      setForm((current) => ({
        ...current,
        woNumber: job.jobNo || current.woNumber,
        standardJobNo: job.jobNo || current.standardJobNo,
        title: job.jobTitle || current.title,
        equipment: job.component || job.subSystem || job.majorSystem || current.equipment,
        scheduled: job.nextDue || current.scheduled,
        due: isDate ? job.nextDue : current.due,
        cmType: current.cmType || 'Preventive',
      }))
    }
    onApplyStandardJobs(jobs)
  }

  return (
    <div className="relative min-w-[1180px] bg-white">
      <div className="border-b border-[#e4edf3] bg-[#fcfeff] px-[18px] py-[18px]">
        <SectionHeader badge="Work Order Details" hint={form.equipment} />
        <WorkOrderTopFields
          form={form}
          setField={setField}
          selectedStandardJobs={selectedStandardJobs}
          onOpenStandardJobPicker={onOpenStandardJobPicker}
        />
      </div>

      <div className="overflow-x-auto border-b border-[#dbe7ef] bg-white px-[18px]">
        <div className="flex min-w-max items-end">
          {DETAIL_TABS.map((tab) => (
            <button key={tab} type="button" onClick={() => onTabChange(tab)} className={`border-b-2 px-[15px] py-[12px] text-[13px] font-semibold focus:outline-none ${activeTab === tab ? 'border-ns-blue bg-[#edf7fd] text-ns-blue' : 'border-transparent text-[#66829b] hover:text-ns-navy'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-[360px] bg-white px-[18px] py-[18px] text-[13px] leading-[1.65] text-ns-navy">
        {renderDetailPanel({
          activeTab,
          detail,
          jsaPermitTab,
          onJsaPermitTabChange,
        })}
      </div>

      <div className="sticky bottom-0 flex h-[58px] items-center justify-end gap-[12px] border-t border-[#e4edf3] bg-[#f5f8fb] px-[18px]">
        {isReadOnly ? (
          <span className="rounded-[8px] border border-[#d7e5ed] bg-white px-[22px] py-[9px] text-[13px] font-semibold capitalize text-ns-navy">
            {workflowStatus}
          </span>
        ) : (
          <>
        {onRequestApproval ? (
          <button
            type="button"
            onClick={() => onRequestApproval(form)}
            className="rounded-[8px] bg-[#213b6b] px-[22px] py-[9px] text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(33,59,107,0.2)] focus:outline-none"
          >
            Req for Approval
          </button>
        ) : null}
        {onApprove ? (
          <button
            type="button"
            onClick={() => onApprove(form)}
            className="rounded-[8px] bg-[#207f67] px-[22px] py-[9px] text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(32,127,103,0.2)] focus:outline-none"
          >
            Approved
          </button>
        ) : null}
        {onReject ? (
          <button
            type="button"
            onClick={() => onReject(form)}
            className="rounded-[8px] bg-[#b14d4d] px-[22px] py-[9px] text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(177,77,77,0.2)] focus:outline-none"
          >
            Reject
          </button>
        ) : null}
        <button
          type="button"
          onClick={onCancel}
          className="rounded-[8px] border border-[#d7e5ed] bg-white px-[20px] py-[9px] text-[13px] font-semibold text-ns-navy focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(form)}
          className="rounded-[8px] bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[26px] py-[9px] text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(46,139,207,0.24)] focus:outline-none"
        >
          Save
        </button>
          </>
        )}
      </div>

      {standardJobPickerOpen ? (
        <div className="absolute inset-y-0 right-0 z-20 w-[420px] max-w-[calc(100vw-48px)] shadow-[-18px_0_40px_rgba(42,75,105,0.18)]">
          <StandardJobPickerPanel
            title="Select Standard Job"
            confirmLabel="Confirm"
            singleSelect
            initialSelectedJobNos={selectedStandardJobs.map((job) => job.jobNo)}
            onClose={onCloseStandardJobPicker}
            onApply={handleApplyStandardJobs}
          />
        </div>
      ) : null}
    </div>
  )
}

const SHIP_OPTIONS = ['', 'MV Genco', 'MV Atlantic', 'MV Trinity']
const CM_TYPE_OPTIONS = ['', 'Preventive', 'Corrective', 'Condition', 'Breakdown']
const RANKS_OPTIONS = ['', 'Master', 'Chief Officer', 'Chief Engineer', 'Second Engineer', 'Third Engineer', 'Electrical Officer']
const PERFORM_BY_OPTIONS = ['', 'WO/Crew', 'Contractor', 'Maker', 'Shore Staff']
const PRIORITY_OPTIONS = ['', 'A', 'B', 'C', 'D']
const VENDOR_ANALYSIS_OPTIONS = ['', 'Required', 'Not Required']

function WorkOrderTopFields({ form, setField, selectedStandardJobs, onOpenStandardJobPicker }) {
  const hasSelectedStandardJobs = selectedStandardJobs.length > 0

  return (
    <div className="grid grid-cols-[1.02fr_0.98fr] gap-x-[30px]">
      <div>
        <ModernField label="Ship" value={form.shipName} onChange={(v) => setField('shipName', v)} options={SHIP_OPTIONS} required />
        <ModernField label="WO/SR No." value={form.woNumber} onChange={(v) => setField('woNumber', v)} />
        <ModernField label="Scheduled" value={form.scheduled} onChange={(v) => setField('scheduled', v)} />
        <ModernField label="Completed" value={form.completed} onChange={(v) => setField('completed', v)} calendar />
        <ModernField label="CM Type" value={form.cmType} onChange={(v) => setField('cmType', v)} options={CM_TYPE_OPTIONS} />
        <ModernField label="Ranks" value={form.ranks} onChange={(v) => setField('ranks', v)} options={RANKS_OPTIONS} />
      </div>

      <div>
        <div className="mb-[12px] flex flex-wrap items-center justify-end gap-[18px]">
          <ModernCheck label="Failure" checked={form.failure} onChange={(v) => setField('failure', v)} />
          <ModernCheck label="Condition Based" checked={form.conditionBased} onChange={(v) => setField('conditionBased', v)} />
          <button
            type="button"
            onClick={onOpenStandardJobPicker}
            className={`rounded-[8px] px-[16px] py-[8px] text-[12px] font-semibold text-white transition focus:outline-none ${
              hasSelectedStandardJobs
                ? 'bg-[linear-gradient(135deg,#2d86ca,#56ace4)] shadow-[0_10px_20px_rgba(46,139,207,0.2)]'
                : 'bg-[#6e778f] hover:bg-[#5f687f]'
            }`}
          >
            Standard Job{hasSelectedStandardJobs ? ` (${selectedStandardJobs.length})` : ''}
          </button>
        </div>

        <div className="grid grid-cols-[1fr_0.56fr] gap-x-[22px]">
          <ModernField label="Perform By" value={form.performBy} onChange={(v) => setField('performBy', v)} options={PERFORM_BY_OPTIONS} labelWidth={92} />
          <ModernField label="Priority" value={form.priority} onChange={(v) => setField('priority', v)} options={PRIORITY_OPTIONS} labelWidth={70} />
        </div>

        <ModernField label="Title" value={form.title} onChange={(v) => setField('title', v)} />

        <div className="grid grid-cols-[1fr_0.86fr] gap-x-[22px]">
          <ModernField label="Due" value={form.due} onChange={(v) => setField('due', v)} calendar labelWidth={72} />
          <ModernField label="Equipment" value={form.equipment} onChange={(v) => setField('equipment', v)} labelWidth={82} />
        </div>

        <div className="grid grid-cols-[1fr_0.86fr] gap-x-[22px]">
          <div className="flex min-w-0 items-center gap-[14px]">
            <ModernField label="Deferred" value={form.ext} onChange={(v) => setField('ext', v)} calendar labelWidth={72} className="flex-1" />
            <ModernField label="Grace" value={form.grace} onChange={(v) => setField('grace', v)} labelWidth={56} className="w-[150px] shrink-0" />
          </div>
          <div className="mt-[12px] flex min-w-0 items-center gap-[14px]">
            <ModernField label="Counter" value={form.counter} onChange={(v) => setField('counter', v)} labelWidth={82} className="flex-1" />
            <ModernRadio label="Event" checked={form.eventType === 'Event'} onSelect={() => setField('eventType', 'Event')} />
            <ModernRadio label="Drydock" checked={form.eventType === 'Drydock'} onSelect={() => setField('eventType', 'Drydock')} />
          </div>
        </div>

        <ModernField label="Vendor Analysis" value={form.vendorAnalysis} onChange={(v) => setField('vendorAnalysis', v)} options={VENDOR_ANALYSIS_OPTIONS} />
      </div>
    </div>
  )
}

function ModernField({
  label,
  value = '',
  onChange,
  options = null,
  calendar = false,
  required = false,
  labelWidth = 112,
  className = '',
}) {
  const fieldClasses =
    'min-h-[36px] min-w-0 flex-1 bg-transparent text-[13px] text-ns-navy outline-none placeholder:text-[#9db0c2]'

  return (
    <div className={`mt-[12px] flex min-w-0 items-center gap-[12px] ${className}`}>
      <span
        style={{ width: labelWidth }}
        className="shrink-0 text-right text-[13px] font-semibold text-[#5b7690]"
      >
        {label}:{required ? <span className="text-[#d96c6c]"> *</span> : ''}
      </span>
      <span
        className={`flex min-h-[36px] min-w-0 flex-1 items-center rounded-full border px-[14px] text-[13px] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] focus-within:border-ns-blue ${
          required ? 'border-[#e9b3c1] bg-[#fdf6f8]' : 'border-[#d7e5ed] bg-[#fbfdfe]'
        }`}
      >
        {options ? (
          <select
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            className={`${fieldClasses} appearance-none pr-[18px]`}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option || '—'}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={calendar ? 'date' : 'text'}
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            className={fieldClasses}
          />
        )}
        {options ? <Chevron /> : null}
      </span>
    </div>
  )
}

function ModernCheck({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-[8px] whitespace-nowrap text-[13px] text-ns-navy">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(event) => onChange?.(event.target.checked)}
        className="h-[15px] w-[15px] shrink-0 accent-ns-blue"
      />
      {label}
    </label>
  )
}

function ModernRadio({ label, checked, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex items-center gap-[7px] whitespace-nowrap text-[13px] text-ns-navy focus:outline-none"
    >
      <span
        className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-2 ${
          checked ? 'border-ns-blue' : 'border-[#c7d6e0]'
        }`}
      >
        {checked ? <span className="h-[8px] w-[8px] rounded-full bg-ns-blue" /> : null}
      </span>
      {label}
    </button>
  )
}

function LegacyHeaderFields({ detail }) {
  return (
    <div className="mt-[16px] rounded-[10px] border border-[#dbe7ef] bg-white px-[20px] py-[18px]">
      <div className="grid grid-cols-12 gap-x-[22px] gap-y-[14px]">
        <LegacyField className="col-span-3" label="Ship" value={detail.shipName} type="select" required />
        <LegacyField className="col-span-3" label="Perform By" value={detail.performBy} type="select" />
        <LegacyField className="col-span-2" label="Priority" value={detail.priority} type="select" />
        <div className="col-span-4 flex flex-wrap items-center justify-end gap-x-[18px] gap-y-[8px]">
          <LegacyCheck label="Failure" checked={detail.failure} />
          <LegacyCheck label="Condition Based" checked={detail.conditionBased} />
          <span className="rounded-[5px] bg-[#6e778f] px-[15px] py-[7px] text-[12px] font-semibold text-white">Standard Job</span>
        </div>

        <LegacyField className="col-span-3" label="WO/SR No." value={detail.woNumber} />
        <LegacyField className="col-span-5" label="Title" value={detail.title} />
        <LegacyField className="col-span-2" label="Due" value={detail.due} type="date" />
        <LegacyField className="col-span-2" label="Equipment" value={detail.equipment} type="select" />

        <LegacyField className="col-span-3" label="Scheduled" value={detail.scheduled} type="date" />
        <LegacyField className="col-span-3" label="Completed" value={detail.completed} type="date" />
        <LegacyField className="col-span-2" label="Deferred" value={detail.ext} type="date" />
        <div className="col-span-4 flex min-w-0 items-center gap-[10px]">
          <span className="shrink-0 text-[13px] font-semibold text-[#5b7690]">Counter:</span>
          <span className="min-w-[76px] flex-1 border-b border-dashed border-[#cad8e2] py-[6px] text-[13px]">{detail.counter}</span>
          <LegacyRadio label="Event" checked={detail.eventType === 'Event'} />
          <LegacyRadio label="Drydock" checked={detail.eventType === 'Drydock'} />
        </div>

        <div className="col-span-3" />
        <div className="col-span-3" />
        <div className="col-span-2" />
        <LegacyField className="col-span-4" label="Vendor Analysis" value={detail.vendorAnalysis} type="select" />

        <LegacyField className="col-span-3" label="CM Type" value={detail.cmType} type="select" />
        <div className="col-span-9" />
      </div>
    </div>
  )
}

function renderDetailPanel({ activeTab, detail, jsaPermitTab, onJsaPermitTabChange }) {
  if (activeTab === 'Description') {
    return (
      <div className="space-y-[2px]">
        {detail.descriptionLines.map((line, index) => (
          <p key={`${line}-${index}`} className={line ? '' : 'h-[12px]'}>
            {line}
          </p>
        ))}
      </div>
    )
  }

  if (activeTab === 'JSA/Work Permit') {
    return <JsaWorkPermitPanel activeInnerTab={jsaPermitTab} onInnerTabChange={onJsaPermitTabChange} />
  }

  if (activeTab === 'Work Certificates') return <WorkCertificatesPanel />
  if (activeTab === 'Findings') return <FindingsPanel />
  if (activeTab === 'Admin Info') return <AdminInfoPanel detail={detail} />
  if (activeTab === 'Materials') return <MaterialsPanel detail={detail} />
  if (activeTab === 'Certificates') return <CertificatesPanel detail={detail} />
  if (activeTab === 'Resources') return <ResourcesPanel detail={detail} />
  if (activeTab === 'Status') return <StatusPanel />
  if (activeTab === 'RA For WO Deferral') return <RaDeferralPanel />
  if (activeTab === 'Equipment/Space/Structure') return <EquipmentSpaceStructurePanel />
  if (activeTab === 'File Attachments') return <FileAttachmentsPanel />
  if (activeTab === 'Prev. Findings') return <PreviousFindingsPanel />
  if (activeTab === 'Failures') return <FailuresPanel />
  if (activeTab === 'Technical Defect') return <TechnicalDefectPanel />

  return <EmptyLegacyPanel message={`${activeTab} details will appear here.`} />
}

function WorkCertificatesPanel() {
  return (
    <LegacyTable
      columns={[
        { key: 'certificateNo', label: 'Work Certificate No.' },
        { key: 'certificateType', label: 'Work Certificate Type' },
        { key: 'title', label: 'Title' },
        { key: 'status', label: 'Status' },
      ]}
      rows={[]}
      minHeight="h-[520px]"
    />
  )
}

function FindingsPanel() {
  return (
    <div className="space-y-[12px]">
      <label className="flex items-center gap-[8px] text-[13px] text-ns-navy">
        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] bg-[#1687d8] text-[12px] text-white">✓</span>
        Flag these findings in the next Work Order
      </label>
      <div className="text-[15px]">All found Satisfactory</div>
      <div className="flex min-h-[430px] items-end justify-center text-[12px] text-[#7d95aa]">Enter additional findings here:</div>
    </div>
  )
}

function AdminInfoPanel({ detail }) {
  const fields = detail.adminFields

  return (
    <div className="grid grid-cols-2 gap-x-[52px] gap-y-[18px]">
      <div className="space-y-[14px]">
        <LegacyField className="w-full" label="Account" value="50802" />
        <LegacyField className="w-full" label="" value="Classification Fees Expense" type="select" />
        <LegacyField className="w-full" label="Project" value={fields.project} type="select" />
        <LegacyField className="w-full" label="Job Category" value={fields.jobCategory} type="select" />
        <LegacyField className="w-full" label="Cause" value={fields.cause} type="select" />

        <div className="mt-[18px] max-w-[520px] border border-[#d5dde5] p-[14px]">
          <div className="mb-[12px] text-[13px] text-[#5b7690]">Reschedule Approver</div>
          <label className="mb-[12px] flex items-center gap-[8px] text-[13px]">
            <span className="flex h-[18px] w-[18px] rounded-[4px] border border-[#c7d6e0] bg-white" />
            Ready for Approval
          </label>
          <div className="space-y-[12px]">
            <LegacyField className="w-full" label="Approver" value="" type="select" />
            <LegacyField className="w-full" label="Approve By" value="" type="date" />
          </div>
        </div>
      </div>

      <div className="space-y-[14px]">
        <label className="flex items-center gap-[8px] text-[13px]">
          <span className="flex h-[18px] w-[18px] rounded-[4px] border border-[#c7d6e0] bg-white" />
          Class No.:
        </label>
        <LegacyField className="w-full" label="Department" value="DECK & ENGINE" type="select" />
        <LegacyField className="w-full" label="Item Category" value={fields.itemCategory} type="select" />
        <LegacyField className="w-full" label="User Defined" value={fields.userDefined} />
        <LegacyField className="w-full" label="Scheduled By System" value={detail.scheduled} />
        <LegacyField className="w-full" label="Grace(Days)" value="7" />
        <LegacyField className="w-full" label="Drydock Job Category" value={fields.drydockJobCategory} type="select" />
        <LegacyField className="w-full" label="ABC Indicator" value="A - Will do" type="select" />
        <LegacyField className="w-full" label="Owner" value={fields.owner} type="select" />
        <LegacyField className="w-full" label="Cost Center" value={fields.costCenter} type="select" />
        <LegacyField className="w-full" label="WBS" value={fields.wbs} type="select" />
      </div>
    </div>
  )
}

function MaterialsPanel() {
  return (
    <div className="space-y-[10px]">
      <div className="flex gap-[2px]">
        <button
          type="button"
          className="border border-[#5a86d8] bg-[#2e86ff] px-[18px] py-[8px] text-[13px] font-semibold text-white"
        >
          Required/Used
        </button>
      </div>

      <LegacyTable
        columns={[
          { key: 'equipment', label: 'Equipment' },
          { key: 'partName', label: 'Part Name' },
          { key: 'onHand', label: 'On-Hand' },
          { key: 'onOrder', label: 'On-Order' },
          { key: 'required', label: 'Required' },
          { key: 'used', label: 'Used' },
          { key: 'unit', label: 'Unit' },
          { key: 'location', label: 'Location' },
          { key: 'partNo', label: 'Part No.' },
          { key: 'ptNoRef', label: 'PtNoRef' },
        ]}
        rows={[]}
        minHeight="h-[360px]"
      />

      <div className="pt-[18px] text-center text-[12px] text-[#6e879d]">Completion / Closure Remarks:</div>
    </div>
  )
}

function CertificatesPanel() {
  return (
    <LegacyTable
      columns={[
        { key: 'certificate', label: 'Certificate' },
        { key: 'certificateNumber', label: 'Certificate Number' },
        { key: 'versionNo', label: 'Version No' },
        { key: 'issuedDate', label: 'Issued Date' },
        { key: 'nextDue', label: 'Next Due' },
        { key: 'comments', label: 'Comments' },
        { key: 'attachments', label: 'Attachments', align: 'center' },
      ]}
      rows={[]}
      minHeight="h-[360px]"
      renderCell={(value, key) => (key === 'attachments' && value === 'link' ? <span className="text-[26px] leading-none text-[#2e86ff]">🔗</span> : value)}
    />
  )
}

function ResourcesPanel() {
  return (
    <div className="space-y-[12px]">
      <div className="flex flex-wrap items-end gap-x-[18px] gap-y-[10px]">
        <LegacyField className="min-w-[420px] flex-1" label="Suggested Vendor" value="" type="select" />
        <LegacyField className="w-[180px]" label="Est. Cost" value="0" />
        <div className="pb-[6px] text-[13px]">USD</div>
        <button type="button" className="bg-[#70758a] px-[24px] py-[10px] text-[14px] font-semibold text-white">
          Generate Est
        </button>
      </div>

      <LegacyTable
        columns={[
          { key: 'owner', label: 'Owner' },
          { key: 'crewPositionTitle', label: 'Crew Position Title' },
          { key: 'estManHrs', label: 'Est. Man-Hrs' },
          { key: 'actualManHrs', label: 'Actual Man-Hrs' },
        ]}
        rows={[]}
        minHeight="h-[380px]"
      />

      <div className="flex justify-end gap-[90px] px-[12px] text-[13px] text-[#6e879d]">
        <span>Total:</span>
        <span>0.0</span>
        <span>0.0</span>
      </div>
    </div>
  )
}

function StatusPanel() {
  return (
    <LegacyTable
      columns={[
        { key: 'action', label: 'Action' },
        { key: 'actedOn', label: 'Acted On' },
        { key: 'by', label: 'By' },
      ]}
      rows={[]}
      minHeight="h-[420px]"
    />
  )
}

function RaDeferralPanel() {
  return (
    <div className="space-y-[12px]">
      <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[10px]">
        <label className="flex items-center gap-[8px] text-[13px]">
          <span className="flex h-[18px] w-[18px] rounded-full border border-[#c7d6e0] bg-white" />
          RA required for deferral
        </label>
        <LegacyField className="min-w-[420px] flex-1" label="Use Template/RA Type" value="" type="select" />
        <button type="button" className="bg-[#152f59] px-[32px] py-[9px] text-[14px] font-semibold text-white">
          Start RA
        </button>
      </div>

      <LegacyTable
        columns={[
          { key: 'jsaNo', label: 'JSA No.' },
          { key: 'title', label: 'Title' },
          { key: 'status', label: 'Status' },
          { key: 'statusDate', label: 'Status Date' },
        ]}
        rows={[]}
        minHeight="h-[410px]"
      />
    </div>
  )
}

function EquipmentSpaceStructurePanel() {
  return (
    <LegacyTable
      columns={[
        { key: 'type', label: 'Type' },
        { key: 'equipment', label: 'Equipment/Maintained Part/Space/Structure' },
        { key: 'warranty', label: 'Warr.Exp.Date' },
        { key: 'serialNo', label: 'Serial No.' },
      ]}
      rows={[]}
      minHeight="h-[430px]"
    />
  )
}

function FileAttachmentsPanel() {
  return (
    <LegacyTable
      columns={[
        { key: 'attachment', label: 'Attachment' },
        { key: 'size', label: 'Size' },
        { key: 'type', label: 'Type' },
        { key: 'replicate', label: 'Replicate' },
      ]}
      rows={[]}
      minHeight="h-[430px]"
    />
  )
}

function PreviousFindingsPanel() {
  return (
    <LegacyTable
      columns={[
        { key: 'woNo', label: 'WO No.' },
        { key: 'completed', label: 'Completed' },
        { key: 'findings', label: 'Findings' },
        { key: 'previousFindings', label: 'Prev. Findings' },
      ]}
      rows={[]}
      minHeight="h-[430px]"
    />
  )
}

function FailuresPanel() {
  return (
    <div className="space-y-[18px]">
      <div className="grid grid-cols-2 gap-x-[38px] gap-y-[14px]">
        <LegacyField className="w-full" label="Failure Mode" value="" type="select" />
        <LegacyField className="w-full" label="Secondary Costs" value="0.0000 USD" />
        <LegacyField className="w-full" label="Failure Cause" value="" type="select" />
        <div />
      </div>

      <div className="grid grid-cols-2 gap-[24px]">
        <div className="border border-[#d5dde5] p-[12px]">
          <div className="mb-[10px] text-[13px] text-[#5b7690]">Equipment Offline</div>
          <div className="space-y-[10px]">
            <LegacyField className="w-full" label="Date" value="09/01/2026" type="date" />
            <LegacyField className="w-full" label="Time" value="00:00" />
          </div>
        </div>

        <div className="border border-[#d5dde5] p-[12px]">
          <div className="mb-[10px] text-[13px] text-[#5b7690]">Equipment Back in Service</div>
          <div className="space-y-[10px]">
            <LegacyField className="w-full" label="Date" value="09/01/2026" type="date" />
            <LegacyField className="w-full" label="Time" value="00:00" />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-[8px] text-[13px] text-[#5b7690]">Failed Parts</div>
        <LegacyTable
          columns={[
            { key: 'part', label: 'Part' },
            { key: 'equipment', label: 'Equipment' },
          ]}
          rows={[]}
          minHeight="h-[220px]"
        />
      </div>
    </div>
  )
}

function TechnicalDefectPanel() {
  return (
    <LegacyTable
      columns={[
        { key: 'defectNo', label: 'Defect No' },
        { key: 'defectType', label: 'Defect Type' },
        { key: 'title', label: 'Title' },
        { key: 'status', label: 'Status' },
      ]}
      rows={[]}
      minHeight="h-[430px]"
    />
  )
}

function EmptyLegacyPanel({ message }) {
  return <div className="flex min-h-[430px] items-center justify-center text-[13px] text-[#7f96ab]">{message}</div>
}

function LegacyTable({ columns, rows, renderCell, minHeight = 'h-[320px]' }) {
  return (
    <div className="overflow-hidden border border-[#d9e1ea] bg-white">
      <div className="flex bg-ns-navy text-[13px] font-semibold text-white">
        {columns.map((column) => (
          <div
            key={column.key}
            className={`flex-1 border-r border-white/30 px-[12px] py-[8px] ${column.align === 'center' ? 'text-center' : ''}`}
          >
            {column.label}
          </div>
        ))}
      </div>
      <div className={`${minHeight} bg-white`}>
        {rows.length === 0 ? null : rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex border-b border-[#e5edf3] bg-[#2e86ff] text-white last:border-b-0 odd:bg-[#2e86ff] even:bg-white even:text-ns-navy">
            {columns.map((column) => (
              <div
                key={column.key}
                className={`flex flex-1 items-center border-r border-[#dce6ef] px-[12px] py-[10px] ${column.align === 'center' ? 'justify-center text-center' : ''}`}
              >
                {renderCell ? renderCell(row[column.key], column.key, row) : row[column.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function JsaWorkPermitPanel({ activeInnerTab, onInnerTabChange }) {
  const isRa = activeInnerTab === 'RA'

  return (
    <div className="space-y-[12px] text-ns-navy">
      <div className="flex gap-[2px]">
        {['RA', 'Permit to Work'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onInnerTabChange(tab)}
            className={`min-w-[172px] border px-[18px] py-[9px] text-left text-[15px] font-semibold focus:outline-none ${
              activeInnerTab === tab
                ? 'border-[#5a86d8] bg-[#2e86ff] text-white'
                : 'border-[#d8dfe8] bg-white text-[#5d7590]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-[18px]">
        <span className="flex items-center gap-[8px] whitespace-nowrap text-[15px]">
          <span className="h-[18px] w-[18px] rounded-full border border-[#c7d6e0] bg-white" />
          {isRa ? 'RA Required' : 'PTW Required'}
        </span>
        <div className="flex min-w-0 flex-1 items-center gap-[12px]">
          <span className="shrink-0 text-[15px] font-semibold text-[#5b7690]">Use Template:</span>
          <div className="flex h-[44px] min-w-0 flex-1 items-center border border-[#d8dfe8] bg-[#f7f7f7] px-[12px]">
            <span className="min-w-0 flex-1" />
            <Chevron />
          </div>
          <button
            type="button"
            className="shrink-0 bg-[#70758a] px-[24px] py-[10px] text-[15px] font-semibold text-white"
          >
            {isRa ? 'Start RA' : 'Start Permit'}
          </button>
        </div>
      </div>

      {isRa ? <JsaQuickCheckPanel /> : <PermitToWorkTable />}
    </div>
  )
}

function JsaQuickCheckPanel() {
  return (
    <div className="space-y-[10px] pt-[6px]">
      <div className="border border-[#cfd7e2] bg-white">
        <div className="ml-[14px] inline-block -translate-y-1/2 bg-white px-[4px] text-[13px] text-ns-navy">
          RA Quick-Check
        </div>
        <div className="-mt-[6px] px-[12px] pb-[12px]">
          <div className="flex bg-ns-navy text-[14px] font-semibold text-white">
            <div className="w-[120px] border-r border-white/30 px-[12px] py-[7px] text-center">Yes</div>
            <div className="w-[120px] border-r border-white/30 px-[12px] py-[7px] text-center">No</div>
            <div className="flex-1 px-[12px] py-[7px] text-center">RA Quick-Check Question</div>
            <div className="flex w-[38px] items-center justify-center border-l border-white/30">
              <Chevron />
            </div>
          </div>
          <div className="h-[170px] border border-t-0 border-[#d9e1ea] bg-[#fbfbfb]" />
        </div>
      </div>

      <div className="flex items-start gap-[16px]">
        <div className="w-[260px] border border-[#d9e1ea] bg-white">
          <div className="px-[16px] py-[10px] text-[14px] text-[#5b7690]">RA Recommended?</div>
          <div className="h-[94px] border-t border-[#d9e1ea] bg-[#fbfbfb]" />
        </div>

        <div className="flex flex-1 flex-col items-center justify-end gap-[12px] pt-[18px]">
          <div className="flex gap-[22px]">
            <button type="button" className="min-w-[206px] bg-[#70758a] px-[24px] py-[10px] text-[15px] font-semibold text-white">
              Run Quick-Check
            </button>
            <button type="button" className="min-w-[160px] bg-[#70758a] px-[24px] py-[10px] text-[15px] font-semibold text-white">
              Start RA
            </button>
          </div>
          <p className="text-center text-[12px] text-[#5b7690]">
            If an RA was recommended or requested, provide an explanation why the decision was made to proceed without completing an RA.
          </p>
        </div>
      </div>
    </div>
  )
}

function PermitToWorkTable() {
  const columns = ['PTW No.', 'Title', 'Status', 'Doc Owner', 'Requested Date']

  return (
    <div className="border border-[#d9e1ea] bg-white">
      <div className="flex bg-ns-navy text-[14px] font-semibold text-white">
        {columns.map((column) => (
          <div key={column} className="flex-1 border-r border-white/30 px-[14px] py-[8px] text-center last:border-r-0">
            {column}
          </div>
        ))}
        <div className="flex w-[38px] items-center justify-center border-l border-white/30">
          <Chevron />
        </div>
      </div>
      <div className="h-[290px] bg-[#fbfbfb]" />
    </div>
  )
}

function LegacyField({ className, label, value, type }) {
  return (
    <div className={`${className} flex min-w-0 items-center gap-[9px]`}>
      <span className="shrink-0 text-[13px] font-semibold text-[#5b7690]">{label}:</span>
      <span className="flex min-w-0 flex-1 items-center border-b border-dashed border-[#cad8e2] py-[6px] text-[13px]">
        <span className="min-w-0 flex-1 truncate">{value}</span>
        {type === 'date' ? <CalendarIcon /> : null}
        {type === 'select' ? <Chevron /> : null}
      </span>
    </div>
  )
}

function LegacyCheck({ label, checked }) {
  return <span className="flex items-center gap-[7px] whitespace-nowrap text-[13px] text-ns-navy"><span className="flex h-[16px] w-[16px] items-center justify-center rounded-[4px] border border-[#c7d6e0] bg-white text-[11px] text-ns-blue">{checked ? '✓' : ''}</span>{label}</span>
}

function LegacyRadio({ label, checked }) {
  return <span className="flex items-center gap-[6px] whitespace-nowrap text-[13px] text-ns-navy"><span className={`flex h-[16px] w-[16px] items-center justify-center rounded-full border-2 ${checked ? 'border-[#0c9399]' : 'border-[#c7d6e0]'}`}>{checked ? <span className="h-[7px] w-[7px] rounded-full bg-[#0c9399]" /> : null}</span>{label}</span>
}

function SearchBar() {
  return (
    <div className="flex h-[38px] w-[250px] items-center gap-[8px] rounded-full border border-[#dbe7ef] bg-[#f8fbfe] px-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 text-ns-navy">
        <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
        <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="text-[12px] text-ns-navy">▾</span>
      <input
        type="text"
        placeholder="Search..."
        className="min-w-0 flex-1 bg-transparent text-[14px] text-ns-navy placeholder:text-[#8ba0b2] focus:outline-none"
      />
    </div>
  )
}

function ToolbarGlyph({ type }) {
  if (type === 'save') return <span className="text-[18px]">▣</span>
  if (type === 'stamp') return <span className="text-[18px] opacity-50">👤</span>
  if (type === 'copy') return <span className="text-[18px]">⧉</span>
  if (type === 'permit') return <span className="text-[13px] font-semibold">PW</span>
  if (type === 'link') return <span className="text-[16px]">⛓</span>
  if (type === 'tree') return <span className="text-[17px]">🗂</span>
  if (type === 'delete') return <span className="text-[17px] opacity-60">🗑</span>
  if (type === 'search') return <span className="text-[16px]">🔎</span>
  if (type === 'folder') return <span className="text-[17px]">📁</span>
  return (
    <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#213b6b] text-[16px] font-semibold text-white">
      ?
    </div>
  )
}

function Field({ label, value, chevron = false, calendar = false, dotted = false, wide = false, required = false }) {
  return (
    <div className={`${wide ? 'col-span-2' : ''} flex min-w-0 items-center gap-[10px]`}>
      <span className={`w-[112px] shrink-0 text-right text-[13px] font-semibold text-[#5b7690] ${required ? 'border-b-2 border-ns-blue' : ''}`}>
        {label}:
      </span>
      <span
        className={`flex min-h-[36px] min-w-0 flex-1 items-center rounded-full border bg-[#fbfdfe] px-[14px] text-[13px] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ${
          dotted ? 'border-dashed border-[#ccd9e3]' : 'border-[#d7e5ed]'
        }`}
      >
        <span className="min-w-0 flex-1 truncate">{value}</span>
        {calendar ? <CalendarIcon /> : null}
        {chevron ? <Chevron /> : null}
      </span>
    </div>
  )
}

function InlineTopGroup({ detail }) {
  return (
    <div className="rounded-[14px] border border-[#e8f0f5] bg-[#f8fbfe] px-[14px] py-[12px]">
      <div className="flex flex-wrap items-center gap-[12px]">
      <span className="shrink-0 text-[13px] font-semibold text-[#5b7690]">Priority:</span>
      <span className="flex h-[36px] w-[110px] items-center rounded-full border border-[#d7e5ed] bg-white px-[14px] text-[13px]">
        <span className="flex-1">{detail.priority}</span>
        <Chevron />
      </span>
      <CheckRow label="Failure" checked={detail.failure} />
      <CheckRow label="Condition Based" checked={detail.conditionBased} />
      <button
        type="button"
        className="rounded-full bg-[#213b6b] px-[16px] py-[8px] text-[13px] font-semibold text-white"
      >
        Standard Job
      </button>
      </div>
    </div>
  )
}

function CounterRow({ detail }) {
  return (
    <div className="rounded-[14px] border border-[#e8f0f5] bg-[#f8fbfe] px-[14px] py-[12px]">
      <div className="flex min-w-0 flex-wrap items-center gap-[12px]">
      <span className="shrink-0 text-[13px] font-semibold text-[#5b7690]">Counter:</span>
      <span className="flex h-[36px] w-[110px] items-center rounded-full border border-[#d7e5ed] bg-white px-[14px] text-[13px]">
        {detail.counter}
      </span>
      <Radio label="Event" checked={detail.eventType === 'Event'} />
      <Radio label="Drydock" checked={detail.eventType === 'Drydock'} />
      <span className="flex min-h-[36px] min-w-[220px] flex-1 items-center rounded-full border border-[#d7e5ed] bg-white px-[14px] text-[13px]">
        <span className="flex-1" />
        <Chevron />
      </span>
      </div>
    </div>
  )
}


function CheckGroup({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-[20px]">
      {items.map(([label, checked]) => (
        <CheckRow key={label} label={label} checked={checked} />
      ))}
    </div>
  )
}

function CheckRow({ label, checked }) {
  return (
    <span className="flex items-center gap-[8px] text-[16px] text-ns-navy">
      <span className="flex h-[16px] w-[16px] items-center justify-center rounded-[5px] border border-[#c7d6e0] bg-white text-[11px]">
        {checked ? '✓' : ''}
      </span>
      {label}
    </span>
  )
}

function Radio({ label, checked }) {
  return (
    <span className="flex items-center gap-[7px] text-[16px] text-ns-navy">
      <span
        className={`flex h-[16px] w-[16px] items-center justify-center rounded-full border-2 ${
          checked ? 'border-ns-blue' : 'border-[#c7d6e0]'
        }`}
      >
        {checked ? <span className="h-[8px] w-[8px] rounded-full bg-ns-blue" /> : null}
      </span>
      {label}
    </span>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-ns-navy">
      <path d="M3 5h18v16H3V5zm2 5v9h14v-9H5zM7 2v4H5V2h2zm12 0v4h-2V2h2z" />
    </svg>
  )
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0 fill-none stroke-ns-navy" strokeWidth="2.4">
      <polyline points="6,9 12,15 18,9" />
    </svg>
  )
}
