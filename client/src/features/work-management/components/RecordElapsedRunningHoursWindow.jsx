import { useState } from 'react'
import {
  RUNNING_HOURS_COLUMNS,
  RUNNING_HOURS_ROWS,
  COUNTER_HISTORY_COLUMNS,
  COUNTER_HISTORY_ROWS,
  RELATED_STANDARD_JOBS_COLUMNS,
  RELATED_STANDARD_JOBS_ROWS,
  RELATED_MACHINERY_COLUMNS,
} from '@/data/recordElapsedRunningHours.js'
import { getCounterAllowed, isCounterAllowed } from '@/stores/counterAllowedStore.js'
import { loadRunningHoursState, saveRunningHoursState } from '@/stores/runningHoursStore.js'
import {
  findEquipmentNodeById,
} from '@/data/equipment.js'
import {
  getEquipmentTree,
  loadEquipmentAdditions,
} from '@/stores/equipmentStore.js'

const TABS = ['Counter History', 'Related Machinery', 'Related Standard Jobs']

// Major Systems / Sub-Systems the user added through the Equipment Structure
// dialog and then switched to "Allow Counter" — those join this list.
function userCreatedRows() {
  const additions = loadEquipmentAdditions().filter(
    ({ draft }) => draft?.category === 'Major System' || draft?.category === 'Sub-System',
  )
  if (additions.length === 0) return []

  const tree = getEquipmentTree()
  const seen = new Set(RUNNING_HOURS_ROWS.map((row) => row.machine))

  return additions.reduce((rows, { parentId, draft }) => {
    if (seen.has(draft.label) || getCounterAllowed(draft.label) !== true) return rows
    seen.add(draft.label)
    rows.push({
      machine: draft.label,
      topLevel: findEquipmentNodeById(tree, parentId)?.label ?? '',
      lastCounter: '0',
      lastDate: '',
      newCounter: '',
      dateTime: '',
    })
    return rows
  }, [])
}

// The rows carry MM/DD/YYYY; <input type="date"> wants YYYY-MM-DD.
function toDateInput(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value ?? '')
  return match ? `${match[3]}-${match[1]}-${match[2]}` : ''
}

function fromDateInput(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '')
  return match ? `${match[2]}/${match[3]}/${match[1]}` : ''
}

