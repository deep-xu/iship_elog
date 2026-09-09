export default function PerformanceReviewAttributesSetupWindow() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <div className="flex items-center justify-between border-b border-[#d7e5ed] bg-[#e4edf3] px-4 py-2">
        <div className="flex items-center gap-3 text-[18px] font-semibold text-ns-navy">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-ns-blue text-[14px]">
            O
          </span>
          <span>Performance Review Attributes Setup</span>
        </div>
        <div className="flex items-center gap-4 text-ns-navy">
          <button type="button" className="text-[18px] leading-none">
            _
          </button>
          <button type="button" className="text-[18px] leading-none">
            ×
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-[#d7e5ed] bg-white px-4 py-2">
        <span className="text-[14px] text-ns-navy">🔍</span>
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 border-b border-[#d7e5ed] bg-transparent px-1 py-1 text-[14px]"
          readOnly
        />
        <span className="text-[16px] text-ns-navy">⇕</span>
        <span className="text-[16px] text-ns-navy">⇕</span>
      </div>

      <div className="flex-1 overflow-auto p-3">
        <div className="inline-block bg-ns-blue px-4 py-1 text-[14px] font-semibold text-white">
          Library
        </div>
      </div>
    </div>
  )
}
