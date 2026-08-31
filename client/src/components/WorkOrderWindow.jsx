import { useMemo, useState } from 'react'
import { getActiveWorkOrderDetail } from '../data/workOrderDetailData.js'
import { WORK_ORDER_SEARCH_COLUMNS, WORK_ORDER_SEARCH_ROWS } from '../data/workOrderSearch.js'

const WORK_ORDER_TABS = ['All', 'Active', 'Approvals', 'Closed', 'Deferred', 'Cancelled']

export default function WorkOrderWindow({ onMinimize, onClose, preview = false }) {
  const detail = useMemo(() => getActiveWorkOrderDetail(), [])
  const [created, setCreated] = useState(false)
  const [activeTab, setActiveTab] = useState('All')

  const toolbarIcons = ['save', 'stamp', 'copy', 'help']

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
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
          <button
            type="button"
            onClick={() => setCreated(true)}
            className="shrink-0 rounded-[10px] bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[22px] py-[9px] text-[14px] font-semibold text-white shadow-[0_14px_26px_rgba(46,139,207,0.24)] focus:outline-none"
          >
            + Create
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[12px] border border-[#dce8ef] bg-white shadow-[0_16px_38px_rgba(84,116,145,0.08)]">
          <WorkOrderHistory activeTab={activeTab} />
        </div>
      </div>

      {created ? (
      <div className="absolute inset-0 z-40 flex items-start justify-center bg-[rgba(28,49,71,0.28)] p-[24px]">
        <div className="flex h-full w-full max-w-[1280px] flex-col overflow-hidden rounded-[14px] border border-[#c7d8e4] bg-white shadow-[0_30px_80px_rgba(30,55,82,0.35)]">
          <div className="flex h-[46px] shrink-0 items-center border-b border-[#e1ecf2] bg-[#f5f8fb] px-[16px]">
            <span className="truncate font-heading text-[15px] font-bold text-ns-navy">{detail.titleBar}</span>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setCreated(false)}
              className="ml-auto flex h-[26px] w-[26px] items-center justify-center rounded bg-ns-navy text-white hover:bg-[#1c3147] focus:outline-none"
            >
              <svg viewBox="0 0 16 16" className="h-[10px] w-[10px] fill-none stroke-current" strokeWidth="2">
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-auto bg-[#fcfeff] px-[18px] py-[18px]">
            <div className="mb-[14px] flex flex-wrap items-center gap-[10px]">
              <div className="rounded-full bg-[#eaf4fb] px-[12px] py-[5px] text-[11px] font-semibold uppercase tracking-[0.14em] text-ns-blue">
                Work Order Details
              </div>
              <div className="text-[12px] text-[#7f96ab]">Review, update, and complete operational details from one place.</div>
            </div>

            {(
            <div className="grid grid-cols-[minmax(280px,1fr)_minmax(320px,1fr)_minmax(420px,1.3fr)] gap-[16px] text-[14px] text-ns-navy">
              <div className="rounded-[18px] border border-[#e4edf3] bg-white px-[16px] py-[14px] shadow-[0_8px_18px_rgba(84,116,145,0.05)]">
                <div className="mb-[12px] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#88a2bb]">Core</div>
                <div className="space-y-[12px]">
                  <Field label="Ship" value={detail.shipName} chevron />
                  <Field label="WO/SR No." value={detail.woNumber} />
                  <Field label="Equipment" value={detail.equipment} chevron />
                  <CounterRow detail={detail} />
                </div>
              </div>

              <div className="rounded-[18px] border border-[#e4edf3] bg-white px-[16px] py-[14px] shadow-[0_8px_18px_rgba(84,116,145,0.05)]">
                <div className="mb-[12px] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#88a2bb]">Schedule</div>
                <div className="space-y-[12px]">
                  <Field label="Perform By" value={detail.performBy} chevron />
                  <Field label="Scheduled" value={detail.scheduled} calendar />
                  <Field label="Completed" value={detail.completed} calendar />
                  <Field label="Questionnaire" value={detail.questionnaire} chevron />
                  <Field label="CM Type" value={detail.cmType} chevron />
                </div>
              </div>

              <div className="rounded-[18px] border border-[#e4edf3] bg-white px-[16px] py-[14px] shadow-[0_8px_18px_rgba(84,116,145,0.05)]">
                <div className="mb-[12px] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#88a2bb]">Status & Control</div>
                <div className="space-y-[12px]">
                  <InlineTopGroup detail={detail} />
                  <Field label="Title" value={detail.title} wide />
                  <div className="grid grid-cols-2 gap-[12px]">
                    <Field label="Due" value={detail.due} calendar />
                    <Field label="Ext" value={detail.ext} calendar />
                  </div>
                  <div className="grid grid-cols-2 gap-[12px]">
                    <Field label="Identifier" value={detail.identifier} chevron dotted />
                    <Field label="SI Serial" value={detail.siSerial} />
                  </div>
                  <Field label="Vendor Analysis" value={detail.vendorAnalysis} chevron />
                  <CheckGroup
                    items={[
                      ['Findings Required', detail.findingsRequired],
                      ['Table Entries Required', detail.tableEntriesRequired],
                      ['Further Action Required', detail.furtherActionRequired],
                    ]}
                  />
                </div>
              </div>
            </div>
            )}
          </div>

          <div className="flex h-[52px] shrink-0 items-center justify-end gap-[12px] border-t border-[#e4edf3] bg-[#f5f8fb] px-[18px]">
            <button
              type="button"
              onClick={() => setCreated(false)}
              className="rounded-[8px] border border-[#d7e5ed] bg-white px-[20px] py-[9px] text-[13px] font-semibold text-ns-navy focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setCreated(false)}
              className="rounded-[8px] bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[26px] py-[9px] text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(46,139,207,0.24)] focus:outline-none"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      ) : null}
    </div>
  )
}

function WorkOrderHistory({ activeTab = 'All' }) {
  const keys = WORK_ORDER_SEARCH_COLUMNS.map((col) => col.key)
  const rows =
    activeTab === 'All'
      ? WORK_ORDER_SEARCH_ROWS
      : WORK_ORDER_SEARCH_ROWS.filter(
          (_, index) => index % WORK_ORDER_TABS.length === WORK_ORDER_TABS.indexOf(activeTab),
        )

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
          <div key={rowIndex} className="flex border-b border-[#e4edf3] text-[13px] text-ns-navy odd:bg-[#fbfdfe]">
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
      <CheckRow label="SI Replaced" checked={detail.siReplaced} />
      <CheckRow label="Failure" checked={detail.failure} />
      <CheckRow label="Condition Based" checked={detail.conditionBased} />
      <button
        type="button"
        className="rounded-full bg-[#213b6b] px-[16px] py-[8px] text-[13px] font-semibold text-white"
      >
        PM Job
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
