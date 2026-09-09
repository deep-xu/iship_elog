const MINI_WEEKS = [
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 31, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
]

const MONTH_WEEKS = [
  [26, 27, 28, 29, 30, 31, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 31, 1, 2, 3, 4, 5],
]

const EVENTS = {
  '1': [{ text: 'Training', status: 'overdue' }],
  '14': [{ text: 'GNSS', status: 'overdue', recurring: true }],
  '18': [{ text: 'Health', status: 'overdue', recurring: true }],
  '20': [{ text: 'Enclosed', recurring: true }],
  '22': [{ text: '2nd Off', status: 'complete' }],
  '25': [
    { text: 'Health -', recurring: true },
    { text: 'VGP***I', recurring: true },
    { text: 'Table to', recurring: true },
  ],
  '28': [
    { text: '2nd Off', recurring: true },
    { text: 'HSEQ Co', recurring: true },
    { text: 'Manage', recurring: true },
  ],
  '32': [
    { text: 'Health -', recurring: true },
    { text: 'VGP***I', recurring: true },
  ],
  '33': [{ text: 'SSP***A', status: 'complete', recurring: true }],
  '35': [{ text: '2nd Off', recurring: true }],
}

const CATEGORIES = [
  { label: 'Audits', color: '#3cccb4', accent: '#e8fbf6' },
  { label: 'Inspection/Meeting/Drill', color: '#4f7cff', accent: '#eef2ff' },
  { label: 'Internal Inspections', color: '#ff9f43', accent: '#fff3e6' },
  { label: 'Vettings', color: '#b06cff', accent: '#f4ecff' },
]

export default function HsqeCalendarWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#c7def0] bg-[linear-gradient(180deg,#f8fcff_0%,#edf5fb_100%)] shadow-[0_28px_60px_rgba(37,90,138,0.22)]">
      <div className="flex h-[62px] shrink-0 items-center border-b border-[#d8e7f3] bg-[linear-gradient(90deg,#f7fbff_0%,#eef7ff_52%,#fdfcff_100%)] px-[18px]">
        <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#5ab6ff,#6a7dff)] shadow-[0_12px_20px_rgba(90,182,255,0.28)]">
          <TargetIcon />
        </div>
        <div className="ml-3">
          <span className="block text-[22px] font-bold text-ns-navy">HSQE Calendar</span>
          <span className="block text-[12px] text-[#6f8aa6]">Color-coded planning for audits, drills, vettings, and inspections.</span>
        </div>
        <div className="ml-auto flex items-center gap-[10px]">
          <button
            type="button"
            aria-label="Minimize"
            onClick={preview ? undefined : onMinimize}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-white/80 text-ns-navy shadow-[0_8px_18px_rgba(64,111,156,0.12)] transition hover:bg-white focus:outline-none"
          >
            <svg viewBox="0 0 20 12" className="h-[14px] w-[18px] stroke-current" strokeWidth="2.6">
              <line x1="3" y1="9" x2="17" y2="9" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={preview ? undefined : onClose}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-[#234770] text-white shadow-[0_10px_18px_rgba(35,71,112,0.28)] transition hover:bg-[#1d3c60] focus:outline-none"
          >
            <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] stroke-current" strokeWidth="2">
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-[16px]">
        <div className="flex min-h-[760px] min-w-[1180px] gap-[16px]">
          <aside className="flex w-[348px] shrink-0 flex-col gap-[16px]">
            <MiniCalendar />
            <Legend />
          </aside>

          <main className="min-w-0 flex-1">
            <CalendarControls />
            <MonthGrid />
          </main>
        </div>
      </div>
    </div>
  )
}

