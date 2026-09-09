import { MenuBar, TitleBar, ToolDivider, ToolIcon, Toolbar, WindowBody, WindowFrame } from '@/components/ui/windowChrome.jsx'

const DESCRIPTION_ONLY = [{ key: 'description', label: 'Description' }]

export default function DescriptionListWindow({
  title,
  rows,
  columns = DESCRIPTION_ONLY,
  selectedIndex = 0,
  onMinimize,
  onClose,
  preview = false,
}) {
  const cells = rows.map((row) => (typeof row === 'string' ? { description: row } : row))

  return (
    <WindowFrame>
      <TitleBar title={title} onMinimize={onMinimize} onClose={onClose} preview={preview} />
      <MenuBar items={['File', 'Help']} />

      <Toolbar>
        <ToolIcon label="Open">
          <FolderIcon />
        </ToolIcon>
        <ToolIcon label="Print">
          <PrintIcon />
        </ToolIcon>
        <ToolDivider />
        <ToolIcon label="Help">
          <HelpIcon />
        </ToolIcon>

        <div className="ml-auto flex h-[38px] w-[240px] items-center gap-[8px] rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px]">
          <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 text-[#7d95ad]">
            <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
            <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ns-navy placeholder:text-[#8ba0b2] focus:outline-none"
          />
        </div>
      </Toolbar>

      <WindowBody>
        <div className="p-[14px]">
          <div className="overflow-hidden rounded-[16px] border border-[#dce8ef]">
            <table className="w-full border-collapse text-[13px] text-ns-navy">
              <thead>
                <tr className="bg-ns-navy text-center text-white">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="border-r border-white/20 px-[12px] py-[10px] font-semibold last:border-r-0"
                      style={column.width ? { width: column.width } : undefined}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cells.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i === selectedIndex
                        ? 'bg-[#eaf4fb] font-semibold text-ns-navy'
                        : 'odd:bg-white even:bg-[#fbfdfe]'
                    }
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`border-t border-[#eef4f8] px-[12px] py-[9px] ${
                          column.align === 'right' ? 'text-right' : ''
                        }`}
                      >
                        {row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </WindowBody>
    </WindowFrame>
  )
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.8">
      <path d="M3 6h6l2 2h10v11H3V6z" />
    </svg>
  )
}

function PrintIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.8">
      <path d="M7 9V3h10v6M7 19H4v-7h16v7h-3M7 15h10v6H7v-6z" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="12" cy="12" r="10" className="fill-current" />
      <text x="12" y="17" textAnchor="middle" className="fill-white" style={{ fontSize: '13px', fontWeight: 700 }}>
        ?
      </text>
    </svg>
  )
}
