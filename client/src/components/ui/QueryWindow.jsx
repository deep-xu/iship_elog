import { useState } from 'react'

// Shared chrome for the "Bookmarks / Search" query windows
// (Findings Query, Companies List, ...).
export default function QueryWindow({
  title,
  toolbar,
  sections,
  columns,
  rows = [],
  headerTabs,
  activeHeaderTab,
  onHeaderTabChange,
  secondaryColumns,
  tertiaryColumns,
  pagination = false,
  extraPanel,
  panelWidth = '47%',
  showBookmarks = true,
  onCreate,
  createLabel = 'Create',
  onRowActivate,
  onMinimize,
  onClose,
  preview = false,
}) {
  const [activePanel] = useState('Search')
  const [collapsed, setCollapsed] = useState({})
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#d7e5ee] bg-[linear-gradient(180deg,#f8fbfd_0%,#eff5fa_100%)] shadow-[0_22px_60px_rgba(68,101,129,0.12)]">
      <div className="flex h-[58px] shrink-0 items-center border-b border-[#e5edf4] bg-white/92 pl-[20px] backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
        </svg>
        <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">{title}</span>
        <WindowActions preview={preview} onMinimize={onMinimize} onClose={onClose} />
      </div>

      {headerTabs?.length ? (
        <div className="flex shrink-0 border-b border-[#e8eff4] bg-white/78 px-[18px] py-[8px]">
          {headerTabs.map((tab) => {
            const isActive = tab.key === activeHeaderTab
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onHeaderTabChange?.(tab.key)}
                className={`mr-[8px] min-w-[140px] rounded-full px-[16px] py-[7px] text-[14px] font-semibold transition focus:outline-none ${
                  isActive
                    ? 'bg-[#eaf4fb] text-ns-blue shadow-[inset_0_0_0_1px_rgba(79,145,198,0.12)]'
                    : 'bg-[#f5f9fc] text-ns-muted hover:bg-[#eef5fa]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      ) : null}

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        {drawerOpen ? (
          <button
            type="button"
            aria-label="Close search drawer"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 z-10 bg-[#0f2742]/10 xl:hidden"
          />
        ) : null}

        <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
          <div className="flex h-[50px] shrink-0 items-center gap-[10px] border-b border-[#e6eef4] bg-[#f9fcfe] px-[16px]">
            {showBookmarks ? (
              <div className="rounded-full bg-white px-[16px] py-[7px] text-[13px] font-semibold text-ns-blue shadow-[0_8px_20px_rgba(124,155,181,0.12)]">
                Bookmarks
              </div>
            ) : null}
            {onCreate ? (
              <button
                type="button"
                onClick={onCreate}
                className="flex items-center gap-[6px] rounded-full bg-white px-[16px] py-[7px] text-[13px] font-semibold text-ns-blue shadow-[0_8px_20px_rgba(124,155,181,0.12)] transition hover:bg-[#eaf4fb] focus:outline-none"
              >
                <svg viewBox="0 0 24 24" className="h-[13px] w-[13px] stroke-current" strokeWidth="2.4" fill="none" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                {createLabel}
              </button>
            ) : null}
            <div className="ml-auto flex items-center gap-[8px]">
              <span className="hidden text-[12px] font-medium text-[#7f96ab] md:inline">
                Table stays visible while filters scroll separately
              </span>
              <button
                type="button"
                onClick={() => setDrawerOpen((current) => !current)}
                className={`rounded-full px-[16px] py-[7px] text-[13px] font-semibold focus:outline-none ${
                  drawerOpen
                    ? 'border border-[#d8e5ed] bg-white text-ns-navy'
                    : 'bg-[linear-gradient(135deg,#2d86ca,#56ace4)] text-white shadow-[0_12px_24px_rgba(46,139,207,0.2)]'
                }`}
              >
                {drawerOpen ? 'Hide Filters' : 'Search'}
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            <div className="flex h-full min-h-0 flex-col bg-white">
              <div
                className={
                  secondaryColumns
                    ? 'max-h-[42%] min-h-[220px] shrink-0 overflow-auto'
                    : 'min-h-0 flex-1 overflow-auto'
                }
              >
                <GridTable
                  columns={columns}
                  rows={rows}
                  onRowActivate={onRowActivate}
                  className={secondaryColumns ? 'h-full' : 'flex-1'}
                />
              </div>

              {secondaryColumns && (
                <>
                  <div className="flex h-[10px] shrink-0 items-center justify-center bg-[#eef4f8]">
                    <svg viewBox="0 0 24 24" className="h-[8px] w-[16px] fill-neutral-500">
                      <circle cx="4" cy="4" r="1.4" />
                      <circle cx="12" cy="4" r="1.4" />
                      <circle cx="20" cy="4" r="1.4" />
                    </svg>
                  </div>
                  <div className="max-h-[28%] min-h-[150px] shrink-0 overflow-auto">
                    <GridTable columns={secondaryColumns} rows={[]} className={tertiaryColumns ? 'h-full' : 'flex-1'} />
                  </div>
                </>
              )}

              {tertiaryColumns && (
                <>
                  <div className="flex h-[10px] shrink-0 items-center justify-center bg-[#eef4f8]">
                    <svg viewBox="0 0 24 24" className="h-[8px] w-[16px] fill-neutral-500">
                      <circle cx="4" cy="4" r="1.4" />
                      <circle cx="12" cy="4" r="1.4" />
                      <circle cx="20" cy="4" r="1.4" />
                    </svg>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto">
                    <GridTable columns={tertiaryColumns} rows={[]} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-y-0 right-0 z-20 flex w-full max-w-[420px] flex-col overflow-hidden border-l border-[#dfe9f0] bg-[linear-gradient(180deg,#f6fafc_0%,#eef5fa_100%)] shadow-[-18px_0_40px_rgba(61,91,119,0.14)] transition-[width,opacity,transform] duration-200 xl:static xl:max-w-none xl:shadow-none ${
            drawerOpen
              ? 'translate-x-0 opacity-100 xl:w-[420px]'
              : 'translate-x-full opacity-0 xl:w-0 xl:translate-x-0 xl:border-l-0'
          }`}
          style={drawerOpen ? { flexBasis: panelWidth } : { flexBasis: 0 }}
        >
          <div className="flex h-[54px] shrink-0 items-center border-b border-[#e6eef4] px-[16px]">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#88a2bb]">Search Panel</div>
              <div className="pt-[2px] text-[15px] font-semibold text-ns-navy">{activePanel}</div>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="ml-auto flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#d8e5ed] bg-white text-ns-navy xl:hidden"
            >
              <svg viewBox="0 0 16 16" className="h-[12px] w-[12px] fill-none stroke-current" strokeWidth="1.9">
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-[12px] py-[10px]">
            {sections.map((section) => {
              const isCollapsed = collapsed[section.title]
              return (
                <div key={section.title} className="mb-[10px] overflow-hidden rounded-[18px] border border-[#e2ecf3] bg-white shadow-[0_10px_24px_rgba(84,116,145,0.06)]">
                  <button
                    type="button"
                    onClick={() =>
                      setCollapsed((cur) => ({ ...cur, [section.title]: !cur[section.title] }))
                    }
                    className="flex w-full items-center bg-[#edf5fa] px-[16px] py-[10px] text-left text-[13px] font-semibold tracking-[0.01em] text-ns-navy focus:outline-none"
                  >
                    <span className="flex-1">{section.title}</span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-[16px] w-[16px] fill-none stroke-ns-navy ${isCollapsed ? 'rotate-180' : ''}`}
                      strokeWidth="2.4"
                    >
                      <polyline points="5,14 12,7 19,14" />
                    </svg>
                  </button>

                  {!isCollapsed &&
                    (section.title === 'General' ? (
                      <div className="px-[16px] py-[14px]">
                        <div className="grid grid-cols-1 gap-[12px]">
                          {section.fields.map((field, i) =>
                            field.spacer ? null : (
                              <QueryField key={field.label ?? `field-${i}`} field={field} compact />
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-[10px] p-[12px]">
                        {section.fields.map((field, i) =>
                          field.spacer ? null : (
                            <QueryField key={field.label ?? `field-${i}`} field={field} />
                          )
                        )}
                      </div>
                    ))}
                </div>
              )
            })}

            {extraPanel}
          </div>

          <div className="flex shrink-0 items-center border-t border-[#e6eef4] bg-white/96 px-[18px] py-[12px]">
            <button
              type="button"
              className="rounded-full border border-[#dce9f1] bg-[#eef7fd] px-[16px] py-[8px] text-[13px] font-semibold text-ns-blue focus:outline-none"
            >
              Save
            </button>
            <div className="ml-auto flex gap-[8px]">
              <button
                type="button"
                className="rounded-full border border-[#d8e5ed] bg-white px-[18px] py-[8px] text-[13px] font-semibold text-ns-navy focus:outline-none"
              >
                Reset
              </button>
              <button
                type="button"
                className="rounded-full bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-[20px] py-[8px] text-[13px] font-semibold text-white shadow-[0_12px_24px_rgba(46,139,207,0.2)] focus:outline-none"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GridTable({ columns, rows, onRowActivate, className = '' }) {
  const minWidth = columns.reduce((sum, column) => sum + getGridColumnWidth(column), 0)

  return (
    <div className={`overflow-auto bg-white ${className}`}>
      <div style={{ minWidth }}>
        <GridHeaderRow columns={columns} />
        <GridRows columns={columns} rows={rows} onRowActivate={onRowActivate} />
      </div>
    </div>
  )
}

function GridHeaderRow({ columns }) {
  return (
    <div className="sticky top-0 z-10 border-b border-[#e6eef4] bg-[#f7fbfe]">
      <div className="flex bg-[#dbeaf5] text-ns-navy">
        {columns.map((col, i) => (
          <div
            key={`${col.label}-${i}`}
            style={{ width: getGridColumnWidth(col) }}
            className="flex min-h-[42px] shrink-0 items-center justify-center overflow-hidden border-r border-white/50 px-[8px] py-[6px] text-[11px] font-semibold uppercase tracking-[0.08em]"
          >
            <span className="block w-full text-center leading-[1.2]">{col.label}</span>
          </div>
        ))}
        <div className="flex h-[42px] flex-1 items-center justify-end pr-[8px]">
          <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-ns-navy" strokeWidth="2.4">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function GridRows({ columns, rows, onRowActivate }) {
  if (!rows.length) {
    return <div className="min-h-[180px] bg-white" />
  }

  return (
    <div className="bg-white">
      {rows.map((row, rowIndex) => (
        <div
          key={row.id ?? `${rowIndex}-${row[columns[0]?.key] ?? 'row'}`}
          onDoubleClick={() => onRowActivate?.(row)}
          className={`flex border-b border-[#e6eef4] text-[12px] text-ns-navy ${
            onRowActivate ? 'cursor-pointer' : ''
          } ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#fbfdff]'}`}
        >
          {columns.map((column, columnIndex) => (
            <div
              key={`${column.key ?? column.label}-${columnIndex}`}
              style={{ width: getGridColumnWidth(column) }}
              className="flex min-h-[38px] shrink-0 items-start overflow-hidden border-r border-[#eef4f8] px-[10px] py-[8px]"
            >
              <span className="block w-full break-words leading-[1.35]">
                {column.key ? row[column.key] ?? '' : ''}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function getGridColumnWidth(column) {
  if (!column.label) return column.width
  return Math.max(column.width, column.label.length * 7 + 28)
}

function QueryField({ field, compact = false }) {
  if (field.plain) {
    return (
      <div className="xl:col-span-2 rounded-[14px] border border-[#e7eff5] bg-[#f8fbfe] px-[14px] py-[10px] text-center text-[12px] font-semibold text-ns-navy">
        {field.label}:
      </div>
    )
  }

  if (field.checkbox) {
    return (
      <div
        className={`flex min-h-[42px] items-center gap-[10px] rounded-[14px] border border-[#e7eff5] bg-[#fbfdff] px-[14px] py-[9px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${
          compact ? 'min-h-[44px]' : ''
        }`}
      >
        <span className="h-[18px] w-[18px] shrink-0 rounded-[5px] border border-[#c7d6e0] bg-[#fbfdff] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />
        <span className="min-w-0 text-[13px] font-semibold text-[#45627e]">{field.label}</span>
      </div>
    )
  }

  return (
    <div
      className={`rounded-[14px] border border-[#e7eff5] bg-white shadow-[0_4px_12px_rgba(84,116,145,0.05)] ${
        compact ? 'px-[16px] py-[12px]' : 'px-[14px] py-[10px]'
      }`}
    >
      <div className={`font-semibold text-[#5b7690] ${compact ? 'mb-[8px] text-[13px]' : 'mb-[6px] text-[12px]'}`}>
        {field.label}
      </div>
      <span
        className={`flex min-w-0 items-center rounded-full border border-[#d7e5ed] bg-[#fbfdfe] text-[13px] text-ns-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ${
          compact ? 'px-[16px] py-[9px]' : 'px-[14px] py-[7px]'
        }`}
      >
        <span className={`min-w-0 flex-1 truncate ${field.muted ? 'text-neutral-500' : ''}`}>
          {field.value ?? ''}
        </span>
        {field.chevron && (
          <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0 fill-none stroke-ns-navy" strokeWidth="2.4">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        )}
      </span>
    </div>
  )
}

const TOOL_GLYPHS = {
  new: {
    label: 'New',
    render: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <path d="M5 2h9l5 5v15H5V2z" className="fill-none stroke-current" strokeWidth="1.8" />
        <path d="M14 2v5h5" className="fill-none stroke-current" strokeWidth="1.8" />
      </svg>
    ),
  },
  open: {
    label: 'Open',
    render: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 7.5h5l1.8 2H20.5v7.5a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V7.5Z" />
        <path d="M3.5 10.5h17" />
      </svg>
    ),
  },
  print: {
    label: 'Print',
    render: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="3.5" width="10" height="5" />
        <rect x="5" y="9.5" width="14" height="7" rx="1.5" />
        <rect x="8" y="14" width="8" height="6.5" />
        <line x1="16.5" y1="12" x2="16.5" y2="12" />
      </svg>
    ),
  },
  find: {
    label: 'Find',
    render: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <circle cx="10" cy="10" r="7" className="fill-none stroke-current" strokeWidth="2.4" />
        <line x1="15.5" y1="15.5" x2="22" y2="22" className="stroke-current" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    ),
  },
  mail: {
    label: 'Mail',
    render: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <rect x="2" y="5" width="20" height="14" rx="1" className="fill-none stroke-current" strokeWidth="1.8" />
        <path d="M3 6.5l9 7 9-7" className="fill-none stroke-current" strokeWidth="1.8" />
      </svg>
    ),
  },
  archive: {
    label: 'Archive',
    render: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="4.5" rx="1.2" />
        <path d="M5 8.5h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-10Z" />
        <path d="M9 12.5h6" />
      </svg>
    ),
  },
  refresh: {
    label: 'Refresh',
    render: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6v5h-5" />
        <path d="M4 18v-5h5" />
        <path d="M6.8 9A7 7 0 0 1 18 11" />
        <path d="M17.2 15A7 7 0 0 1 6 13" />
      </svg>
    ),
  },
  help: {
    label: 'Help',
    render: () => (
      <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.7 9.2a2.6 2.6 0 1 1 4.2 2c-.9.7-1.9 1.3-1.9 2.8" />
        <line x1="12" y1="17.2" x2="12" y2="17.2" />
      </svg>
    ),
  },
}

function ToolBtn({ name, muted }) {
  const glyph = TOOL_GLYPHS[name]
  if (!glyph) return null
  return (
    <button
      type="button"
      title={glyph.label}
      aria-label={glyph.label}
      disabled={muted}
      className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] transition focus:outline-none ${
        muted ? 'text-neutral-300' : 'text-ns-navy hover:bg-[#eef6fb]'
      }`}
    >
      {glyph.render()}
    </button>
  )
}

function IconBtn({ children }) {
  return (
    <button
      type="button"
      className="flex h-[28px] w-[24px] shrink-0 items-center justify-center rounded-full text-ns-navy transition hover:bg-[#eef6fb] focus:outline-none"
    >
      {children}
    </button>
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
      className="flex h-[28px] w-[28px] items-center justify-center rounded-full text-[#8aa0b4] transition hover:bg-[#eef6fb] hover:text-ns-navy focus:outline-none"
    >
      <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] fill-none stroke-current" strokeWidth="1.9">
        {children}
      </svg>
    </button>
  )
}
