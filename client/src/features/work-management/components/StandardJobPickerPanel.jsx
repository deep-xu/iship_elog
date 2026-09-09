import { useEffect, useMemo, useState } from 'react'
import { getAllStandardJobs } from '@/stores/createdStandardJobsStore.js'

// Right-hand picker for "Add Job" on the Related Jobs tab: every standard job
// in the vessel's PMS plan, with a checkbox per row, so several can be added
// at once instead of typed in by hand.
export default function StandardJobPickerPanel({
  title = 'Add Job',
  confirmLabel = 'Add Selected',
  initialSelectedJobNos = [],
  singleSelect = false,
  onClose,
  onApply,
}) {
  const [query, setQuery] = useState('')
  const [checked, setChecked] = useState(() => makeCheckedMap(initialSelectedJobNos))

  // Base PMS list plus any jobs the user created/edited in the Standard Job
  // window, so the picker always mirrors the Standard Job Query grid.
  const PLAN_ROWS = useMemo(() => getAllStandardJobs(), [])

  // Re-sync only when the *set* of pre-selected job numbers actually changes.
  // Depending on the array itself would reset every keystroke, because callers
  // pass a freshly-built array on each render — which made checkboxes un-check
  // themselves and limited selection to one job at a time.
  const initialSelectedKey = initialSelectedJobNos.join('|')
  useEffect(() => {
    setChecked(makeCheckedMap(initialSelectedKey ? initialSelectedKey.split('|') : []))
  }, [initialSelectedKey])

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) {
      return PLAN_ROWS
    }
    return PLAN_ROWS.filter((row) =>
      [row.jobTitle, row.majorSystem, row.subSystem, row.component].some((value) =>
        (value ?? '').toLowerCase().includes(term),
      ),
    )
  }, [query, PLAN_ROWS])

  const checkedJobNos = Object.keys(checked).filter((jobNo) => checked[jobNo])

  function toggleRow(jobNo) {
    setChecked((current) => {
      const isChecked = !!current[jobNo]
      if (singleSelect) {
        // Only one job at a time — clicking a row replaces any prior pick.
        return isChecked ? {} : { [jobNo]: true }
      }
      return { ...current, [jobNo]: !isChecked }
    })
  }

  function toggleAllVisible() {
    const allChecked = rows.length > 0 && rows.every((row) => checked[row.jobNo])
    setChecked((current) => {
      const next = { ...current }
      rows.forEach((row) => {
        next[row.jobNo] = !allChecked
      })
      return next
    })
  }

  return (
    <div className="flex h-full w-full min-w-0 flex-col border-l border-[#dce8ef] bg-white">
      <div className="flex shrink-0 items-center gap-[10px] border-b border-[#e4edf3] bg-[linear-gradient(180deg,#fbfdff_0%,#f4f9fc_100%)] px-[14px] py-[12px]">
        <span className="min-w-0 flex-1 truncate font-heading text-[15px] font-bold text-ns-navy">{title}</span>
        <button
          type="button"
          aria-label="Close job picker"
          onClick={onClose}
          className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[16px] text-[#5e7894] transition hover:bg-[#e8f1f8] focus:outline-none"
        >
          ×
        </button>
      </div>

      <div className="shrink-0 px-[14px] py-[10px]">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search standard jobs"
          className="h-[34px] w-full rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] text-[13px] text-ns-navy outline-none placeholder:text-[#9db0c2] focus:border-ns-blue"
        />
      </div>

      <div className="flex shrink-0 items-center justify-between px-[14px] pb-[6px] text-[12px] text-[#6d89a2]">
        {singleSelect ? (
          <span className="font-semibold text-[#9db0c2]">Select one job</span>
        ) : (
          <button type="button" onClick={toggleAllVisible} className="font-semibold text-ns-blue hover:underline focus:outline-none">
            {rows.length > 0 && rows.every((row) => checked[row.jobNo]) ? 'Unselect all' : 'Select all'}
          </button>
        )}
        <span>{rows.length} jobs</span>
      </div>

      <div className="min-h-0 flex-1 overflow-auto border-t border-[#eef4f8]">
        {rows.length === 0 ? (
          <div className="flex h-full items-center justify-center px-[14px] text-center text-[13px] text-[#8da3b7]">
            No standard jobs match “{query}”.
          </div>
        ) : (
          rows.map((row) => (
            <label
              key={row.jobNo}
              className="flex cursor-pointer items-start gap-[10px] border-b border-[#eef4f8] px-[14px] py-[10px] hover:bg-[#f6fafd]"
            >
              <input
                type={singleSelect ? 'radio' : 'checkbox'}
                name={singleSelect ? 'standard-job-pick' : undefined}
                checked={!!checked[row.jobNo]}
                onChange={() => toggleRow(row.jobNo)}
                className="mt-[3px] h-[14px] w-[14px] shrink-0 accent-ns-blue"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-ns-navy">{row.jobTitle}</span>
                <span className="block truncate text-[12px] text-[#7f96ab]">
                  {[row.majorSystem, row.subSystem, row.component].filter(Boolean).join(' / ')}
                </span>
                <span className="mt-[2px] block text-[11px] text-[#9db0c2]">
                  Interval: {row.interval || '—'} · Last Done: {row.lastDone || '—'}
                </span>
              </span>
            </label>
          ))
        )}
      </div>

      <div className="flex shrink-0 items-center gap-[10px] border-t border-[#e4edf3] bg-[#f9fcfe] px-[14px] py-[10px]">
        <span className="min-w-0 flex-1 truncate text-[12px] text-[#6d89a2]">{checkedJobNos.length} selected</span>
        <button
          type="button"
          onClick={() => setChecked({})}
          className="rounded-full border border-[#d7e5ed] bg-white px-[14px] py-[6px] text-[12px] font-semibold text-ns-navy transition hover:bg-[#eef6fb] focus:outline-none"
        >
          Clear
        </button>
        <button
          type="button"
          disabled={checkedJobNos.length === 0}
          onClick={() => onApply(PLAN_ROWS.filter((row) => checked[row.jobNo]))}
          className="inline-flex items-center gap-[7px] rounded-full bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[16px] py-[6px] text-[12px] font-semibold text-white shadow-[0_10px_20px_rgba(46,139,207,0.2)] transition hover:brightness-110 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckIcon />
          {confirmLabel}
        </button>
      </div>
    </div>
  )
}

function makeCheckedMap(jobNos) {
  return Object.fromEntries(jobNos.map((jobNo) => [jobNo, true]))
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] fill-none stroke-current" strokeWidth="2.2">
      <path d="M3 8.2 6.4 11.5 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
