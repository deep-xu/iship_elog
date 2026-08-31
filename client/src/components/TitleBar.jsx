export default function TitleBar() {
  return (
    <div className="flex h-[30px] w-full select-none items-center justify-between border-b border-[#d6e1dc] bg-[#f8fbf9]">
      <div className="flex items-center pl-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ns-muted">NS5</span>
      </div>

      {/* Window controls */}
      <div className="flex items-stretch">
        <button
          type="button"
          aria-label="Minimize"
          className="flex h-[30px] w-[46px] items-center justify-center text-ns-navy transition-colors hover:bg-ns-navy/5"
        >
          <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] stroke-current" strokeWidth="1">
            <line x1="1" y1="6" x2="11" y2="6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Restore"
          className="flex h-[30px] w-[46px] items-center justify-center text-ns-navy transition-colors hover:bg-ns-navy/5"
        >
          <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] fill-none stroke-current" strokeWidth="1">
            <rect x="1.5" y="3" width="7" height="7" />
            <path d="M3.5 3V1.5h7V8.5H9" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Close"
          className="flex h-[30px] w-[46px] items-center justify-center hover:bg-[#e81123] hover:text-white"
        >
          <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] stroke-current" strokeWidth="1">
            <line x1="1" y1="1" x2="11" y2="11" />
            <line x1="11" y1="1" x2="1" y2="11" />
          </svg>
        </button>
      </div>
    </div>
  )
}
