import { useEffect, useState } from 'react'
import {
  VESSEL_CERTIFICATE_DASHBOARD_COLUMNS,
} from '@/data/vesselCertificateDashboard.js'
import { loadVesselCertificates } from '@/stores/certificatesStore.js'
import { loadDocument, saveDocument } from '@/stores/documentsStore.js'

const FILTER_STORAGE_KEY = 'ns5-vessel-certificate-dashboard-filters'
const BOOKMARKS_STORAGE_KEY = 'ns5-vessel-certificate-dashboard-bookmarks'

const DEFAULT_FILTERS = {
  ship: 'SBEN',
  certificateName: '',
  certificateType: '',
  jobType: '',
  retired: false,
  expiredOnly: false,
  issueDate: '',
  expiryDate: '',
  reviewedStatus: '',
  issuingAuthority: '',
  vesselFlag: '',
}

const CERTIFICATE_TYPE_OPTIONS = ['CERTS/...', 'APPRO...', 'Miscell...', 'Other']
const JOB_TYPE_OPTIONS = ['Renewal', 'Survey', 'Inspection', 'Other']
const ISSUING_AUTHORITY_OPTIONS = ['ABS', 'Flag State', 'Class', 'Port State', 'Other']
const SHIP_OPTIONS = ['SBEN']

