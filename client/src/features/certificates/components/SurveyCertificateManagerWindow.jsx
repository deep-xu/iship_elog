import { useState } from 'react'
import {
  SURVEY_CERTIFICATE_ROW_TO_DETAIL,
  setActiveStandardJobDetail,
} from '@/data/surveyCertificateData.js'
import { loadSurveyCertificates } from '@/stores/certificatesStore.js'

const TABLE_COLUMNS = [
  'Survey & Certificate',
  'Last Iss',
  'Last Due',
  'Interval',
  'Next Due',
  'Ext',
]

const JSA_WIZARD_COPY = [
  '(a) Using Template:',
  'With this option user can select a template from which the risk matrix, task, hazard, safeguard and initial and post ranking will then be used for JSA creation.',
  '(b) New JSA:',
  'With this option user can select a Risk Matrix first and then based on the selected Risk Matrix user can select/filter task, hazard, safeguard and initial and post ranking, which will then be used for JSA creation.',
  '(c) Create Template:',
  'With this option user can select a Risk Matrix first and then based on the selected Risk Matrix user can select/filter task, hazard, safeguard and initial and post ranking, which will then be used for JSA Template creation.',
]

function ToolbarIcon({ children, label, onClick }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center border-r border-[#cfcfcf] text-ns-navy focus:outline-none"
    >
      {children}
    </button>
  )
}

function SaveIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current" strokeWidth="2.4">
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <rect x="8" y="7" width="8" height="5" fill="currentColor" stroke="none" />
      <rect x="8" y="13.5" width="8" height="4.5" />
    </svg>
  )
}

function NewIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current" strokeWidth="2.4">
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v6h5" />
      <path d="M12 10v7M8.5 13.5h7" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-8 fill-current">
      <path d="M3 7h6l2 2h10v9.5A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5z" />
      <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H10l2 2h7.5A1.5 1.5 0 0 1 21 8.5V10H3z" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current" strokeWidth="2.4">
      <path d="M20 8a8 8 0 0 0-13.5-3L4 7.5" />
      <path d="M4 4v3.5h3.5" />
      <path d="M4 16a8 8 0 0 0 13.5 3l2.5-2.5" />
      <path d="M20 20v-3.5h-3.5" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ns-navy text-xl font-bold text-white">
      ?
    </div>
  )
}

function StatusDot({ color }) {
  if (color === 'empty') {
    return <span className="h-7 w-7 rounded-md border-2 border-[#777]" />
  }

  const bg =
    color === 'red'
      ? 'bg-[#df2c2c]'
      : color === 'yellow'
        ? 'bg-[#efcb1d]'
        : color === 'green'
          ? 'bg-[#19b83a]'
          : 'bg-ns-blue'

  return (
    <span className={`relative h-7 w-7 rounded-full border-2 border-[#444] ${bg}`}>
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
    </span>
  )
}