function MiniCalendar() {
  return (
    <section className="rounded-[26px] border border-[#d5e7f5] bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] p-[14px] shadow-[0_18px_40px_rgba(66,114,154,0.12)]">
      <div className="mb-[14px] flex items-center gap-[10px] rounded-[22px] bg-[linear-gradient(135deg,#eff8ff,#fef8ff)] p-[10px]">
        <button
          type="button"
          aria-label="Previous month"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-[16px] bg-white text-[#26bf7b] shadow-[0_10px_20px_rgba(110,205,164,0.24)]"
        >
          <Triangle direction="left" />
        </button>
        <span className="flex-1 whitespace-nowrap text-center text-[24px] font-bold text-ns-navy">August, 2026</span>
        <button
          type="button"
          aria-label="Next month"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-[16px] bg-white text-[#26bf7b] shadow-[0_10px_20px_rgba(110,205,164,0.24)]"
        >
          <Triangle direction="right" />
        </button>
        <button
          type="button"
          className="h-[38px] rounded-full bg-[linear-gradient(135deg,#2e77ff,#57c0ff)] px-[18px] text-[14px] font-semibold text-white shadow-[0_12px_24px_rgba(62,141,255,0.28)]"
        >
          Today
        </button>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-[#cfe0ee] bg-white">
        <div className="grid grid-cols-[34px_repeat(7,minmax(0,1fr))] text-center text-[15px] font-semibold text-ns-navy">
          <div className="bg-[linear-gradient(180deg,#c5dcfb,#bdd7fa)]" />
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
            <div
              key={day}
              className={`py-[10px] text-white ${index === 0 || index === 6 ? 'bg-[linear-gradient(180deg,#5d8fff,#5fb9ff)]' : 'bg-[linear-gradient(180deg,#24486f,#2f5f8e)]'}`}
            >
              {day}
            </div>
          ))}
          {MINI_WEEKS.map((week, rowIndex) => (
            <MiniWeek key={rowIndex} week={week} rowIndex={rowIndex} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MiniWeek({ week, rowIndex }) {
  const label = rowIndex === 0 ? 'Jul' : rowIndex === 6 ? 'Sep' : 'Aug'

  return (
    <>
      <div className="flex items-center justify-center border-t border-[#d3e1ed] bg-[linear-gradient(180deg,#c9ddfb,#b9d4fb)] text-[13px] font-semibold text-white [writing-mode:vertical-rl]">
        {label}
      </div>
      {week.map((day, dayIndex) => {
        const isToday = rowIndex === 4 && dayIndex === 6
        const muted = rowIndex < 2 || rowIndex > 5
        const marker = [6, 13, 28, 33, 38, 43, 47, 50, 53].includes(rowIndex * 7 + dayIndex)
        const greenMarker = rowIndex === 6 && dayIndex === 3
        return (
          <div
            key={`${rowIndex}-${dayIndex}`}
            className={`relative flex h-[48px] items-center justify-center border-l border-t border-[#d3e1ed] text-[19px] font-semibold ${
              muted ? 'bg-[#fbfdff] text-[#6683a1]' : 'bg-[linear-gradient(180deg,#eef7ff,#dfefff)] text-[#2d4d74]'
            }`}
          >
            {marker && <span className="absolute left-[8px] top-[8px] h-[10px] w-[10px] rounded-full bg-[#8d9db6]" />}
            {greenMarker && <span className="absolute left-[8px] top-[8px] h-[10px] w-[10px] rounded-full bg-[#69dfbe]" />}
            <span
              className={
                isToday
                  ? 'rounded-full bg-[linear-gradient(135deg,#ff4d88,#ff7f6f)] px-[10px] py-[3px] text-white shadow-[0_8px_14px_rgba(255,77,136,0.26)]'
                  : ''
              }
            >
              {day}
            </span>
          </div>
        )
      })}
    </>
  )
}

function Legend() {
  return (
    <section className="rounded-[26px] border border-[#d5e7f5] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] p-[16px] text-[16px] text-ns-navy shadow-[0_18px_40px_rgba(66,114,154,0.12)]">
      <div className="mb-[12px] flex items-center justify-between">
        <div>
          <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#84a0bb]">Category Filters</div>
          <div className="mt-[4px] text-[22px] font-bold text-ns-navy">HSQE</div>
        </div>
        <div className="rounded-full bg-[#edf6ff] px-[12px] py-[6px] text-[12px] font-semibold text-[#4673a0]">4 active</div>
      </div>

      <div className="space-y-[10px]">
        {CATEGORIES.map((item) => (
          <label
            key={item.label}
            className="flex items-center gap-[12px] rounded-[18px] border border-[#e2eef7] px-[12px] py-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
            style={{ background: `linear-gradient(135deg, ${item.accent}, #ffffff)` }}
          >
            <span
              className="flex h-[24px] w-[24px] items-center justify-center rounded-[8px] shadow-[0_6px_12px_rgba(34,73,109,0.12)]"
              style={{ backgroundColor: item.color }}
            >
              <svg viewBox="0 0 16 16" className="h-[12px] w-[12px] fill-none stroke-white" strokeWidth="2.4">
                <polyline points="3,8 6.5,11.5 13,4.5" />
              </svg>
            </span>
            <span className="font-medium">{item.label}</span>
          </label>
        ))}
      </div>

      <div className="mt-[24px] rounded-[20px] bg-[linear-gradient(135deg,#f4f9ff,#fff9fb)] p-[14px]">
        <div className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.16em] text-[#84a0bb]">Status Guide</div>
        <div className="space-y-[12px]">
          <LegendStatus label="Overdue" type="overdue" />
          <LegendStatus label="Complete" type="complete" />
          <LegendStatus label="Recurrence" type="recurring" />
        </div>
      </div>
    </section>
  )
}

function CalendarControls() {
  return (
    <div className="mb-[14px] flex h-[72px] items-center rounded-[24px] border border-[#d5e7f5] bg-[linear-gradient(90deg,#ffffff_0%,#f6fbff_100%)] px-[14px] shadow-[0_16px_36px_rgba(66,114,154,0.1)]">
      <button
        type="button"
        aria-label="Refresh"
        className="mr-[14px] flex h-[44px] w-[72px] items-center justify-center rounded-[16px] bg-[linear-gradient(135deg,#244a72,#3a74aa)] text-white shadow-[0_12px_24px_rgba(36,74,114,0.22)]"
      >
        <svg viewBox="0 0 24 24" className="h-[24px] w-[24px] fill-current">
          <path d="M12 4a8 8 0 018 8h-3a5 5 0 10-1.45 3.54l-2.05-2.04H21v7.5l-2.54-2.54A8 8 0 1112 4z" />
        </svg>
      </button>
      <label className="flex items-center gap-[10px] rounded-full bg-[#f1f8ff] px-[14px] py-[10px] text-[14px] font-medium text-ns-navy">
        <span className="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] bg-white shadow-[0_4px_10px_rgba(66,114,154,0.14)]">
          <span className="h-[10px] w-[10px] rounded-[3px] bg-[linear-gradient(135deg,#55bdff,#6581ff)]" />
        </span>
        Show my tasks only
      </label>
      <div className="ml-auto flex items-center gap-[12px]">
        <span className="text-[14px] font-semibold text-ns-navy">Department</span>
        <button
          type="button"
          className="flex h-[44px] w-[230px] items-center justify-between rounded-[16px] border border-[#d9e7f2] bg-white px-[16px] text-[14px] text-[#7d90a8] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
        >
          <span>-- Select --</span>
          <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-ns-navy" strokeWidth="2.6">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </button>
        <div className="flex items-center rounded-full bg-[#edf6ff] p-[4px]">
          <button type="button" className="rounded-full px-[18px] py-[8px] text-[18px] font-semibold text-[#5e7a96]">
            Week
          </button>
          <button
            type="button"
            className="rounded-full bg-[linear-gradient(135deg,#2e77ff,#57c0ff)] px-[18px] py-[8px] text-[18px] font-semibold text-white shadow-[0_10px_20px_rgba(62,141,255,0.22)]"
          >
            Month
          </button>
        </div>
      </div>
    </div>
  )
}

function MonthGrid() {
  return (
    <section className="rounded-[28px] border border-[#d5e7f5] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-[14px] shadow-[0_18px_40px_rgba(66,114,154,0.12)]">
      <div className="mb-[12px] flex items-center justify-between rounded-[22px] bg-[linear-gradient(135deg,#edf7ff,#fff7fc)] px-[22px] py-[16px]">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8ca6c0]">Monthly Overview</div>
          <h2 className="mt-[4px] text-[34px] font-bold text-ns-navy">August 2026</h2>
        </div>
        <div className="flex gap-[10px]">
          <SummaryChip label="Overdue" value="3" tone="rose" />
          <SummaryChip label="Complete" value="2" tone="green" />
          <SummaryChip label="Recurring" value="8" tone="blue" />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-[10px]">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
          <div
            key={day}
            className={`rounded-[16px] px-[12px] py-[10px] text-center text-[14px] font-bold ${
              index === 0 || index === 6
                ? 'bg-[linear-gradient(135deg,#eff4ff,#fff3f7)] text-[#61789a]'
                : 'bg-[linear-gradient(135deg,#f3f9ff,#f7fbff)] text-[#738ca5]'
            }`}
          >
            {day}
          </div>
        ))}
        {MONTH_WEEKS.flatMap((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const slotKey = String(weekIndex * 7 + dayIndex + 1)
            const isCurrentMonth = !(weekIndex === 0 && day < 26) && !(weekIndex === 5 && day <= 5)
            const isToday = slotKey === '28'

            return (
              <div
                key={slotKey}
                className={`relative flex h-[154px] flex-col rounded-[20px] border p-[10px] shadow-[0_10px_22px_rgba(69,111,148,0.08)] ${
                  isToday
                    ? 'border-[#ff8fbc] bg-[linear-gradient(180deg,#fff8fb,#ffffff)]'
                    : isCurrentMonth
                      ? 'border-[#dbe8f3] bg-white'
                      : 'border-[#e4edf4] bg-[#f8fbfe]'
                }`}
              >
                <div className="mb-[8px] flex items-center justify-between">
                  <span
                    className={`flex h-[34px] min-w-[34px] items-center justify-center rounded-full px-[10px] text-[15px] font-bold ${
                      isToday
                        ? 'bg-[linear-gradient(135deg,#ff4d88,#ff8b6d)] text-white shadow-[0_10px_18px_rgba(255,77,136,0.24)]'
                        : isCurrentMonth
                          ? 'bg-[#eef6ff] text-[#4f6886]'
                          : 'bg-[#eef3f7] text-[#8ca0b4]'
                    }`}
                  >
                    {day}
                  </span>
                  {(EVENTS[slotKey] ?? []).length > 0 ? (
                    <span className="rounded-full bg-[#edf6ff] px-[8px] py-[4px] text-[11px] font-semibold text-[#5680a8]">
                      {(EVENTS[slotKey] ?? []).length} items
                    </span>
                  ) : null}
                </div>
                <div className="flex-1 space-y-[6px] overflow-hidden">
                  {(EVENTS[slotKey] ?? []).map((event) => (
                    <EventPill key={`${slotKey}-${event.text}`} event={event} />
                  ))}
                </div>
              </div>
            )
          }),
        )}
      </div>
    </section>
  )
}

