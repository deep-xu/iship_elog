import { useState } from 'react'
import { TABLE_TEMPLATE_COLUMNS, TABLE_TEMPLATE_ROWS } from '../data/tableTemplates.js'

export default function TableTemplatesWindow({ onMinimize, onClose, preview = false }) {
  const [selectedRow, setSelectedRow] = useState(0)
  const [pastEntriesCollapsed, setPastEntriesCollapsed] = useState(false)

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      {/* Title bar */}
      <div className="flex h-[34px] shrink-0 items-center bg-[#f7fbfd] pl-[10px]">
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-navy" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-navy" />
        </svg>
        <span className="ml-[9px] text-[17px] font-semibold text-ns-navy">
          [4] Table Templates of : ( Seaspan Benefactor )
        </span>
        <div className="ml-auto flex items-center gap-[12px] pr-[8px]">
          <button
            type="button"
            aria-label="Minimize"
            onClick={preview ? undefined : onMinimize}
            className="flex h-[24px] w-[24px] items-center justify-center focus:outline-none"
          >
            <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] stroke-ns-navy" strokeWidth="2.6">
              <line x1="3" y1="11" x2="13" y2="11" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Maximize"
            className="flex h-[24px] w-[24px] items-center justify-center focus:outline-none"
          >
            <svg viewBox="0 0 16 16" className="h-[15px] w-[15px] fill-none stroke-ns-navy" strokeWidth="1.8">
              <rect x="2" y="4" width="12" height="9" />
              <line x1="2" y1="6.5" x2="14" y2="6.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={preview ? undefined : onClose}
            className="flex h-[22px] w-[26px] items-center justify-center bg-ns-navy focus:outline-none"
          >
            <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] stroke-white" strokeWidth="2">
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search row */}
      <div className="flex h-[46px] shrink-0 items-center gap-[16px] bg-white px-[14px]">
        <div className="flex items-center gap-[8px] text-[15px] text-ns-navy">
          <span>Search :</span>
          <input
            type="text"
            className="w-[220px] border-b border-[#d7e5ed] bg-transparent px-[4px] py-[2px] focus:outline-none"
          />
        </div>

        <div className="ml-auto flex items-center gap-[8px] text-[15px] text-ns-navy">
          <span>By :</span>
          <span className="flex items-center gap-[6px] border-b border-[#d7e5ed] px-[6px] py-[2px]">
            Index
            <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-none stroke-ns-navy" strokeWidth="2.6">
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {/* Table templates grid */}
        <div className="overflow-x-auto">
          <div
            className="flex bg-ns-navy text-white"
            style={{ minWidth: TABLE_TEMPLATE_COLUMNS.reduce((sum, c) => sum + c.width, 0) }}
          >
            {TABLE_TEMPLATE_COLUMNS.map((col, i) => (
              <div
                key={`${col.label}-${i}`}
                style={{ width: col.width }}
                className="flex h-[36px] shrink-0 items-center justify-center border-r border-white/25 px-[4px] text-[14px] font-semibold"
              >
                {col.label}
              </div>
            ))}
            <div className="flex h-[36px] flex-1 items-center justify-end pr-[6px]">
              <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-white" strokeWidth="2.4">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="h-[220px] overflow-y-auto bg-white">
          {TABLE_TEMPLATE_ROWS.map((row, i) => {
            const isSelected = i === selectedRow
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedRow(i)}
                className={`flex w-full text-left text-[15px] focus:outline-none ${
                  isSelected ? 'bg-ns-blue text-white' : 'text-ns-navy hover:bg-neutral-100'
                }`}
                style={{ minWidth: TABLE_TEMPLATE_COLUMNS.reduce((sum, c) => sum + c.width, 0) }}
              >
                <span style={{ width: TABLE_TEMPLATE_COLUMNS[0].width }} className="shrink-0 truncate px-[8px] py-[8px]">
                  {row.index}
                </span>
                <span style={{ width: TABLE_TEMPLATE_COLUMNS[1].width }} className="shrink-0 truncate px-[8px] py-[8px]">
                  {row.description}
                </span>
                <span style={{ width: TABLE_TEMPLATE_COLUMNS[2].width }} className="shrink-0 truncate px-[8px] py-[8px] text-right">
                  {row.columns}
                </span>
              </button>
            )
          })}
        </div>

        {/* Reorder handle */}
        <div className="flex h-[20px] shrink-0 items-center gap-[2px] bg-[#f7fbfd] px-[8px]">
          <svg viewBox="0 0 24 24" className="h-[12px] w-[12px] fill-ns-navy">
            <polygon points="12,5 19,15 5,15" />
          </svg>
          <svg viewBox="0 0 24 24" className="h-[12px] w-[12px] fill-ns-navy">
            <polygon points="5,9 19,9 12,19" />
          </svg>
        </div>

        {/* Past Entries collapsible bar */}
        <button
          type="button"
          onClick={() => setPastEntriesCollapsed((v) => !v)}
          className="flex w-full items-center bg-ns-navy px-[14px] py-[8px] text-left text-[16px] font-bold text-white focus:outline-none"
        >
          <span className="flex-1">Past Entries</span>
          <svg
            viewBox="0 0 24 24"
            className={`h-[16px] w-[16px] fill-none stroke-white ${pastEntriesCollapsed ? 'rotate-180' : ''}`}
            strokeWidth="2.4"
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </button>
        {!pastEntriesCollapsed && <div className="min-h-[120px] flex-1 bg-white" />}
      </div>
    </div>
  )
}
