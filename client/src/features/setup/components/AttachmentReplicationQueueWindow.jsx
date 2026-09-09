const ROWS = [
  { module: 'Maintenance & P...', attachment: 'Technical Alert 15-202...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: 'Technical Alert 15-202...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: 'Technical Alert 15-202...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: 'Technical Alert 15-202...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: 'Guidance to Clean Ship...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: '10000s-Windlass Moori...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: 'Technical Alert 15-202...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: 'Under Bridge pocket in...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: 'CH Bilge Alarm Test.jpg', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: 'CH Bilge Alarm Test.jpg', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: '10000s-Windlass Moori...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: 'Technical Alert 15-202...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: 'Rocking Test Procedure...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
  { module: 'Maintenance & P...', attachment: 'LR CN 06.2009 Deck Cr...', path: 'PRODUCTION/MaintenanceAndPurc...', date: '12/05/202...', size: '0.0 KB', total: '0.0 KB', user: 'CO_SBEN' },
]

function ToolbarButton({ label, primary = false }) {
  return (
    <button
      type="button"
      className={`rounded-full px-[16px] py-[9px] text-[13px] font-semibold ${
        primary
          ? 'bg-[linear-gradient(135deg,#2d86ca,#56ace4)] text-white shadow-[0_12px_24px_rgba(46,139,207,0.2)]'
          : 'border border-[#d7e5ed] bg-white text-ns-navy'
      }`}
    >
      {label}
    </button>
  )
}

export default function AttachmentReplicationQueueWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#d7e5ee] bg-[linear-gradient(180deg,#f8fbfd_0%,#eff5fa_100%)] shadow-[0_22px_60px_rgba(68,101,129,0.12)]">
      <div className="flex h-[58px] shrink-0 items-center border-b border-[#e5edf4] bg-white/92 pl-[20px] backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
        </svg>
        <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">Attachment Replication Queue</span>
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
      </div>

      <div className="flex items-center gap-[10px] border-b border-[#e4edf3] bg-white px-[18px] py-[14px]">
        <ToolbarButton label="Force Replication" />
        <ToolbarButton label="Reset Force" />
        <ToolbarButton label="Delete" primary />
        <span className="ml-auto rounded-full bg-[#eef6fb] px-[12px] py-[6px] text-[12px] font-semibold text-[#5e7894]">
          Total Size Limit: 10.0 MB
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-white px-[18px] pb-[18px]">
        <div className="overflow-hidden rounded-[22px] border border-[#dce8ef] shadow-[0_10px_28px_rgba(84,116,145,0.08)]">
        <table className="w-full border-collapse text-[13px] text-[#45627e]">
          <thead>
            <tr className="bg-[#dbeaf5] text-left text-ns-navy">
              <th className="w-8 border-b border-r border-white/50 px-2 py-3"></th>
              <th className="border-b border-r border-white/50 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">Module Name</th>
              <th className="border-b border-r border-white/50 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">Attachment</th>
              <th className="border-b border-r border-white/50 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">URL/File Path</th>
              <th className="border-b border-r border-white/50 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">Date and ...</th>
              <th className="border-b border-r border-white/50 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">Size</th>
              <th className="border-b border-r border-white/50 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">Total Size</th>
              <th className="border-b border-r border-white/50 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">User</th>
              <th className="border-b px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em]">Force</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={i} className={i === 0 ? 'bg-[#4a8f9b] text-white' : 'odd:bg-white even:bg-[#f8fbfe]'}>
                <td className="border-b border-r border-[#edf2f6] px-2 py-2 text-center">
                  <input type="checkbox" readOnly />
                </td>
                <td className="border-b border-r border-[#edf2f6] px-3 py-2">{row.module}</td>
                <td className="border-b border-r border-[#edf2f6] px-3 py-2">{row.attachment}</td>
                <td className="border-b border-r border-[#edf2f6] px-3 py-2">{row.path}</td>
                <td className="border-b border-r border-[#edf2f6] px-3 py-2">{row.date}</td>
                <td className="border-b border-r border-[#edf2f6] px-3 py-2">{row.size}</td>
                <td className="border-b border-r border-[#edf2f6] px-3 py-2">{row.total}</td>
                <td className="border-b border-r border-[#edf2f6] px-3 py-2">{row.user}</td>
                <td className="border-b border-[#edf2f6] px-3 py-2 text-center">
                  <input type="checkbox" readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

function ToolbarIcon({ children, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex h-[32px] w-[32px] items-center justify-center rounded-[10px] text-[16px] text-ns-navy hover:bg-[#eef6fb]"
    >
      {children}
    </button>
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