function EventPill({ event }) {
  const tone = getEventTone(event)

  return (
    <div
      className="flex min-h-[30px] items-center gap-[8px] rounded-[14px] border px-[10px] py-[6px] text-[13px] font-semibold shadow-[0_6px_14px_rgba(63,108,148,0.08)]"
      style={{ borderColor: tone.border, background: tone.bg, color: tone.text }}
    >
      <span className="h-[10px] w-[10px] shrink-0 rounded-full" style={{ backgroundColor: tone.dot }} />
      <span className="truncate">{event.text}</span>
      {event.status === 'overdue' && <StatusBadge type="overdue" />}
      {event.status === 'complete' && <StatusBadge type="complete" />}
      {event.recurring && <StatusBadge type="recurring" />}
    </div>
  )
}

function getEventTone(event) {
  if (event.status === 'overdue') {
    return {
      bg: 'linear-gradient(135deg,#fff0f6,#fff8fb)',
      border: '#ffc4d7',
      text: '#9f315d',
      dot: '#ff5b90',
    }
  }

  if (event.status === 'complete') {
    return {
      bg: 'linear-gradient(135deg,#eafcf5,#f7fffb)',
      border: '#bdeed8',
      text: '#1f7f62',
      dot: '#35c2a5',
    }
  }

  return {
    bg: 'linear-gradient(135deg,#eef5ff,#fbfdff)',
    border: '#cfe0f6',
    text: '#325882',
    dot: '#5a8cff',
  }
}