function JsaWizardOverlay() {
  const [mode, setMode] = useState('new')

  return (
    <div className="pointer-events-none absolute left-6 top-8 z-20 flex h-[790px] w-[680px] flex-col border border-[#8e8e8e] bg-[#efefef] shadow-[0_3px_10px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between border-b border-[#989898] bg-[#dce8ef] px-4 py-2 text-[18px] text-white">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[16px]">
            O
          </span>
          <span>Create JSA</span>
        </div>
        <button type="button" className="pointer-events-none text-[28px] leading-none">
          ×
        </button>
      </div>

      <div className="border-b border-[#d5d5d5] bg-white px-6 py-5">
        <div className="inline-flex min-w-[330px] items-center justify-center border border-[#c5c5c5] bg-[#f6f6f6] px-14 py-4 text-[26px] font-semibold text-[#606060]">
          Task
        </div>
      </div>

      <div className="border-b border-[#d5d5d5] bg-white px-6 py-4">
        <div className="text-[28px] font-semibold text-ns-navy underline decoration-[#d93838] underline-offset-4">
          Risk Matrix:
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white px-6 py-5 text-ns-navy">
        <div className="space-y-5 text-[19px] leading-[1.45]">
          <p className="text-[24px] font-semibold">
            The JSA Creation Wizard will allow the user to create a JSA and select/filter the
            Tasks, Hazards and Safeguards for a selected Risk Matrix.
          </p>

          <p>JSA can be created using the following options:</p>

          {JSA_WIZARD_COPY.map((item) => (
            <p key={item} className={item.startsWith('(') ? 'font-semibold' : ''}>
              {item}
            </p>
          ))}
        </div>

        <div className="mt-8 space-y-5 text-[19px]">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="jsa-mode"
              checked={mode === 'template'}
              onChange={() => setMode('template')}
              className="h-6 w-6 accent-[#2e8bcf]"
            />
            <span>Use Template</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="jsa-mode"
              checked={mode === 'new'}
              onChange={() => setMode('new')}
              className="h-6 w-6 accent-[#2e8bcf]"
            />
            <span>New JSA</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="jsa-mode"
              checked={mode === 'create-template'}
              onChange={() => setMode('create-template')}
              className="h-6 w-6 accent-[#2e8bcf]"
            />
            <span>Create Template</span>
          </label>
        </div>

        <div className="mt-10 grid grid-cols-[170px_1fr] items-center gap-x-5 gap-y-4 text-[18px]">
          <label className="text-right text-ns-navy">Title:</label>
          <div className="border-b border-dashed border-[#d7e5ed] text-[18px]">&nbsp;</div>

          <label className="text-right text-ns-navy">JSA No.:</label>
          <div className="border-b border-dashed border-[#d7e5ed] pb-1 text-[18px] text-ns-navy">
            AutoGen
          </div>

          <label className="text-right text-ns-navy">Ship:</label>
          <div className="border-b border-dashed border-[#d7e5ed] pb-1 text-[18px] text-ns-navy">
            Seaspan Benefactor
          </div>

          <label className="text-right text-ns-navy">Template:</label>
          <div className="flex items-center justify-between border-b border-dashed border-[#d7e5ed] pb-1 text-[18px] text-ns-navy">
            <span>&nbsp;</span>
            <span className="text-[18px]">▾</span>
          </div>

          <label className="text-right text-ns-navy">JSA Type:</label>
          <div className="flex items-center justify-between border-b border-dashed border-[#d7e5ed] pb-1 text-[18px] text-ns-navy">
            <span>&nbsp;</span>
            <span className="text-[18px]">▾</span>
          </div>

          <label className="text-right text-ns-navy">JSA Category:</label>
          <div className="flex items-center justify-between border-b border-dashed border-[#d7e5ed] pb-1 text-[18px] text-ns-navy">
            <span>&nbsp;</span>
            <span className="text-[18px]">▾</span>
          </div>

          <label className="text-right text-ns-navy">Department:</label>
          <div className="flex items-center justify-between border-b border-dashed border-[#d7e5ed] pb-1 text-[18px] text-ns-navy">
            <span>&nbsp;</span>
            <span className="text-[18px]">▾</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#c8c8c8] bg-[#efefef] px-8 py-5">
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            className="pointer-events-none min-w-[150px] bg-ns-navy px-6 py-3 text-[18px] font-semibold text-white"
          >
            {'<< Previous'}
          </button>
          <button
            type="button"
            className="pointer-events-none min-w-[150px] bg-ns-navy px-6 py-3 text-[18px] font-semibold text-white"
          >
            {'Next >>'}
          </button>
          <button
            type="button"
            className="pointer-events-none min-w-[150px] bg-[#6f6f74] px-6 py-3 text-[18px] font-semibold text-white"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SurveyCertificateManagerWindow({
  variant = 'default',
  onOpenWindow,
  onMinimize,
  onClose,
  preview = false,
}) {
  const [selectedRow, setSelectedRow] = useState(1)
  const [statusMessage, setStatusMessage] = useState('Ready')
  const [showHelpPanel, setShowHelpPanel] = useState(false)

  const openSurveyDetail = (rowName) => {
    const detailId = SURVEY_CERTIFICATE_ROW_TO_DETAIL[rowName]
    if (!detailId) return

    setActiveStandardJobDetail(detailId)
    onOpenWindow?.('standard-job-detail')
  }

  const handleRowDoubleClick = (name) => {
    openSurveyDetail(name)
    setStatusMessage('Opened selected survey certificate.')
  }

  const handleOpen = () => {
    const activeRow = loadSurveyCertificates()[selectedRow]
    if (!activeRow || selectedRow === 0) {
      setStatusMessage('Select a survey certificate row to open.')
      return
    }

    openSurveyDetail(activeRow.name)
    setStatusMessage('Opened selected survey certificate.')
  }

  const handleNew = () => {
    onOpenWindow?.('create-jsa')
    setStatusMessage('Opening new survey/JSA workflow...')
  }

  const handleRefresh = () => {
    setSelectedRow(1)
    setStatusMessage('Survey certificate list refreshed.')
  }

  const handleSave = () => {
    setStatusMessage('Survey certificate list saved.')
  }

  const handleHelp = () => {
    setShowHelpPanel((current) => !current)
    setStatusMessage(showHelpPanel ? 'Help closed.' : 'Help opened.')
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden border border-[#d7e5ee] bg-[linear-gradient(180deg,#f8fbfd_0%,#eff5fa_100%)] text-ns-navy shadow-[0_22px_60px_rgba(68,101,129,0.12)]">
      <div className="flex h-[58px] shrink-0 items-center border-b border-[#e5edf4] bg-white/92 pl-[20px] backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
        </svg>
        <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">Survey Certificate</span>
        <div className="ml-auto flex items-center gap-[10px] pr-[14px]">
          <WindowActionButton label="Minimize" onClick={preview ? undefined : onMinimize}>
            <line x1="3" y1="11" x2="13" y2="11" />
          </WindowActionButton>
          <WindowActionButton label="Close" onClick={preview ? undefined : onClose}>
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </WindowActionButton>
        </div>
      </div>


      {showHelpPanel ? (
        <div className="shrink-0 border-b border-[#e5edf4] bg-[#f8fbff] px-[18px] py-[12px] text-[14px] text-[#45627e]">
          Use `New` to open the create workflow, `Open` to open the selected certificate, and
          `Refresh` to reset the list selection.
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-auto p-[18px]">
        <div className="overflow-hidden rounded-[24px] border border-[#dce8ef] bg-white shadow-[0_14px_34px_rgba(84,116,145,0.08)]">
          <div className="flex h-[50px] items-center border-b border-[#e6eef4] bg-[#f9fcfe] px-[18px]">
            <div className="rounded-full bg-[#eaf4fb] px-[14px] py-[6px] text-[13px] font-semibold text-ns-blue">
              Survey & Certificate Register
            </div>
            <span className="ml-auto text-[12px] text-[#7f96ab]">Double-click a row to open details.</span>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[1180px] bg-white">
              <div className="grid grid-cols-[2.5fr_1.35fr_1.35fr_1.15fr_1.35fr_0.75fr] bg-[#dbeaf5] text-[11px] font-semibold uppercase tracking-[0.08em] text-ns-navy">
            {TABLE_COLUMNS.map((column) => (
              <div key={column} className="border-r border-white/50 px-4 py-3 text-center last:border-r-0">
                {column}
              </div>
            ))}
              </div>

              <div className="min-h-[760px]">
                {loadSurveyCertificates().map((row, index) => (
                  <div
                    key={`${row.name}-${index}`}
                    onClick={() => setSelectedRow(index)}
                    onDoubleClick={() => handleRowDoubleClick(row.name)}
                    className={`grid grid-cols-[2.5fr_1.35fr_1.35fr_1.15fr_1.35fr_0.75fr] text-[15px] ${
                      index === 0 || index === selectedRow
                        ? 'bg-ns-blue text-white'
                        : 'border-t border-[#edf2f6] bg-white text-ns-navy'
                    }`}
                  >
                    {[row.name, row.lastIss, row.lastDue, row.interval, row.nextDue, row.ext].map((cell, cellIndex) => (
                      <div
                        key={`${cellIndex}-${cell}`}
                        className={`px-4 py-3 ${cellIndex === 0 ? 'truncate' : 'text-center'} ${
                          index === 0 ? 'cursor-default' : 'cursor-pointer'
                        }`}
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-[#e5edf4] bg-white px-[18px] py-[10px] text-right text-[13px] text-[#7f96ab]">
        {statusMessage}
      </div>

      {variant === 'create-jsa' ? <JsaWizardOverlay /> : null}
    </div>
  )
}

function WindowActionButton({ label, children, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-[28px] w-[28px] items-center justify-center rounded-full text-[#8aa0b4] transition hover:bg-[#eef6fb] hover:text-ns-navy focus:outline-none"
    >
      <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] fill-none stroke-current" strokeWidth="1.9">
        {children}
      </svg>
    </button>
  )
}