// Counters are displayed with thousands separators; history math needs plain
// numbers, and new entries are formatted back the same way.
function toNumber(value) {
  const parsed = Number(String(value ?? '').replace(/,/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

function formatCounter(value) {
  return toNumber(value).toLocaleString('en-US')
}

export default function RecordElapsedRunningHoursWindow({ onMinimize, onClose, preview = false }) {
  const [selectedRow, setSelectedRow] = useState(0)
  const [activeTab, setActiveTab] = useState('Counter History')
  // Edits are keyed by machine name, not row index, so rows appearing later
  // (equipment the user creates and allows a counter for) slot in cleanly.
  const [edits, setEdits] = useState(() => loadRunningHoursState().edits)
  // Counter History entries the user has recorded, keyed by machine name and
  // kept newest-first so the tab reads like the seeded history did.
  const [history, setHistory] = useState(() => loadRunningHoursState().history)

  // Re-checked on every render so a machine hidden via an Equipment window's
  // Counter tab ("Not Allow") drops out of this list as soon as this window
  // is focused again — machinery with no matching equipment stays visible.
  const visibleRows = [...RUNNING_HOURS_ROWS, ...userCreatedRows()].filter((row) =>
    isCounterAllowed(row.machine),
  )

  // Counter History follows the row selected in the machinery grid: recorded
  // updates first, then whatever seed history that machine shipped with.
  const selectedMachine = visibleRows[selectedRow]?.machine
  const counterHistoryRows = [
    ...(selectedMachine ? history[selectedMachine] ?? [] : []),
    ...COUNTER_HISTORY_ROWS,
  ]

  function editOf(row) {
    const edit = edits[row.machine] ?? {}
    return {
      newCounter: edit.newCounter ?? row.newCounter,
      newDate: edit.newDate ?? row.dateTime,
      lastCounter: edit.lastCounter ?? row.lastCounter,
      lastDate: edit.lastDate ?? row.lastDate,
    }
  }

  function setEdit(machine, patch) {
    setEdits((current) => ({ ...current, [machine]: { ...current[machine], ...patch } }))
  }

  // Commits every row's pending New Counter/Date into Last Counter/Last
  // Date, then clears the entry fields so they're ready for the next round.
  function handleUpdate() {
    const entries = {}
    const nextEdits = { ...edits }

    for (const row of visibleRows) {
      const { newCounter, newDate, lastCounter, lastDate } = editOf(row)
      const hasNewCounter = newCounter !== '' && newCounter != null
      if (hasNewCounter) {
        entries[row.machine] = [
          row.machine,
          row.topLevel,
          newDate || lastDate || '',
          Math.max(0, toNumber(newCounter) - toNumber(lastCounter)),
          formatCounter(newCounter),
          'No',
        ]
      }
      nextEdits[row.machine] = {
        lastCounter: hasNewCounter ? formatCounter(newCounter) : lastCounter,
        lastDate: newDate ? newDate : lastDate,
        newCounter: '',
        newDate: '',
      }
    }

    const nextHistory = { ...history }
    for (const [machine, entry] of Object.entries(entries)) {
      nextHistory[machine] = [entry, ...(nextHistory[machine] ?? [])]
    }

    setEdits(nextEdits)
    setHistory(nextHistory)
    saveRunningHoursState({ edits: nextEdits, history: nextHistory })
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex h-[62px] shrink-0 items-center border-b border-[#e1ecf2] bg-white pl-[20px]">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
        </svg>
        <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">
          [26] Running Hours
        </span>
        <WindowActions preview={preview} onMinimize={onMinimize} onClose={onClose} />
      </div>


      <div className="flex min-h-0 flex-1 flex-col bg-[#eef5fa] px-[14px] py-[14px]">
        <div className="overflow-hidden rounded-[24px] border border-[#dce8ef] bg-white">
          <div className="overflow-x-auto">
          <div
            className="flex bg-[#dcecf7] text-ns-navy"
            style={{ minWidth: RUNNING_HOURS_COLUMNS.reduce((sum, c) => sum + c.width, 0) }}
          >
            {RUNNING_HOURS_COLUMNS.map((col, i) => (
              <div
                key={`${col.label}-${i}`}
                style={{ width: col.width }}
                className="flex h-[38px] shrink-0 items-center justify-center border-r border-white/40 px-[4px] text-[12px] font-bold uppercase tracking-[0.06em]"
              >
                {col.label}
              </div>
            ))}
            <div className="flex h-[38px] flex-1 items-center justify-end pr-[8px]">
              <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-none stroke-ns-navy" strokeWidth="2.4">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="h-[260px] overflow-y-auto bg-white">
          {visibleRows.map((row, i) => {
            const isSelected = i === selectedRow
            const values = editOf(row)
            return (
              <div
                key={row.machine}
                onClick={() => setSelectedRow(i)}
                className={`flex w-full cursor-pointer text-left text-[13px] ${
                  isSelected ? 'bg-[#edf6fd] text-ns-navy' : 'text-ns-navy hover:bg-[#f7fbfd]'
                }`}
                style={{ minWidth: RUNNING_HOURS_COLUMNS.reduce((sum, c) => sum + c.width, 0) }}
              >
                <span style={{ width: RUNNING_HOURS_COLUMNS[0].width }} className="shrink-0 truncate px-[6px] py-[6px]">
                  {row.machine}
                </span>
                <span style={{ width: RUNNING_HOURS_COLUMNS[1].width }} className="shrink-0 truncate px-[6px] py-[6px]">
                  {row.topLevel}
                </span>
                <span style={{ width: RUNNING_HOURS_COLUMNS[2].width }} className="shrink-0 truncate px-[6px] py-[6px] text-right">
                  {values.lastCounter}
                </span>
                <span style={{ width: RUNNING_HOURS_COLUMNS[3].width }} className="shrink-0 truncate px-[6px] py-[6px]">
                  {values.lastDate}
                </span>
                <span
                  style={{ width: RUNNING_HOURS_COLUMNS[4].width }}
                  className={`flex shrink-0 items-center justify-end px-[4px] py-[3px] ${isSelected ? 'bg-[#f3f9fe]' : 'bg-[#fff6cf]'}`}
                >
                  <input
                    type="text"
                    inputMode="numeric"
                    aria-label={`New counter for ${row.machine}`}
                    value={values.newCounter}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => setEdit(row.machine, { newCounter: event.target.value })}
                    className="h-[26px] w-full min-w-0 rounded-[6px] border border-[#e3d68a] bg-white px-[6px] text-right text-[13px] text-ns-navy outline-none focus:border-ns-blue"
                  />
                </span>
                <span
                  style={{ width: RUNNING_HOURS_COLUMNS[5].width }}
                  className="flex shrink-0 items-center px-[4px] py-[3px]"
                >
                  <input
                    type="date"
                    aria-label={`Date for ${row.machine}`}
                    value={toDateInput(values.newDate)}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => setEdit(row.machine, { newDate: fromDateInput(event.target.value) })}
                    className="h-[26px] w-full min-w-0 rounded-[6px] border border-[#d7e5ed] bg-white px-[6px] text-[13px] text-ns-navy outline-none focus:border-ns-blue"
                  />
                </span>
              </div>
            )
          })}
        </div>

        <div className="flex h-[20px] shrink-0 items-center gap-[2px] bg-[#f7fbfd] px-[12px]">
          <svg viewBox="0 0 24 24" className="h-[12px] w-[12px] fill-ns-navy">
            <polygon points="12,5 19,15 5,15" />
          </svg>
          <svg viewBox="0 0 24 24" className="h-[12px] w-[12px] fill-ns-navy">
            <polygon points="5,9 19,9 12,19" />
          </svg>
        </div>

        <div className="flex shrink-0 justify-end border-t border-[#e4edf3] bg-[#fbfdfe] px-[14px] py-[10px]">
          <button
            type="button"
            onClick={handleUpdate}
            className="rounded-full bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-[22px] py-[9px] text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(46,139,207,0.24)] focus:outline-none"
          >
            Update
          </button>
        </div>

        <div className="flex shrink-0 gap-[8px] border-b border-[#e4edf3] bg-[#f7fbfd] px-[12px] pt-[4px]">
          {TABS.map((tab) => {
            const isActive = tab === activeTab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-t-[16px] px-[16px] py-[9px] text-[14px] font-semibold focus:outline-none ${
                  isActive ? 'bg-[#2e8bcf] text-white' : 'bg-transparent text-ns-navy'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-white">
          {activeTab === 'Counter History' && (
            <div className="flex h-full">
              <div className="flex w-[220px] shrink-0 flex-col gap-[10px] border-r border-[#e4edf3] bg-[#fbfdfe] p-[14px]">
                <button
                  type="button"
                  className="rounded-full border border-[#d7e5ed] bg-white px-[16px] py-[8px] text-[13px] font-semibold text-ns-navy focus:outline-none"
                >
                  Delete Last
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-[16px] py-[8px] text-[13px] font-semibold text-white focus:outline-none"
                >
                  Delete Entries From
                </button>
                <span className="flex items-center gap-[6px] border-b border-[#dce8ef] pb-[4px] pt-[6px]">
                  <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-ns-navy">
                    <path d="M3 5h18v16H3V5zm2 5v9h14v-9H5zM7 2v4H5V2h2zm12 0v4h-2V2h2z" />
                  </svg>
                </span>
              </div>
              <div className="min-w-0 flex-1 overflow-auto">
                <div className="overflow-x-auto">
                  <div
                    className="flex bg-[#dcecf7] text-ns-navy"
                    style={{ minWidth: COUNTER_HISTORY_COLUMNS.reduce((sum, c) => sum + c.width, 0) }}
                  >
                    {COUNTER_HISTORY_COLUMNS.map((col, i) => (
                      <div
                        key={`${col.label}-${i}`}
                        style={{ width: col.width }}
                        className="flex h-[36px] shrink-0 items-center justify-center border-r border-white/40 px-[4px] text-[12px] font-bold uppercase tracking-[0.06em]"
                      >
                        {col.label}
                      </div>
                    ))}
                    <div className="flex h-[36px] flex-1 items-center justify-end pr-[8px]">
                      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-none stroke-ns-navy" strokeWidth="2.4">
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </div>
                  </div>
                </div>
                {counterHistoryRows.map((row, i) => (
                  <div
                    key={i}
                    className="flex text-[13px] text-ns-navy odd:bg-white even:bg-[#fbfdfe]"
                    style={{ minWidth: COUNTER_HISTORY_COLUMNS.reduce((sum, c) => sum + c.width, 0) }}
                  >
                    {row.map((cell, j) => (
                      <span
                        key={j}
                        style={{ width: COUNTER_HISTORY_COLUMNS[j].width }}
                        className={`shrink-0 truncate px-[8px] py-[6px] ${j === 3 || j === 4 ? 'text-right' : ''}`}
                      >
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Related Machinery' && (
            <RelatedPanel
              columns={RELATED_MACHINERY_COLUMNS}
              rows={[]}
            />
          )}

          {activeTab === 'Related Standard Jobs' && (
            <RelatedPanel
              columns={RELATED_STANDARD_JOBS_COLUMNS}
              rows={RELATED_STANDARD_JOBS_ROWS}
              highlightFirst
            />
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

function RelatedPanel({ columns, rows, highlightFirst }) {
  return (
    <div className="flex h-full">
      <div className="min-w-0 flex-1 overflow-auto">
        <div className="overflow-x-auto">
          <div
            className="flex bg-[#dcecf7] text-ns-navy"
            style={{ minWidth: columns.reduce((sum, c) => sum + c.width, 0) }}
          >
            {columns.map((col, i) => (
              <div
                key={`${col.label}-${i}`}
                style={{ minWidth: col.width, flex: `${col.width} 1 0%` }}
                className="flex h-[36px] items-center justify-center border-r border-white/40 px-[4px] text-[12px] font-bold uppercase tracking-[0.06em]"
              >
                {col.label}
              </div>
            ))}
            <div className="flex h-[36px] w-[30px] shrink-0 items-center justify-end pr-[8px]">
              <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-none stroke-ns-navy" strokeWidth="2.4">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>
        </div>
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex text-[13px] ${i === 0 && highlightFirst ? 'bg-[#edf6fd] text-ns-navy' : 'text-ns-navy odd:bg-white even:bg-[#fbfdfe]'}`}
            style={{ minWidth: columns.reduce((sum, c) => sum + c.width, 0) }}
          >
            {row.map((cell, j) => (
              <span
                key={j}
                style={{ minWidth: columns[j].width, flex: `${columns[j].width} 1 0%` }}
                className="truncate px-[8px] py-[6px]"
              >
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function WindowActions({ preview, onMinimize, onClose }) {
  return (
    <div className="ml-auto flex items-center gap-[10px] pr-[14px]">
      <WindowActionButton label="Minimize" onClick={preview ? undefined : onMinimize}>
        <line x1="3" y1="11" x2="13" y2="11" />
      </WindowActionButton>
      <WindowActionButton label="Maximize">
        <rect x="2" y="4" width="12" height="9" />
        <line x1="2" y1="6.5" x2="14" y2="6.5" />
      </WindowActionButton>
      <WindowActionButton label="Close" onClick={preview ? undefined : onClose}>
        <line x1="3" y1="3" x2="13" y2="13" />
        <line x1="13" y1="3" x2="3" y2="13" />
      </WindowActionButton>
    </div>
  )
}

function WindowActionButton({ label, children, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[#8aa0b4] transition hover:bg-[#eef6fb] hover:text-ns-navy focus:outline-none"
    >
      <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-current" strokeWidth="1.9">
        {children}
      </svg>
    </button>
  )
}

function ToolIcon({ children, label }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px] text-ns-navy hover:bg-[#eef6fb] focus:outline-none"
    >
      {children}
    </button>
  )
}

function SaveGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M4 3h13l3 3v15H4V3zm3 2v5h9V5H7zm0 8v6h10v-6H7z" />
    </svg>
  )
}

function PrintGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M7 3h10v4H7V3zM4 8h16v8h-3v5H7v-5H4V8zm5 8v3h6v-3H9z" />
    </svg>
  )
}

function HelpGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="12" cy="12" r="10" className="fill-current" />
      <text x="12" y="17" textAnchor="middle" className="fill-white" style={{ fontSize: '13px', fontWeight: 700 }}>
        ?
      </text>
    </svg>
  )
}