function LegendStatus({ label, type }) {
  return (
    <div className="flex items-center gap-[10px] rounded-[14px] bg-white/70 px-[10px] py-[8px]">
      <StatusBadge type={type} />
      <span className="font-medium text-[#496784]">{label}</span>
    </div>
  )
}

function StatusBadge({ type }) {
  if (type === 'overdue') {
    return (
      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[8px] bg-[#fff1f6] text-[11px] font-bold text-[#ef4b86]">
        O
      </span>
    )
  }

  if (type === 'complete') {
    return (
      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[8px] bg-[#eafcf5] text-[11px] font-bold text-[#24b786]">
        C
      </span>
    )
  }

  return (
    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[8px] bg-[#eef4fb] text-[#6c87a4]">
      <svg viewBox="0 0 20 20" className="h-[14px] w-[14px] fill-current">
        <path d="M13.9 5.1A5.4 5.4 0 005 7.4H2.8l3.3-3.3 3.3 3.3H7.1a3.5 3.5 0 015.4-.8l1.4-1.5zM6.1 14.9a5.4 5.4 0 008.9-2.3h2.2l-3.3 3.3-3.3-3.3h2.3a3.5 3.5 0 01-5.4.8l-1.4 1.5z" />
      </svg>
    </span>
  )
}

function SummaryChip({ label, value, tone }) {
  const toneClass =
    tone === 'rose'
      ? 'bg-[linear-gradient(135deg,#fff0f6,#fff8fb)] text-[#a43b64]'
      : tone === 'green'
        ? 'bg-[linear-gradient(135deg,#eafcf5,#f8fffb)] text-[#247f64]'
        : 'bg-[linear-gradient(135deg,#eef5ff,#f8fbff)] text-[#3b6fa3]'

  return (
    <div className={`rounded-[18px] px-[14px] py-[10px] shadow-[0_8px_16px_rgba(67,110,148,0.08)] ${toneClass}`}>
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] opacity-70">{label}</div>
      <div className="mt-[2px] text-[20px] font-bold">{value}</div>
    </div>
  )
}

function Triangle({ direction }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[18px] w-[18px] fill-current ${direction === 'left' ? 'rotate-180' : ''}`}>
      <path d="M6 3.5l8 6.5-8 6.5V3.5z" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 text-white">
      <circle cx="12" cy="12" r="9" className="fill-none stroke-current" strokeWidth="2.6" />
      <circle cx="12" cy="12" r="4" className="fill-current" />
    </svg>
  )
}
