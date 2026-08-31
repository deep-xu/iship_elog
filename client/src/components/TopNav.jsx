import ishipLogo from '../assets/iship-logo-custom.png'

const LINKS = ['Log out', 'Account Settings', 'Help', 'Training']

export default function TopNav({ user, vessel, cartCount, onLogout }) {
  return (
    <div className="flex h-[72px] w-full items-center border-b border-[#d9e8f2] bg-[#ffffff] px-[22px] text-ns-navy shadow-[0_10px_30px_rgba(31,58,95,0.04)]">
      <div className="hidden items-center gap-4 xl:flex">
        <img src={ishipLogo} alt="iSHIP" className="h-[72px] w-auto object-contain" />
        <StatusPill label="Onboard" value="Live" tone="blue" />
        <StatusPill label="Role" value={user} tone="neutral" />
      </div>

      <div className="ml-auto flex items-center">
        <Divider />
        <div className="flex items-center gap-[8px] px-[18px]">
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-ns-navy">
            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 14.8l.03-.12.9-1.68h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49L19.16 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 16.37 5.48 18 7 18h12v-2H7.42c-.14 0-.25-.11-.22-.2z" />
          </svg>
          <span className="font-heading text-[13px] font-bold">({cartCount})</span>
        </div>
        <Divider />
        {LINKS.map((label) => (
          <div key={label} className="flex items-center">
            {label === 'Log out' ? (
              <button
                type="button"
                onClick={onLogout}
                className="font-heading px-[16px] text-[13px] font-semibold text-ns-navy transition hover:text-ns-blue"
              >
                {label}
              </button>
            ) : (
              <a
                href="#"
                className="font-heading px-[16px] text-[13px] font-semibold text-ns-navy transition hover:text-ns-blue"
              >
                {label}
              </a>
            )}
            <Divider />
          </div>
        ))}
        <button
          type="button"
          aria-label="Full screen"
          className="ml-3 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#d6e5ef] bg-[#f9fcfe] text-ns-navy transition hover:border-[#bfd8ea] hover:bg-[#f1f8fc]"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-ns-navy">
            <path d="M21 3h-7l2.6 2.6-4.3 4.3 1.8 1.8 4.3-4.3L21 10V3zM3 21h7l-2.6-2.6 4.3-4.3-1.8-1.8-4.3 4.3L3 14v7z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function Divider() {
  return <span className="h-[28px] w-px bg-[#dde8f0]" />
}

function StatusPill({ label, value, tone }) {
  return (
    <div
      className={`rounded-full border px-4 py-2 ${
        tone === 'blue'
          ? 'border-[#c5dff0] bg-[#f1f8fd] text-ns-blue'
          : 'border-[#dde8f0] bg-[#fbfdfe] text-ns-navy'
      }`}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7f95aa]">{label}</span>
      <span className="ml-2 text-[12px] font-semibold">{value}</span>
    </div>
  )
}
