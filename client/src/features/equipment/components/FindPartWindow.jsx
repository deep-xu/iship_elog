import EquipmentExplorer from '@/features/equipment/components/EquipmentExplorer.jsx'

export default function FindPartWindow(props) {
  return <EquipmentExplorer {...props} initialMode="part" />
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0">
      <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-navy" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" className="fill-ns-navy" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 text-ns-navy">
      <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
      <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
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

function DocGear() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M5 2h9l5 5v15H5V2z" className="fill-none stroke-current" strokeWidth="1.8" />
      <path d="M14 2v5h5" className="fill-none stroke-current" strokeWidth="1.8" />
      <circle cx="10" cy="16" r="3" className="fill-none stroke-current" strokeWidth="1.8" />
    </svg>
  )
}

function DocArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M5 2h9l5 5v15H5V2z" className="fill-none stroke-current" strokeWidth="1.8" />
      <path d="M14 2v5h5" className="fill-none stroke-current" strokeWidth="1.8" />
      <path d="M8 12h8M12 8l4 4-4 4" className="fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function Trash() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M5 6h14M9 6V4h6v2m-8 0l1 14h8l1-14" className="fill-none stroke-current" strokeWidth="1.9" />
      <path d="M10 10v7M14 10v7" className="stroke-current" strokeWidth="1.9" />
    </svg>
  )
}

function EyeArrow({ dir }) {
  const flip = dir === 'right' ? 'scale-x-[-1]' : ''
  return (
    <svg viewBox="0 0 24 24" className={`h-full w-full ${flip}`}>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" className="fill-none stroke-current" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.6" className="fill-none stroke-current" strokeWidth="1.8" />
      <path d="M6 12h4M8 10l2 2-2 2" className="fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function MagText() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
      <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M8.5 8h3M10 8v5" className="fill-none stroke-current" strokeWidth="1.7" />
    </svg>
  )
}

function MagGear() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
      <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="10" cy="10" r="2.6" className="fill-none stroke-current" strokeWidth="1.8" />
    </svg>
  )
}

function Eagle() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M12 3l3 4 5 1-4 3 1 5-5-3-5 3 1-5-4-3 5-1 3-4z" />
    </svg>
  )
}

function Hierarchy() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <g className="fill-none stroke-current" strokeWidth="1.8">
        <path d="M5 4v14h6M5 11h6" />
      </g>
      <g className="fill-current">
        <rect x="2.5" y="2.5" width="5" height="4" />
        <rect x="11" y="9" width="5" height="4" />
        <rect x="11" y="16" width="5" height="4" />
      </g>
    </svg>
  )
}

function Lines() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
      <path d="M5 4h14v2H5V4zm0 5h14v2H5V9zm0 5h14v2H5v-2zm0 5h14v2H5v-2z" />
    </svg>
  )
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path d="M15 4L7 12l8 8" className="fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
