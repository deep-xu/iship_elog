import { useState } from 'react'
import {
  RUNNING_HOURS_COLUMNS,
  RUNNING_HOURS_ROWS,
  COUNTER_HISTORY_COLUMNS,
  COUNTER_HISTORY_ROWS,
  RELATED_STANDARD_JOBS_COLUMNS,
  RELATED_STANDARD_JOBS_ROWS,
  RELATED_MACHINERY_COLUMNS,
} from '../data/recordElapsedRunningHours.js'

const TABS = ['Counter History', 'Related Machinery', 'Related Standard Jobs']

export default function RecordElapsedRunningHoursWindow({ onMinimize, onClose, preview = false }) {
  const [selectedRow, setSelectedRow] = useState(0)
  const [activeTab, setActiveTab] = useState('Counter History')
  const [relatedFilter, setRelatedFilter] = useState('all')

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
          {RUNNING_HOURS_ROWS.map((row, i) => {
            const isSelected = i === selectedRow
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedRow(i)}
                className={`flex w-full text-left text-[13px] focus:outline-none ${
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
                  {row.lastCounter}
                </span>
                <span style={{ width: RUNNING_HOURS_COLUMNS[3].width }} className="shrink-0 truncate px-[6px] py-[6px]">
                  {row.lastDate}
                </span>
                <span
                  style={{ width: RUNNING_HOURS_COLUMNS[4].width }}
                  className={`shrink-0 truncate px-[6px] py-[6px] text-right ${isSelected ? 'bg-[#f3f9fe]' : 'bg-[#fff6cf]'}`}
                >
                  {row.newCounter}
                </span>
                <span style={{ width: RUNNING_HOURS_COLUMNS[5].width }} className="shrink-0 truncate px-[6px] py-[6px]">
                  {row.dateTime}
                </span>
              </button>
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
                {COUNTER_HISTORY_ROWS.map((row, i) => (
                  <div
                    key={i}
                    className="flex text-[13px] text-ns-navy odd:bg-white even:bg-[#fbfdfe]"
                    style={{ minWidth: COUNTER_HISTORY_COLUMNS.reduce((sum, c) => sum + c.width, 0) }}
                  >
                    {row.map((cell, j) => (
                      <span
                        key={j}
                        style={{ width: COUNTER_HISTORY_COLUMNS[j].width }}
                        className={`shrink-0 truncate px-[8px] py-[6px] ${j === 1 || j === 2 ? 'text-right' : ''}`}
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
              filter={relatedFilter}
              onFilter={setRelatedFilter}
              columns={RELATED_MACHINERY_COLUMNS}
              rows={[]}
            />
          )}

          {activeTab === 'Related Standard Jobs' && (
            <RelatedPanel
              filter={relatedFilter}
              onFilter={setRelatedFilter}
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

function RelatedPanel({ filter, onFilter, columns, rows, highlightFirst }) {
  const options = [
    { key: 'all', label: 'Show All' },
    { key: 'own', label: 'Own Counter' },
    { key: 'this', label: 'This Counter' },
  ]

  return (
    <div className="flex h-full">
      <div className="flex w-[220px] shrink-0 flex-col gap-[12px] border-r border-[#e4edf3] bg-[#fbfdfe] p-[14px]">
        {options.map((opt) => (
          <label key={opt.key} className="flex items-center gap-[10px] text-[14px] text-ns-navy">
            <button
              type="button"
              onClick={() => onFilter(opt.key)}
              aria-label={opt.label}
              className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border border-[#b8c9d6] bg-white focus:outline-none"
            >
              {filter === opt.key && <span className="h-[9px] w-[9px] rounded-full bg-ns-blue" />}
            </button>
            {opt.label}
          </label>
        ))}
      </div>
      <div className="min-w-0 flex-1 overflow-auto">
        <div className="overflow-x-auto">
          <div
            className="flex bg-[#dcecf7] text-ns-navy"
            style={{ minWidth: columns.reduce((sum, c) => sum + c.width, 0) }}
          >
            {columns.map((col, i) => (
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
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex text-[13px] ${i === 0 && highlightFirst ? 'bg-[#edf6fd] text-ns-navy' : 'text-ns-navy odd:bg-white even:bg-[#fbfdfe]'}`}
            style={{ minWidth: columns.reduce((sum, c) => sum + c.width, 0) }}
          >
            {row.map((cell, j) => (
              <span key={j} style={{ width: columns[j].width }} className="shrink-0 truncate px-[8px] py-[6px]">
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
