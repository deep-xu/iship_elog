import { createContext, useContext, useMemo, useRef, useState } from 'react'
import { findRelatedJobsForEquipment } from '@/stores/relatedJobsStore.js'
import { loadDocument, saveDocument } from '@/stores/documentsStore.js'

const FieldStore = createContext({})

function loadSaved(key) {
  return loadDocument(key, {})
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Tabs in ABS "Part - ..." order. `menu` swaps the middle window menu item.
const TABS = [
  { key: 'inventory', label: 'Inventory' },
  { key: 'attributes', label: 'Attributes' },
  { key: 'fileAttachments', label: 'File Attachments', menu: 'Attachment', columns: ['Attachment', 'Size', 'Type', 'Replicate'] },
  { key: 'sources', label: 'Sources', columns: ['Type', 'Date Time', 'Curr.', 'Unit Price', 'UOM', 'NET USD/EA', 'Delivery Time', 'Vendor'] },
  { key: 'poHistory', label: 'PO History' },
  { key: 'standardJobs', label: 'Standard Jobs', columns: ['Job Size', 'Job Name', 'Interval', 'Last Done', 'Price', 'Status'] },
]

export default function PartDetailWindow({ detail, onMinimize, onClose, inline = false }) {
  const readOnly = inline
  const storageKey = `ns5-part-detail-${detail.id}`
  const saved = useMemo(() => loadSaved(storageKey), [storageKey])

  const [activeKey, setActiveKey] = useState('inventory')
  const [partNumber, setPartNumber] = useState(saved.partNumber ?? detail.partNumber)
  const [reference, setReference] = useState(saved.reference ?? "Maker's Manual - Parts list")
  const [criticality, setCriticality] = useState(saved.criticality ?? 'No')
  const [attachments, setAttachments] = useState(saved.__attachments ?? [])
  const fileInputRef = useRef(null)
  const containerRef = useRef(null)
  const activeTab = useMemo(() => TABS.find((tab) => tab.key === activeKey) ?? TABS[0], [activeKey])

  const [savedMsg, setSavedMsg] = useState('')

  function handleSave() {
    const data = {}
    containerRef.current
      ?.querySelectorAll('input[name], select[name], textarea[name]')
      .forEach((el) => {
        data[el.name] = el.value
      })
    data.partNumber = partNumber
    data.reference = reference
    data.criticality = criticality
    data.__attachments = attachments
    setSavedMsg(saveDocument(storageKey, data) ? 'All changes saved.' : 'Save is unavailable.')
  }

  function handleFiles(fileList) {
    const added = Array.from(fileList).map((file) => ({
      name: file.name,
      size: formatBytes(file.size),
      type: file.type || file.name.split('.').pop()?.toUpperCase() || 'File',
    }))
    setAttachments((current) => [...current, ...added])
  }

  return (
    <FieldStore.Provider value={{ ...saved, __readOnly: readOnly }}>
    <div className={inline ? 'flex h-full w-full flex-col overflow-hidden bg-white' : 'absolute inset-0 z-40 flex items-start justify-center bg-[rgba(28,49,71,0.28)] p-[24px]'}>
      <div ref={containerRef} className={inline ? 'flex h-full w-full flex-col overflow-hidden bg-white' : 'flex h-full w-full max-w-[1180px] flex-col overflow-hidden rounded-[10px] border border-[#c7d8e4] bg-white shadow-[0_30px_80px_rgba(30,55,82,0.35)]'}>
        {/* Title bar */}
        <div className="flex h-[42px] shrink-0 items-center border-b border-[#e1ecf2] bg-[#f5f8fb] px-[14px]">
          <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0">
            <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
          </svg>
          <span className="ml-[8px] truncate font-heading text-[15px] font-bold text-ns-navy">
            Part - {detail.name} - [{detail.partCode}]
          </span>
          {inline ? (
            <span className="ml-[10px] rounded-full bg-[#eef4f8] px-[10px] py-[3px] text-[11px] font-semibold text-[#5b7690]">Read only — double-click the tree to edit</span>
          ) : null}
          {!inline ? (
          <div className="ml-auto flex items-center gap-[6px]">
            <button
              type="button"
              aria-label="Minimize"
              onClick={onMinimize}
              className="flex h-[24px] w-[24px] items-center justify-center rounded text-[#7f95a9] hover:bg-[#e6eef5]"
            >
              <svg viewBox="0 0 16 16" className="h-[10px] w-[10px] fill-none stroke-current" strokeWidth="2">
                <line x1="3" y1="11" x2="13" y2="11" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="flex h-[24px] w-[24px] items-center justify-center rounded bg-ns-navy text-white hover:bg-[#1c3147]"
            >
              <svg viewBox="0 0 16 16" className="h-[10px] w-[10px] fill-none stroke-current" strokeWidth="2">
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            </button>
          </div>
          ) : null}
        </div>

        {/* Breadcrumb */}
        <div className="shrink-0 border-b border-[#e4edf3] bg-[#eef4f8] px-[16px] py-[7px] text-[12px] font-semibold text-ns-navy">
          {detail.breadcrumb}
        </div>

        {/* Header field block */}
        <div className="shrink-0 border-b border-[#e4edf3] bg-white px-[16px] py-[12px]">
          <div className="grid grid-cols-[minmax(0,1.7fr)_minmax(220px,1fr)] gap-x-[24px]">
            <div className="space-y-[8px]">
              <HeaderField label="Brief Name" value={detail.name} labelWidth={110} />
              <div className="flex items-start gap-[10px]">
                <span className="w-[110px] shrink-0 pt-[6px] text-right text-[12px] font-semibold text-[#5b7690]">Full Description:</span>
                <textarea
                  name="Full Description"
                  defaultValue={saved['Full Description'] ?? detail.fullDescription}
                  disabled={readOnly}
                  className="min-h-[64px] flex-1 resize-y rounded-[10px] border border-[#d7e5ed] bg-white px-[12px] py-[6px] text-[13px] text-ns-navy focus:border-ns-blue focus:outline-none disabled:text-[#41536a]"
                />
              </div>
              <div className="grid grid-cols-2 gap-x-[18px] gap-y-[8px]">
                <HeaderField label="Unit" value={detail.unit} chevron labelWidth={110} />
                <HeaderField label="Designation" value={detail.designation} chevron labelWidth={90} />
                <HeaderField label="Code" value={detail.pinNumber} labelWidth={110} />
                <span />
                <HeaderField label="Interchangeable" value="" chevron labelWidth={110} />
                <HeaderField label="Qty. Working" value="0" labelWidth={90} />
                <HeaderField label="Item Category" value="" chevron labelWidth={110} />
                <HeaderField label="IMO No" value="" labelWidth={90} />
                <HeaderField label="Barcode" value="" labelWidth={110} />
                <HeaderField label="User Defined" value="" labelWidth={110} />
                <HeaderField label="Valuation Method" value="" chevron labelWidth={110} />
                <HeaderField label="Mooring Line Type" value="" chevron labelWidth={110} />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="overflow-hidden rounded-[8px] border border-[#d5e2ec]">
                <div className="flex bg-ns-navy text-white">
                  <div className="flex-1 border-r border-white/20 px-[10px] py-[7px] text-[12px] font-semibold">Part Number</div>
                  <div className="flex-1 px-[10px] py-[7px] text-[12px] font-semibold">Reference</div>
                </div>
                <div className="flex border-t border-[#d5e2ec] text-[12px] text-ns-navy">
                  <input
                    value={partNumber}
                    onChange={(e) => setPartNumber(e.target.value)}
                    disabled={readOnly}
                    className="w-1/2 border-r border-[#e4edf3] bg-white px-[10px] py-[7px] focus:bg-[#f4f9fc] focus:outline-none"
                  />
                  <input
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    disabled={readOnly}
                    className="w-1/2 bg-white px-[10px] py-[7px] focus:bg-[#f4f9fc] focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-[12px] space-y-[8px]">
                <HeaderField label="Est. Cost" value="0.00" labelWidth={130} />
                <HeaderField label="Actual Cost" value="0.00" labelWidth={130} />
                <div className="flex min-w-0 items-center gap-[10px]">
                  <span style={{ width: 130 }} className="shrink-0 text-right text-[12px] font-semibold text-[#5b7690]">
                    Criticality:
                  </span>
                  <select
                    value={criticality}
                    onChange={(e) => setCriticality(e.target.value)}
                    disabled={readOnly}
                    className="min-h-[30px] min-w-0 flex-1 rounded-full border border-[#d7e5ed] bg-white px-[12px] text-[13px] text-ns-navy focus:outline-none"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab strip */}
        <div className="flex shrink-0 items-stretch border-b border-[#dbe6ee] bg-[#fbfdff]">
          <div className="flex min-w-0 flex-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveKey(tab.key)}
                className={`shrink-0 whitespace-nowrap border-r border-[#e7eff4] px-[14px] py-[9px] text-[12px] transition focus:outline-none ${
                  tab.key === activeKey
                    ? 'bg-[linear-gradient(135deg,#2d86ca,#56ace4)] font-semibold text-white'
                    : 'text-[#5e7894] hover:bg-[#f0f6fa]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab body */}
        <div className="min-h-0 flex-1 overflow-auto bg-[#f4f8fb] p-[14px]">
          {activeTab.key === 'fileAttachments' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  handleFiles(e.target.files)
                  e.target.value = ''
                }}
              />
              {!readOnly ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mb-[10px] rounded bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[16px] py-[7px] text-[12px] font-semibold text-white"
              >
                + Attach File
              </button>
              ) : null}
              <SimpleGrid
                columns={['Attachment', 'Size', 'Type', 'Replicate']}
                rows={attachments.map((a) => [a.name, a.size, a.type, 'Yes'])}
              />
            </div>
          ) : (
            <TabBody tab={activeTab} detail={detail} />
          )}
        </div>

        {/* Footer */}
        {!inline ? (
        <div className="flex h-[48px] shrink-0 items-center justify-end gap-[14px] border-t border-[#e4edf3] bg-[#f5f8fb] px-[16px]">
          {savedMsg ? <span className="text-[12px] font-semibold text-[#2f9d69]">{savedMsg}</span> : null}
          <button
            type="button"
            onClick={handleSave}
            className="rounded-[8px] bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[26px] py-[9px] text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(46,139,207,0.24)] focus:outline-none"
          >
            Save
          </button>
        </div>
        ) : null}
      </div>
    </div>
    </FieldStore.Provider>
  )
}

function TabBody({ tab, detail }) {
  if (tab.key === 'inventory') {
    return (
      <div>
        <SimpleGrid columns={['Location', 'Qty. On Hand']} rows={[]} />
        <div className="mt-[8px] flex justify-end gap-[24px] text-[12px] text-ns-navy">
          <span>Location: <strong>0</strong></span>
          <span>Total on Hand: <strong>0.00</strong></span>
        </div>
      </div>
    )
  }

  if (tab.key === 'attributes') {
    return (
      <div className="rounded-[8px] border border-[#e0eaf1] bg-white p-[16px]">
        <div className="grid grid-cols-3 gap-x-[24px]">
          <div className="space-y-[10px]">
            <Check label="Hazardous Material" />
            <Check label="Manufacturer Recommended" />
            <Check label="Subject To Customs" />
            <Check label="Stocked" />
            <Check label="Warehoused" />
          </div>
          <div className="space-y-[10px]">
            <HeaderField label="IHM Hazard Type" value="" chevron labelWidth={120} />
            <HeaderField label="UN Hazard Code" value="" chevron labelWidth={120} />
            <HeaderField label="Hazard Class" value="" chevron labelWidth={120} />
            <HeaderField label="Part Attributes" value="" chevron labelWidth={120} />
            <HeaderField label="Warehoused Ships" value="" labelWidth={120} />
          </div>
          <div className="space-y-[10px]">
            <HeaderField label="Hazardous Amount" value="0.00" labelWidth={130} />
            <HeaderField label="Hazardous UOM" value="EA" chevron labelWidth={130} />
            <HeaderField label="Avg Lead Time (Days)" value="0 Days" labelWidth={130} />
            <HeaderField label="Min Lead Time (Days)" value="0 Days" labelWidth={130} />
            <HeaderField label="Max Lead Time (Days)" value="0 Days" labelWidth={130} />
          </div>
        </div>
      </div>
    )
  }

  if (tab.key === 'mooringLines') {
    return (
      <div className="space-y-[14px]">
        <fieldset className="rounded-[6px] border border-[#d7e5ed] bg-white px-[12px] pb-[12px] pt-[4px]">
          <legend className="px-[6px] text-[12px] font-semibold text-[#5b7690]">Specifications</legend>
          <div className="grid grid-cols-2 gap-x-[24px] gap-y-[9px]">
            <HeaderField label="Material/Construction" value="" labelWidth={150} />
            <HeaderField label="WLL" value="0.00" chevron labelWidth={130} />
            <HeaderField label="D/d Ratio at Pedestal" value="0.00" labelWidth={150} />
            <HeaderField label="Shock Load" value="0.00" chevron labelWidth={130} />
            <HeaderField label="D/d Ratio at Fair Lead" value="0.00" labelWidth={150} />
            <HeaderField label="Overload" value="0.00" chevron labelWidth={130} />
            <HeaderField label="LDBF" value="0.00" chevron labelWidth={150} />
            <HeaderField label="Original Length" value="0.00" chevron labelWidth={130} />
            <span />
            <HeaderField label="Original Diameter" value="0.00" chevron labelWidth={130} />
          </div>
        </fieldset>
        <fieldset className="rounded-[6px] border border-[#d7e5ed] bg-white px-[12px] pb-[12px] pt-[4px]">
          <legend className="px-[6px] text-[12px] font-semibold text-[#5b7690]">Limitations</legend>
          <div className="grid grid-cols-2 gap-x-[24px] gap-y-[9px]">
            <HeaderField label="Max Hours of Use" value="0.00" labelWidth={160} />
            <HeaderField label="Half Life Hours of Use %" value="0" labelWidth={170} />
            <HeaderField label="Max Number of Uses" value="0" labelWidth={160} />
            <HeaderField label="Half Life Number of Uses %" value="0" labelWidth={170} />
          </div>
          <div className="mt-[10px] grid grid-cols-2 gap-[14px]">
            <fieldset className="rounded-[6px] border border-[#d7e5ed] px-[10px] pb-[10px] pt-[2px]">
              <legend className="px-[4px] text-[11px] font-semibold text-[#5b7690]">Schedule End To End</legend>
              <HeaderField label="Remaining Hours of Use" value="0.00" labelWidth={160} />
              <HeaderField label="Remaining Number of Uses" value="0" labelWidth={160} />
            </fieldset>
            <fieldset className="rounded-[6px] border border-[#d7e5ed] px-[10px] pb-[10px] pt-[2px]">
              <legend className="px-[4px] text-[11px] font-semibold text-[#5b7690]">Schedule End Of Life</legend>
              <HeaderField label="Remaining Hours of Use" value="0.00" labelWidth={160} />
              <HeaderField label="Remaining Number of Uses" value="0" labelWidth={160} />
            </fieldset>
          </div>
        </fieldset>
      </div>
    )
  }

  if (tab.key === 'sources') {
    return (
      <SimpleGrid
        columns={['Type', 'Date Time', 'Curr.', 'Unit Price', 'UOM', 'NET USD/EA', 'Delivery Time', 'Vendor']}
        rows={detail.sources.map((r) => [r.type, r.dateTime, r.curr, r.unitPrice, r.uom, r.net, r.delivery, r.vendor])}
      />
    )
  }

  if (tab.key === 'poHistory') {
    return (
      <div>
        <button type="button" className="mb-[10px] rounded bg-ns-navy px-[14px] py-[7px] text-[12px] font-semibold text-white">
          Show Other Ships PO
        </button>
        <SimpleGrid
          columns={['PO No.', 'Vendor Name', 'Ship Name', 'Date Time', 'Status', 'Quantity', 'Unit Price', 'Dept.']}
          rows={detail.poHistory.map((r) => [r.poNo, r.vendor, r.ship, r.dateTime, r.status, r.qty, r.unitPrice, r.dept])}
        />
      </div>
    )
  }

  if (tab.key === 'localDescription') {
    return <div className="rounded-[8px] border border-[#e0eaf1] bg-white p-[16px] text-[13px] text-[#8199ad]">No local description.</div>
  }

  if (tab.key === 'standardJobs') {
    // Jobs added on a Standard Job form's Related Jobs tab, tagged with this
    // same component.
    const rows = findRelatedJobsForEquipment(detail.name, 'Component').map((row) => [
      row.jobSize ?? '',
      row.jobName ?? '',
      row.interval ?? '',
      row.lastDone ?? '',
      row.price ?? '',
      row.status ?? '',
    ])
    return <SimpleGrid columns={tab.columns} rows={rows} />
  }

  return <SimpleGrid columns={tab.columns ?? ['Name', 'Status']} rows={[]} />
}

function SimpleGrid({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-[8px] border border-[#d5e2ec] bg-white">
      <div className="min-w-full">
        <div className="flex bg-ns-navy text-white">
          {columns.map((col, i) => (
            <div key={i} className="flex-1 border-r border-white/20 px-[10px] py-[9px] text-[12px] font-semibold">
              {col}
            </div>
          ))}
        </div>
        {rows.length > 0 ? (
          rows.map((row, ri) => (
            <div key={ri} className="flex border-t border-[#e4edf3] text-[12px] text-ns-navy odd:bg-[#fbfdfe]">
              {row.map((cell, ci) => (
                <div key={ci} className="flex-1 truncate border-r border-[#eef4f8] px-[10px] py-[9px]">
                  {cell}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="h-[280px] bg-white" />
        )}
      </div>
    </div>
  )
}

function HeaderField({ label, value = '', name, chevron = false, calendar = false, labelWidth = 112 }) {
  const store = useContext(FieldStore)
  const fieldName = name ?? label
  return (
    <div className="flex min-w-0 items-center gap-[10px]">
      <span style={{ width: labelWidth }} className="shrink-0 text-right text-[12px] font-semibold text-[#5b7690]">
        {label}:
      </span>
      <span className="flex min-h-[30px] min-w-0 flex-1 items-center rounded-full border border-[#d7e5ed] bg-white px-[12px] text-[13px] text-ns-navy focus-within:border-ns-blue">
        <input
          name={fieldName}
          defaultValue={store[fieldName] ?? value}
          disabled={store.__readOnly}
          className="min-w-0 flex-1 bg-transparent focus:outline-none disabled:cursor-default disabled:text-[#41536a]"
        />
        {calendar ? (
          <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] shrink-0 fill-ns-navy">
            <path d="M3 5h18v16H3V5zm2 5v9h14v-9H5zM7 2v4H5V2h2zm12 0v4h-2V2h2z" />
          </svg>
        ) : null}
        {chevron ? (
          <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0 fill-none stroke-ns-navy" strokeWidth="2.4">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        ) : null}
      </span>
    </div>
  )
}

function Check({ label, name, checked = false }) {
  const store = useContext(FieldStore)
  const fieldName = name ?? label
  const [on, setOn] = useState(store[fieldName] != null ? store[fieldName] === 'true' : checked)
  return (
    <button type="button" disabled={store.__readOnly} onClick={() => setOn((v) => !v)} className="flex items-center gap-[7px] text-[12px] text-ns-navy focus:outline-none">
      <input type="hidden" name={fieldName} value={on ? 'true' : 'false'} readOnly />
      <span className={`flex h-[15px] w-[15px] items-center justify-center rounded-[4px] border text-[10px] ${on ? 'border-ns-blue bg-ns-blue text-white' : 'border-[#c7d6e0] bg-white'}`}>
        {on ? '✓' : ''}
      </span>
      {label}
    </button>
  )
}
