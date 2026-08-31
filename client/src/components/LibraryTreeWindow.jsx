import { MenuBar, TitleBar, ToolDivider, ToolIcon, Toolbar, WindowBody, WindowFrame } from './windowChrome.jsx'

function TreeLevel({ items, showIcons }) {
  return (
    <ul className="ml-[18px] mt-[4px] space-y-[4px] border-l border-[#dce8ef] pl-[10px]">
      {items.map((item) => {
        const { label, children = [] } = typeof item === 'string' ? { label: item } : item
        return (
          <li key={label}>
            <div className="flex items-center gap-[8px] rounded-[8px] py-[4px] pl-[6px] pr-[8px] text-[13px] text-ns-navy transition hover:bg-[#f4f9fc]">
              <span className="text-[#9fb4c6]">{children.length > 0 ? '▾' : '•'}</span>
              {showIcons && (
                <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] shrink-0 fill-[#7d95ad]">
                  <path d="M6 2h9l5 5v15H6V2z" />
                </svg>
              )}
              <span>{label}</span>
            </div>
            {children.length > 0 && <TreeLevel items={children} showIcons={showIcons} />}
          </li>
        )
      })}
    </ul>
  )
}

export default function LibraryTreeWindow({
  title,
  items = [],
  showIcons = true,
  onMinimize,
  onClose,
  preview = false,
}) {
  return (
    <WindowFrame>
      <TitleBar title={title} onMinimize={onMinimize} onClose={onClose} preview={preview} />
      <MenuBar items={['File', 'Help']} />

      <Toolbar>
        <ToolIcon label="Open">
          <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current" strokeWidth="1.8">
            <path d="M3 6h6l2 2h10v11H3V6z" />
          </svg>
        </ToolIcon>
        <ToolDivider />
        <ToolIcon label="Help">
          <svg viewBox="0 0 24 24" className="h-full w-full">
            <circle cx="12" cy="12" r="10" className="fill-current" />
            <text x="12" y="17" textAnchor="middle" className="fill-white" style={{ fontSize: '13px', fontWeight: 700 }}>
              ?
            </text>
          </svg>
        </ToolIcon>

        <div className="ml-auto flex h-[38px] w-[240px] items-center gap-[8px] rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px]">
          <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 text-[#7d95ad]">
            <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
            <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search library..."
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ns-navy placeholder:text-[#8ba0b2] focus:outline-none"
          />
        </div>
      </Toolbar>

      <WindowBody>
        <div className="p-[16px]">
          <div className="flex items-center gap-[8px] rounded-[12px] bg-[#eaf4fb] px-[10px] py-[8px]">
            <span className="text-[#9fb4c6]">{items.length > 0 ? '▾' : '•'}</span>
            <span className="text-[13px] font-semibold text-ns-navy">Library</span>
          </div>
          {items.length > 0 && <TreeLevel items={items} showIcons={showIcons} />}
        </div>
      </WindowBody>
    </WindowFrame>
  )
}
