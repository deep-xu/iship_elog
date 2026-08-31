const DASHBOARD_PANELS = [
  {
    title: 'Overdue Jobs',
    status: 'Attention required',
    type: 'vertical-bars',
    updatedAt: 'Aug 27 13:16',
    legend: [
      { label: 'No Action', color: '#4a90e2' },
      { label: 'WO/CM', color: '#3485db' },
      { label: 'SR/Contract', color: '#8b3f73' },
      { label: 'Other', color: '#243f73' },
    ],
    data: [
      { label: 'No Action', value: 96, color: '#4a90e2' },
      { label: 'WO/CM', value: 34, color: '#3485db' },
      { label: 'SR/Contract', value: 5, color: '#8b3f73' },
      { label: 'Other', value: 22, color: '#243f73' },
    ],
  },
  {
    title: 'Open Inspection/Meeting/Drills',
    status: 'Stable',
    type: 'single-bar',
    updatedAt: 'Aug 27 13:16',
    data: [{ label: 'Seaspan Benefactor', value: 3, color: '#4a90e2' }],
  },
  {
    title: 'Survey and Certificates due/overdue',
    status: 'High load',
    type: 'horizontal-bars',
    updatedAt: 'Aug 27 13:16',
    data: [
      { label: '00 - CERTS/STATUTORY', value: 19, color: '#2f7fe0' },
      { label: '01 - CERTS/TRADING', value: 7, color: '#4d95e8' },
      { label: '02 - CERTS/INSURANCE', value: 5, color: '#69a9ef' },
      { label: '03 - CERTS/MINOR', value: 2, color: '#8abcf4' },
      { label: '07 - SURVEYS/CLASS', value: 5, color: '#5a9fe9' },
      { label: '08 - APPROVED PUBLICATION', value: 10, color: '#3d88e4' },
      { label: '09 - PERIODIC SERVICING', value: 2, color: '#9cc8f6' },
      { label: '10 - MISC. JOBS & RECORDS', value: 9, color: '#367dd8' },
      { label: 'Surveys', value: 2, color: '#79b2f1' },
    ],
  },
  {
    title: 'Purchase Orders by Status',
    status: 'Issued-heavy',
    type: 'stacked-horizontal',
    updatedAt: 'Aug 27 13:16',
    legend: [
      { label: 'A', color: '#4a90e2' },
      { label: 'B', color: '#243f73' },
      { label: 'C', color: '#3485db' },
      { label: 'D', color: '#8b3f73' },
    ],
    data: [
      { label: 'To be Completed', segments: [0, 0, 0, 4] },
      { label: 'Issued', segments: [0, 0, 15, 96] },
      { label: 'To be Issued', segments: [0, 0, 0, 0] },
      { label: 'To be Approved', segments: [0, 0, 0, 14] },
    ],
    colors: ['#4a90e2', '#243f73', '#3485db', '#8b3f73'],
  },
  {
    title: 'Open WO/SR/SO Items PM/Non-PM',
    status: 'Mostly non-PM',
    type: 'grouped-vertical',
    updatedAt: 'Aug 27 13:16',
    legend: [
      { label: 'PM', color: '#3d88e4' },
      { label: 'Non-PM', color: '#6e9bcf' },
    ],
    data: [
      { label: 'A', series: [2, 1] },
      { label: 'C', series: [4, 1] },
      { label: 'D', series: [20, 34] },
    ],
    colors: ['#3d88e4', '#6e9bcf'],
  },
  {
    title: 'Survey and Certificates due/overdue',
    status: 'Window summary',
    type: 'stacked-single',
    updatedAt: 'Aug 27 13:16',
    legend: [
      { label: '30', color: '#ff3b14' },
      { label: '60', color: '#4a90e2' },
      { label: '90', color: '#2348ff' },
    ],
    data: [{ label: 'Seaspan Benefactor', segments: [30, 2, 1] }],
    colors: ['#ff3b14', '#4a90e2', '#2348ff'],
  },
  {
    title: 'Requisitions by Status',
    status: 'Outstanding queue',
    type: 'vertical-bars',
    updatedAt: 'Aug 27 13:16',
    data: [
      { label: 'Outstanding', value: 102, color: '#4a90e2' },
      { label: 'To be Authorized', value: 12, color: '#79b2f1' },
      { label: 'Issued', value: 11, color: '#a8cff8' },
    ],
  },
]

