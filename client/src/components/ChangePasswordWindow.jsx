function Field({ label, value, editable = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#dce8ef] bg-[#f7fbfd] shadow-[0_24px_60px_rgba(68,101,129,0.14)]">
      <span className="w-52 shrink-0 text-right text-[13px] font-semibold text-[#5b7690]">{label}</span>
      {editable ? (
        <input
          type="password"
          className="flex-1 rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] py-[9px] text-[13px] text-ns-navy outline-none"
        />
      ) : (
        <span className="flex-1 rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[14px] py-[9px] text-[13px] text-ns-navy">{value}</span>
      )}
    </div>
  )
}

export default function ChangePasswordWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#d7e5ee] bg-[linear-gradient(180deg,#f8fbfd_0%,#eff5fa_100%)] shadow-[0_22px_60px_rgba(68,101,129,0.12)]">
      <div className="flex h-[58px] shrink-0 items-center border-b border-[#e5edf4] bg-white/92 pl-[20px] backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
          <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
        </svg>
        <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">Change Password - [0143-00001-00000563]</span>
        <div className="ml-auto flex items-center gap-[10px] pr-[14px]">
          <WindowActionButton label="Minimize" onClick={preview ? undefined : onMinimize}>
            <line x1="3" y1="11" x2="13" y2="11" />
          </WindowActionButton>
          <WindowActionButton label="Close" onClick={preview ? undefined : onClose}>
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </WindowActionButton>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-[18px]">
        <div className="flex min-h-0 flex-1 flex-col rounded-[24px] border border-[#dce8ef] bg-white p-[28px] shadow-[0_14px_34px_rgba(84,116,145,0.08)]">
          <div className="mb-[18px] rounded-full bg-[#eaf4fb] px-[14px] py-[7px] text-[12px] font-semibold uppercase tracking-[0.12em] text-ns-blue w-fit">
            Security
          </div>
          <div className="mx-auto flex w-full max-w-[720px] flex-col gap-6">
            <Field label="User:" value="Seaspan Breeze, 2nd Engineer" />
            <Field label="Authorization Profile:" value="2nd Engineer" />
            <Field label="Old Password:" editable />
            <Field label="New Password:" editable />
            <Field label="Confirm New Password:" editable />
          </div>

          <div className="mt-auto flex justify-center gap-6 pb-2 pt-[28px]">
            <button
              type="button"
              className="min-w-[160px] rounded-full bg-[linear-gradient(135deg,#2d86ca,#56ace4)] px-8 py-3 text-[14px] font-semibold text-white shadow-[0_12px_24px_rgba(46,139,207,0.2)]"
            >
              Ok
            </button>
            <button
              type="button"
              className="min-w-[160px] rounded-full border border-[#d7e5ed] bg-white px-8 py-3 text-[14px] font-semibold text-ns-navy"
            >
              Help
            </button>
          </div>
        </div>
      </div>
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
