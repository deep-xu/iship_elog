const FOLDERS = ['Inbox', 'Draft', 'Sent', 'Outbox', 'System Generated']

const CONTACTS = [
  '2nd Engineer, Seaspan Bellwether',
  '2nd Officer, Seaspan Bellwether',
  '3rd Engineer, Seaspan Bellwether',
  '3rd Officer, Seaspan Bellwether',
  '4th Engineer, Seaspan Bellwether',
  'ADMIN, ADMIN',
  'Adlakha, Sumit',
  'Arun, Joseph',
  'Ashish, Kumar',
  'Avhik, Kar',
  'Baijal, Nalin',
  'Barick, Jitendra',
  'Brooklyn Bridge, 2nd Engineer',
  'Brooklyn Bridge, 2nd Officer',
  'Brooklyn Bridge, 3rd Engineer',
  'Brooklyn Bridge, 3rd Officer',
  'Brooklyn Bridge, 4th Engineer',
  'Brooklyn Bridge, Cadet',
  'Brooklyn Bridge, Chief Engineer',
  'Brooklyn Bridge, Chief Officer',
  'ONE Altair, 2nd Officer',
  'ONE Altair, 3rd Engineer',
  'ONE Altair, 3rd Officer',
  'ONE Altair, 4th Engineer',
  'ONE Altair, Cadet',
  'ONE Altair, Chief Engineer',
  'ONE Altair, Chief Officer',
  'ONE Hanoi, ETO',
  'ONE Hanoi, Junior Engineer',
  'ONE Hanoi, Master',
  'ONE Harbour, 2nd Engineer',
  'ONE Harbour, 2nd Officer',
  'ONE Harbour, 3rd Engineer',
  'ONE Harbour, 3rd Officer',
  'Pearl River Bridge, Master',
  'Poojari, Abhishek',
  'Praveen, Menon',
  'Prince, Sahaya',
  'Promotion, Officer1',
  'Promotion, Officer2',
  'Promotion, Officer3',
  'Seaspan Osaka, Master',
  'Seaspan Tokyo, 2nd Engineer',
  'Seaspan Tokyo, 2nd Officer',
  'Seaspan Tokyo, 3rd Engineer',
  'Seaspan Tokyo, 3rd Officer',
  'Seaspan Tokyo, 4th Engineer',
  'Seaspan Tokyo, Cadet',
]

const MESSAGE_COLUMNS = [
  { label: '', width: 34 },
  { label: 'From', width: 160 },
  { label: 'Subject', width: 280 },
  { label: 'Send Date', width: 160 },
  { label: 'Pri', width: 52 },
  { label: 'Pe...', width: 60 },
]

export default function HsqeMessagesInboxWindow({ onMinimize, onClose, preview = false }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-[#d7e5ee] bg-[linear-gradient(180deg,#f8fbfd_0%,#eff5fa_100%)] shadow-[0_22px_60px_rgba(68,101,129,0.12)]">
      <TitleBar onMinimize={onMinimize} onClose={onClose} preview={preview} />
      <div className="flex min-h-0 flex-1 overflow-hidden p-[18px]">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  )
}

function TitleBar({ onMinimize, onClose, preview }) {
  return (
    <div className="flex h-[58px] shrink-0 items-center border-b border-[#e5edf4] bg-white/92 pl-[20px] backdrop-blur-sm">
      <TargetIcon />
      <span className="ml-[10px] font-heading text-[18px] font-bold text-ns-navy">Messages - Inbox - [0]</span>
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
  )
}

function Toolbar() {
  return (
    <div className="flex h-[58px] shrink-0 items-center gap-[10px] border-b border-[#e8eff4] bg-white/88 px-[18px]">
      <ToolButton label="Inbox">
        <EnvelopeIcon />
      </ToolButton>
      <ToolButton label="Compose">
        <OpenEnvelopeIcon />
      </ToolButton>
      <ToolButton label="Print">
        <PrintIcon />
      </ToolButton>
      <ToolButton label="Delete">
        <TrashIcon />
      </ToolButton>
      <ToolButton label="Reply">
        <ArrowIcon direction="left" />
      </ToolButton>
      <ToolButton label="Reply All">
        <DoubleArrowIcon direction="left" />
      </ToolButton>
      <ToolButton label="Forward">
        <ArrowIcon direction="right" />
      </ToolButton>
      <ToolButton label="Redirect">
        <TransferIcon />
      </ToolButton>
      <span className="h-[26px] w-px bg-neutral-300" />
      <ToolButton label="Help">
        <QuestionIcon />
      </ToolButton>

      <div className="ml-auto rounded-full bg-[#eef6fb] px-[12px] py-[6px] text-[12px] font-semibold text-[#6f89a0]">
        Mail
      </div>
    </div>
  )
}

