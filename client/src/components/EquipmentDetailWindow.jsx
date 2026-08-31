import { createContext, useContext, useMemo, useRef, useState } from 'react'

const FieldStore = createContext({})

function loadSaved(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) || {}
  } catch {
    return {}
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Tabs in the same order as the ABS "Equipment - ..." card, with the grid
// column headers taken from the screenshots. `menu` swaps the middle window
// menu item to match ABS.
const TABS = [
  { key: 'admin', label: 'Admin Info' },
  { key: 'counter', label: 'Counter' },
  { key: 'attachments', label: 'File Attachments', menu: 'Attachment', columns: ['Attachment', 'Size', 'Type', 'Replicate', 'Print in Report'] },
  { key: 'remarks', label: 'Remarks' },
  { key: 'certificates', label: 'Certificates', columns: ['Certificate', 'Type'] },
  { key: 'hazardousMaterial', label: 'Hazardous Material', columns: ['No.', 'Applicable', 'Space Name', 'Equipment Name', 'Parts where used or application of Paint', 'Hazardous Material', 'Part Name', 'Threshold Level', 'Per Item', 'Number of Items', 'Total', 'Unit', 'Remarks'] },
]

export default function EquipmentDetailWindow({ detail, onMinimize, onClose, inline = false }) {
  const readOnly = inline
  const [activeKey, setActiveKey] = useState('admin')
  const storageKey = `ns5-equipment-detail-${detail.id}`
  const saved = useMemo(() => loadSaved(storageKey), [storageKey])

  const [attachments, setAttachments] = useState(saved.__attachments ?? [])
  const [certRows, setCertRows] = useState(saved.__certificates ?? [])
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
    data.__attachments = attachments
    data.__certificates = certRows
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(data))
      setSavedMsg('All changes saved.')
    } catch {
      setSavedMsg('Save is unavailable in this browser.')
    }
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
            Equipment - {detail.name} - [{detail.equipmentCode}]
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

        {/* Header field block */}
        <div className="shrink-0 border-b border-[#e4edf3] bg-white px-[16px] py-[12px]">
          <div className="grid grid-cols-2 gap-x-[28px] gap-y-[8px]">
            <HeaderField label="Name" value={detail.name} />
            <HeaderField label="Designation" value={detail.designation} chevron />
            <HeaderField label="Complete Name" value={detail.completeName} />
            <HeaderField label="Equipment Code" value={detail.equipmentCode} />
            <HeaderField label="Manufacturer" value={detail.manufacturer} chevron />
            <HeaderField label="Equip.Location" value={detail.equipLocation} />
            <HeaderField label="Spares Storage" value={detail.sparesStorage} chevron />
            <HeaderField label="Date Installed" value={detail.dateInstalled} calendar />
            <div className="flex items-center gap-[10px]">
              <span className="w-[112px] shrink-0 text-right text-[12px] font-semibold text-[#5b7690]">Status:</span>
              <Radio label="Active" checked={detail.status === 'Active'} />
              <Radio label="InActive" checked={detail.status !== 'Active'} />
            </div>
            <HeaderField label="Model" value={detail.model} />
            <HeaderField label="Srl. No." value={detail.serialNo} />
            <HeaderField label="Type" value={detail.equipmentType} />
            <HeaderField label="Size" value={detail.size} />
            <HeaderField label="Software Version" value={detail.softwareVersion} />
            <HeaderField label="Barcode" value={detail.barcode} />
            <HeaderField label="IMO No" value={detail.imoNo} />
          </div>

          <div className="mt-[10px] flex flex-wrap items-center gap-x-[22px] gap-y-[6px]">
            <Check label="Condition Monitoring" />
            <span className="flex items-center gap-[8px] text-[12px] text-ns-navy">
              Type:
              <Radio label="Spare" checked={detail.type === 'Spare'} />
              <Radio label="Store" checked={detail.type === 'Store'} />
            </span>
          </div>

          <div className="mt-[10px] grid grid-cols-2 gap-x-[28px]">
            <HeaderField label="Criticality" value={detail.admin.criticality} chevron />
            <HeaderField label="Department" value={detail.admin.department} chevron />
          </div>

          <fieldset className="mt-[10px] rounded-[6px] border border-[#d7e5ed] px-[12px] pb-[10px] pt-[4px]">
            <legend className="px-[6px] text-[12px] font-semibold text-[#5b7690]">Class Data</legend>
            <div className="grid grid-cols-4 gap-x-[18px]">
              <HeaderField label="Class Code" value="" labelWidth={78} />
              <HeaderField label="HID" value="" labelWidth={78} />
              <HeaderField label="Class Status" value="" labelWidth={78} />
              <HeaderField label="Class Equipment Name" value="" labelWidth={78} />
            </div>
          </fieldset>
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
          {activeTab.key === 'attachments' ? (
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
                columns={['Attachment', 'Size', 'Type', 'Replicate', 'Print in Report']}
                rows={attachments.map((a) => [a.name, a.size, a.type, 'Yes', 'Yes'])}
              />
            </div>
          ) : activeTab.key === 'certificates' ? (
            <CertificatesPanel rows={certRows} setRows={setCertRows} readOnly={readOnly} />
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
  if (tab.key === 'admin') {
    return (
      <div className="rounded-[8px] border border-[#e0eaf1] bg-white p-[16px]">
        <div className="grid grid-cols-2 gap-x-[28px] gap-y-[10px]">
          <HeaderField label="Account(Materials)" value={`${detail.admin.accountMaterials}   ${detail.admin.accountMaterialsName}`} labelWidth={130} />
          <HeaderField label="Account(Services)" value={`${detail.admin.accountServices}   ${detail.admin.accountServicesName}`} labelWidth={130} />
          <HeaderField label="Subject Index" value="" chevron />
          <HeaderField label="Cost Center" value="" chevron />
        </div>
        <div className="mt-[14px] rounded-[6px] border border-[#d7e5ed] px-[12px] py-[10px]">
          <div className="text-[12px] font-semibold text-[#5b7690]">Requisitioning</div>
          <div className="mt-[6px] flex items-center gap-[18px]">
            <Radio label="Stock" checked={detail.admin.requisitioning === 'Stock'} />
            <Radio label="Non-Stock" checked={detail.admin.requisitioning !== 'Stock'} />
          </div>
          <div className="mt-[10px] flex flex-wrap gap-x-[22px] gap-y-[6px]">
            <Check label="Under Warranty" />
            <Check label="Restrict Part Creation" />
            <Check label="Mark All Parts As Hazardous" />
            <Check label="Require Failure RA" />
            <Check label="Allow Type-In" />
          </div>
        </div>
      </div>
    )
  }

  if (tab.key === 'counter') {
    return (
      <div className="rounded-[8px] border border-[#e0eaf1] bg-white p-[16px]">
        <div className="flex flex-wrap items-center gap-x-[28px] gap-y-[10px]">
          <HeaderField label="Counter Type" value="Hourly" chevron labelWidth={110} />
          <HeaderField label="Counter Reading" value="0" labelWidth={120} />
          <HeaderField label="As of" value="" calendar labelWidth={60} />
          <HeaderField label="Total Hrs Run" value="0" labelWidth={100} />
        </div>
      </div>
    )
  }

  if (tab.key === 'remarks') {
    return (
      <div className="rounded-[8px] border border-[#e0eaf1] bg-white p-[16px] text-[13px] text-ns-navy">
        {detail.remarks}
      </div>
    )
  }

  // Everything else: empty grid with the tab's column headers.
  return <SimpleGrid columns={tab.columns ?? ['Name', 'Status']} rows={[]} />
}

function CertificatesPanel({ rows, setRows, readOnly = false }) {
  const [name, setName] = useState('')
  const [type, setType] = useState('')

  function add() {
    if (!name.trim()) return
    setRows((current) => [...current, [name.trim(), type.trim() || '-']])
    setName('')
    setType('')
  }

  return (
    <div>
      {!readOnly ? (
      <div className="mb-[10px] flex flex-wrap items-center gap-[8px]">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Certificate"
          className="min-h-[30px] w-[240px] rounded-full border border-[#d7e5ed] bg-white px-[12px] text-[13px] text-ns-navy focus:outline-none"
        />
        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Type"
          className="min-h-[30px] w-[180px] rounded-full border border-[#d7e5ed] bg-white px-[12px] text-[13px] text-ns-navy focus:outline-none"
        />
        <button
          type="button"
          onClick={add}
          className="rounded bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[16px] py-[7px] text-[12px] font-semibold text-white"
        >
          + Add Certificate
        </button>
      </div>
      ) : null}
      <SimpleGrid columns={['Certificate', 'Type']} rows={rows} />
    </div>
  )
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
            <div key={ri} className="flex border-t border-[#e4edf3] bg-[#2f7fe0] text-[12px] text-white">
              {row.map((cell, ci) => (
                <div key={ci} className="flex-1 truncate border-r border-white/15 px-[10px] py-[9px]">
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

function Radio({ label, name, checked = false }) {
  const store = useContext(FieldStore)
  const fieldName = name ?? label
  const [on, setOn] = useState(store[fieldName] != null ? store[fieldName] === 'true' : checked)
  return (
    <button type="button" disabled={store.__readOnly} onClick={() => setOn((v) => !v)} className="flex items-center gap-[6px] text-[12px] text-ns-navy focus:outline-none">
      <input type="hidden" name={fieldName} value={on ? 'true' : 'false'} readOnly />
      <span className={`flex h-[14px] w-[14px] items-center justify-center rounded-full border ${on ? 'border-ns-blue' : 'border-[#c7d6e0]'}`}>
        {on ? <span className="h-[7px] w-[7px] rounded-full bg-ns-blue" /> : null}
      </span>
      {label}
    </button>
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
