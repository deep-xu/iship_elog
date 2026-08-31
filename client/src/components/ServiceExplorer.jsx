export default function ServiceExplorer({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      {/* Title bar — this window has no maximize button */}
      <div className="flex h-[34px] shrink-0 items-center border-b border-[#dbe8f1] bg-[#f4f9fd] pl-[10px]">
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-navy" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-navy" />
        </svg>
        <span className="ml-[9px] text-[17px] font-semibold text-ns-navy">Service Explorer</span>

        <div className="ml-auto flex items-center gap-[14px] pr-[8px]">
          <button
            type="button"
            aria-label="Minimize"
            onClick={preview ? undefined : onMinimize}
            className="flex h-[24px] w-[24px] items-center justify-center focus:outline-none"
          >
            <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] stroke-ns-navy" strokeWidth="2">
              <line x1="3" y1="11" x2="13" y2="11" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={preview ? undefined : onClose}
            className="flex h-[22px] w-[26px] items-center justify-center bg-ns-navy focus:outline-none"
          >
            <svg viewBox="0 0 16 16" className="h-[11px] w-[11px] stroke-white" strokeWidth="2">
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search row */}
      <div className="flex h-[42px] shrink-0 items-center gap-[6px] bg-[#fbfdff] px-[14px]">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 text-ns-navy">
          <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
          <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <span className="text-[12px] text-ns-navy">▾</span>
        <input
          type="text"
          placeholder="Search..."
          className="min-w-0 flex-1 border-b border-[#e4edf3] bg-transparent pb-[2px] text-[16px] text-ns-navy placeholder:text-ns-navy focus:outline-none"
        />
      </div>

      {/* Tree */}
      <div className="min-h-0 flex-1 overflow-auto bg-[#fbfdff] px-[16px] pb-[10px]">
        <div className="flex items-center gap-[5px]">
          <ExpandBox open />
          <span className="rounded-sm bg-ns-blue px-[6px] text-[16px] leading-[22px] text-white">
            Service Hierarchy
          </span>
        </div>
        <div className="ml-[18px] border-l border-dotted border-ns-tree-line">
          <div className="flex items-center gap-[5px] pl-[10px]">
            <span className="h-px w-[6px] shrink-0 border-t border-dotted border-ns-tree-line" />
            <ExpandBox />
            <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 fill-ns-navy">
              <path d="M2 5h9l2 2h9v12H2V5zm3 5h14v2H5v-2zm0 4h9v2H5v-2z" />
            </svg>
            <span className="rounded-sm px-[2px] text-[16px] leading-[22px] text-ns-tree-text hover:bg-[#eaf5fd]">
              Service / Labour Costs
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExpandBox({ open = false }) {
  return (
    <span className="flex h-[12px] w-[12px] shrink-0 items-center justify-center border border-ns-tree-text bg-white">
      <svg viewBox="0 0 10 10" className="h-[9px] w-[9px] stroke-ns-tree-text" strokeWidth="1.2">
        <line x1="2" y1="5" x2="8" y2="5" />
        {!open && <line x1="5" y1="2" x2="5" y2="8" />}
      </svg>
    </span>
  )
}