function LeftPanel() {
  return (
    <div className="flex min-w-0 w-[32%] shrink-0 flex-col overflow-hidden rounded-[22px] border border-[#dce8ef] bg-white shadow-[0_10px_28px_rgba(84,116,145,0.08)]">
      <div className="border-b border-[#e6eef4] bg-[#fbfdff] p-[14px]">
        <div className="rounded-full bg-[#eaf4fb] px-[14px] py-[7px] text-[12px] font-semibold uppercase tracking-[0.12em] text-ns-blue w-fit">
          Folders
        </div>
      </div>
      <div className="border-b border-[#e6eef4]">
        {FOLDERS.map((folder, index) => (
          <div
            key={folder}
            className={`px-[16px] py-[12px] text-[16px] font-semibold ${
              index === 0 ? 'bg-ns-blue text-white' : 'bg-white text-ns-navy'
            } ${folder === 'System Generated' ? 'truncate' : ''}`}
          >
            {folder === 'System Generated' ? 'System Genera...' : folder}
          </div>
        ))}
      </div>

      <div className="bg-[#f8fbfe] px-[16px] py-[12px] text-[22px] font-semibold text-ns-navy">Contacts</div>

      <div className="border-b border-[#e6eef4] bg-white px-[12px] py-[10px]">
        <div className="flex items-center gap-[8px] rounded-full border border-[#d7e5ed] bg-[#fbfdfe] px-[12px] py-[8px] text-[14px] text-neutral-500">
          <SearchIcon small />
          <span>Search...</span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-white">
        {CONTACTS.map((contact) => (
          <div key={contact} className="flex items-center gap-[8px] border-b border-neutral-200 px-[8px] py-[6px]">
            <span className="min-w-0 flex-1 truncate text-[16px] text-ns-navy">{contact}</span>
            <ContactAvatar />
          </div>
        ))}
      </div>
    </div>
  )
}

function RightPanel() {
  return (
    <div className="ml-[18px] flex min-w-0 flex-1 flex-col overflow-hidden rounded-[22px] border border-[#dce8ef] bg-white shadow-[0_10px_28px_rgba(84,116,145,0.08)]">
      <HeaderGrid />
      <div className="flex-1 bg-white" />
      <div className="h-px bg-[#e6eef4]" />
      <div className="h-[33%] bg-white" />
    </div>
  )
}

function HeaderGrid() {
  return (
    <div className="overflow-x-auto border-b border-[#e6eef4]">
      <div
        className="flex bg-[#dbeaf5] text-ns-navy"
        style={{ minWidth: MESSAGE_COLUMNS.reduce((sum, col) => sum + col.width, 0) }}
      >
        {MESSAGE_COLUMNS.map((col, index) => (
          <div
            key={`${col.label}-${index}`}
            style={{ width: col.width }}
            className="flex h-[42px] shrink-0 items-center justify-center border-r border-white/50 px-[8px] text-[11px] font-semibold uppercase tracking-[0.08em]"
          >
            {col.label}
          </div>
        ))}
        <div className="flex h-[40px] flex-1 items-center justify-end pr-[6px]">
          <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-none stroke-ns-navy" strokeWidth="2.4">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function ToolButton({ label, children }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px] text-ns-navy transition hover:bg-[#eef6fb] focus:outline-none"
    >
      {children}
    </button>
  )
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0">
      <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
    </svg>
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

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M2 5h20v14H2V5zm2.4 2L12 12.6 19.6 7H4.4z" />
    </svg>
  )
}

function OpenEnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M2 9l10-6 10 6-10 5L2 9zm0 2.5l10 5.5 10-5.5V19H2v-7.5z" />
    </svg>
  )
}

function PrintIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M7 3h10v4H7V3zM4 8h16v8h-3v5H7v-5H4V8zm5 8v3h6v-3H9z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M5 6h14M9 6V4h6v2m-8 0l1 14h8l1-14" className="fill-none stroke-current" strokeWidth="1.9" />
      <path d="M10 10v7M14 10v7" className="stroke-current" strokeWidth="1.9" />
    </svg>
  )
}

function ArrowIcon({ direction }) {
  const flip = direction === 'right' ? 'scale-x-[-1]' : ''
  return (
    <svg viewBox="0 0 24 24" className={`h-full w-full ${flip}`}>
      <path
        d="M9 5L3 11l6 6M4 11h12a5 5 0 010 10"
        className="fill-none stroke-current"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DoubleArrowIcon({ direction }) {
  const flip = direction === 'right' ? 'scale-x-[-1]' : ''
  return (
    <svg viewBox="0 0 24 24" className={`h-full w-full ${flip}`}>
      <path d="M11 6L5 12l6 6M17 6l-6 6 6 6" className="fill-none stroke-current" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TransferIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M4 7h8v4M20 17h-8v-4" className="fill-none stroke-current" strokeWidth="2" />
      <path d="M9 4l3 3-3 3M15 20l-3-3 3-3" className="fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function QuestionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="12" cy="12" r="10" className="fill-current" />
      <text x="12" y="17" textAnchor="middle" className="fill-white" style={{ fontSize: '13px', fontWeight: 700 }}>
        ?
      </text>
    </svg>
  )
}

function SearchIcon({ small = false }) {
  return (
    <svg viewBox="0 0 24 24" className={`${small ? 'h-[16px] w-[16px]' : 'h-full w-full'} fill-none stroke-current`}>
      <circle cx="10" cy="10" r="6.5" strokeWidth="2" />
      <line x1="15" y1="15" x2="21" y2="21" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function ContactAvatar() {
  return (
    <svg viewBox="0 0 24 24" className="h-[30px] w-[30px] shrink-0 fill-black">
      <circle cx="12" cy="7" r="5.4" />
      <path d="M4 24v-7c0-3.7 3.6-6.2 8-6.2s8 2.5 8 6.2v7H4z" />
    </svg>
  )
}