const SUMMARY_METRICS = [
  { label: 'Overdue Jobs', value: 157, tone: 'critical' },
  { label: 'Open Drills', value: 3, tone: 'calm' },
  { label: 'Due Certificates', value: 61, tone: 'warn' },
  { label: 'PO Bottlenecks', value: 19, tone: 'cool' },
]

export default function WorkspaceCanvas() {
  return (
    <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,#eef7ff_0,#dfe9f2_48%,#d9e3ed_100%)] p-[18px]">
      <div className="mx-auto max-w-[1900px]">
        <section className="mb-[18px] rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,#1f3a5f_0%,#2d86ca_58%,#4aa8e2_100%)] px-[24px] py-[22px] text-white shadow-[0_30px_80px_rgba(18,50,84,0.22)]">
          <div className="flex flex-wrap items-start justify-between gap-[18px]">
            <div className="max-w-[820px]">
              <div className="text-[12px] font-bold uppercase tracking-[0.28em] text-white/66">Dashboard</div>
              <h1 className="mt-[8px] font-heading text-[34px] font-bold leading-[1.15]">
                Vessel operations at a glance
              </h1>
              <p className="mt-[10px] max-w-[720px] text-[15px] leading-[1.7] text-white/78">
                A denser control-room layout for overdue work, inspections, purchasing, and certificates, with every panel rebuilt as a dashboard chart instead of the previous overview cards.
              </p>
            </div>

            <div className="grid min-w-[280px] gap-[10px] sm:grid-cols-2">
              {SUMMARY_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className={`rounded-[22px] border px-[16px] py-[14px] backdrop-blur-sm ${metricTone(metric.tone)}`}
                >
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">{metric.label}</div>
                  <div className="mt-[6px] font-heading text-[30px] font-bold text-white">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-[18px] xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-[18px]">
            <DashboardPanel panel={DASHBOARD_PANELS[0]} />
            <DashboardPanel panel={DASHBOARD_PANELS[3]} />
            <DashboardPanel panel={DASHBOARD_PANELS[6]} />
          </div>

          <div className="space-y-[18px]">
            <DashboardPanel panel={DASHBOARD_PANELS[1]} />
            <DashboardPanel panel={DASHBOARD_PANELS[4]} />
          </div>

          <div className="space-y-[18px]">
            <DashboardPanel panel={DASHBOARD_PANELS[2]} />
            <DashboardPanel panel={DASHBOARD_PANELS[5]} />
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardPanel({ panel }) {
  return (
    <section className="overflow-hidden rounded-[26px] border border-[#d7e4ee] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(247,251,254,0.97))] shadow-[0_24px_48px_rgba(39,69,102,0.11)]">
      <div className="border-b border-[#dfebf2] bg-[linear-gradient(180deg,#fdfefe_0%,#f4f8fb_100%)] px-[16px] py-[14px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#2d6fcd,#4a90e2)] text-white shadow-[0_10px_18px_rgba(52,133,219,0.24)]">
            <ChartBadge />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-[10px]">
              <h2 className="truncate font-heading text-[21px] font-bold text-[#183c65]">{panel.title}</h2>
              <span className="rounded-full bg-[#eef6fb] px-[10px] py-[4px] text-[11px] font-semibold text-[#61809d]">
                {panel.status}
              </span>
            </div>
            <div className="mt-[3px] text-[12px] text-[#7a91a8]">Updated dashboard card</div>
          </div>
          <div className="flex items-center gap-[8px] text-[#5e7691]">
            <IconPill>
              <MiniIconUp />
            </IconPill>
            <IconPill>
              <MiniIconExpand />
            </IconPill>
          </div>
        </div>
      </div>

      <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f9fbfd_100%)] p-[14px]">
        <div className="rounded-[20px] border border-[#e1edf5] bg-white px-[12px] py-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
          <ChartSurface panel={panel} />
        </div>
      </div>

      {panel.legend?.length ? <LegendRow legend={panel.legend} /> : null}

      <div className="flex items-center justify-between border-t border-[#dfebf2] bg-[#f7fafc] px-[14px] py-[9px] text-[12px] text-[#3c628f]">
        <div className="flex items-center gap-[6px]">
          <RefreshMini />
          <span>Updated - {panel.updatedAt}</span>
        </div>
        <div className="flex items-center gap-[8px] text-[#264974]">
          <QuestionMini />
          <GearMini />
        </div>
      </div>
    </section>
  )
}

function ChartSurface({ panel }) {
  if (panel.type === 'vertical-bars') return <VerticalBarsChart panel={panel} />
  if (panel.type === 'single-bar') return <SingleBarChart panel={panel} />
  if (panel.type === 'horizontal-bars') return <HorizontalBarsChart panel={panel} />
  if (panel.type === 'stacked-horizontal') return <StackedHorizontalChart panel={panel} />
  if (panel.type === 'grouped-vertical') return <GroupedVerticalChart panel={panel} />
  if (panel.type === 'stacked-single') return <StackedSingleChart panel={panel} />
  return null
}

function VerticalBarsChart({ panel }) {
  const max = Math.max(...panel.data.map((item) => item.value), 1)
  const chartHeight = 180
  const chartWidth = 560
  const left = 42
  const bottom = 26
  const top = 12
  const plotWidth = chartWidth - left - 20
  const plotHeight = chartHeight - top - bottom
  const barSlot = plotWidth / panel.data.length
  const barWidth = Math.min(72, barSlot * 0.46)

  return (
    <div className="h-[220px]">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-[190px] w-full">
        {Array.from({ length: 5 }).map((_, index) => {
          const y = top + (plotHeight / 4) * index
          return <line key={index} x1={left} y1={y} x2={left + plotWidth} y2={y} stroke="#e8eff5" strokeWidth="1" />
        })}
        <line x1={left} y1={top} x2={left} y2={top + plotHeight} stroke="#6f7d89" strokeWidth="2" />
        <line x1={left} y1={top + plotHeight} x2={left + plotWidth} y2={top + plotHeight} stroke="#6f7d89" strokeWidth="2" />

        {panel.data.map((item, index) => {
          const valueHeight = (item.value / max) * (plotHeight - 12)
          const x = left + barSlot * index + (barSlot - barWidth) / 2
          const y = top + plotHeight - valueHeight
          return (
            <g key={item.label}>
              <rect x={x} y={y} width={barWidth} height={valueHeight} rx="10" fill={item.color} />
              <text x={x + barWidth / 2} y={top + plotHeight + 18} fill="#6b7d8f" fontSize="12" textAnchor="middle">
                {item.label}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="px-[10px] text-center text-[14px] text-[#76889b]">{panel.subtitle ?? ''}</div>
    </div>
  )
}

function SingleBarChart({ panel }) {
  const max = Math.max(panel.data[0]?.value ?? 0, 5)
  const value = panel.data[0]?.value ?? 0
  const chartHeight = 180
  const chartWidth = 560
  const left = 42
  const bottom = 26
  const top = 12
  const plotWidth = chartWidth - left - 20
  const plotHeight = chartHeight - top - bottom
  const barWidth = Math.min(260, plotWidth * 0.58)
  const barHeight = (value / max) * (plotHeight - 12)
  const barX = left + (plotWidth - barWidth) / 2
  const barY = top + plotHeight - barHeight

  return (
    <div className="h-[220px]">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-[190px] w-full">
        {Array.from({ length: 5 }).map((_, index) => {
          const y = top + (plotHeight / 4) * index
          return <line key={index} x1={left} y1={y} x2={left + plotWidth} y2={y} stroke="#e8eff5" strokeWidth="1" />
        })}
        <line x1={left} y1={top} x2={left} y2={top + plotHeight} stroke="#6f7d89" strokeWidth="2" />
        <line x1={left} y1={top + plotHeight} x2={left + plotWidth} y2={top + plotHeight} stroke="#6f7d89" strokeWidth="2" />
        <rect x={barX} y={barY} width={barWidth} height={barHeight} rx="12" fill={panel.data[0]?.color ?? '#4a90e2'} />
      </svg>
      <div className="px-[10px] text-center text-[14px] text-[#76889b]">{panel.subtitle ?? ''}</div>
    </div>
  )
}

function HorizontalBarsChart({ panel }) {
  const max = Math.max(...panel.data.map((item) => item.value), 1)
  return (
    <div className="space-y-[11px] py-[6px]">
      {panel.data.map((item) => (
        <div key={item.label} className="grid grid-cols-[minmax(180px,1fr)_minmax(0,1.3fr)] items-center gap-[12px]">
          <div className="truncate text-right text-[12px] font-medium text-[#728599]">{item.label}</div>
          <div className="relative h-[22px] overflow-hidden rounded-full bg-[#eff4f8]">
            <div
              className="absolute inset-y-0 left-0 rounded-full shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)]"
              style={{ width: `${(item.value / max) * 100}%`, backgroundColor: item.color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function StackedHorizontalChart({ panel }) {
  const totals = panel.data.map((item) => item.segments.reduce((sum, value) => sum + value, 0))
  const max = Math.max(...totals, 1)
  return (
    <div className="space-y-[14px] py-[8px]">
      {panel.data.map((item) => (
        <div key={item.label} className="grid grid-cols-[130px_minmax(0,1fr)] items-center gap-[12px]">
          <div className="text-right text-[12px] font-medium text-[#728599]">{item.label}</div>
          <div className="flex h-[18px] overflow-hidden rounded-full bg-[#eff4f8] ring-1 ring-[#e0e8ee]">
            {item.segments.map((segment, index) => (
              <div
                key={`${item.label}-${index}`}
                style={{ width: `${segment === 0 ? 0 : (segment / max) * 100}%`, backgroundColor: panel.colors[index] }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function GroupedVerticalChart({ panel }) {
  const max = Math.max(...panel.data.flatMap((item) => item.series), 1)
  const chartHeight = 210
  const chartWidth = 560
  const left = 42
  const bottom = 28
  const top = 12
  const plotWidth = chartWidth - left - 20
  const plotHeight = chartHeight - top - bottom
  const groupWidth = plotWidth / panel.data.length
  const barWidth = Math.min(56, groupWidth * 0.24)

  return (
    <div className="h-[250px]">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-[210px] w-full">
        {Array.from({ length: 5 }).map((_, index) => {
          const y = top + (plotHeight / 4) * index
          return <line key={index} x1={left} y1={y} x2={left + plotWidth} y2={y} stroke="#e8eff5" strokeWidth="1" />
        })}
        <line x1={left} y1={top} x2={left} y2={top + plotHeight} stroke="#6f7d89" strokeWidth="2" />
        <line x1={left} y1={top + plotHeight} x2={left + plotWidth} y2={top + plotHeight} stroke="#6f7d89" strokeWidth="2" />

        {panel.data.map((item, itemIndex) => {
          const groupX = left + groupWidth * itemIndex + groupWidth / 2
          return (
            <g key={item.label}>
              {item.series.map((value, seriesIndex) => {
                const height = (value / max) * (plotHeight - 12)
                const x = groupX + (seriesIndex === 0 ? -barWidth - 6 : 6)
                const y = top + plotHeight - height
                return <rect key={seriesIndex} x={x} y={y} width={barWidth} height={height} rx="10" fill={panel.colors[seriesIndex]} />
              })}
              <text x={groupX} y={top + plotHeight + 18} fill="#6b7d8f" fontSize="12" textAnchor="middle">
                {item.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function StackedSingleChart({ panel }) {
  const total = panel.data[0]?.segments.reduce((sum, value) => sum + value, 0) ?? 1
  return (
    <div className="flex min-h-[220px] items-center gap-[18px] px-[10px] py-[12px]">
      <div className="w-[170px] text-[15px] font-medium text-[#6d7f92]">{panel.subtitle ?? panel.data[0]?.label}</div>
      <div className="flex flex-1 items-center">
        <div className="h-[96px] w-full overflow-hidden rounded-[24px] border border-[#e1e8ef] bg-[#f5f8fb] p-[10px]">
          <div className="flex h-full w-full overflow-hidden rounded-[16px]">
            {panel.data[0].segments.map((segment, index) => (
              <div key={index} style={{ width: `${(segment / total) * 100}%`, backgroundColor: panel.colors[index] }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LegendRow({ legend }) {
  return (
    <div className="flex flex-wrap items-center gap-x-[18px] gap-y-[10px] border-t border-[#dfebf2] bg-[#fbfdff] px-[14px] py-[10px]">
      {legend.map((item) => (
        <div key={item.label} className="flex items-center gap-[8px] text-[13px] font-semibold text-[#355377]">
          <span className="h-[12px] w-[34px] rounded-full shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]" style={{ backgroundColor: item.color }} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function IconPill({ children }) {
  return (
    <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#dce6ee] bg-white text-[#5d7691] shadow-[0_6px_14px_rgba(43,72,102,0.06)]">
      {children}
    </span>
  )
}

function metricTone(tone) {
  if (tone === 'critical') return 'border border-white/12 bg-white/10'
  if (tone === 'warn') return 'border border-white/12 bg-[#ffffff14]'
  if (tone === 'cool') return 'border border-white/12 bg-[#e0f2ff14]'
  return 'border border-white/12 bg-[#dbfff614]'
}

function ChartBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px] fill-none stroke-current" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" />
      <line x1="7" y1="17" x2="7" y2="11" />
      <line x1="12" y1="17" x2="12" y2="8" />
      <line x1="17" y1="17" x2="17" y2="6" />
    </svg>
  )
}

function MiniIconUp() {
  return (
    <svg viewBox="0 0 16 16" className="h-[16px] w-[16px] fill-none stroke-current" strokeWidth="2.2">
      <polyline points="3,10 8,5 13,10" />
    </svg>
  )
}

function MiniIconExpand() {
  return (
    <svg viewBox="0 0 16 16" className="h-[16px] w-[16px] fill-none stroke-current" strokeWidth="2">
      <polyline points="9,3 13,3 13,7" />
      <line x1="13" y1="3" x2="8" y2="8" />
      <polyline points="7,13 3,13 3,9" />
      <line x1="3" y1="13" x2="8" y2="8" />
    </svg>
  )
}

function RefreshMini() {
  return (
    <svg viewBox="0 0 16 16" className="h-[14px] w-[14px] fill-none stroke-current" strokeWidth="2">
      <path d="M3 8a5 5 0 0 1 8.5-3.5" />
      <polyline points="11.5,1.5 11.5,4.5 8.5,4.5" />
      <path d="M13 8a5 5 0 0 1-8.5 3.5" />
      <polyline points="4.5,14.5 4.5,11.5 7.5,11.5" />
    </svg>
  )
}

function QuestionMini() {
  return (
    <svg viewBox="0 0 16 16" className="h-[16px] w-[16px] fill-none stroke-current" strokeWidth="2">
      <circle cx="8" cy="8" r="6.2" />
      <path d="M6.5 6a1.8 1.8 0 1 1 2.7 1.6c-.8.4-1.2.8-1.2 1.6" />
      <circle cx="8" cy="11.6" r=".6" className="fill-current stroke-none" />
    </svg>
  )
}

function GearMini() {
  return (
    <svg viewBox="0 0 16 16" className="h-[16px] w-[16px] fill-none stroke-current" strokeWidth="1.8">
      <circle cx="8" cy="8" r="2.2" />
      <path d="M8 1.8v2M8 12.2v2M1.8 8h2M12.2 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M12.9 3.1l-1.4 1.4M4.5 11.5l-1.4 1.4" />
    </svg>
  )
}
