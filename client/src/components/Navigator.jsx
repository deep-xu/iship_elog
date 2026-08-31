import { useState } from 'react'
import { SECTIONS } from '../data/navigator.js'
import { WINDOW_REGISTRY } from './windowRegistry.jsx'
import { SectionIcon } from './icons.jsx'
import NavTree from './NavTree.jsx'

export default function Navigator({
  sections = SECTIONS,
  defaultSection = 'maintenance',
  collapsed,
  onToggleCollapse,
  openWindows = [],
  activeWindow,
  onFocusWindow,
  onOpenWindow,
}) {
  const [openSection, setOpenSection] = useState(defaultSection)
  const [query, setQuery] = useState('')

  return (
    <div
      className={`flex h-full shrink-0 flex-col border-r border-[#d5e5ef] bg-[linear-gradient(180deg,#173554_0%,#275980_55%,#336b96_100%)] ${
        collapsed ? 'w-[68px]' : 'w-[360px]'
      }`}
    >
      <div
        className={`shrink-0 border-b border-white/12 ${
          collapsed ? 'flex h-[80px] items-center justify-center' : 'px-[18px] pb-[16px] pt-[18px]'
        }`}
      >
        {collapsed ? (
          <CollapseButton collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
        ) : (
          <>
            <div className="flex items-center gap-3">
              <CollapseButton collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
              <div>
                <div className="font-heading text-[20px] font-bold text-white">Navigator</div>
                <div className="text-[12px] text-white/70">Find tools faster with fewer visual layers.</div>
              </div>
            </div>

            <label className="mt-4 flex items-center gap-2 rounded-[18px] bg-white px-4 py-[11px] text-ns-navy shadow-[0_10px_26px_rgba(15,34,55,0.12)]">
              <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-none stroke-current" strokeWidth="2">
                <circle cx="11" cy="11" r="6.5" />
                <line x1="16" y1="16" x2="21" y2="21" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tools or windows"
                className="min-w-0 flex-1 border-0 bg-transparent text-[13px] outline-none placeholder:text-[#7d91a5]"
              />
            </label>
          </>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-[16px]">
        {sections.map((section) => {
          const visibleTree = filterNodes(section.tree ?? [], query)
          const isWindows = section.key === 'windows'
          const expandable = isWindows
            ? openWindows.length > 0
            : visibleTree.length > 0 || Boolean(section.emptyMessage)
          const isOpen = expandable && openSection === section.key
          return (
            <SectionBlock
              key={section.key}
              section={{ ...section, tree: visibleTree }}
              collapsed={collapsed}
              isOpen={isOpen}
              activeWindow={activeWindow}
              onOpenWindow={onOpenWindow}
              onToggle={() => {
                if (!expandable) return
                setOpenSection(section.key)
              }}
            >
              {isWindows ? (
                <WindowThumbnails
                  openWindows={openWindows}
                  activeWindow={activeWindow}
                  onFocusWindow={onFocusWindow}
                />
              ) : undefined}
            </SectionBlock>
          )
        })}
      </div>
    </div>
  )
}

const THUMB_W = 225
const THUMB_SCALE = 0.225

// Live, scaled-down previews of every open MDI window.
function WindowThumbnails({ openWindows, activeWindow, onFocusWindow }) {
  return (
    <div className="flex flex-col items-center gap-[10px] py-[8px]">
      {openWindows.map((key) => {
        const { Component } = WINDOW_REGISTRY[key]
        return (
          <button
            key={key}
            type="button"
            onClick={() => onFocusWindow?.(key)}
            aria-label={WINDOW_REGISTRY[key].title}
            className={`shrink-0 overflow-hidden bg-white focus:outline-none ${
              activeWindow === key ? 'border-2 border-ns-blue' : 'border border-[#d7e5ed]'
            }`}
            style={{ width: THUMB_W, height: THUMB_W * 0.62 }}
          >
            <div
              className="pointer-events-none origin-top-left"
              style={{
                width: THUMB_W / THUMB_SCALE,
                height: (THUMB_W * 0.62) / THUMB_SCALE,
                transform: `scale(${THUMB_SCALE})`,
              }}
            >
              <Component preview />
            </div>
          </button>
        )
      })}
    </div>
  )
}

function SectionBlock({ section, collapsed, isOpen, activeWindow, onToggle, onOpenWindow, children }) {
  const variant = isOpen
    ? 'border-l-[4px] border-[#8dd5ff] bg-white/12'
    : 'border-l-[4px] border-transparent bg-transparent hover:bg-white/7'
  const iconTone = isOpen ? 'text-white' : 'text-white/90'
  const labelTone = isOpen ? 'text-white' : 'text-white/90'

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={onToggle}
        title={section.label}
        aria-label={section.label}
        className={`mx-[10px] mt-[10px] flex h-[48px] shrink-0 items-center justify-center rounded-[18px] focus:outline-none ${variant}`}
      >
        <SectionIcon name={section.icon} className={`h-[26px] w-[26px] ${iconTone}`} />
      </button>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className={`mx-[12px] mt-[12px] flex h-[52px] shrink-0 items-center gap-[13px] rounded-[18px] px-[16px] text-left text-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus:outline-none ${variant}`}
      >
        <SectionIcon name={section.icon} className={`h-[22px] w-[22px] shrink-0 ${iconTone}`} />
        <span className={`font-heading text-[16px] font-bold ${labelTone}`}>{section.label}</span>
      </button>

      {isOpen && (
        <div className="overflow-x-hidden px-[12px] pb-[12px] pt-[10px]">
          {children ??
            (section.tree.length > 0 ? (
              <NavTree nodes={section.tree} onOpenWindow={onOpenWindow} activeWindow={activeWindow} />
            ) : (
              <p className="rounded-[18px] bg-white/8 px-4 py-4 text-[13px] leading-[20px] text-white/78">
                {section.emptyMessage ?? 'No matching tools in this section.'}
              </p>
            ))}
        </div>
      )}
    </>
  )
}

function CollapseButton({ collapsed, onToggleCollapse }) {
  return (
    <button
      type="button"
      aria-label={collapsed ? 'Expand navigator' : 'Collapse navigator'}
      onClick={onToggleCollapse}
      className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-white/12 focus:outline-none"
    >
      <span className="flex flex-col gap-[4px]">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className="block h-[3px] w-[18px] rounded-full bg-white" />
        ))}
      </span>
    </button>
  )
}

function filterNodes(nodes, query) {
  if (!query.trim()) return nodes
  const normalized = query.trim().toLowerCase()
  return nodes
    .map((node) => {
      const children = Array.isArray(node.children) ? filterNodes(node.children, query) : undefined
      const matches = node.label.toLowerCase().includes(normalized)
      if (matches || (children && children.length > 0)) {
        return {
          ...node,
          children,
          defaultOpen: true,
        }
      }
      return null
    })
    .filter(Boolean)
}