export default function VesselCertificateDashboardWindow({ onMinimize, onClose, preview = false }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [bookmarks, setBookmarks] = useState([])
  const [selectedBookmark, setSelectedBookmark] = useState('')
  const [rows, setRows] = useState(loadVesselCertificates)
  const [selectedRow, setSelectedRow] = useState(0)
  const [statusMessage, setStatusMessage] = useState('Ready')
  const [filtersExpanded, setFiltersExpanded] = useState(true)

  useEffect(() => {
    const savedFilters = readJsonStorage(FILTER_STORAGE_KEY, DEFAULT_FILTERS)
    const savedBookmarks = readJsonStorage(BOOKMARKS_STORAGE_KEY, [])

    setFilters(savedFilters)
    setBookmarks(savedBookmarks)
    setRows(applyFilters(savedFilters))
  }, [])

  const handleFieldChange = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleSearch = () => {
    const filteredRows = applyFilters(filters)
    setRows(filteredRows)
    setSelectedRow(0)
    setStatusMessage(
      filteredRows.length
        ? `Showing ${filteredRows.length} certificate${filteredRows.length === 1 ? '' : 's'}.`
        : 'No matching certificates found.',
    )
  }

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS)
    setSelectedBookmark('')
    setRows(loadVesselCertificates())
    setSelectedRow(0)
    setStatusMessage('Filters reset.')
  }

  const handleSave = () => {
    saveDocument(FILTER_STORAGE_KEY, filters)
    setStatusMessage('Current filters saved.')
  }

  const handleSaveSearch = () => {
    const nextBookmarkIndex = bookmarks.length + 1
    const nextBookmark = {
      id: `bookmark-${Date.now()}`,
      name: `Saved Search ${nextBookmarkIndex}`,
      filters,
    }

    const nextBookmarks = [...bookmarks, nextBookmark]
    setBookmarks(nextBookmarks)
    setSelectedBookmark(nextBookmark.id)
    saveDocument(BOOKMARKS_STORAGE_KEY, nextBookmarks)
    setStatusMessage(`${nextBookmark.name} saved.`)
  }

  const handleBookmarkChange = (bookmarkId) => {
    setSelectedBookmark(bookmarkId)

    if (!bookmarkId) {
      return
    }

    const bookmark = bookmarks.find((item) => item.id === bookmarkId)
    if (!bookmark) {
      return
    }

    setFilters(bookmark.filters)
    const filteredRows = applyFilters(bookmark.filters)
    setRows(filteredRows)
    setSelectedRow(0)
    setStatusMessage(`${bookmark.name} loaded.`)
  }

  const visibleRowNumber = rows.length ? Math.min(selectedRow + 1, rows.length) : 0

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex h-[60px] shrink-0 items-center border-b border-[#e1ecf2] bg-white pl-[18px]">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
        </svg>
        <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">Vessel Certificate</span>
        <WindowActions preview={preview} onMinimize={onMinimize} onClose={onClose} />
      </div>

      <div className="shrink-0 border-t border-[#e4edf3] bg-white px-[16px] py-[14px]">
        <div className="overflow-hidden rounded-[22px] border border-[#dce8ef] bg-[#fbfdfe]">
          <button
            type="button"
            onClick={() => setFiltersExpanded((current) => !current)}
            className="flex w-full items-center justify-between px-[18px] py-[14px] text-left"
          >
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#88a2bb]">Filters</div>
              <div className="pt-[3px] font-heading text-[16px] font-bold text-ns-navy">Certificate Search</div>
            </div>
            <span
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#d7e5ed] bg-white text-[13px] text-ns-navy transition-transform ${
                filtersExpanded ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </button>

          {filtersExpanded && (
            <div className="border-t border-[#e8f0f5] px-[16px] py-[14px]">
              <div className="grid grid-cols-2 gap-x-[28px] gap-y-[12px]">
                <div className="space-y-[10px]">
                  <SelectField
                    label="Ship"
                    value={filters.ship}
                    options={SHIP_OPTIONS}
                    onChange={(value) => handleFieldChange('ship', value)}
                  />
                  <TextField
                    label="Certificate Name"
                    value={filters.certificateName}
                    onChange={(value) => handleFieldChange('certificateName', value)}
                  />
                  <SelectField
                    label="Certificate Type"
                    value={filters.certificateType}
                    options={CERTIFICATE_TYPE_OPTIONS}
                    placeholder="-- Select --"
                    onChange={(value) => handleFieldChange('certificateType', value)}
                  />
                  <SelectField
                    label="Job Type"
                    value={filters.jobType}
                    options={JOB_TYPE_OPTIONS}
                    placeholder="-- Select --"
                    onChange={(value) => handleFieldChange('jobType', value)}
                  />
                  <CheckboxField
                    label="Retired"
                    checked={filters.retired}
                    onChange={(value) => handleFieldChange('retired', value)}
                  />
                  <CheckboxField
                    label="Expired Only"
                    checked={filters.expiredOnly}
                    onChange={(value) => handleFieldChange('expiredOnly', value)}
                  />
                </div>

                <div className="space-y-[10px]">
                  <DateField
                    label="Issue Date"
                    value={filters.issueDate}
                    onChange={(value) => handleFieldChange('issueDate', value)}
                  />
                  <DateField
                    label="Expiry Date"
                    value={filters.expiryDate}
                    onChange={(value) => handleFieldChange('expiryDate', value)}
                  />
                  <TextField
                    label="Reviewed Status"
                    value={filters.reviewedStatus}
                    onChange={(value) => handleFieldChange('reviewedStatus', value)}
                  />
                  <SelectField
                    label="Issuing Authority"
                    value={filters.issuingAuthority}
                    options={ISSUING_AUTHORITY_OPTIONS}
                    placeholder="-- Select --"
                    onChange={(value) => handleFieldChange('issuingAuthority', value)}
                  />
                  <TextField
                    label="Vessel Flag"
                    value={filters.vesselFlag}
                    onChange={(value) => handleFieldChange('vesselFlag', value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-[12px] pt-[14px] pr-[10px]">
                <ActionButton tone="ghost" onClick={handleSave}>Save</ActionButton>
                <ActionButton tone="secondary" onClick={handleReset}>Reset</ActionButton>
                <ActionButton onClick={handleSearch}>Search</ActionButton>
              </div>

              <div className="pr-[10px] pt-[6px] text-right text-[11px] text-ns-muted">{statusMessage}</div>
            </div>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto border-t border-[#e4edf3] bg-white">
        <div
          style={{
            minWidth: VESSEL_CERTIFICATE_DASHBOARD_COLUMNS.reduce((sum, col) => sum + col.width, 0),
          }}
        >
          <div className="sticky top-0 z-10 flex bg-[#dcecf7] text-ns-navy">
            {VESSEL_CERTIFICATE_DASHBOARD_COLUMNS.map((col) => (
              <div
                key={col.key}
                style={{ width: col.width }}
                className="flex h-[36px] shrink-0 items-center justify-center border-r border-white/40 px-[4px] text-[11px] font-bold uppercase tracking-[0.06em]"
              >
                {col.label}
              </div>
            ))}
            <div className="flex h-[36px] flex-1 items-center justify-end pr-[6px]">
              <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-none stroke-ns-navy" strokeWidth="2.4">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>

          {rows.map((row, index) => {
            const selected = index === selectedRow
            return (
              <div
                key={`${row.certName}-${index}`}
                onClick={() => setSelectedRow(index)}
                className={`flex cursor-default border-b border-[#edf2f6] text-[13px] ${
                  selected ? 'bg-[#edf6fd] text-ns-navy' : 'bg-white text-ns-navy'
                }`}
              >
                {VESSEL_CERTIFICATE_DASHBOARD_COLUMNS.map((col) => {
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

                  if (col.key === 'more') {
                    return (
                      <div
                        key={col.key}
                        style={{ width: col.width }}
                        className="flex h-[34px] shrink-0 items-center justify-center font-semibold"
                      >
                        ...
                      </div>
                    )
                  }

                  if (col.key === 'due') {
                    const tone =
                      row.dueTone === 'red'
                        ? 'bg-[#fdeaea] text-[#9e3737]'
                        : row.dueTone === 'yellow'
                          ? 'bg-[#fff6df] text-[#a56a00]'
                          : 'bg-[#e8f7ef] text-[#16784a]'

                    return (
                      <div
                        key={col.key}
                        style={{ width: col.width }}
                        className={`flex h-[34px] shrink-0 items-center justify-center font-semibold ${tone}`}
                      >
                        {row.due}
                      </div>
                    )
                  }

                  return (
                    <div
                      key={col.key}
                      style={{ width: col.width }}
                      className="flex h-[34px] shrink-0 items-center truncate px-[8px]"
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

function readJsonStorage(key, fallback) {
  return loadDocument(key, fallback)
}

function applyFilters(filters) {
  return loadVesselCertificates().filter((row) => {
    if (filters.certificateName && !includesText(row.certName, filters.certificateName)) return false
    if (filters.certificateType && row.type !== filters.certificateType) return false
    if (filters.expiredOnly && row.dueTone !== 'red') return false
    if (filters.issueDate && compareUsDateToIso(row.lastSurvey, filters.issueDate) < 0) return false
    if (filters.expiryDate && compareUsDateToIso(row.nextSurvey, filters.expiryDate) > 0) return false
    if (filters.reviewedStatus && !includesText(row.nextAction || '', filters.reviewedStatus)) return false
    if (filters.issuingAuthority && !includesText(row.certNo || '', filters.issuingAuthority)) return false
    if (filters.vesselFlag && !includesText(row.ship, filters.vesselFlag)) return false
    return true
  })
}

function includesText(source, query) {
  return source.toLowerCase().includes(query.trim().toLowerCase())
}

function compareUsDateToIso(usDate, isoDate) {
  const [month, day, year] = usDate.split('/')
  const usValue = `${year}-${month}-${day}`
  if (usValue < isoDate) return -1
  if (usValue > isoDate) return 1
  return 0
}

function TextField({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-[8px] text-[13px] text-ns-navy">
      <span className="w-[152px] shrink-0 text-right font-semibold">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 rounded-full border border-[#d7e5ed] bg-white px-[13px] py-[7px] text-[13px] text-ns-navy outline-none"
      />
    </label>
  )
}

function SelectField({ label, value, options, onChange, placeholder }) {
  return (
    <label className="flex items-center gap-[8px] text-[13px] text-ns-navy">
      <span className="w-[152px] shrink-0 text-right font-semibold">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 rounded-full border border-[#d7e5ed] bg-white px-[13px] py-[7px] text-[13px] text-ns-navy outline-none"
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function DateField({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-[8px] text-[13px] text-ns-navy">
      <span className="w-[152px] shrink-0 text-right font-semibold">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 rounded-full border border-[#d7e5ed] bg-white px-[13px] py-[7px] text-[13px] text-ns-navy outline-none"
      />
    </label>
  )
}

function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-[8px] text-[13px] text-ns-navy">
      <span className="w-[152px] shrink-0 text-right font-semibold">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border ${
          checked ? 'border-ns-blue bg-ns-blue' : 'border-[#bfced9] bg-white'
        }`}
      >
        {checked ? (
          <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] fill-none stroke-white" strokeWidth="2.4">
            <polyline points="3,8 6.5,11.5 13,4.5" />
          </svg>
        ) : null}
      </button>
    </label>
  )
}

function ActionButton({ children, onClick, tone = 'primary' }) {
  const classes =
    tone === 'ghost'
      ? 'bg-[#ebf6fd] text-ns-blue'
      : tone === 'secondary'
        ? 'border border-[#d7e5ed] bg-white text-ns-navy'
        : 'bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] text-white shadow-[0_14px_26px_rgba(46,139,207,0.24)]'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-[118px] rounded-full px-[18px] py-[9px] text-[13px] font-semibold ${classes}`}
    >
      {children}
    </button>
  )
}

function ToolbarIcon({ children, label, onClick }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="flex h-[32px] w-[32px] items-center justify-center rounded-[10px] text-ns-navy hover:bg-[#eef6fb]"
    >
      {children}
    </button>
  )
}

function WindowActions({ preview, onMinimize, onClose }) {
  return (
    <div className="ml-auto flex items-center gap-[8px] pr-[12px]">
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

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
      <path d="M12 4a8 8 0 018 8h-2.5A5.5 5.5 0 1012 17.5v2.5a8 8 0 110-16z" />
      <path d="M12 1l4 3.5L12 8V1z" />
      <path d="M12 23l-4-3.5L12 16v7z" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="10" className="fill-current" />
      <text x="12" y="17" textAnchor="middle" className="fill-white" style={{ fontSize: '13px', fontWeight: 700 }}>
        ?
      </text>
    </svg>
  )
}
