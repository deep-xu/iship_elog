import { useState } from 'react'
import { PLAN_COLUMNS, PLAN_ROWS, JOB_ANALYSIS } from '@/data/maintenancePlan.js'
import { setActiveWorkOrderDetail } from '@/data/workOrderDetailData.js'

const LEFT_FILTERS = ['Departments', 'Equipment', 'Job Size Index', 'Job List']
const RIGHT_FILTERS = ['Positions', 'Job Categories', 'Job Type', 'SI Reference']

export default function MaintenancePlanWindow({ onMinimize, onClose, onOpenWindow, preview = false }) {
  const [selectedRow, setSelectedRow] = useState(0)
  const [showPlannerControls, setShowPlannerControls] = useState(true)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true)
  const [form, setForm] = useState({
    bookmark: '',
    period: 'This week',
    startDate: '2026-08-17',
    endDate: '2026-08-23',
    departments: '',
    departmentsAll: true,
    positions: '',
    positionsAll: true,
    equipment: '',
    equipmentAll: true,
    jobCategories: '',
    jobCategoriesAll: true,
    jobSizeIndex: '',
    jobSizeIndexAll: true,
    jobType: '',
    jobTypeAll: true,
    jobList: '',
    jobListAll: true,
    siReference: '',
    siReferenceAll: true,
  })

  const handleRowDoubleClick = (row) => {
    setActiveWorkOrderDetail(row.jobNo)
    onOpenWindow?.('wo')
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex h-[62px] shrink-0 items-center border-b border-[#e1ecf2] bg-white pl-[20px]">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
        </svg>
        <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">Maintenance Plan</span>
        <WindowActions preview={preview} onMinimize={onMinimize} onClose={onClose} />
      </div>

      <div className="shrink-0 bg-[#eef5fa] px-[14px] py-[14px]">
        <div className="mb-[10px] flex justify-end">
          <button
            type="button"
            onClick={() => setShowPlannerControls((value) => !value)}
            aria-expanded={showPlannerControls}
            aria-label={showPlannerControls ? 'Hide filters and summary' : 'Show filters and summary'}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#d7e5ed] bg-white text-ns-navy shadow-[0_10px_24px_rgba(68,101,129,0.06)] focus:outline-none"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-[16px] w-[16px] fill-none stroke-current transition-transform ${showPlannerControls ? '' : 'rotate-180'}`}
              strokeWidth="2.4"
            >
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </button>
        </div>
        {showPlannerControls && (
          <div className="grid grid-cols-[minmax(0,1fr)_300px] items-start gap-[14px]">
            <div className="flex min-w-0 flex-col">
              <div className="rounded-[24px] border border-[#dce8ef] bg-white px-[18px] py-[16px]">
                <div className="flex flex-wrap items-center gap-[12px] text-ns-navy">
                  <span className="rounded-full bg-[#eef7fd] px-[10px] py-[4px] text-[10px] font-bold uppercase tracking-[0.16em] text-[#2e8bcf]">
                    Filters
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7d95ad]">Period</span>
                  <select
                    value={form.period}
                    onChange={(event) => setForm((current) => ({ ...current, period: event.target.value }))}
                    className="w-[158px] rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] py-[7px] text-[13px] text-ns-navy focus:outline-none"
                  >
                    <option>This week</option>
                    <option>Next week</option>
                    <option>This month</option>
                    <option>Custom</option>
                  </select>
                  <span className="ml-[8px] text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7d95ad]">
                    Start Date
                  </span>
                  <DateField
                    value={form.startDate}
                    onChange={(value) => setForm((current) => ({ ...current, startDate: value }))}
                  />
                  <span className="ml-[8px] text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7d95ad]">
                    End Date
                  </span>
                  <DateField
                    value={form.endDate}
                    onChange={(value) => setForm((current) => ({ ...current, endDate: value }))}
                  />
                  <div className="ml-auto flex items-center gap-[10px]">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedFilters((value) => !value)}
                      className="rounded-full border border-[#d7e5ed] bg-white px-[13px] py-[7px] text-[12px] font-semibold text-ns-navy focus:outline-none"
                    >
                      {showAdvancedFilters ? 'Hide Filters' : 'Advanced Filters'}
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-[16px] py-[8px] text-[13px] font-semibold text-white shadow-[0_14px_26px_rgba(46,139,207,0.24)] focus:outline-none"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {showAdvancedFilters && (
                <div className="mt-[10px] flex-1 rounded-[24px] border border-[#dce8ef] bg-white px-[18px] py-[18px]">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedFilters((value) => !value)}
                    className="mb-[6px] flex w-full items-center justify-between rounded-[18px] bg-[#f6fafc] px-[14px] py-[12px] text-left focus:outline-none"
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7d95ad]">
                        Advanced Filters
                      </div>
                      <div className="mt-[4px] text-[15px] font-bold text-ns-navy">Refine the job list</div>
                    </div>
                    <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#d7e5ed] bg-white text-ns-navy">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-[16px] w-[16px] fill-none stroke-current"
                        strokeWidth="2.4"
                      >
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </span>
                  </button>
                  <div className="grid grid-cols-2 gap-x-[20px] gap-y-[12px]">
                    {LEFT_FILTERS.map((label, i) => (
                      <FilterRowPair
                        key={label}
                        form={form}
                        left={label}
                        right={RIGHT_FILTERS[i]}
                        setForm={setForm}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!showAdvancedFilters && (
                <div className="mt-[10px] flex-1 rounded-[24px] border border-[#dce8ef] bg-white px-[18px] py-[18px]">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedFilters(true)}
                    className="flex w-full items-center justify-between rounded-[18px] bg-[#f6fafc] px-[14px] py-[12px] text-left focus:outline-none"
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7d95ad]">
                        Advanced Filters
                      </div>
                      <div className="mt-[4px] text-[15px] font-bold text-ns-navy">Refine the job list</div>
                    </div>
                    <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#d7e5ed] bg-white text-ns-navy">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-[16px] w-[16px] fill-none stroke-current rotate-180"
                        strokeWidth="2.4"
                      >
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </div>

            <JobAnalysis />
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-auto border-t border-[#e4edf3] bg-white">
        <div className="flex items-center justify-between border-b border-[#e8eef3] bg-white px-[18px] py-[12px]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7d95ad]">Scheduled Jobs</div>
            <div className="mt-[3px] text-[15px] font-bold text-ns-navy">{PLAN_ROWS.length} planned maintenance tasks</div>
          </div>
          <div className="text-[12px] text-ns-muted">Double-click a row to open the work order.</div>
        </div>
        <div style={{ minWidth: PLAN_COLUMNS.reduce((sum, c) => sum + c.width, 0) }}>
          <div className="sticky top-0 z-10 flex bg-[#dcecf7] text-ns-navy">
            {PLAN_COLUMNS.map((col) => (
              <div
                key={col.key}
                style={{ width: col.width }}
                className="flex h-[36px] shrink-0 items-center justify-center border-r border-white/40 px-[4px] text-[11px] font-bold uppercase tracking-[0.08em]"
              >
                {col.label}
              </div>
            ))}
          </div>

          {PLAN_ROWS.map((row, i) => {
            const isSelected = i === selectedRow
            return (
              <div
                key={i}
                onClick={() => setSelectedRow(i)}
                onDoubleClick={() => handleRowDoubleClick(row)}
                className={`flex cursor-default border-b border-[#edf2f6] text-[13px] ${
                  isSelected ? 'bg-[#edf6fd] text-ns-navy' : i % 2 === 0 ? 'bg-white text-ns-navy' : 'bg-[#fbfdfe] text-ns-navy'
                }`}
              >
                {PLAN_COLUMNS.map((col) => {
                  if (col.key === 'check') {
                    return (
                      <div
                        key={col.key}
                        style={{ width: col.width }}
                        className="flex h-[34px] shrink-0 items-center justify-center bg-[#fbfdf4]"
                      >
                        <span className="h-[14px] w-[14px] rounded-[4px] border border-[#bfced9] bg-white" />
                      </div>
                    )
                  }
                  if (col.key === 'status') {
                    const statusClass =
                      row.status === 'OK'
                        ? 'bg-[#e8f7ef]'
                        : row.status === 'Due Soon'
                          ? 'bg-[#fff6df]'
                          : 'bg-[#fdeaea]'
                    return (
                      <div
                        key={col.key}
                        style={{ width: col.width }}
                        className={`flex h-[34px] shrink-0 items-center justify-center text-ns-navy ${statusClass}`}
                      >
                        {row.status}
                      </div>
                    )
                  }
                  const centered = ['basis', 'status', 'critical', 'classRelated', 'stockQty'].includes(
                    col.key
                  )
                  return (
                    <div
                      key={col.key}
                      style={{ width: col.width }}
                      className={`flex h-[34px] shrink-0 items-center truncate px-[8px] ${
                        centered ? 'justify-center' : ''
                      }`}
                    >
                      <span className="truncate">{row[col.key] ?? ''}</span>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function FilterRowPair({ form, left, right, setForm }) {
  return (
    <>
      <FilterRow form={form} label={left} setForm={setForm} />
      <FilterRow form={form} label={right} setForm={setForm} />
    </>
  )
}

function FilterRow({ form, label, setForm }) {
  const fieldKey = toFieldKey(label)
  const allKey = `${fieldKey}All`

  return (
    <div className="flex items-center gap-[10px] text-[13px] text-ns-navy">
      <span className="w-[120px] shrink-0 text-right font-semibold">{label}</span>
      <button
        type="button"
        onClick={() =>
          setForm((current) => ({
            ...current,
            [allKey]: !current[allKey],
          }))
        }
        className={`shrink-0 rounded-full px-[10px] py-[5px] text-[11px] font-semibold transition-colors ${
          form[allKey]
            ? 'bg-[#eef7fd] text-[#2e8bcf]'
            : 'border border-[#d7e5ed] bg-white text-ns-muted'
        }`}
      >
        {form[allKey] ? 'All' : 'Pick'}
      </button>
      <div className="relative min-w-0 flex-1">
        <input
          type="text"
          value={form[fieldKey]}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              [fieldKey]: event.target.value,
            }))
          }
          className="min-w-0 w-full rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] py-[7px] pr-[34px] text-[13px] text-ns-navy focus:outline-none"
          placeholder={form[allKey] ? 'All selected' : `Filter ${label.toLowerCase()}`}
        />
        <button
          type="button"
          aria-label={`Select ${label}`}
          className="absolute right-[10px] top-1/2 flex h-[18px] w-[18px] -translate-y-1/2 items-center justify-center text-ns-navy"
        >
          <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-current" strokeWidth="2.4">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function DateField({ onChange, value }) {
  return (
    <span className="flex w-[152px] items-center justify-between rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[13px] py-[7px]">
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-[13px] text-ns-navy focus:outline-none"
      />
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-ns-navy">
        <path d="M3 5h18v16H3V5zm2 5v9h14v-9H5zM7 2v4H5V2h2zm12 0v4h-2V2h2z" />
      </svg>
    </span>
  )
}

function JobAnalysis() {
  return (
    <div className="w-[286px] self-start rounded-[22px] border border-[#dce8ef] bg-white p-[12px] shadow-[0_12px_28px_rgba(23,50,77,0.05)]">
      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7d95ad]">Summary</div>
      <div className="mt-[2px] text-[16px] font-bold leading-tight text-ns-navy">Job Analysis</div>
      <div className="mt-[10px] grid grid-cols-2 gap-[6px]">
        {JOB_ANALYSIS.map((row) => (
          <div
            key={row.label}
            className={`rounded-[16px] border px-[11px] py-[10px] ${
              row.label === 'OK'
                ? 'border-[#d7efe1] bg-[#f4fbf7]'
                : row.label === 'Due Soon'
                  ? 'border-[#f5e5be] bg-[#fffaf0]'
                  : row.label === 'Overdue'
                    ? 'border-[#f0d3d3] bg-[#fff5f5]'
                    : 'border-[#dce8ef] bg-[#f8fbfd]'
            }`}
          >
            <div className="flex items-center gap-[7px] text-[11px] font-semibold leading-none text-ns-navy">
              <span
                className={`h-[8px] w-[8px] rounded-full ${
                  row.label === 'OK'
                    ? 'bg-[#2bb673]'
                    : row.label === 'Due Soon'
                      ? 'bg-[#efad31]'
                      : row.label === 'Overdue'
                        ? 'bg-[#d96c6c]'
                        : 'bg-[#93a8ba]'
                }`}
              />
              {row.label}
            </div>
            <div className="mt-[6px] text-[20px] font-bold leading-none text-ns-navy">{row.wo}</div>
            <div className="mt-[4px] text-[10px] text-ns-muted">WO items</div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-[10px] w-full rounded-full border border-[#d7e5ed] bg-white px-[14px] py-[7px] text-[12px] font-semibold text-ns-blue focus:outline-none"
      >
        Advanced Search
      </button>
    </div>
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

function FolderOpen() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 7.5h5l1.8 2H20.5v7.5a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V7.5Z" />
      <path d="M3.5 10.5h17" />
    </svg>
  )
}

function Refresh() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6v5h-5" />
      <path d="M4 18v-5h5" />
      <path d="M6.8 9A7 7 0 0 1 18 11" />
      <path d="M17.2 15A7 7 0 0 1 6 13" />
    </svg>
  )
}

function Copy() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="11" height="13" />
      <rect x="9" y="8" width="11" height="12" />
    </svg>
  )
}

function HelpFilled() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.7 9.2a2.6 2.6 0 1 1 4.2 2c-.9.7-1.9 1.3-1.9 2.8" />
      <line x1="12" y1="17.2" x2="12" y2="17.2" />
    </svg>
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

function toFieldKey(label) {
  return label
    .replace(/[^a-zA-Z0-9]+(.)/g, (_match, char) => char.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^(.)/, (char) => char.toLowerCase())
}
